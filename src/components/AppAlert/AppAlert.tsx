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
      }}
    >
      <InfoCircleOutlined />
      <Typography.Paragraph style={{ marginLeft: 10, fontSize: 10, color }}>
        {children}
      </Typography.Paragraph>
    </div>
  );
}
