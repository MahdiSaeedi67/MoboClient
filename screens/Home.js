import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { LinearGradient } from "expo-linear-gradient";
// import { connect } from "react-redux";
// import { Flow } from "react-native-animated-spinkit";
// import * as Animatable from "react-native-animatable";

// import axios from "../components/axios";
// import requests from "../constants/requests";
// import StarReview from "../components/StarReview";
 import { COLORS, FONTS, SIZES } from "../constants";
// import titles from "../constants/titles";
// import colors from "../constants/colors";


// const CategoryItem = ({ bgColor, icon, label, onPress }) => {
//   return (
//     <TouchableOpacity
//       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
//       onPress={onPress}
//     >
//       <View style={[{ width: 50, height: 50 }]}>
//         <LinearGradient
//           style={[
//             {
//               flex: 1,
//               alignItems: "center",
//               justifyContent: "center",
//               borderRadius: 10,
//               backgroundColor: "red",
//             },
//           ]}
//           colors={bgColor}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//         >
//           <Image
//             source={icon}
//             resizeMode="cover"
//             style={{
//               flex: 1,
//               tintColor: COLORS.white,
//               width: 50,
//               height: 50,
//             }}
//           />
//         </LinearGradient>
//       </View>
//       <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{label}</Text>
//     </TouchableOpacity>
//   );
// };

// function setCurrentLogin(currentLogin) {
//   return {
//     type: "SET_CURRENT_LOGIN",
//     currentLogin: currentLogin,
//   };
// }

// function setUserInformation(name, family) {
//   return {
//     type: "SET_USER_INFORMATION",
//     name: name,
//     family: family,
//   };
// }

// function mapStateToProps(state) {
//   return {
//     CURRENT_LOGIN: state.CURRENT_LOGIN,
//   };
// }

// const mapDispatchToProps = {
//   setCurrentLogin,
//   setUserInformation,
// };

