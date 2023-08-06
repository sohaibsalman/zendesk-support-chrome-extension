import { Button } from "antd";
import Title from "antd/es/typography/Title";

import { colors } from "../constants/colors";

interface Props {
  onLogin: () => void;
}

function OnboardingPage({ onLogin }: Props) {
  return (
    <div className="d-flex flex-direction-col align-items-center">
      <img
        src="./assets/images/logo.svg"
        alt="right-page-logo"
        style={{ width: 300 }}
      />
      <Title level={4} style={{ color: colors.gray[500], marginTop: 5 }}>
        draft response auto-generator
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
