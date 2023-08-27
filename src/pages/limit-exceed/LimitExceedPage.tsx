import { ArrowLeftOutlined, UnlockOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import AppButton from "../../components/Buttons/AppButton";
import { colorTypes, colors } from "../../constants/colors";
import { appConstants } from "../../constants/appContants";

interface Props {
  onReturn: () => void;
}

export function LimitExceedPage({ onReturn }: Props) {
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
      <div
        className="d-flex flex-direction-col align-items-center"
        style={{ width: "79%", margin: "0 auto", paddingTop: 20 }}
      >
        <img
          src="./assets/images/limit.svg"
          alt="limit-exceed-image"
          style={{ width: 250 }}
        />
        <Typography className="mt-md">
          You’ve ran out of draft generations. Share RightPage with a colleague
          to unlock <strong>50 additional generations.</strong>
        </Typography>
        <AppButton
          icon={<UnlockOutlined />}
          className="mt-md"
          type="primary"
          colorType={colorTypes.yellow}
          textColor={colors.gray[900]}
          onClick={() => {
            chrome.tabs.create({
              url: appConstants.webAppUrl,
            });
          }}
        >
          Unlock more drafts
        </AppButton>
      </div>
    </>
  );
}
