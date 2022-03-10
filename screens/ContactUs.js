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

const ContactUs = (props) => {
  return (
    <SafeAreaView style={styles.page}>
      <Text>ContactUs</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default ContactUs;
