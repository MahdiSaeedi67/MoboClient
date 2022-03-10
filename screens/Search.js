import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { images, COLORS, FONTS, SIZES } from "../constants";
import { showMessage, hideMessage } from "react-native-flash-message";
import titles from "../constants/titles";

const Search = ({ route,navigation }) => {
  // Render
  const { prevPage } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.displayText}>{titles.Mobile}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={titles.MobileSample}
          ></TextInput>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.displayText}>{titles.Password}</Text>

          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder={titles.Password}
          ></TextInput>
        </View>
        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            // marginHorizontal: SIZES.radius,
          }}
          onPress={() => {
            // if authenticate(canGetAppointmentTime)
            //   navigation.navigate("home", { user: user });
            // else {
            //   showMessage({
            //     message: titles.CanNotLogin,
            //     description: titles.CanNotLoginDescription,
            //     type: "danger",
            //   });
            // }
          }}
        >
          <LinearGradient
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              },
            ]}
            colors={[COLORS.persian_Green, COLORS.persian_Green]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              ورود به حساب
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            marginVertical: 7,
          }}
          onPress={() => {}}
        >
          <Text
            style={{
              color: COLORS.Rackley,
              ...FONTS.h4,
              textAlign: "right",
              cursor: "pointer",
            }}
          >
            کلمه عبور خود را فراموش کرده ام
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "80%",
            height: 50,
            // marginHorizontal: SIZES.radius,
          }}
          onPress={() => {
            navigation.navigate(prevPage);
          }}
        >
          <LinearGradient
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 5,
              },
            ]}
            colors={[COLORS.fiery_Rose, COLORS.fiery_Rose]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>بازگشت</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    textAlign: "center",
  },
  displayText: {
    textAlign: "right",
    color: COLORS.gray,
    ...FONTS.h3,
  },
  textInput: {
    height: 42,
    FONTS: FONTS,
    borderWidth: 2,
    borderColor: COLORS.Pastel_Gray_Transparent,
    borderRadius: 4,

    textAlign: "center",
  },
  fieldContainer: {
    display: "flex",
    width: "80%",
    margin: "3%",
  },
});

export default Search;
