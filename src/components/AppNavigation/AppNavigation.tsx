import { Tabs } from "antd";
import { FileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { AccountPage, DraftPage, SettingPage } from "../../pages";
import Container from "../Container/Container";

const links = [
  {
    label: "Settings",
    icon: <SettingOutlined />,
    component: <SettingPage />,
  },
  {
    label: "Draft",
    icon: <FileOutlined />,
    component: <DraftPage />,
  },
  {
    label: "Account",
    icon: <UserOutlined />,
    component: <AccountPage />,
  },
];

function AppNavigation() {
  const renderedTabItems = links.map((link) => {
    return {
      label: (
        <div className="d-flex flex-direction-col align-items-center">
          <span style={{ fontSize: 22 }}>{link.icon}</span>
          <span style={{ marginTop: -3 }}>{link.label}</span>
        </div>
      ),
      key: link.label,
      children: <Container>{link.component}</Container>,
    };
  });

  return (
    <div
      className="app-navigation"
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
      }}
    >
      <Tabs items={renderedTabItems} tabPosition="bottom" size="small" />
    </div>
  );
}

export default AppNavigation;
