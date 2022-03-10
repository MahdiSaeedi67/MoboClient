import React from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { COLORS, FONTS } from "../constants";

const WIDTH = Dimensions.get("window").width;

const Regulation = (props) => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>Regulation</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default Regulation;
