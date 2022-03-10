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
import { LinearGradient } from "expo-linear-gradient";
import { Flow } from "react-native-animated-spinkit";
import titles from "../constants/titles";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import Icon, { Icons } from "../components/Icons";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "../components/axios";
import requests from "../constants/requests";
import findcity from "../assets/images/megaphone.png";
import { BsImage } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdCreate } from "react-icons/io";
import Button from "../components/Button";
import { IoPower,IoLogIn } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { IoTicketOutline } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const numColumns = 4;
const WIDTH = Dimensions.get("window").width;

const formatData = (dataList, numColumns) => {
  const totalRows = Math.floor((dataList.length + 1) / numColumns);
  let totalLastRow = dataList.length - totalRows * numColumns;

  //  dataList.push({ id: "back", empty: false });

  while (totalLastRow !== 0 && totalLastRow != numColumns) {
    dataList.push({ id: "blank", empty: true });
    totalLastRow++;
  }
  return dataList;
};

function logout() {
  return {
    type: "LOGOUT",
    currentLogin: null,
  };
}
function mapStateToProps(state) {
  console.log("Account mapStateToProps", state);
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
    NAME:state.NAME,
    FAMILY:state.FAMILY
  };
}

const mapDispatchToProps = {
  logout,
};

const Account = (props) => {
  const [editable, setEditable] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [translateY] = useState(new Animated.Value(120));

  useEffect(() => {}, []);

  function renderCategoryItem(item, index) {
    return (
      <Animatable.View
        style={{
          flex: 1,

          alignItems: "center",
          alignContent: "center",
          margin: 5,
        }}
        animation="bounceInLeft"
        duration={1000}
        delay={index * 30}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginHorizontal: 1,
            borderRadius: 8,
            height: 100,
            width: SIZES.width * 0.35,
            overflow: "hidden",

            backgroundColor: (item.color)?item.color:COLORS.randomColor(),
          }}
          onPress={() => {
            item.onClick();
            //props.navigation.navigate("Category");
          }}
        >
          <View
            style={{
              flex: 0.6,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {item.icon}
          </View>
          <Text
            style={{
              flex: 0.4,
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }

  const items = [
    {
      id: 1,
      title: "نوبت های من",
      color:"#81CFF3",
      onClick: () => {
        props.navigation.navigate("Appointment");
      },
      icon: <IoTicketOutline color={COLORS.white} size={30}></IoTicketOutline>,
    },    
    {
      id: 2,
      title: "تکمیل اطلاعات",
      color:"#C1A9F6",
      onClick: () => {
        props.navigation.navigate("Profile");
      },
      icon: <ImProfile color={COLORS.white} size={30}></ImProfile>,
    },
    {
      id: 3,
      title: "خروج از حساب",
      color:COLORS.fiery_Rose,
      onClick: () => {
        props.logout();
      },
      icon: <IoPower color={COLORS.white} size={30}></IoPower>,
    },   
    {
      id: 4,
      title: "تغییر رمز",
      color:"#FFC561",
      onClick: () => {
        props.navigation.navigate("UpdatePassword", { prevPage: Account });
      },
      icon: <MdPassword color={COLORS.white} size={30}></MdPassword>,
    },
   
  ];

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        {/* Title */}

        <View style={styles.title}>
          <Text
            style={{
              color: COLORS.purple_dark,
              ...FONTS.h3,
            }}
          >
            {"حساب کاربری"}
          </Text>
        </View>
        {/* End Title */}
      </View>
      <View style={styles.container}>
        {props.CURRENT_LOGIN?.user ? (
          <>
            <View style={styles.profileImageContainer}>
              <Icon
                name="person"
                type={Icons.Ionicons}
                size={80}
                color={COLORS.lightGray}
              />
            </View>
            <Text style={{ color: "#6C51B1", ...FONTS.h2 }}>
              {props.CURRENT_LOGIN?.user?.mobile}
            </Text>
            <Text style={{ color: COLORS.veryDarkGray, ...FONTS.h3 }}>
              {props.NAME?props.NAME:null} 
                {" "} 
              {props.FAMILY?props.FAMILY:null}
            </Text>

            <FlatList
              style={styles.margin_auto}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              data={items}
              ListEmptyComponent={
                <View style={{ alignSelf: "center" }}>
                  <Flow size={48} color={COLORS.medium_Turquoise} />
                </View>
              }
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item, index }) => renderCategoryItem(item, index)}
            />
          </>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              width: "100%",
              // justifyContent: "center",
              //alignItems: "center",
              //alignContent: "center",
            }}
          >
            <View
              style={{
                flex: 0.5,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Image
                source={images.homeBanner}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 0.5,
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  margin: 5,
                  marginLeft: 20,
                  height: 110,
                  width: 120,
                  borderRadius: 8,
                }}
                onClick={() => {
                  props.navigation.navigate("Login", { prevPage: Account });
                }}
                color="#81CFF3"
              >
                <View style={{ alignItems: "center" }}>
                  <IoLogIn
                    style={{ marginBottom: 5 }}
                    color={COLORS.white}
                    size={30}
                  ></IoLogIn>
                  <Text style={{ ...FONTS.h3 }}>ورود به حساب</Text>
                </View>
              </Button>
              <Button
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  margin: 5,
                  marginRight: 20,
                  height: 110,
                  width: 120,
                  borderRadius: 8,
                }}
                onClick={() => {
                  props.navigation.navigate("Register", { prevPage: Account });
                }}
                color="#FFC561"
              >
                <View style={{ alignItems: "center" }}>
                  <FaUserPlus
                    style={{ marginBottom: 5 }}
                    color={COLORS.white}
                    size={30}
                  ></FaUserPlus>
                  <Text style={{ ...FONTS.h3 }}>ایجاد حساب</Text>
                </View>
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>

 
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: 40,
    backgroundColor: COLORS.white,
  },
  title: {
    width: "100%",
    paddingRight: "15%",
    paddingLeft: "15%",
    margin: 15,
    textAlign: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemInvisible: {
    backgroundColor: "transaparent",
  },
  emptyComponent: {
    alignSelf: "center",
  },
  profileImageContainer: {
    padding: 10,
    borderWidth: 3,
    borderRadius: 600,
    marginBottom: 10,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
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
  menu: {
    flex: 1,
    backgroundColor: "green",
  },
  menuItem: {
    backgroundColor: "red",
    margin: 5,
    borderRadius: 5,
    width: 100,
    height: 100,
  },
  margin_auto: {
    marginHorizontal: "auto",
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
