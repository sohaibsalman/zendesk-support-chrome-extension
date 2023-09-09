import { useState } from "react";
import { Tabs } from "antd";
import { FileOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";

import { DraftPage, SettingPage } from "../../pages";
import Container from "../Container/Container";
import { appConstants } from "../../constants/appContants";

function AppNavigation() {
  const [urlStatus, setUrlStatus] = useState<boolean | null>(false);

  const links = [
    {
      label: "Settings",
      icon: <SettingOutlined />,
      component: (
        <SettingPage urlStatus={urlStatus} setUrlStatus={setUrlStatus} />
      ),
    },
    {
      label: "Draft",
      icon: <FileOutlined />,
      component: <DraftPage urlStatus={urlStatus} />,
    },
    {
      label: "Account",
      icon: <UserOutlined />,
      component: <></>,
    },
  ];

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
      <Tabs
        items={renderedTabItems}
        tabPosition="bottom"
        size="small"
        onTabClick={(key) => {
          if (key === "Account") {
            chrome.tabs.create({
              url: appConstants.webAppUrl,
            });
          }
        }}
      />
    </div>
  );
}

export default AppNavigation;
