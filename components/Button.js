import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
const { width, height } = Dimensions.get("screen");

const bgs = ["#A5BBFF", "#DDBEFE", "#FF63ED", "#B98EFF"];

export default function Button(props) {
  return (
    // <View style={styles.container}>
    <TouchableOpacity
      style={{ width: "100%", height: 40, marginTop: 5, ...props.style }}
      onPress={props.onClick}
    >
      <LinearGradient
        style={[
          {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 4,
            ...props.style,
          },
        ]}
        colors={[
          props.color ? props.color : COLORS.persian_Green,
          props.color ? props.color : COLORS.persian_Green,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h5, padding: 5 }}>
          {props.children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
});
