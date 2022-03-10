import React from "react";
import { connect } from "react-redux";
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

function mapStateToProps(state) {
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
  };
}

const UpdatePassword = (props) => {
  const [mobile, setMobile] = React.useState(props.CURRENT_LOGIN?.user?.mobile);
  const [password, setPassword] = React.useState("");
  const [showPasswordState, setShowPasswordState] = React.useState(false);

  const { prevPage } = props.route.params;

  const handleUpdatePasswordToken = (mobile, password) => {
    var AuthenticateParams = {};
    var RegisterOTPParams = {};

    if (mobile !== "" && password !== "") {

      AuthenticateParams["mobile"] = mobile;
      AuthenticateParams["password"] = password;

      RegisterOTPParams["mobile"] = mobile;
      RegisterOTPParams["type"] = 1;

      axios
        .post(requests.Authenticate, AuthenticateParams)
        .then((res) => {
          axios
            .post(requests.RegisterOTP, RegisterOTPParams)
            .then((res) => {
              props.navigation.navigate("UpdatePasswordToken", {
                mobile,
                password,
              });
            })
            .catch((error) => {
              if (error.response?.data?.includes("MobileNotRegistered")) {
                showMessage({
                  message: titles.Error,
                  description: titles.MobileIncorrect,
                  type: "danger",
                });
              } else if (error.response?.data?.includes("AlreadyExistOTP")) {
                props.navigation.navigate("UpdatePasswordToken", {
                  mobile,
                  password,
                });
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
        })
        .catch((error) => {
          // console.log(error);
          if (error.response?.data?.includes("UserOrPasswordInvalid")) {
            showMessage({
              message: titles.Error,
              description: titles.UserOrPasswordInvalid,
              type: "danger",
            });
          } else {
            showMessage({
              message: titles.Error,
              description: titles.UnknownErorr,
              type: "danger",
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
            color: "#6C51B1",
            ...FONTS.h3,
            textAlign: "right",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          تغییر کلمه عبور
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
              value={props.CURRENT_LOGIN?.user?.mobile}
              editable={false}
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
                name={showPasswordState === false ? "eye-slash" : "eye"}
                type={Icons.FontAwesome}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              secureTextEntry={!showPasswordState}
              style={styles.searchInput}
              placeholder={titles.CurrentPassword}
              onChange={(e) => setPassword(e.target.value)}
            ></TextInput>
          </View>
          {/* End TextBox Pass */}
        </View>

        <View style={styles.fieldContainer}>
          <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={(e) => {
              handleUpdatePasswordToken(mobile, password);
            }}
            color="#6C51B1"
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

export default connect(mapStateToProps)(UpdatePassword);
