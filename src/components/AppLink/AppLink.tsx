import Icon from "@ant-design/icons/lib/components/Icon";
import { Typography } from "antd";

import LinkIcon from "../../icons/link";
import { colors } from "../../constants/colors";

export default function AppLink() {
  return (
    <div
      style={{
        background: "#F5F5F6",
        padding: "5px 10px",
        borderRadius: 50,
        marginRight: 5,
        marginBottom: 10,
      }}
    >
      <Icon component={LinkIcon} style={{ marginRight: 5 }} />
      <Typography.Link style={{ fontSize: 12, color: colors.gray[900] }}>
        Help Center Link Article
      </Typography.Link>
    </div>
  );
}
