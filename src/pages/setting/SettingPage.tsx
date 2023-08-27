import { useEffect, useState } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Input, Row, Switch, Tooltip, Typography, message } from "antd";
import Icon from "@ant-design/icons";

import { colorTypes, colors } from "../../constants/colors";
import AppButton from "../../components/Buttons/AppButton";
import { appConstants } from "../../constants/appContants";
import ProcesingIcon from "../../icons/processing";
import AppAlert from "../../components/AppAlert/AppAlert";
import ReloadIcon from "../../icons/reload";
import { agent } from "../../api/agent";
import {
  SettingsResponse,
  SettingsUpdateRequest,
} from "../../models/extension-requests";

function SettingPage() {
  const [settingsState, setSettingsState] = useState<SettingsResponse>();
  const [defaultDraftTemplate, setDefaultDraftTemplate] = useState("");
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getSettings() {
      try {
        const settings = await agent.Extension.getSettings();
        validateUrl(settings.crawl_url);
        setSettingsState(settings);
        setDefaultDraftTemplate(settings.draft_template);
      } catch (error) {
        console.log(error);
      }
    }

    getSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setIsLoading(true);
      const updatedSettings = { ...settingsState } as SettingsUpdateRequest;
      await agent.Extension.updateSettings(updatedSettings);
      message.success(appConstants.settingsSaveSuccess);
    } catch (error) {
      console.log(error);
      message.error(appConstants.settingsSaveError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSettingStateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSettingsState({
      ...(settingsState as SettingsResponse),
      [event.target.name]: event.target.value,
    });
  };

  const validateUrl = (url: string) => {
    setIsValidUrl(null);
    setTimeout(() => {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      setIsValidUrl(urlPattern.test(url));
    }, 1000);
  };

  const renderedHelpCenterUrlState =
    isValidUrl === null ? (
      <div className="d-flex align-items-center" style={{ marginLeft: 10 }}>
        <Icon component={ProcesingIcon} style={{ marginRight: 5, width: 20 }} />
        Processing
      </div>
    ) : isValidUrl ? (
      <div
        className="d-flex align-items-center"
        style={{ marginLeft: 10, color: colors.green.default }}
      >
        <CheckOutlined style={{ marginRight: 5, fontSize: 20 }} /> Available
      </div>
    ) : (
      <div
        className="d-flex align-items-center"
        style={{ marginLeft: 10, color: colors.error[600] }}
      >
        <CloseOutlined style={{ marginRight: 5, fontSize: 20 }} />
        Not Available
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
          placeholder="Enter URL here..."
          name="crawl_url"
          value={settingsState?.crawl_url}
          style={{ width: "50%", flexGrow: 1 }}
          onChange={(event) => {
            validateUrl(event.target.value);
            handleSettingStateChange(event);
          }}
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
            icon={<Icon component={ReloadIcon} />}
            colorType={colorTypes.gray}
            textColor={colors.gray[500]}
            onClick={() =>
              setSettingsState({
                ...(settingsState as SettingsResponse),
                draft_template: defaultDraftTemplate,
              })
            }
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
          name="draft_template"
          value={settingsState?.draft_template}
          style={{ color: colors.gray[400] }}
          onChange={(event) => handleSettingStateChange(event)}
        />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Typography.Title level={5} style={{ margin: 0 }}>
          Include links in drafts?
        </Typography.Title>
        <Tooltip placement="right" title="What is Help Center URL? ">
          <InfoCircleOutlined style={infoIconStyles} />
        </Tooltip>
        <Switch
          style={{ marginLeft: 30, marginTop: 1 }}
          size="small"
          checked={settingsState?.include_links}
          onChange={(value) => {
            setSettingsState({
              ...(settingsState as SettingsResponse),
              include_links: value,
            });
          }}
        />
      </Row>

      <AppButton
        type="primary"
        icon={<SaveOutlined />}
        className="mt-sm"
        onClick={handleSaveSettings}
        loading={isLoading}
      >
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
