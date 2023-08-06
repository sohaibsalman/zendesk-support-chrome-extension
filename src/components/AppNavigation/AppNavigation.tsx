import { Tabs } from "antd";
import { FileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

const links = [
  {
    label: "Settings",
    icon: <SettingOutlined />,
  },
  {
    label: "Draft",
    icon: <FileOutlined />,
  },
  {
    label: "Account",
    icon: <UserOutlined />,
  },
];

function AppNavigation() {
  const renderedTabItems = links.map((link) => {
    return {
      label: (
        <div className="d-flex flex-direction-col align-items-center">
          <div style={{ fontSize: 32 }}>{link.icon}</div>
          {link.label}
        </div>
      ),
      key: link.label,
      children: `Tab ${link.label}`,
    };
  });

  return (
    <div className="app-navigation">
      <Tabs items={renderedTabItems} tabPosition="bottom" />
    </div>
  );
}

export default AppNavigation;
