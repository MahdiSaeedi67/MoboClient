import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StarReview from "../components/StarReview";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import {
  AiOutlineHeart,
  AiOutlineShareAlt,
  AiOutlineSafety,
} from "react-icons/ai";
import axios from "../components/axios";
import requests from "../constants/requests";
import Counter from "../components/counter";
import { showMessage, hideMessage } from "react-native-flash-message";
import titles from "../constants/titles";
import Button from "../components/Button";

const IconButton = ({ icon }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPress={() => {
          console.log("IconButton on pressed");
        }}
      >
        {icon}
      </TouchableOpacity>
    </View>
  );
};

const IconLabel = ({ icon, label }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={icon}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text
        style={{ marginTop: SIZES.padding, color: COLORS.gray, ...FONTS.h3 }}
      >
        {label}
      </Text>
    </View>
  );
};

const DestinationDetail = ({ route, navigation }) => {
  const [expert, setExpert] = React.useState([]);
  const [canGetAppointmentTime, setCanGetAppointmentTime] =
    React.useState(false);
  // Render
  const { id } = route.params;

  useEffect(() => {
    const response = axios
      .get(requests.GetExpertById + `/${id}`)
      .then((res) => {
        setExpert(res.data);
        console.log("expert", res);

        var obj = {};
        obj["ExpertId"] = res.data.id;
        const responseDates = axios
          .post(requests.GetFreeAppointmentDateByExpertId, obj)
          .then((res) => {
            setCanGetAppointmentTime(res.data.length > 0);
          });
      });
  }, []);

  console.log("expert", id);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: expert.pictureAddress,
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderBottomRightRadius: 40,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "70%",
            height: "30%",
            left: 0,
            width: "100%",
            backgroundColor: COLORS.glass,
            textAlign: "right",
            borderTopLeftRadius: 40,
            borderBottomRightRadius: 40,
          }}
        >
          <Text
            style={{
              flex: 0.5,
              textAlign: "right",
              color: COLORS.white,
              paddingRight: 20,
              ...FONTS.h3,
            }}
          >
            {expert.name + " " + expert.family}
          </Text>
          <View
            style={{
              flex: 1,
              //position: "absolute",
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
              justifyContent: "space-between",
              //top: "86%",
              width: "100%",
              height: 30,
              alignItems: "center",
            }}
          >
            <IconButton icon={<AiOutlineHeart size={20} color="white" />} />
            <IconButton icon={<AiOutlineShareAlt size={20} color="white" />} />
            <IconButton icon={<AiOutlineSafety size={20} color="white" />} />

            <StarReview rate={4.5} vote={expert.voteCount} />
          </View>
        </View>
      </View>

      {/* Body */}
      <View style={{ flex: 2, marginTop: 10 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            marginTop: 5,
            paddingBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            {expert.expertiseTitle}
          </Text>
          <Text style={{ flex: 1, textAlign: "right", ...FONTS.body4 }}>
            گروه شغلی
          </Text>
        </View>

        {/* <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            marginTop: 5,
            paddingBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            {expert.provinceTitle}
          </Text>
          <Text style={{ flex: 1, textAlign: "right", ...FONTS.body4 }}>
            استان
          </Text>
        </View> */}

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            marginTop: 5,
            paddingBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            {expert.countyTitle}
          </Text>
          <Text style={{ flex: 1, textAlign: "right", ...FONTS.body4 }}>
            شهر
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            marginTop: 5,
            paddingBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            {expert.tel}
          </Text>
          <Text style={{ flex: 1, textAlign: "right", ...FONTS.body4 }}>
            شماره تماس
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderBottomColor: COLORS.lightGray,
            borderBottomWidth: 1,
            marginTop: 5,
            paddingBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              flex: 2,
              textAlign: "left",
              color: COLORS.gray,
              ...FONTS.body4,
            }}
          >
            {expert.address}
          </Text>
          <Text style={{ flex: 1, textAlign: "right", ...FONTS.body4 }}>
            آدرس
          </Text>
        </View>

        <View style={{ marginTop: 5, paddingHorizontal: SIZES.padding }}>
          <Text style={{ ...FONTS.h4 }}>توضیحات</Text>
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={{
              marginTop: 5,
              textAlign: "justify",
              color: COLORS.gray,
              ...FONTS.body5,
            }}
          >
            {expert.comment}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View
        style={{
          flex: 0.4,
          paddingHorizontal: SIZES.padding,
        }}
      >
        
        <Button
            style={{ ...FONTS.h3, borderRadius: 8 }}
            onClick={() => {
              if (canGetAppointmentTime)
              navigation.navigate("VisitAppointment", { expert: expert });
            else {
              console.log('showMessage')
              showMessage({
                message: titles.CanNotGetAppointment,
                description:titles.CanNotGetAppointmentDescription,
                type: "danger",
              });
            }
            }}
            color="#6C51B1"
          >
            <Text style={{ ...FONTS.h3 }}>دریافت نوبت</Text>
          </Button>

        {/* <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            // marginHorizontal: SIZES.radius,
          }}
          onPress={() => {
            if (canGetAppointmentTime)
              navigation.navigate("VisitAppointment", { expert: expert });
            else {
              console.log('showMessage')
              showMessage({
                message: titles.CanNotGetAppointment,
                description:titles.CanNotGetAppointmentDescription,
                type: "danger",
              });
            }
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
              دریافت نوبت
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}

        {/* <LinearGradient
          style={[{ height: 70, width: "100%", borderRadius: 15 }]}
          colors={["#edf0fc", "#d6dfff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        > */}
        {/* <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}> */}
        {/* <View
              style={{
                flex: 1,
                textAlign: "left",
                marginHorizontal: SIZES.padding,
                justifyContent: "center",
              }}
            >
             
            </View> */}

        {/* </View> */}
        {/* </LinearGradient> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  header: {
    flex: 1.5,
    borderBottomRightRadius: 40,
  },
});

export default DestinationDetail;
