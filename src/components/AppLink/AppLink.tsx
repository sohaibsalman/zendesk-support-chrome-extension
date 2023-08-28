import Icon from "@ant-design/icons/lib/components/Icon";
import { Typography } from "antd";

import LinkIcon from "../../icons/link";
import { colors } from "../../constants/colors";

interface Props {
  title: string;
  href: string;
}

export default function AppLink({ title, href }: Props) {
  return (
    <div
      style={{
        background: "#F5F5F6",
        padding: "5px 10px",
        borderRadius: 50,
        marginRight: 5,
        marginBottom: 10,
        cursor: "pointer",
      }}
      onClick={() => {
        chrome.tabs.create({
          url: href,
        });
      }}
    >
      <Icon component={LinkIcon} style={{ marginRight: 5 }} />
      <Typography.Text style={{ fontSize: 12, color: colors.gray[900] }}>
        {title}
      </Typography.Text>
    </div>
  );
}
