import { Col, Row } from "antd";
import { GiftOutlined } from "@ant-design/icons";

import AppButton from "../Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";

function Appbar() {
  return (
    <div className="appbar" style={{ padding: "15px 0px 15px 30px" }}>
      <Row>
        <div style={{ flexGrow: 1, alignSelf: "center" }}>
          <img
            src="./assets/images/logo-inline.svg"
            alt="right-page-logo"
            style={{ width: 150 }}
          />
        </div>
        <AppButton
          type="primary"
          icon={<GiftOutlined />}
          textColor={colors.gray[900]}
          colorType={colorTypes.yellow}
        >
          Earn points
        </AppButton>
      </Row>
    </div>
  );
}

export default Appbar;
