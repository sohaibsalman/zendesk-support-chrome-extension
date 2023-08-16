import { useEffect, useState } from "react";
import { ConfigProvider } from "antd";

import OnboardingPage from "./pages/Onboarding";
import { customTheme } from "./constants/theme";
import Dashboard from "./Dashboard";
import { appConstants } from "./constants/appContants";
import { getAccessToken } from "./services/storage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const authenticateUser = async () => {
    const accessToken = await getAccessToken();
    if (accessToken) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  const handleLogin = () => {
    chrome.tabs.create({
      url: appConstants.webAppUrl,
    });
  };

  return (
    <div className="main">
      <ConfigProvider theme={customTheme}>
        {isLoggedIn ? <Dashboard /> : <OnboardingPage onLogin={handleLogin} />}
      </ConfigProvider>
    </div>
  );
}

export default App;
