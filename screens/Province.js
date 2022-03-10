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

function selectCity(city, cityId) {
  return {
    type: "SELECTCITY",
    city: city,
    cityId: cityId,
  };
}

function mapStateToProps(state) {
  return {
    CITY: state.CITY,
    CITYID: state.CITYID,
  };
}

const mapDispatchToProps = {
  selectCity,
};

const Province = (props, { navigation }) => {
  const [results, setResults] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [translateY] = useState(new Animated.Value(120));

  function selectCityHandler(city, cityId) {
    props.selectCity(city, cityId);
  }

  useEffect(() => {
    openSearch();
    search("");
  }, []);

  const openSearch = () => {
    Animated.spring(translateY, {
      toValue: -67,
      useNativeDriver: true,
    }).start();
  };

  // const loadSubCategories = (item) => {
  //   var obj = {};
  //   var response = "";
  //   obj["ParentId"] = item.id;
  //   obj["pageIndex"] = 1;
  //   obj["pageSize"] = 20;

  //   const searchResponse = axios
  //     .post(requests.GetAllExpertiseByCategoryId, obj)
  //     .then((res) => {
  //       setResults(res.data);
  //     });
  // };

  const loadSubItems = (item) => {
    var obj = {};
    var response = "";
    obj["ProvinceID"] = item.id;
    obj["pageIndex"] = 1;
    obj["pageSize"] = 20;

    const searchResponse = axios
      .post(requests.GetCountyByProvinceId, obj)
      .then((res) => {
        setResults(res.data);
      });
  };

  const search = (city) => {
    console.log("search");
    var obj = {};
    var response = "";
    obj["City"] = city;
    const searchResponse = axios.post(requests.SearchCity, obj).then((res) => {
      setResults(res.data);
    });
  };

  const renderSearchItem = (item, index) => {
    console.log("renderSearchItem");
    var destinationStyle = {};
    if (item.empty) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
        />
      );
    }

    if (item.id === "back") {
      return (
        <Animatable.View
          style={{
            flex: 1,
            padding: 3,
            alignItems: "center",
            alignContent: "center",
          }}
          animation="bounceInLeft"
          duration={1000}
          delay={index * 30}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              marginVertical: 2,
              ...destinationStyle,
              borderRadius: 5,
              height: SIZES.width * 0.25,
              width: SIZES.width * 0.25,
              overflow: "hidden",
            }}
            onPress={() => {}}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: COLORS.gray,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: COLORS.white,
                  ...FONTS.h3,
                }}
              >
                ...
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }

    if (item.reasonType == 0) {
      return (
        <Animatable.View
          style={{
            flex: 1,
            padding: 3,
            alignItems: "center",
            alignContent: "center",
          }}
          animation="bounceInLeft"
          duration={1000}
          delay={index * 30}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              marginVertical: 2,
              ...destinationStyle,
              borderRadius: 5,
              height: SIZES.width * 0.23,
              width: SIZES.width * 0.23,
              overflow: "hidden",
            }}
            onPress={() => {
              if (item.subItemsCount > 0) loadSubItems(item);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: "#FFC561",
             //   borderColor: "#acaeb3",
                borderRadius: 15,
               // borderWidth: 1,
              }}
            >
              <Text
                style={{
                  flex: 0.2,
                  textAlign: "right",
                  width: "100%",
                  padding: 7,
                  color: COLORS.Anti_Flash_White,
                  ...FONTS.h6,
                }}
              >
                {"استان"}
              </Text>

              <Text
                style={{
                  flex: 0.8,
                  textAlign: "center",
                  padding: 3,
                  color: COLORS.Anti_Flash_White,
                  ...FONTS.h4,
                }}
              >
                {item.city}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          style={{
            flex: 1,
            padding: 3,
            alignItems: "center",
            alignContent: "center",
          }}
          animation="bounceInLeft"
          duration={1000}
          delay={index * 30}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              marginVertical: 2,
              ...destinationStyle,
              borderRadius: 5,
              height: SIZES.width * 0.23,
              width: SIZES.width * 0.23,
              overflow: "hidden",
            }}
            onPress={() => {
              selectCityHandler(item.city, item.id);
              // navigation.navigate("ExpertDetail", { id: item.id });
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "columns",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: "#d34a66",
                //borderColor: "#abafb4",
                borderRadius: 15,
                //borderWidth: 1,
              }}
            >
              <Text
                style={{
                  flex: 0.2,
                  textAlign: "right",
                  width: "100%",
                  padding: 7,
                  color: COLORS.lightGray,
                  ...FONTS.h6,
                }}
              >
                {"شهر"}
              </Text>

              <Text
                style={{
                  flex: 0.8,
                  padding: 3,
                  textAlign: "center",
                  color: COLORS.white,
                  ...FONTS.h4,
                }}
              >
                {item.city}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      {/* <ImageBackground
        style={{
          
          position: "absolute",
          alignSelf:'center',
          //flex: 1,
         // top: 0,
          width: 100,
          height: 100,
          //left: 0,
        }}
        source={findcity}
        resizeMode="stretch"
      ></ImageBackground> */}
      {/* <LinearGradient
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderColor: "#6acfd0",
        }}
        colors={["#10c0b0", "#10c0b0"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      ></LinearGradient> */}
      <View style={styles.header}>
        {/* Title */}
        <View style={{ margin: 15 }}>
          <Text style={{ color: COLORS.purple_dark, ...FONTS.h3}}>
            {"انتخاب موقعیت"}
          </Text>
        </View>
        {/* End Title */}

      </View>
      <View style={styles.container}>
        {/* Search From */}
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
              name="search"
              type={Icons.Ionicons}
              size={25}
              color="#C1A9F6"
            />
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder={"استان , شهر"}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></TextInput>
        </View>
        {/* End Search From */}        
        <FlatList
          style={{
            padding: 3,
            marginBottom: 70,
            // borderTopLeftRadius: 60,
          }}
          contentContainerStyle={{
            alignItems: "right",
            alignContent: "right",
            justifyContent: "right",
          }}
          data={formatData(results, numColumns)}
          numColumns={numColumns}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyComponent}>
              <Icon
                name={"search"}
                type={Icons.Ionicons}
                size={36}
                color={COLORS.lightGray}
              />
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderSearchItem(item, index)}
        />

        {/* Search From */}
        {/* <Animated.View
          style={[
            styles.searchContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Animated.View
            style={[
              styles.searchButton,
              {
                // transform: [{ translateX }],
              },
            ]}
            onClick={() => search(searchText)}
          >
            <Icon
              name="arrow-back"
              type={Icons.Ionicons}
              size={30}
              color={COLORS.white}
            />
          </Animated.View>

          <TextInput
            style={styles.searchInput}
            placeholder={"استان , شهر"}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></TextInput>
        </Animated.View> */}
        {/* End Search From */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    //  backgroundColor: "#7fa2fb",
  },
  header: {
    alignItems: "center",
    alignContent: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: 40,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // borderTopLeftRadius: 60,
    //  borderTopRightRadius: 40,
    paddingTop: 2,
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
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    padding:5,
    justifyContent: "center",
    borderRadius: 7,
    backgroundColor:COLORS.lightGray,
  },
  searchInput: {
    flex:0.9,
    height: 35,
    width: "80%",
    ...FONTS.h4,
    textAlign: "right",
    padding: 5,
    color: COLORS.veryDarkGray,
    textDecorationColor: "white",
  },
  searchButton: {
    flex:0.1,
   
    padding:5,
    alignItems: "center",
    justifyContent: "center",
  },
  itemInvisible: {
    backgroundColor: "transaparent",
  },
  emptyComponent: {
    alignSelf: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Province);
