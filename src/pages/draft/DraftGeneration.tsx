import {
  ArrowLeftOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Input, Row, Tooltip, Typography, message } from "antd";
import Icon from "@ant-design/icons";

import AppButton from "../../components/Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";
import SendIcon from "../../icons/send";
import AppLink from "../../components/AppLink/AppLink";
import AppAlert from "../../components/AppAlert/AppAlert";
import ReloadIcon from "../../icons/reload";
import { useEffect, useState } from "react";
import { appConstants } from "../../constants/appContants";
import { agent } from "../../api/agent";
import { TicketComment } from "../../models/ticket-comment";
import { DraftRequest } from "../../models/extension-requests";
import StopIcon from "../../icons/stop";

interface Props {
  onReturn: () => void;
  tickets: TicketComment[];
}

export default function DraftGeneration({ onReturn, tickets }: Props) {
  const [sessionId, setSessionId] = useState("");
  const [isDraftGenerated, setIsDraftGenerated] = useState<boolean>(false);
  const [isDraftStarted, setIsDraftStarted] = useState(false);
  const [stopDraft, setStopDraft] = useState(false);
  const [draft, setDraft] = useState("");

  const startDrafting = async () => {
    try {
      setDraft("");
      const sessionIdResponse = await agent.Extension.getSessionId();
      setSessionId(sessionIdResponse.session_id);

      const body = {
        ticket_comments: tickets,
        session_id: sessionIdResponse.session_id,
        existing_draft: "",
      } as DraftRequest;

      const res = await agent.Extension.startDraft(body);
      setDraft(res.Content);
      if (!res.Done) {
        setIsDraftStarted(true);
      } else {
        setIsDraftGenerated(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    startDrafting();
  }, []);

  useEffect(() => {
    async function completeDraft() {
      if (!sessionId) return;

      try {
        while (true && !stopDraft) {
          const response = await agent.Extension.getDraftStatus(sessionId);
          if (response.Done) break;

          setDraft(draft + response.Content);
        }
      } catch (error) {
        console.log(error);
        message.error(appConstants.draftGenerateError);
        setIsDraftGenerated(true);
      }
    }

    completeDraft();
  }, [isDraftStarted]);

  const handleStopOrRegenerate = () => {
    if (isDraftGenerated) {
      setStopDraft(false);
      setIsDraftGenerated(false);
      startDrafting();
    } else {
      setStopDraft(true);
      setIsDraftGenerated(true);
    }
  };

  const sendIcon = <Icon component={SendIcon} style={{ width: 15 }} />;

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
        <Input.TextArea
          rows={6}
          value={draft}
          style={{ color: colors.gray[400], resize: "none" }}
        />
      </Row>
      <Row className="mt-sm">
        <AppButton
          type="primary"
          colorType={colorTypes.green}
          icon={sendIcon}
          disabled={!isDraftGenerated}
        >
          Insert Draft
        </AppButton>
        <AppButton
          type="primary"
          colorType={colorTypes.blue}
          icon={<CopyOutlined />}
          style={{ marginLeft: 10 }}
          disabled={!isDraftGenerated}
        >
          Copy
        </AppButton>
      </Row>
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
        <AppLink />
        <AppLink />
        <AppLink />
      </Row>
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
