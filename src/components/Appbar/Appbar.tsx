import { Col, Row } from "antd";
import { GiftOutlined } from "@ant-design/icons";

import AppButton from "../Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";

function Appbar() {
  return (
    <div className="appbar" style={{ padding: "10px 20px" }}>
      <Row>
        <Col span={16} style={{ alignSelf: "center" }}>
          <img
            src="./assets/images/logo-inline.svg"
            alt="right-page-logo"
            style={{ width: 150 }}
          />
        </Col>
        <Col span={8}>
          <AppButton
            type="primary"
            icon={<GiftOutlined />}
            textColor={colors.gray[900]}
            colorType={colorTypes.yellow}
          >
            Earn points
          </AppButton>
        </Col>
      </Row>
    </div>
  );
}

export default Appbar;
