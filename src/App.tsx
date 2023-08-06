import { useState } from "react";
import { ConfigProvider } from "antd";

import OnboardingPage from "./pages/Onboarding";
import { customTheme } from "./constants/theme";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
