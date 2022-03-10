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
import { IoPower, IoLogIn } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { IoTicketOutline } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";

const numColumns = 1;
const WIDTH = Dimensions.get("window").width;

const formatData = (dataList, numColumns) => {
  const totalRows = Math.floor((dataList.length + 1) / numColumns);
  let totalLastRow = dataList.length - totalRows * numColumns;

  while (totalLastRow !== 0 && totalLastRow != numColumns) {
    dataList.push({ id: "blank", empty: true });
    totalLastRow++;
  }
  return dataList;
};

function mapStateToProps(state) {
  console.log("Account mapStateToProps", state);
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
  };
}

const mapDispatchToProps = {};

function renderAppointmentItem(item, index) {
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
          marginHorizontal: 3,
          borderRadius: 8,
          height: 100,
          width: "100%",
          overflow: "hidden",

          backgroundColor: COLORS.coral,
        }}
        onPress={() => {
          item.onClick();
          //props.navigation.navigate("Category");
        }}
      >
       
        {/* <View
          style={{
            flex: 0.6,
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {item.expertName}
        </View> */}
        <Text
          style={{
            flex: 0.4,
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {item.expertName}
        </Text>
        <Text
          style={{
            flex: 0.4,
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {item.expertiseTitle}
        </Text>
        <Text
          style={{
            flex: 0.4,
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {item.appointmentTypeTitle}
        </Text>        
        <Text
          style={{
            flex: 0.4,
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {item.shamsiDate}
        </Text>          
        <Text
          style={{
            flex: 0.4,
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {item.formatedTime}
        </Text>          
      </TouchableOpacity>
    </Animatable.View>
  );
}

const Appointment = (props) => {
  const [Appointments, setAppointments] = React.useState([]);
  const [translateY] = useState(new Animated.Value(120));

  useEffect(() => {
    var params = {};
    params["customerId"] = props.CURRENT_LOGIN.user.id;
    axios.post(requests.GetAppointmentByCustomerId, params).then((res) => {
      setAppointments(res.data);
    });
  }, []);

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
            {"نوبت های من"}
          </Text>
        </View>
        {/* End Title */}
      </View>
      <View style={styles.container}>
        <FlatList
          style={(styles.margin_auto, { width: "100%" })}
          showsHorizontalScrollIndicator={false}
          data={Appointments}
          ListEmptyComponent={
            <View style={{ alignSelf: "center" }}>
              <Flow size={48} color={COLORS.medium_Turquoise} />
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderAppointmentItem(item, index)}
        />
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
    width: "100%",
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

export default connect(mapStateToProps, mapDispatchToProps)(Appointment);
