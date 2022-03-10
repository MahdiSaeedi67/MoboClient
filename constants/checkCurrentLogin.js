import * as Fonts from "expo-font";

const useFonts = async () =>
  await Fonts.loadAsync({
    vazir: require("../assets/fonts/Vazir-FD.ttf"),
  });

export default useFonts;
