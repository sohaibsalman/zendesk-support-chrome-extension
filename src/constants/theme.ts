import { ThemeConfig } from "antd";
import { colors } from "./colors";

const customTheme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: colors.purple.default,
      colorBorder: colors.purple.default,
      colorText: colors.purple.default,
      colorPrimaryHover: colors.purple.hover,
      colorPrimaryActive: colors.purple.pressed,
      controlHeight: 40,
    },
    Tabs: {
      colorPrimary: colors.purple.default,
      colorBorder: colors.purple.default,
      colorPrimaryHover: colors.purple.hover,
      colorPrimaryActive: colors.purple.pressed,
    },
  },
};

export { customTheme };
