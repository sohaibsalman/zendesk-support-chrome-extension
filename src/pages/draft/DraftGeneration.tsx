import { ArrowLeftOutlined } from "@ant-design/icons";
import AppButton from "../../components/Buttons/AppButton";
import { colorTypes } from "../../constants/colors";

interface Props {
  onReturn: () => void;
}

export default function DraftGeneration({ onReturn }: Props) {
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
    </>
  );
}
