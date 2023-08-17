import { useState } from "react";
import { FormOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Input, Row, Tooltip, Typography } from "antd";

import { colorTypes, colors } from "../../constants/colors";
import AppButton from "../../components/Buttons/AppButton";
import TicketCommentList from "./TicketCommentList";
import { TicketComment } from "../../models/ticket-comment";
import AppAlert from "../../components/AppAlert/AppAlert";
import DraftGeneration from "./DraftGeneration";
import Icon from "@ant-design/icons/lib/components/Icon";
import ReloadIcon from "../../icons/reload";

function DraftPage() {
  const [isDraftGenerating, setIsDraftGenerating] = useState(false);
  const [tickets, setTickets] = useState<TicketComment[]>([]);

  const handleTicketsRefresh = () => {
    function extractData() {
      const container = document.querySelectorAll(
        '[data-test-id="omni-log-container"]'
      );

      const senderNamesElements = container[0].getElementsByTagName("strong");
      const commentElements = container[0].getElementsByClassName("zd-comment");

      const result: TicketComment[] = [];
      for (let i = 0; i < senderNamesElements.length; i++) {
        const title = senderNamesElements[i]?.textContent ?? "";
        const details = commentElements[i]?.textContent ?? "";
        result.push({ title, details });
      }
      return result;
    }

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && isZendeskTicketURL(activeTab.url!)) {
        chrome.scripting
          .executeScript({
            target: { tabId: activeTab.id!, allFrames: true },
            func: extractData,
          })
          .then((result) => {
            setTickets(result[0].result);
          });
      } else {
      }
    });
  };

  function isZendeskTicketURL(url: string): boolean {
    const urlPattern = /^https:\/\/[\w.-]+\.zendesk\.com\/agent\/tickets\/\d+$/;
    return urlPattern.test(url);
  }

  if (isDraftGenerating) {
    return <DraftGeneration onReturn={() => setIsDraftGenerating(false)} />;
  }

  return (
    <>
      <Row style={{ alignItems: "end" }}>
        <Row className="mb-xs" style={{ flexGrow: 1, alignItems: "center" }}>
          <Typography.Title level={5}>Ticket Comments</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
        <AppButton
          icon={<Icon component={ReloadIcon} />}
          colorType={colorTypes.gray}
          textColor={colors.gray[500]}
          style={{
            padding: "5px 10px",
            height: 30,
            fontSize: 12,
            marginTop: 0,
          }}
          onClick={handleTicketsRefresh}
        >
          Refresh
        </AppButton>
      </Row>
      <TicketCommentList data={tickets} />
      <Row>
        <Row className="mt-md mb-xs">
          <Typography.Title level={5}>Instructions</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
      </Row>
      <Row>
        <Input placeholder="Type instructions here..." />
      </Row>
      <AppButton
        type="primary"
        icon={<FormOutlined />}
        className="mt-md"
        onClick={() => setIsDraftGenerating(true)}
      >
        Write Draft
      </AppButton>
      <AppAlert type="warning">
        <>
          Your Help Center hasn’t finished processing. Drafts will be suboptimal
          until processing is completed (you will receive an email).
        </>
      </AppAlert>
    </>
  );
}

const infoIconStyles: React.CSSProperties = {
  fontSize: 15,
  color: colors.gray[500],
  marginLeft: 8,
  marginTop: 0,
};

export default DraftPage;
