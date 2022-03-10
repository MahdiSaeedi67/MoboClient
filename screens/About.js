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

const About = (props) => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>About</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default About;
