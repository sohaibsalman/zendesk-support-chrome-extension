import { Card, Empty, Typography } from "antd";
import { TicketComment } from "../../models/ticket-comment";

interface Props {
  data: TicketComment[];
}

export default function TicketCommentList({ data }: Props) {
  const renderedTickets = data.map((item, i) => (
    <Card
      title={item.name}
      style={{ marginBottom: 10, borderColor: "#D0D0D1" }}
    >
      <Typography.Paragraph>{item.comment}</Typography.Paragraph>
    </Card>
  ));

  return (
    <div
      style={{
        padding: 15,
        background: "#F5F5F6",
        marginTop: 15,
        borderRadius: 8,
        height: 150,
        overflow: "auto",
      }}
    >
      {data.length > 0 ? renderedTickets : <Empty />}
    </div>
  );
}
