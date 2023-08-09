import {
  FormOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Input, Row, Tooltip, Typography } from "antd";

import { colorTypes, colors } from "../../constants/colors";
import AppButton from "../../components/Buttons/AppButton";
import TicketCommentList from "./TicketCommentList";
import { TicketComment } from "../../models/ticket-comment";
import AppAlert from "../../components/AppAlert/AppAlert";

function DraftPage() {
  return (
    <>
      <Row>
        <Row className="mb-xs" style={{ flexGrow: 1, alignItems: "center" }}>
          <Typography.Title level={5}>Ticket Comments</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
        <AppButton
          icon={<ReloadOutlined />}
          colorType={colorTypes.gray}
          textColor={colors.gray[900]}
          style={{
            padding: "5px 10px",
            height: 30,
            fontSize: 12,
            marginTop: 0,
          }}
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
      <AppButton type="primary" icon={<FormOutlined />} className="mt-md">
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

const tickets: TicketComment[] = [
  {
    title: "Mark S.",
    details: `Hi,
  I'm unable to access the Workflow Designer - I'm an in-house counsel and should have access to this, not sure what the issue is. Can you please let me know - have time-sensitive work.
  Regards,
  Mark SmithAndira Industries`,
  },
  {
    title: "Michael B.",
    details: `Hi,
  I'm unable to access the Workflow Designer - I'm an in-house counsel and should have access to this, not sure what the issue is. Can you please let me know - have time-sensitive work.
  Regards,
  Mark SmithAndira Industries`,
  },
];

const infoIconStyles: React.CSSProperties = {
  fontSize: 15,
  color: colors.gray[500],
  marginLeft: 8,
  marginTop: 0,
};

export default DraftPage;
