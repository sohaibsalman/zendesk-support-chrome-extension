import { Button, ButtonProps, ConfigProvider, ThemeConfig } from "antd";
import { colorTypes, colors } from "../../constants/colors";

interface Props extends ButtonProps {
  colorType?: colorTypes;
  textColor?: string;
}

function AppButton(props: Props) {
  const { colorType, textColor } = props;
  let color = colors.purple;

  if (colorType === colorTypes.purple) color = colors.purple;
  else if (colorType === colorTypes.yellow) color = colors.yellow;

  const theme: ThemeConfig = {
    components: {
      Button: {
        colorPrimary: color.default,
        colorBorder: color.default,
        colorPrimaryHover: color.hover,
        colorPrimaryActive: color.pressed,
        controlHeight: 40,
      },
    },
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <Button {...props} style={{ color: textColor }}>
          {props.children}
        </Button>
      </ConfigProvider>
    </>
  );
}

export default AppButton;
