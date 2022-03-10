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
  return {
    type: "SET_CURRENT_LOGIN",
    currentLogin: currentLogin,
  };
}

function mapStateToProps(state) {
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
  };
}

const mapDispatchToProps = {
  setCurrentLogin,
};

const Login = (props) => {
  const [password, setPassword] = React.useState(null);
  const [mobile, setMobile] = React.useState(null);
  const [showPasswordState, setShowPasswordState] = React.useState(false);
  // Render
  const { prevPage } = props.route.params;

  const handleLogin = () => {
    var params = {};

    if (mobile !== "" && password !== "") {
      params["mobile"] = mobile;
      params["password"] = password;

      axios
        .post(requests.Authenticate, params)
        .then((res) => {
          props.setCurrentLogin(res.data);
          props.navigation.navigate("Home");

          // axios
          //   .post(requests.RegisterOTP, (params = { mobile: mobile, type: 1 }))
          //   .then((res) => {
          //     props.navigation.navigate("Home");
          //   });
        })
        .catch((error) => {
          // console.log(error);
          if (error.response?.data?.includes("MobileBeforRegisterd")) {
            showMessage({
              message: titles.Error,
              description: titles.MobileRegisteredError,
              type: "danger",
            });
          } else if (error.response?.data?.includes("OTPIsInvalid")) {
            showMessage({
              message: titles.Error,
              description: titles.OTPIsInvalid,
              type: "danger",
            });
          } else if (error.response?.data?.includes("UserORPasswordInvalid")) {
            showMessage({
              message: titles.Error,
              description: titles.UserOrPaswordInvalid,
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
          //justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#81CFF3",
            ...FONTS.h3,
            textAlign: "right",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ورود به حساب
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
            onClick={() => {
              handleLogin();
            }}
            color="#81CFF3"
          >
            <Text style={{ ...FONTS.h3 }}>ورود</Text>
          </Button>
        </View>
        <View style={styles.fieldContainer}>
          <TouchableOpacity
            style={{
              marginVertical: 2,
            }}
            onPress={() => {}}
          >
            <Text
              style={{
                ...FONTS.body4,
                textAlign: "right",
                cursor: "pointer",
                color: "#6C51B1",
              }}
            >
              کلمه عبور خود را فراموش کرده ام
            </Text>
          </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
