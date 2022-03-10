import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#5390ff", // Blue
  secondary: "#cacfd9", // Gray

  // colors
  black: "#1E1F20",
  lightGray: "#ebedf0",
  gray: "#8b9097",
  transparentGray: "#8b909799",
  glass: "rgba(128,128,128,0.40)",
  glassDark: "rgba(128,128,128,0.60)",
  dark: "#393A3C",
  Pastel_Gray_Transparent: "#D8D8D8CC",
  white: "#FFFFFF",
  White_Transparent: "#FFFFFFAA",
  Crystal: "#A7DBD8",
  Crystal_Transparent: "#A7DBD8AA",
  Moonstone_Blue: "#7CBFBF",
  Moonstone_Blue_Transparent: "#7CBFBF66",
  Rackley: "#5588A6",
  Rackley_Shadow: "#5588A622",
  Anti_Flash_White: "#F2F3F4",
  Blue: "#82CEFA",
  darkGray: "#a9a9a9",
  veryDarkGray:"#2a2a2a",
  fiery_Rose: "#F9546B",
  coral: "#FC7651",
  naples_Yellow: "#FFDB60",
  medium_Turquoise: "#42CFCA",
  persian_Green: "#009F93",
  my_green: "#77C66E",
  my_red: "#df2741",
  yellow:"#FFC561",
  purple_light:"#C1A9F6",
  purple_dark:"#6C51B1",
  blue_light:"#81CFF3",

  
  //16777215
  randomColor: ( () => {
    const newColor = Math.floor(Math.random() * 8998875)
      .toString(16)
      .padStart(6, "0");
    return `#${newColor}`;
  }),
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 18,
  h3: 16,
  h4: 14,
  h5: 13,
  h6: 11,
  body1: 30,
  body2: 18,
  body3: 16,
  body4: 14,
  body5: 13,
  body6: 11,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "vazir",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "vazir", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "vazir", fontSize: SIZES.h2, lineHeight: 26 },
  h3: { fontFamily: "vazir", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "vazir", fontSize: SIZES.h4, lineHeight: 22 },
  h5: { fontFamily: "vazir", fontSize: SIZES.h5, lineHeight: 16 },
  h6: { fontFamily: "vazir", fontSize: SIZES.h6, lineHeight: 14 },
  body1: { fontFamily: "vazir", fontSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "vazir", fontSize: SIZES.body2, lineHeight: 26 },
  body3: { fontFamily: "vazir", fontSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "vazir", fontSize: SIZES.body4, lineHeight: 19 },
  body5: { fontFamily: "vazir", fontSize: SIZES.body5, lineHeight: 13 },
  body6: { fontFamily: "vazir", fontSize: SIZES.body6, lineHeight: 11 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
