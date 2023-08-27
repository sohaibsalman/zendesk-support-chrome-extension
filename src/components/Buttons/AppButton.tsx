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
  else if (colorType === colorTypes.gray) color = colors.grayed;
  else if (colorType === colorTypes.green) color = colors.green;
  else if (colorType === colorTypes.blue) color = colors.blue;
  else if (props.disabled) color = colors.disabled;

  const theme: ThemeConfig = {
    components: {
      Button: {
        colorPrimary: color.default,
        colorBorder: color.default,
        colorPrimaryHover: color.hover,
        colorPrimaryActive: color.pressed,
        colorText: color.default,
        controlHeight: 40,
      },
    },
  };

  return (
    <>
      <ConfigProvider theme={theme}>
        <Button
          {...props}
          style={{
            ...props.style,
            color: textColor,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
          }}
        >
          {props.children}
        </Button>
      </ConfigProvider>
    </>
  );
}

export default AppButton;
