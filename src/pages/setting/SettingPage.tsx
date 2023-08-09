import { useState } from "react";
import {
  CheckOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Input, Row, Switch, Tooltip, Typography } from "antd";
import Icon from "@ant-design/icons";

import { colorTypes, colors } from "../../constants/colors";
import AppButton from "../../components/Buttons/AppButton";
import { appConstants } from "../../constants/appContants";
import ProcesingIcon from "../../icons/processing";
import AppAlert from "../../components/AppAlert/AppAlert";

function SettingPage() {
  const [draftTemplate, setDraftTemplate] = useState(
    appConstants.defaultTemplate
  );
  const [helpCenterUrl, setHelpCenterUrl] = useState<boolean | null>(null);

  const renderedHelpCenterUrlState =
    helpCenterUrl === null ? null : helpCenterUrl ? (
      <div
        className="d-flex align-items-center"
        style={{ marginLeft: 10, color: colors.green.default }}
      >
        <CheckOutlined style={{ marginRight: 5, fontSize: 20 }} /> Available
      </div>
    ) : (
      <div className="d-flex align-items-center" style={{ marginLeft: 10 }}>
        <Icon component={ProcesingIcon} style={{ marginRight: 5, width: 20 }} />
        Processing
      </div>
    );

  return (
    <>
      <Row>
        <Row className="mb-xs">
          <Typography.Title level={5}>Help Center URL</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
      </Row>
      <Row>
        <Input
          size="large"
          placeholder="Enter URL here..."
          style={{ width: "50%", flexGrow: 1 }}
        />
        {renderedHelpCenterUrlState}
      </Row>
      <Row>
        <Row style={{ marginTop: 20, flexGrow: 1 }} className="mb-xs">
          <Row style={{ flexGrow: 1 }}>
            <Typography.Title level={5}>Draft Template</Typography.Title>
            <Tooltip placement="right" title="What is Help Center URL? ">
              <InfoCircleOutlined style={infoIconStyles} />
            </Tooltip>
          </Row>
          <AppButton
            icon={<ReloadOutlined />}
            colorType={colorTypes.gray}
            textColor={colors.gray[900]}
            onClick={() => setDraftTemplate(appConstants.defaultTemplate)}
            style={{
              padding: "5px 10px",
              height: 30,
              fontSize: 12,
              marginTop: -12,
            }}
          >
            Reset
          </AppButton>
        </Row>
        <Input.TextArea
          rows={8}
          value={draftTemplate}
          style={{ color: colors.gray[400] }}
          onChange={(event) => setDraftTemplate(event.currentTarget.value)}
        />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Include links in drafts?
        </Typography.Title>
        <Tooltip placement="right" title="What is Help Center URL? ">
          <InfoCircleOutlined style={infoIconStyles} />
        </Tooltip>
        <Switch style={{ marginLeft: 30, marginTop: 1 }} size="small" />
      </Row>
      <AppButton type="primary" icon={<SaveOutlined />} className="mt-md">
        Save settings
      </AppButton>

      <AppAlert type="warning">
        <span>
          You can have access to dozens of settings, multiple template types,
          and much more if your team starts using RightPage for Teams. Learn
          more
        </span>
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

export default SettingPage;
