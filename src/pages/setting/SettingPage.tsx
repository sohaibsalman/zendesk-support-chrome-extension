import { InfoCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Input, Row, Switch, Tooltip, Typography } from "antd";

import { colorTypes, colors } from "../../constants/colors";
import AppButton from "../../components/Buttons/AppButton";

function SettingPage() {
  return (
    <>
      <Row style={{ marginTop: 20 }}>
        <Typography.Title level={5}>Help Center URL</Typography.Title>
        <Tooltip placement="right" title="What is Help Center URL? ">
          <InfoCircleOutlined style={infoIconStyles} />
        </Tooltip>
      </Row>
      <Row>
        <Input size="large" />
      </Row>
      <Row style={{ marginTop: 25 }}>
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
          style={{
            padding: "5px 10px",
            height: 30,
            fontSize: 12,
            marginTop: -8,
          }}
        >
          Reset
        </AppButton>
      </Row>
      <Input.TextArea rows={5} />
      <Row style={{ marginTop: 25 }}>
        <Typography.Title level={5}>Include links in drafts?</Typography.Title>
        <Tooltip placement="right" title="What is Help Center URL? ">
          <InfoCircleOutlined style={infoIconStyles} />
        </Tooltip>
        <Switch style={{ marginLeft: 40 }} />
      </Row>
    </>
  );
}

const infoIconStyles: React.CSSProperties = {
  fontSize: 18,
  color: colors.gray[500],
  marginLeft: 10,
  marginTop: -6,
};

export default SettingPage;
