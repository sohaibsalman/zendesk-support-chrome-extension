import { ConfigProvider } from "antd";
import OnboardingPage from "./pages/Onboarding";
import { customTheme } from "./constants/theme";

function App() {
  return (
    <div className="main">
      <ConfigProvider theme={customTheme}>
        <OnboardingPage />
      </ConfigProvider>
    </div>
  );
}

export default App;
