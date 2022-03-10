import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import titles from "../constants/titles";
import axios from "../components/axios";
import requests from "../constants/requests";
import { showMessage, hideMessage } from "react-native-flash-message";

function mapStateToProps(state) {
  return {
    CURRENT_LOGIN: state.CURRENT_LOGIN,
  };
}

// const IconButton = ({ icon }) => {
//   return (
//     <View style={{ alignItems: "center" }}>
//       <TouchableOpacity
//         onPress={() => {
//           console.log("IconButton on pressed");
//         }}
//       >
//         {icon}
//       </TouchableOpacity>
//     </View>
//   );
// };

// const IconLabel = ({ icon, label }) => {
//   return (
//     <View style={{ alignItems: "center" }}>
//       <Image
//         source={icon}
//         resizeMode="cover"
//         style={{
//           width: 50,
//           height: 50,
//         }}
//       />
//       <Text
//         style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}
//       >
//         {label}
//       </Text>
//     </View>
//   );
// };

const PreviewTicket = (props) => {
  // Render
  const { expert, appointment, number } = props.route.params;

  console.log('PreviewTicket',appointment)
  console.log('PreviewTicket',props)

  const setAppointment = (appointmentId, userId) => {
    var params = {};

    params["appointmentId"] = appointmentId;
    params["userId"] = userId;

    axios
      .post(requests.SetAppointment, params)
      .then((res) => {
        props.navigation.navigate("Appointment");
      })
      .catch((error) => {
        console.log("setAppointment",error);
        if (error.response?.data?.includes("AppointmentBeforSet")) {
          showMessage({
            message: titles.Error,
            description: titles.AppointmentBeforSet,
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
  };


  return (
    <SafeAreaView style={styles.page}>
      <View style={[styles.header, { backgroundColor: COLORS.purple_dark }]}>
        {/* Title */}

        <View style={styles.title}>
          <Text
            style={{
              color: COLORS.white,
              backgroundColor: COLORS.purple_dark,
              ...FONTS.h3,
            }}
          >
            {"مشاهده اطلاعات نوبت"}
          </Text>
        </View>
        {/* End Title */}
      </View>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // borderBottomColor:COLORS.purple_light,
            // borderBottomWidth: 1,
            marginTop: 10,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {expert.name + " " + expert.family}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            دریافت نوبت
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {number}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            {titles.AppointmentNumber}
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {appointment.shamsiDate}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            تاریخ
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {appointment.time}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            ساعت
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {appointment.time}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            نوع ملاقات
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 5,
            paddingBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {80000}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              ...FONTS.body3,
              color: COLORS.purple_light,
            }}
          >
            مبلغ
          </Text>
        </View>

        <View style={{ marginTop: 5, paddingHorizontal: 10 }}>
          <Text style={{ ...FONTS.h4, color: COLORS.purple_light }}>
            توضیحات
          </Text>
          <Text
            numberOfLines={8}
            ellipsizeMode="tail"
            style={{
              marginTop: 5,
              textAlign: "justify",
              color: COLORS.lightGray,
              ...FONTS.body4,
            }}
          >
            پرداخت مبلغ نوبت در زمان ثبت نوبت الزامی است. نوبت های اخذ شده به
            هیچ عنوان قابل کنسل نیست و فقط برای همان تاریخ معتبر میباشد. نوبت
            دهی شیفت صبح، اینترنتی از ساعت 1 صبح الی 8 صبح همان روز باز خواهد شد
            و نوبت تلفنی از 8 صبح همان روز امکانپذیر میباشد. نوبت دهی شیفت عصر،
            اینترنتی از ساعت 13 الی 15 عصر همان روز باز خواهد شد و نوبت تلفنی از
            15:30 الی 16 عصر همان روز امکانپذیر میباشد. حداقل زمان انتظار جهت
            مراجعه به اتاق پزشک 1 ساعت میباشد.
          </Text>
        </View>

        <View style={styles.fieldContainer}>
          <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={(e) => {
              setAppointment(appointment.appointmentID, props.CURRENT_LOGIN?.user?.id);
              //navigation.navigate("Visit");
            }}
            color="#FFC561"
          >
            <Text style={{ ...FONTS.h3 }}>پرداخت</Text>
          </Button>
        </View>
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
    backgroundColor: COLORS.purpel_dark,
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
    backgroundColor: COLORS.purple_dark,
    padding: 5,
    alignContent: "center",
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
  fieldContainer: {
    display: "flex",
    width: "90%",
    margin: "3%",
  },
});

export default connect(mapStateToProps)(PreviewTicket);
