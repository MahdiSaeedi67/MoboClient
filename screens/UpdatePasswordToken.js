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
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { images, COLORS, FONTS, SIZES } from "../constants";
import { showMessage, hideMessage } from "react-native-flash-message";
import titles from "../constants/titles";
import Button from "../components/Button";
import axios from "../components/axios";
import requests from "../constants/requests";
import Icon, { Icons } from "../components/Icons";

function setCurrentLogin(currentLogin) {
  console.log("setCurrentLogin", currentLogin);
  return {
    type: "SET_CURRENT_LOGIN",
    currentLogin: currentLogin,
  };
}

function mapStateToProps(state) {
  console.log("mapStateToProps", state);
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
  };
}

const mapDispatchToProps = {
  setCurrentLogin,
};

const UpdatePasswordToken = (props) => {
  const [token, setToken] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPassword2, setNewPassword2] = React.useState("");
  const [showPasswordState, setShowPasswordState] = React.useState(false);
  const [showPasswordState2, setShowPasswordState2] = React.useState(false);

  const { mobile } = props.route.params;
  const { password } = props.route.params;

  const handleUpdatePassword = () => {
    var params = {};

    if (
      mobile !== "" &&
      password !== "" &&
      token !== "" &&
      newPassword !== "" &&
      newPassword2 !== "" &&
      newPassword === newPassword2
    ) {
      params["mobile"] = mobile;
      params["password"] = newPassword;
      params["otp"] = parseInt(token);

      axios
        .post(requests.UpdatePassword, params)
        .then((res) => {
          //props.setCurrentLogin(res.data);
          props.navigation.navigate("Home");
        })
        .catch((error) => {
          // console.log(error);
          if (error.response?.data?.includes("MobileIncorrect")) {
            showMessage({
              message: titles.Error,
              description: titles.MobileIncorrect,
              type: "danger",
            });
          } else if (error.response?.data?.includes("InvalidToken")) {
            showMessage({
              message: titles.Error,
              description: titles.OTPIsInvalid,
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
      if (token === "") {
        showMessage({
          message: titles.Error,
          description: titles.OTPIsRequired,
          type: "danger",
        });
      } else if (mobile === "") {
        showMessage({
          message: titles.Error,
          description: titles.MobileIsRequired,
          type: "danger",
        });
      } else if (newPassword === "") {
        showMessage({
          message: titles.Error,
          description: titles.PasswordIsRequired,
          type: "danger",
        });
      } else if (newPassword2 === "") {
        showMessage({
          message: titles.Error,
          description: titles.PasswordAgainIsRequired,
          type: "danger",
        });
      } else if (newPassword !== newPassword2) {
        showMessage({
          message: titles.Error,
          description: titles.PasswordsIsNotSame,
          type: "danger",
        });
      } else {
        showMessage({
          message: titles.Error,
          description: titles.UnknownErorr,
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
          ثبت کلمه عبور جدید
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
              placeholder={titles.Token}
              onChange={(e) => setToken(e.target.value)}
            ></TextInput>
          </View>
        </View>
        {/* TextBox Pass */}
        <View style={styles.fieldContainer}>
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
              placeholder={titles.NewPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></TextInput>
          </View>
        </View>
        {/* End TextBox Pass */}
        {/* TextBox Pass2 */}
        <View style={styles.fieldContainer}>
          <View style={[styles.searchContainer]}>
            <View
              style={[
                styles.searchButton,
                {
                  // transform: [{ translateX }],
                },
              ]}
              onTouchStart={() => setShowPasswordState2(true)}
              onTouchEnd={() => setShowPasswordState2(false)}
            >
              <Icon
                name={showPasswordState2 === false ? "eye-slash" : "eye"}
                type={Icons.FontAwesome}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              secureTextEntry={!showPasswordState2}
              style={styles.searchInput}
              placeholder={titles.PasswordAgain}
              onChange={(e) => setNewPassword2(e.target.value)}
            ></TextInput>
          </View>
        </View>
        {/* End TextBox Pass */}

        <View style={styles.fieldContainer}>
          <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={() => {
              handleUpdatePassword();
            }}
            color="#FFC561"
          >
            <Text style={{ ...FONTS.h3 }}>ثبت</Text>
          </Button>
        </View>
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
    ...FONTS.h4,
  },
  textInput: {
    height: 42,
    FONTS: FONTS,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePasswordToken);