// const getCurrentLogin = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem("@currentLogin");
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch (e) {
//     // error reading value
//   }
// };

const Home = (props) => {
  // const [bestExperts, setBestExperts] = React.useState([]);
  // const [expertises, setExpertises] = React.useState([]);

  // useEffect(() => {
  //   getCurrentLogin().then((login) => {
  //     if (login) {
  //       props.setCurrentLogin(login);
  //       props.setUserInformation(login.user.name, login.user.family);
  //     }
  //   });

  //   var obj = {};
  //   var response = "";
  //   obj["ParentId"] = -1;
  //   obj["PageIndex"] = 1;
  //   obj["PageSize"] = 10;
  //   const expertiseResponse = axios
  //     .post(requests.GetAllExpertiseByCategoryId, obj)
  //     .then((res) => {
  //       setExpertises(res.data);
  //     });

  //   obj = {};
  //   obj["PageIndex"] = 1;
  //   obj["PageSize"] = 10;
  //   const expertResponse = axios
  //     .post(requests.GetAllBetterExpert, obj)
  //     .then((res) => {
  //       setBestExperts(res.data);
  //     });
  // }, []);

  // function renderCategoryItem(item, index) {
  //   var destinationStyle = {};

  //   if (index == 0) {
  //     destinationStyle = {
  //       marginLeft: 10,
  //       width: SIZES.width * 0.35,
  //       borderRadius: 8,
  //       height: "40px",
  //     };
  //   }

  //   return (
  //     <Animatable.View
  //       style={{ flex: 1, alignItems: "center", alignContent: "center" }}
  //       animation="fadeInLeft"
  //       duration={1000}
  //       delay={index * 30}
  //     >
  //       <TouchableOpacity
  //         style={{
  //           justifyContent: "center",
  //           marginHorizontal: 3,
  //           ...destinationStyle,
  //           borderRadius: 8,
  //           height: "40px",
  //           width: SIZES.width * 0.35,
  //           overflow: "hidden",
  //           //   borderWidth: 1,
  //           //   borderColor: colors.Rackley_Shadow,
  //           backgroundColor: COLORS.randomColor(),
  //         }}
  //         onPress={() => {
  //           props.navigation.navigate("Category");
  //         }}
  //       >
  //         <Text
  //           style={{
  //             flex: 0.1,
  //             textAlign: "center",
  //             color: "white",
  //             ...FONTS.h5,
  //           }}
  //         >
  //           {item.title}
  //         </Text>
  //       </TouchableOpacity>
  //     </Animatable.View>
  //   );
  // }

  // function renderDestinations(item, index) {
  //   var destinationStyle = {};

  //   if (index == 0) {
  //     destinationStyle = {
  //       marginLeft: 10,
  //       width: SIZES.width * 0.35,
  //       borderRadius: 8,
  //     };
  //   }

  //   return (
  //     <Animatable.View
  //       style={{ flex: 1, alignItems: "center", alignContent: "center" }}
  //       animation="fadeInLeft"
  //       duration={1000}
  //       delay={index * 30}
  //     >
  //       <TouchableOpacity
  //         style={{
  //           justifyContent: "center",
  //           marginHorizontal: 3,
  //           ...destinationStyle,
  //           borderRadius: 8,
  //           height: "100%",
  //           width: SIZES.width * 0.35,
  //           overflow: "hidden",
  //           borderWidth: 1,
  //           borderColor: colors.Rackley_Shadow,
  //         }}
  //         onPress={() => {
  //           props.navigation.navigate("ExpertDetail", { id: item.id });
  //         }}
  //       >
  //         <Image
  //           source={{
  //             uri: item.pictureAddress,
  //           }}
  //           resizeMode="cover"
  //           style={{
  //             height: "100%",
  //             borderRadius: 8,
  //             overflow: "hidden",
  //           }}
  //         />
  //         <View
  //           style={{
  //             flex: 1,
  //             display: "flex",
  //             flexDirection: "column",
  //             position: "absolute",
  //             top: "70%",
  //             height: "30%",
  //             left: 0,
  //             width: "100%",
  //             backgroundColor: COLORS.glassDark,
  //             borderBottomRightRadius: 10,
  //             borderBottomLeftRadius: 10,
  //             textAlign: "right",
  //           }}
  //         >
  //           <Text
  //             style={{
  //               flex: 0.1,
  //               textAlign: "center",
  //               color: "white",
  //               ...FONTS.h5,
  //             }}
  //           >
  //             {item.name + " " + item.family}
  //           </Text>
  //           <Text
  //             style={{
  //               flex: 0.1,
  //               textAlign: "center",
  //               color: "#FFDB60",
  //               ...FONTS.h6,
  //             }}
  //           >
  //             {item.expertiseTitle}
  //           </Text>
  //         </View>
  //       </TouchableOpacity>
  //     </Animatable.View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {/* Banner */}
      {/* SIZES.base */}
      <View style={styles.banner}>
        {/* <Image
          source={{
            uri: "https://www.cdc.gov/diabetes/images/library/spotlights/Male-doctor-smiling-portrait-close-up-Med-Res-72991363.jpg",
          }}
          //{images.homeBanner}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderBottomRightRadius: 40,
          }}
        /> */}
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
              textAlign: "center",
              color: COLORS.white,
              ...FONTS.h4,
            }}
          >
            دکتر {"مهدی سعیدی"}
          </Text>
          {/* <StarReview
            style={{ flex: 0.5, backgroundColor: "red", textAlign: "center" }}
            rate={4.5}
            vote={43}
          /> */}
        </View>
      </View>

      {/* Category */}
      {/* <View style={{ flex: 0.45 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              marginTop: SIZES.base,
              ...FONTS.h5,
              color: COLORS.Blue,
              paddingLeft: 10,
              textAlign: "left",
            }}
          >
            {titles.ShowAll}
          </Text>

          <Text
            style={{
              flex: 1,
              marginTop: SIZES.base,
              ...FONTS.h4,
              color: COLORS.darkGray,
              paddingRight: 10,
              textAlign: "right",
            }}
          >
            {titles.Category}
          </Text>
        </View>
        <FlatList
          style={expertises.length <= 0 && styles.margin_auto}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          data={expertises}
          ListEmptyComponent={
            <View style={{ alignSelf: "center" }}>
              <Flow size={48} color={COLORS.medium_Turquoise} />
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderCategoryItem(item, index)}
        />
      </View> */}

      {/* BestExperts */}
      {/* <View style={{ flex: 1 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text
            style={{
              flex: 1,
              marginTop: SIZES.base,
              ...FONTS.h5,
              color: COLORS.Blue,
              paddingLeft: 10,
              textAlign: "left",
            }}
          >
            {titles.ShowAll}
          </Text>

          <Text
            style={{
              flex: 1,
              marginTop: SIZES.base,
              ...FONTS.h4,
              color: COLORS.darkGray,
              paddingRight: 10,
              textAlign: "right",
            }}
          >
            {titles.BestExperts}
          </Text>
        </View>
        <FlatList
          style={bestExperts.length <= 0 && styles.margin_auto}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          data={bestExperts}
          ListEmptyComponent={
            <View style={{ alignSelf: "center" }}>
              <Flow size={48} color={COLORS.medium_Turquoise} />
            </View>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderDestinations(item, index)}
        />
      </View> */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: COLORS.white, 
    paddingBottom: 80,
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
  margin_auto: {
    marginHorizontal: "auto",
  },
  banner: {
    flex: 1.5,
    borderBottomRightRadius: 40,
  },
  category: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;//connect(mapStateToProps, mapDispatchToProps)(Home);
