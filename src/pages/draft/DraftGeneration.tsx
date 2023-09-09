import {
  ArrowLeftOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Row, Tooltip, Typography, message } from "antd";
import Icon from "@ant-design/icons";
import ScrollToBottom from "react-scroll-to-bottom";

import AppButton from "../../components/Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";
import AppLink from "../../components/AppLink/AppLink";
import AppAlert from "../../components/AppAlert/AppAlert";
import ReloadIcon from "../../icons/reload";
import { useEffect, useRef, useState } from "react";
import { appConstants } from "../../constants/appContants";
import { agent } from "../../api/agent";
import { TicketComment } from "../../models/ticket-comment";
import {
  DraftRequest,
  SourceLink,
  StartDraftResponse,
} from "../../models/extension-requests";
import StopIcon from "../../icons/stop";
import { LimitExceedPage } from "../limit-exceed/LimitExceedPage";
import { AxiosError } from "axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface Props {
  onReturn: () => void;
  tickets: TicketComment[];
  instructions: string;
}

export default function DraftGeneration({
  onReturn,
  tickets,
  instructions,
}: Props) {
  const [isDraftGenerated, setIsDraftGenerated] = useState<boolean>(false);
  const stopDraftRef = useRef(false);
  const [draft, setDraft] = useState("");
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [sourceLinks, setSourceLinks] = useState<SourceLink[]>([]);

  const startDrafting = async () => {
    try {
      setDraft("");
      const { session_id } = await agent.Extension.getSessionId();

      const body = {
        ticket_comments: tickets,
        session_id: session_id,
        existing_draft: instructions ?? "",
      } as DraftRequest;

      const startDraftRes = agent.Extension.startDraft(body);
      await pollData(session_id, startDraftRes);
    } catch (error) {
      console.log(error);
      message.error(appConstants.draftGenerateError);
      setIsDraftGenerated(true);
    }
  };

  const pollData = async (
    sessionId: string,
    startDraftRes: Promise<StartDraftResponse>
  ) => {
    let totalRetries = 100;
    let retryFailed = false;
    while (true && !stopDraftRef.current) {
      try {
        const response = await agent.Extension.getDraftStatus(sessionId);
        setDraft(
          (prevDraft) =>
            prevDraft +
            response.content.substring(
              prevDraft.length === 0 ? prevDraft.length : prevDraft.length + 1
            )
        );
        if (sourceLinks.length === 0) {
          setSourceLinks(response.sources);
        }

        if (response.done) break;
      } catch (error) {
        const err = error as AxiosError;
        if (err.response?.status === 404 && totalRetries === 0) {
          retryFailed = true;
          break;
        } else if (err.response?.status !== 404) {
          console.log(error);
          message.error(appConstants.draftGenerateError);
        }
        totalRetries = totalRetries - 1;
      }
    }

    if (retryFailed) {
      try {
        const res = await startDraftRes;
        if (res.Limit) {
          setIsLimitReached(true);
        } else {
          pollData(sessionId, startDraftRes);
        }
      } catch (error) {
        console.log(error);
        message.error(appConstants.draftGenerateError);
        setIsDraftGenerated(true);
      }
    }
    setIsDraftGenerated(true);
  };

  useEffect(() => {
    if (!stopDraftRef.current) startDrafting();
  }, [stopDraftRef]);

  const handleStopOrRegenerate = () => {
    if (isDraftGenerated) {
      setIsDraftGenerated(false);
      if (stopDraftRef.current) {
        stopDraftRef.current = false;
      }
      startDrafting();
    } else {
      stopDraftRef.current = true;
      setIsDraftGenerated(true);
    }
  };

  function copyToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.value = draft;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  if (isLimitReached) {
    return <LimitExceedPage onReturn={onReturn} />;
  }

  return (
    <>
      <AppButton
        type="text"
        icon={<ArrowLeftOutlined />}
        colorType={colorTypes.gray}
        onClick={onReturn}
      >
        Return
      </AppButton>
      <Row className="mt-sm">
        <Row className="mb-xs" style={{ flexGrow: 1, alignItems: "center" }}>
          <Typography.Title level={5}>Draf Response</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
        <AppButton
          icon={<Icon component={isDraftGenerated ? ReloadIcon : StopIcon} />}
          colorType={colorTypes.gray}
          textColor={colors.gray[500]}
          onClick={handleStopOrRegenerate}
          style={{
            padding: "5px 10px",
            height: 30,
            fontSize: 12,
            marginTop: -5,
          }}
        >
          {isDraftGenerated ? "Regenerate" : "Stop generating"}
        </AppButton>
      </Row>
      <Row className="mt-sm">
        <ScrollToBottom className="scrolling-div ">
          <ReactMarkdown>
            {isDraftGenerated ? draft : `${draft}...`}
          </ReactMarkdown>
        </ScrollToBottom>
      </Row>
      <Row className="mt-sm">
        <AppButton
          type="primary"
          colorType={colorTypes.blue}
          icon={<CopyOutlined />}
          disabled={!isDraftGenerated}
          onClick={copyToClipboard}
        >
          Copy
        </AppButton>
      </Row>
      {sourceLinks.length > 0 ? (
        <>
          <Row
            className="mb-xs mt-md"
            style={{ flexGrow: 1, alignItems: "center" }}
          >
            <Typography.Title level={5}>Top Sources</Typography.Title>
            <Tooltip placement="right" title="What is Help Center URL? ">
              <InfoCircleOutlined style={infoIconStyles} />
            </Tooltip>
          </Row>
          <Row className="mt-sm">
            {sourceLinks.map((link) => (
              <AppLink title={link.title} href={link.link} />
            ))}
          </Row>
        </>
      ) : null}

      <Row className="mb-md">
        <AppAlert type="warning">
          <>
            This draft could be 3x better (and generated 10x faster) if your
            team begins using RightPage Pro. Learn more
          </>
        </AppAlert>
      </Row>
    </>
  );
}

const infoIconStyles: React.CSSProperties = {
  fontSize: 15,
  color: colors.gray[500],
  marginLeft: 8,
  marginTop: 0,
};
