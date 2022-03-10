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
import Button from "../components/Button";
import axios from "../components/axios";
import requests from "../constants/requests";
import Icon, { Icons } from "../components/Icons";

const Register = ({ route, navigation }) => {
  const [mobile, setMobile] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPasswordState, setShowPasswordState] = React.useState(false);  

  const { prevPage } = route.params;

  const handleRegisterToken = (mobile, password) => {
    var params = {};

    if (mobile !== "" && password !== "") {
      params["mobile"] = mobile;
      params["type"] = 0;

      axios
        .post(requests.RegisterOTP, params)
        .then((res) => {
          navigation.navigate("Token", { mobile, password });
        })
        .catch((error) => {
          if (error.response?.data?.includes("MobileRegistered")) {
            showMessage({
              message: titles.Error,
              description: titles.MobileRegisteredError,
              type: "danger",
            });
          } else if (error.response?.data?.includes("AlreadyExistOTP")) {
            navigation.navigate("Token", { mobile, password });
            showMessage({
              message: titles.Info,
              description: titles.AlreadyExistOTPError,
              type: "info",
              duration: 3000,
            });
          } else {
            showMessage({
              message: titles.Error,
              description: titles.UnknownErorr,
              type: "info",
              duration: 3000,
            });
            console.log(error);
          }
        });
    } else {
      if (mobile === "") {
        showMessage({
          message: titles.Error,
          description: titles.MobileIsRequired,
          type: "danger",
        });
      } else {
        showMessage({
          message: titles.Error,
          description: titles.PasswordIsRequired,
          type: "danger",
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 0.48, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={images.onboardingImage}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </View>
      <View
        style={{
          flex: 0.52,
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#FFC561",
            ...FONTS.h3,
            textAlign: "right",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ثبت نام
        </Text>
        <View style={styles.fieldContainer}>
          {/* TextBox Mobile */}
          <View style={[styles.searchContainer]}>
            <View
              style={[
                styles.searchButton,
                {
                  // transform: [{ translateX }],
                },
              ]}
              onClick={() => search(searchText)}
            >
              <Icon
                name="mobile-phone"
                type={Icons.FontAwesome}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder={titles.Mobile}
              onChange={(e) => setMobile(e.target.value)}
            ></TextInput>
          </View>
          {/* End TextBox Mobile */}
        </View>
        <View style={styles.fieldContainer}>
          {/* TextBox Pass */}
          <View style={[styles.searchContainer]}>
            <View
              style={[
                styles.searchButton,
                {
                  // transform: [{ translateX }],
                },
              ]}
              onTouchStart={() => setShowPasswordState(true)}
              onTouchEnd={() => setShowPasswordState(false)}
            >
              <Icon
                name={showPasswordState===false?"eye-slash":"eye"} 
                type={Icons.FontAwesome}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              secureTextEntry={!showPasswordState}
              style={styles.searchInput}
              placeholder={titles.Password}
              onChange={(e) => setPassword(e.target.value)}
            ></TextInput>
          </View>
          {/* End TextBox Pass */}
        </View>
        <View style={styles.fieldContainer}>
          <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={(e) => {
              handleRegisterToken(mobile, password);
            }}
            color="#FFC561"
          >
            <Text style={{ ...FONTS.h3 }}>ارسال کد یکبار مصرف</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
    // <SafeAreaView style={styles.container}>
    //   <View
    //     style={{
    //       display: "flex",
    //       textAlign: "center",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <View style={styles.fieldContainer}>
    //       <Text style={styles.displayText}>{titles.Mobile}</Text>
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder={titles.MobileSample}
    //       ></TextInput>
    //     </View>

    //     <Button
    //       onClick={() => {
    //         navigation.navigate('Token',prevPage);
    //       }}
    //     >
    //       ارسال کد یکبار مصرف
    //     </Button>
    //   </View>
    // </SafeAreaView>
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
    ...FONTS.h4,
  },
  textInput: {
    height: 42,
    ...FONTS.h3,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.Pastel_Gray_Transparent,
    fontFamily: "Vazir",
    textAlign: "right",
    padding: 10,
  },
  fieldContainer: {
    display: "flex",
    width: "80%",
    margin: "3%",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor: COLORS.lightGray,
  },
  searchInput: {
    flex: 0.9,
    height: 35,
    ...FONTS.h3,
    textAlign: "right",
    padding: 5,
    color: COLORS.veryDarkGray,
    textDecorationColor: "white",
  },
  searchButton: {
    flex: 0.1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
