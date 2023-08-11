import { Button } from "antd";
import Title from "antd/es/typography/Title";

import { colors } from "../constants/colors";

interface Props {
  onLogin: () => void;
}

function OnboardingPage({ onLogin }: Props) {
  return (
    <div
      className="d-flex flex-direction-col align-items-center justify-center"
      style={{ height: "100%", width: "50%", margin: "0 auto" }}
    >
      <img
        src="./assets/images/logo.svg"
        alt="right-page-logo"
        style={{ width: 250 }}
      />
      <Title level={4} style={{ color: colors.gray[500], marginTop: 5 }}>
        for <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span> Chrome
      </Title>
      <div style={{ marginTop: 70 }}>
        <Button type="primary" block style={{ marginBottom: 10 }}>
          Create a new account
        </Button>
        <Button type="default" block onClick={onLogin}>
          Login your account
        </Button>
      </div>
    </div>
  );
}

export default OnboardingPage;
