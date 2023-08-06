import { ThemeConfig } from "antd";
import { colors } from "./colors";

const customTheme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: colors.pruple.default,
      colorBorder: colors.pruple.default,
      colorText: colors.pruple.default,
      colorPrimaryHover: colors.pruple.hover,
      colorPrimaryActive: colors.pruple.pressed,
      controlHeight: 40,
    },
  },
};

export { customTheme };
