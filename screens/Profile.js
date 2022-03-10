import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Dimensions,
  ImageBackground,
  
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Flow } from "react-native-animated-spinkit";
import titles from "../constants/titles";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import Icon, { Icons } from "../components/Icons";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "../components/axios";
import requests from "../constants/requests";
import Button from "../components/Button";
import { showMessage, hideMessage } from "react-native-flash-message";

function mapStateToProps(state) {
  console.log("Account mapStateToProps", state);
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
    NAME:state.NAME,
    FAMILY:state.FAMILY
  };
}

function setCurrentLogin(currentLogin) {
  return {
    type: "SET_CURRENT_LOGIN",
    currentLogin: currentLogin,
  };
}

function setUserInformation(name,family) {
  return {
    type: "SET_USER_INFORMATION",
    name: name,
    family: family
  };
}


const mapDispatchToProps = {
  setCurrentLogin,
  setUserInformation,
};


const Profile = (props) => {
  const [editable, setEditable] = React.useState(false);
  const [name, setName] = React.useState("");
  const [nameChanged, setNameChanged] = React.useState(false);
  const [family, setFamily] = React.useState("");
  const [familyChanged, setFamilyChanged] = React.useState(false);
  const [translateY] = useState(new Animated.Value(120));

  useEffect(() => {}, []);

  const handleSubmitClick = () => {
    var params = {};

    //if (name !== "" && family !== "") {
      params["userId"] = props.CURRENT_LOGIN.user.id;
      params["name"] = nameChanged==true ? name :props.NAME;
      params["family"] = familyChanged==true ? family :props.FAMILY;

      axios
        .post(requests.UpdateUserInformation, params)
        .then((res) => {
          setEditable(!editable);

          
          let currentLogin=props.CURRENT_LOGIN;
          currentLogin.user.name=nameChanged==true ? name :props.NAME;
          currentLogin.user.family=familyChanged==true ? family :props.FAMILY;
          props.setCurrentLogin(currentLogin);
          props.setUserInformation(nameChanged==true ? name :props.NAME,familyChanged==true ? family :props.FAMILY)

        })
        .catch((error) => {
          if (error.response?.data?.includes("MobileRegistered")) {
            showMessage({
              message: titles.Error,
              description: titles.MobileRegisteredError,
              type: "danger",
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
    //} else {
     // if (name === "") {
        // showMessage({
        //   message: titles.Error,
        //   description: titles.NameIsRequired,
        //   type: "danger",
        // });
      // } else if (family === "") {
      //   showMessage({
      //     message: titles.Error,
      //     description: titles.FamilyIsRequired,
      //     type: "danger",
      //   });
      // } else {
      //   showMessage({
      //     message: titles.Error,
      //     description: titles.UnknownErorr,
      //     type: "danger",
      //   });
      // }
    //}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{ flex: 0.48, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          source={images.homeBanner}
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
          تکمیل اطلاعات
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
              onClick={() => {}}
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
              onChange={(e) => {}}
              editable={false}
              value={props.CURRENT_LOGIN?.user?.mobile}
            ></TextInput>
          </View>
          {/* End TextBox Mobile */}
        </View>
        <View style={styles.fieldContainer}>
          {/* TextBox Name */}
          <View style={[styles.searchContainer]}>
            <View
              style={[
                styles.searchButton,
                {
                  // transform: [{ translateX }],
                },
              ]}
              onClick={() => {}}
            >
              <Icon
                name="signature-text"
                type={Icons.MaterialCommunityIcons}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder={"نام"}
              onChange={(e) => {
                setName(e.target.value);
                setNameChanged(true);
              }}
              editable={editable}
              defaultValue={props.CURRENT_LOGIN?.user?.name}
            ></TextInput>
          </View>
          {/* End TextBox Name */}
        </View>
        <View style={styles.fieldContainer}>
          {/* TextBox Family */}
          <View style={[styles.searchContainer]}>
            <View
              style={[
                styles.searchButton,
                {
                  // transform: [{ translateX }],
                },
              ]}
              onClick={() => {}}
            >
              <Icon
                name="signature-text"
                type={Icons.MaterialCommunityIcons}
                size={25}
                color="#6C51B1"
              />
            </View>

            <TextInput
              style={styles.searchInput}
              placeholder={"نام خانوادگی"}
              onChange={(e) => {
                setFamily(e.target.value);
                setFamilyChanged(true);
              }}
              editable={editable}
              defaultValue={props.CURRENT_LOGIN?.user?.family}
            ></TextInput>
          </View>
        </View>
        {/* End TextBox Family */}
        <View style={styles.fieldContainer}>
          <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={() => {
              if (editable) handleSubmitClick();
              else 
             setEditable(!editable);
            }}
            color={!editable ? "#6C51B1" : "#FFC561"}
          >
            <Text style={{ ...FONTS.h3 }}>
              {" "}
              {!editable ? "اصلاح" : "ثبت تغییرات"}
            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
