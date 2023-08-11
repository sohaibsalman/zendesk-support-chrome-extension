import {
  ArrowLeftOutlined,
  CopyOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Input, Row, Tooltip, Typography } from "antd";
import Icon from "@ant-design/icons";

import AppButton from "../../components/Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";
import SendIcon from "../../icons/send";
import AppLink from "../../components/AppLink/AppLink";
import AppAlert from "../../components/AppAlert/AppAlert";
import ReloadIcon from "../../icons/reload";

interface Props {
  onReturn: () => void;
}

export default function DraftGeneration({ onReturn }: Props) {
  const sendIcon = <Icon component={SendIcon} style={{ width: 15 }} />;

  return (
    <>
      <AppButton
        type="text"
        icon={<ArrowLeftOutlined />}
        colorType={colorTypes.gray}
        onClick={onReturn}
      >
        Return
      </AppButton>
      <Row className="mt-sm">
        <Row className="mb-xs" style={{ flexGrow: 1, alignItems: "center" }}>
          <Typography.Title level={5}>Draf Response</Typography.Title>
          <Tooltip placement="right" title="What is Help Center URL? ">
            <InfoCircleOutlined style={infoIconStyles} />
          </Tooltip>
        </Row>
        <AppButton
          icon={<Icon component={ReloadIcon} />}
          colorType={colorTypes.gray}
          textColor={colors.gray[500]}
          style={{
            padding: "5px 10px",
            height: 30,
            fontSize: 12,
            marginTop: -5,
          }}
        >
          Regenerate
        </AppButton>
      </Row>
      <Row className="mt-sm">
        <Input.TextArea rows={6} style={{ color: colors.gray[400] }} />
      </Row>
      <Row className="mt-sm">
        <AppButton type="primary" colorType={colorTypes.green} icon={sendIcon}>
          Insert Draft
        </AppButton>
        <AppButton
          type="primary"
          colorType={colorTypes.blue}
          icon={<CopyOutlined />}
          style={{ marginLeft: 10 }}
        >
          Copy
        </AppButton>
      </Row>
      <Row
        className="mb-xs mt-md"
        style={{ flexGrow: 1, alignItems: "center" }}
      >
        <Typography.Title level={5}>Top Sources</Typography.Title>
        <Tooltip placement="right" title="What is Help Center URL? ">
          <InfoCircleOutlined style={infoIconStyles} />
        </Tooltip>
      </Row>
      <Row className="mt-sm">
        <AppLink />
        <AppLink />
        <AppLink />
      </Row>
      <Row className="mb-md">
        <AppAlert type="warning">
          <>
            This draft could be 3x better (and generated 10x faster) if your
            team begins using RightPage Pro. Learn more
          </>
        </AppAlert>
      </Row>
    </>
  );
}

const infoIconStyles: React.CSSProperties = {
  fontSize: 15,
  color: colors.gray[500],
  marginLeft: 8,
  marginTop: 0,
};
