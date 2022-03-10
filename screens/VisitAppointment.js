import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Picker,
  FlatList,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "../components/axios";
import requests from "../constants/requests";
import { images, icons, COLORS, FONTS, SIZES } from "../constants";
import ResponsiveCircle from "../components/ResponsiveCircle";
import { AiOutlineBarcode } from "react-icons/ai";
import { FcAlarmClock } from "react-icons/fc";
import { GiAlarmClock } from "react-icons/gi";
import { IoMdTime } from "react-icons/io";

import titles from "../constants/titles";
import { Flow } from "react-native-animated-spinkit";
import * as Animatable from "react-native-animatable";
import Select from "../components/Select";

const numColumns = 2;
const WIDTH = Dimensions.get("window").width;
const HIEGHT = Dimensions.get("window").height;
const HEADERHIEGHT = 150;
const VISITTYPEHIEGHT = 40;

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

const TimeItem = ({ number, time, state }) => (
  <View
    style={{
      backgroundColor: "#e2e9ee",
      display: "flex",
      flexDirection: "row",
      color: "#f4f3f5",
      overflow: "hidden",
      marginVertical: 1.5,
      marginHorizontal: 5,
      borderRadius: 10,
      flex: 1,
    }}
  >
    <View style={{ flex: 2, display: "flex", textAlign: "center" }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          paddingVertical: 5,
        }}
      >
        <Text
          style={{
            flex: 3,
            textAlign: "right",
            color: "#667781",
            alignContent: "center",
            alignItems: "baseline",
            ...FONTS.body6,
          }}
        >
          {titles.AppointmentTime}
        </Text>

        <IoMdTime
          style={{ flex: 1 }}
          size={14}
          color={state == 0 ? "#77C66E" : "#df2741"}
        />
      </View>

      <Text
        style={{
          flex: 1,
          textAlign: "center",
          color: "#667781",
          ...FONTS.h2,
        }}
      >
        {time}
      </Text>
      {/* <FcAlarmClock size={30} /> */}
    </View>

    <View
      style={{
        flex: 1,
        display: "flex",
        textAlign: "center",
        borderLeftWidth: 2.8,
        borderLeftColor: "#D3D3D3",
        borderStyle: "dashed",
        backgroundColor: state == 0 ? "#77C66E" : "#df2741",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.body5,
          }}
        >
          {titles.AppointmentNumber}
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            textAlign: "center",
            color: COLORS.white,
            ...FONTS.h3,
            // backgroundColor:'yellow'
          }}
        >
          {number + 1}
        </Text>
      </View>

      {/* <AiOutlineBarcode size={30} color="#667781" /> */}
    </View>
    <View
      style={{
        position: "absolute",
        flex: 1,
        top: 0,
        height: "100%",
        left: "60%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ResponsiveCircle
        height={15}
        width={15}
        top={-18}
        backgroundColor="white"
      ></ResponsiveCircle>
      <ResponsiveCircle
        height={15}
        width={15}
        top={18}
        backgroundColor="white"
      ></ResponsiveCircle>
    </View>
  </View>
);

const DateItem = ({ num, month, day }) => (
  <View style={styles.item}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#df2741",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        flex: 1.5,
        color: "#f4f3f5",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          position: "absolute",
          flex: 1,
          width: "100%",
          // left: "90%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ResponsiveCircle
          height={10}
          width={10}
          top={-6}
          left={-7}
          backgroundColor="white"
        ></ResponsiveCircle>
        <ResponsiveCircle
          height={10}
          width={10}
          top={-6}
          left={7}
          backgroundColor="white"
        ></ResponsiveCircle>
      </View>
      <Text
        style={{
          flex: 1,
          paddingTop: 10,
          paddingLeft: 7,
          textAlign: "left",
          color: COLORS.white,
          ...FONTS.h3,
        }}
      >
        {month}
      </Text>
      <Text
        style={{
          flex: 1,
          paddingTop: 10,
          paddingRight: 7,
          textAlign: "right",
          ...FONTS.h3,
        }}
      >
        {num}
      </Text>
    </View>
    <View style={{ flex: 2, textAlign: "center" }}>
      <Text
        style={{
          flex: 1,
          paddingTop: 10,
          textAlign: "center",
          color: "#667781",
          ...FONTS.h3,
        }}
      >
        {day}
      </Text>
    </View>
  </View>
);

const VisitAppointment = ({ route, navigation }) => {
  const [appointmentDate, setAppointmentDate] = React.useState([]);
  const [currentDateIndex, setCurrentDateIndex] = React.useState(0);
  const [appointmentTime, setAppointmentTime] = React.useState([]);
  const [appointmentType, setAppointmentType] = React.useState([]);
  const [currentAppointmentTypeIndex, SetCurrentAppointmentTypeIndex] =
    React.useState(0);
  const [selectedValue, setSelectedValue] = useState("java");
  const { expert } = route.params;

  useEffect(() => {
    var obj = {};
    obj["ExpertId"] = expert.id;

    const responseAppointmentType = axios
      .post(requests.GetAppointmentTypeByExpertID, obj)
      .then((res) => {
        setAppointmentType(res.data);
        console.log("AppointmentType", res);
      });

    const response = axios
      .post(requests.GetFreeAppointmentDateByExpertId, obj)
      .then((res) => {
        if (res.data.length > 0) {
          setAppointmentDate(res.data);
          console.log("freeAppointmentDate", res);

          obj = {};
          obj["ExpertID"] = expert.id;
          obj["ShamsiDate"] = res.data[0].shamsiDate;

          console.log("firstDate", obj);
          const responseTimes = axios
            .post(requests.GetAppointmentTimeByExpertID, obj)
            .then((res) => {
              setAppointmentTime(res.data);
              console.log("AppointmentTime", res);
            });
        }
      });
  }, []);

  const GetAppointmentTimeByExpertID = (item, index) => {
    setCurrentDateIndex(index);

    const obj = {};
    obj["ExpertID"] = expert?.id;
    obj["ShamsiDate"] = item?.shamsiDate;

    const responseTimes = axios
      .post(requests.GetAppointmentTimeByExpertID, obj)
      .then((res) => {
        setAppointmentTime(res?.data);
      });
  };

  const renderDateItem = ({ index, item }) => (
    <Animatable.View
      style={{ alignItems: "center", alignContent: "center" }}
      animation="bounceInLeft"
      duration={1000}
      delay={index * 30}
    >
      <TouchableOpacity
        // style={{ flex: 1 }}
        activeOpacity={0.5}
        onPress={() => GetAppointmentTimeByExpertID(item, index)}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 5,
            paddingRight: 8,
            paddingLeft: 8,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>
            {item.day}
          </Text>
          <Text
            style={{
              display: "flex",
              ...FONTS.h3,
              color: COLORS.white,
              backgroundColor:
                index === currentDateIndex ? "#FFC561" : "transparent",
              width: 30,
              height: 30,
              borderRadius: 100,
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              textAlignVertical: "center",
            }}
          >
            {item.num}
          </Text>
          <Text style={{ ...FONTS.body4, color: COLORS.white }}>
            {item.month}
          </Text>
          {index === currentDateIndex && (
            <View
              style={{
                width: "90%",
                marginTop: 5,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                height: 4,
              }}
            ></View>
          )}
        </View>
        {/* <DateItem num={item.num} month={item.month} day={item.day} /> */}
      </TouchableOpacity>
    </Animatable.View>
  );

  const renderAppointmentTypeItem = ({ index, item }) => (
    <Animatable.View
      style={{ alignItems: "center", alignContent: "center" }}
      animation="bounceInLeft"
      duration={1000}
      delay={index * 30}
    >
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => SetCurrentAppointmentTypeIndex(index)}
      >
        <LinearGradient
          style={[
            {
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              padding: 5,
              margin: 1,
            },
          ]}
          colors={
            currentAppointmentTypeIndex === index
              ? [COLORS.coral, COLORS.coral]
              : [COLORS.yellow, COLORS.yellow]
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Text
            style={{
              color:
                currentAppointmentTypeIndex === index
                  ? COLORS.white
                  : COLORS.white,
              ...FONTS.body4,
            }}
          >
            {item.title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );

  const actionOnTicket = (item, index) => {
    console.log("test ticket");
    navigation.navigate("PreviewTicket", {
      expert: expert,
      appointment: item,
      number: index + 1,
    });
  };

  const renderTimeItem = ({ index, item }) => {
    var destinationStyle = {};
    if (item.empty) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
        />
      );
    }

    let opacityNumber = 0.5;
    if (item.state === 1) opacityNumber = item.state;
    return (
      <Animatable.View
        style={{ flex: 1 }}
        animation="bounceInLeft"
        duration={1000}
        delay={index * 30}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={opacityNumber}
          onPress={() => item.state === 0 && actionOnTicket(item, index)}
        >
          <TimeItem number={index} time={item.time} state={item.state} />
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const renderTimeItem2 = ({ index, item }) => {
    var destinationStyle = {};
    if (item.empty) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
        />
      );
    }

    let opacityNumber = 0.5;
    if (item.state === 1) opacityNumber = item.state;
    return (
      <Animatable.View
        style={[
          styles.shadow,
          {
            flex: 1,
            padding:2
          },
        ]}
        animation="bounceInLeft"
        duration={1000}
        delay={index * 30}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          activeOpacity={opacityNumber}
          onPress={() => item.state === 0 && actionOnTicket(item, index)}
        >
          {/* number={index} time={item.time} state={item.state}  */}

          <View
            style={[styles.shadow,{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              backgroundColor:
                item.state == 0 ? COLORS.blue_light : COLORS.coral,
              borderRadius: 10,
              margin: 2,
              height: 75,
              
              // alignItems: "center",
              //justifyContent:'center'
            }]}
          >
            <View
              style={{
                flex: 0.6,
                backgroundColor:"#f0f0f0" ,
                height: 75,
                borderRadius: 10,
                alignItems:'center',
                justifyContent:'center'
                //borderColor:COLORS.gray,
                //borderWidth:1
              }}
            >
              <Text
                style={{
                  flex: 0.2,
                  ...FONTS.body2,
                  color: COLORS.purple_dark,
                  borderRadius: 7,
                }}
              >
                {item.time}
              </Text>
            </View>

            <View
              style={{
                flex: 0.4,
                backgroundColor:
                  item.state == 0 ? COLORS.blue_light : COLORS.coral,
                borderRadius: 10,
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <IoMdTime size={28} color={COLORS.white} />
              <Text
                style={{
                  flex: 0.2,
                  ...FONTS.body4,
                  color:item.state == 0 ? COLORS.purple_dark : COLORS.white,
                  borderRadius: 7,
                }}
              >
                {item.state == 0 ? "رزور نشده" : "رزرو شده"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const callList = [
    { id: "1", name: "test1" },
    { id: "2", name: "test2" },
  ];
  // Render
  return (
    <SafeAreaView style={styles.page}>
      <View
        style={{
          height: HEADERHIEGHT,
          borderBottomLeftRadius: 7,
          borderBottomRightRadius: 7,
        }}
      >
        <View
          style={{
            //  flex: 0.2,
            width: "100%",
            marginHorizontal: 1,
            backgroundColor: COLORS.purple_dark,
            height: HEADERHIEGHT,
            borderBottomLeftRadius: 7,
            borderBottomRightRadius: 7,
          }}
        >
          <View style={styles.title}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,
              }}
            >
              {"دریافت نوبت"}
            </Text>
          </View>

          <FlatList
            style={{ margin: 5 }}
            data={appointmentDate}
            renderItem={renderDateItem}
            keyExtractor={(item) => item.id}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ alignSelf: "center" }}>
                <Flow size={48} color={COLORS.medium_Turquoise} />
              </View>
            }
          />
        </View>
      </View>
      <View style={styles.container}>
        {/* Date */}

        {/* VisitType */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: VISITTYPEHIEGHT,

            overfollow: "hidden",
          }}
        >
          <FlatList
            style={{ height: VISITTYPEHIEGHT }}
            data={appointmentType}
            renderItem={renderAppointmentTypeItem}
            keyExtractor={(item) => item.id}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ alignSelf: "center" }}>
                <Flow size={48} color={COLORS.medium_Turquoise} />
              </View>
            }
          />
        </View>

        {/* Times */}
        <View
          style={{
            height: HIEGHT - (HEADERHIEGHT + VISITTYPEHIEGHT),
            flexGrow: 0,
            display: "flex",
            width: "100%",
            marginLeft: 10,
            marginRight: 10,
            marginHorizontal: 3,
            marginBottom: 5,
            overflow: "hidden",
          }}
        >
          <FlatList
            style={{
              height: HIEGHT - (HEADERHIEGHT + VISITTYPEHIEGHT),
              flexGrow: 0,
              marginBottom: 5,
            }}
            data={formatData(appointmentTime, numColumns)}
            numColumns={2}
            renderItem={renderTimeItem2}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ alignSelf: "center" }}>
                <Flow size={48} color={COLORS.medium_Turquoise} />
              </View>
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    height: HIEGHT,
    overflow: "hidden",
  },
  header: {
    alignItems: "center",
    alignContent: "center",
    // display: "flex",
    // flexDirection: "column",

    Height: HEADERHIEGHT,
    // flexGrow: 0,
  },
  title: {
    width: "100%",
    paddingRight: "15%",
    paddingLeft: "15%",
    margin: 15,
    textAlign: "center",
  },
  container: {
    // display: "flex",
    //flex: 1,
    //flexDirection: "column",
    backgroundColor: COLORS.white,
    padding: 5,
    alignContent: "center",
    // justifyContent: "center",
    alignItems: "center",
    height: HIEGHT - VISITTYPEHIEGHT,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e2e9ee",
    width: 80,
    height: 80,
    marginVertical: 2,
    marginHorizontal: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: "#6e7e88",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default VisitAppointment;
