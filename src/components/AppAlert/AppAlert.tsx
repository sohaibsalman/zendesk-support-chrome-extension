import { InfoCircleOutlined } from "@ant-design/icons";

import { colors } from "../../constants/colors";
import { Typography } from "antd";
import { ReactElement } from "react";

interface Props {
  type: string;
  children: ReactElement;
}

export default function AppAlert({ type, children }: Props) {
  let color = colors.warning[600];
  if (type === "error") color = colors.error[600];

  return (
    <div
      style={{
        color,
        display: "flex",
        alignItems: "center",
        padding: "10px 15px",
        marginTop: 15,
        borderRadius: 5,
        background: "white",
      }}
    >
      <InfoCircleOutlined />
      <Typography.Paragraph
        style={{ marginLeft: 10, fontSize: 11, color, marginBottom: 0 }}
      >
        {children}
      </Typography.Paragraph>
    </div>
  );
}
