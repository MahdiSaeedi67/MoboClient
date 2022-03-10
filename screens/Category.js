import React, { useState, useEffect } from "react";
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
const numColumns = 3;
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

const Category = ({ navigation }) => {
  const [results, setResults] = React.useState([]);
  const [searchText, setSearchText] = React.useState("");
  const [translateY] = useState(new Animated.Value(120));

  useEffect(() => {
    openSearch();
    search("");
  }, []);

  const openSearch = () => {
    Animated.spring(translateY, {
      toValue: -55,
      useNativeDriver: true,
    }).start();
  };

  const loadSubCategories = (item) => {
    var obj = {};
    var response = "";
    obj["ParentId"] = item.id;
    obj["pageIndex"] = 1;
    obj["pageSize"] = 20;

    const searchResponse = axios
      .post(requests.GetAllExpertiseByCategoryId, obj)
      .then((res) => {
        setResults(res.data);
      });
  };

  const loadSubItems = (item) => {
    var obj = {};
    var response = "";
    obj["ExpertiseID"] = item.id;
    obj["pageIndex"] = 1;
    obj["pageSize"] = 20;

    const searchResponse = axios
      .post(requests.GetExpertsByExpertiseId, obj)
      .then((res) => {
        setResults(res.data);
      });
  };

  const search = (word) => {
    console.log("search");
    var obj = {};
    var response = "";
    obj["Word"] = word;
    const searchResponse = axios.post(requests.Search, obj).then((res) => {
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
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
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
              height: SIZES.width * 0.3,
              width: SIZES.width * 0.3,
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
                backgroundColor: COLORS.randomColor(),
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
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
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
              height: SIZES.width * 0.3,
              width: SIZES.width * 0.3,
              overflow: "hidden",
              //borderWidth: 1,
              //borderColor: COLORS.Rackley_Shadow,
            }}
            onPress={() => {
              if (item.subCategoryCount > 0) loadSubCategories(item);
              if (item.subCategoryCount <= 0 && item.subItemsCount > 0)
                loadSubItems(item);
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: 20,
                backgroundColor: COLORS.randomColor(),
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
                <Icon
                  // item.pictureAddress
                  name={"search"}
                  type={Icons.Ionicons}
                  size={24}
                  color={COLORS.white}
                />
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                top: "70%",
                height: "30%",
                left: 0,
                width: "100%",
                backgroundColor: COLORS.lightGray,
                overflow: "hidden",
                // borderBottomRightRadius: 8,
                //borderBottomLeftRadius: 8,
                textAlign: "right",
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: COLORS.black,
                  ...FONTS.h5,
                }}
              >
                {item.title}{" "}
                {item.subCategoryCount > 0 && +item.subCategoryCount}
                {item.subCategoryCount <= 0 &&
                  item.subItemsCount > 0 &&
                  +item.subItemsCount}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View
          style={{ flex: 1, alignItems: "center", alignContent: "center" }}
          animation="bounceInLeft"
          duration={1000}
          delay={index * 30}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              marginHorizontal: 3,
              ...destinationStyle,
              borderRadius: 8,
              height: SIZES.width * 0.3,
              width: SIZES.width * 0.3,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: COLORS.Rackley_Shadow,
            }}
            onPress={() => {
              navigation.navigate("ExpertDetail", { id: item.id });
            }}
          >
            <Image
              source={{
                uri: item.pictureAddress,
              }}
              resizeMode="cover"
              style={{
                height: "100%",
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
            <View
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "70%",
                height: "30%",
                left: 0,
                width: "100%",
                backgroundColor: COLORS.glassDark,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 10,
                textAlign: "right",
              }}
            >
              <Text
                style={{
                  flex: 0.1,
                  textAlign: "center",
                  color: "white",
                  ...FONTS.h5,
                }}
              >
                {item.name + " " + item.family}
              </Text>
              <Text
                style={{
                  flex: 0.1,
                  textAlign: "center",
                  color: "#FFDB60",
                  ...FONTS.h6,
                }}
              >
                {item.expertiseTitle}
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      
    <View style={styles.header}>
        
        {/* Title */}
          <View style={{margin:15}}>
          <Text style={{ color: COLORS.purple_dark, ...FONTS.h3 }}>{'جستجو'}</Text>
          </View>
        {/* End Title */}
        
       
      </View>
      
      <View style={styles.container}>
         {/* Search From */}
         <View
          style={[
            styles.searchContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
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
            placeholder={"نام ,دسته , عنوان شغل"}
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
          }}
          contentContainerStyle={{
            alignItems: "right",
            alignContent: "right",
            justifyContent: "right",
          }}
          data={formatData(results, numColumns)}
          numColumns={3}
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
    alignItems:'center',
    alignContent:'center',
    display: "flex",
    flexDirection: "column",
    minHeight: 40,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    // width: "90%",
    margin: 10,
    padding:5,
    justifyContent: "center",
    //borderWidth: 2,
    borderRadius: 7,
    //borderColor: 
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

export default Category;
