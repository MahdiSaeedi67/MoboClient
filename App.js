import React, { useState, useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// screens
import {
  Onboarding,
  ExpertDetail,
  VisitAppointment,
  PreviewTicket,
  Category,
  Login,
  Register,
  UpdatePassword,
  Token,
  UpdatePasswordToken,
  Profile,
  About,
  ContactUs,
  Regulation,
  Appointment,
} from "./screens/";
// extra screens
import Tabs from "./navigation/tabs";
import Tab6 from "./navigation/tab6";
import Icon, { Icons } from "./components/Icons";
import { icons, COLORS, SIZES } from "./constants";
// import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import titles from "./constants/titles";
import useFonts from "./constants/useFonts";

import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { createStore } from "redux";
import { Provider } from "react-redux";
import FlashMessage from "react-native-flash-message";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";
import { FiMoreHorizontal, FiChevronLeft } from "react-icons/fi";

const CIRCLE_SIZE = 50;

const initialState = {
  CITY: "تهران",
  CITYID: 7,
  CURRENT_LOGIN: null,
  NAME:null,
  Family:null,
  count: 0,
};

const storeCurrentLogin = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@currentLogin", jsonValue);
    console.log(value);
  } catch (e) {
    // saving error
  }
};
//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCEREMENT": {
      return { count: state.count + action.num };
    }
    case "DECEREMENT": {
      return { count: state.count - action.num };
    }
    case "SELECTCITY": {
      return { ...state, CITY: action.city, CITYID: action.cityId };
    }
    case "SET_CURRENT_LOGIN": {
      storeCurrentLogin(action.currentLogin);
       console.log('reducer',action.currentLogin);
      return { ...state, CURRENT_LOGIN: action.currentLogin };
    }
    case "LOGOUT": {
      storeCurrentLogin(null);
      // console.log('reducer',CURRENT_LOGIN,action);
      return { ...state, CURRENT_LOGIN: null };
    }
    case "SET_USER_INFORMATION": {
      return { ...state, NAME: action.name,FAMILY:action.family };
    }

    default:
      return state;
  }
}

const store = createStore(reducer);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Stack = createStackNavigator();

const Circle = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.01, 0.5, 0.501, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          backgroundColor: containerBg,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 100,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}></View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const App = () => {
  const [IsReady, SetIsReady] = useState(false);
  const animatedValue = React.useRef(new Animated.Value(0)).current;
  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });

  const [index, setIndex] = React.useState(0);

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  const checkConnectivity = () => {
    return new Promise((resolve) => {
      // For Android devices
      if (Platform.OS === "android" || Platform.OS === "web") {
        NetInfo.fetch().then((state) => {
          resolve(state.isInternetReachable);
        });
      } else {
        // For iOS devices
        console.log(Platform.OS);
        const unsubscribe = NetInfo.addEventListener((state) => {
          unsubscribe();
          resolve(state.isInternetReachable);
        });
      }
    });
  };

  const LoadFonts = async () => {
    await useFonts();
  };

  const CheckCurrnetLogin = async () => {
    await useFonts();
  };

  const hasInternet = checkConnectivity();

  if (hasInternet == false) {
    console.log("internet", hasInternet);
    return <div>No Internet</div>;
  }

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <Provider store={store}>
      {/* <View style={styles.container}>
        <StatusBar style="auto" hidden />
        <Circle onPress={onPress} animatedValue={animatedValue} />
      </View>  */}

      <NavigationContainer theme={theme}>
        <Stack.Navigator initialRouteName={"Onboarding"}>
          {/* Screens  */}
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{
              title: null,
              headerTransparent: true,
              headerShown: false,
              headerStyle: {
                backgroundColor: COLORS.persian_Green,
              },
              headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Pressed")}
                >
                  <Image
                    source={icons.barMenu}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePassword"
            component={UpdatePassword}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Token"
            component={Token}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdatePasswordToken"
            component={UpdatePasswordToken}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExpertDetail"
            component={ExpertDetail}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <FiMoreHorizontal size={30} color={COLORS.purple_light} />
                </TouchableOpacity>
              ),
             
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PreviewTicket"
            component={PreviewTicket}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <FiMoreHorizontal size={30} color={COLORS.purple_light} />
                </TouchableOpacity>
              ),
             
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="VisitAppointment"
            component={VisitAppointment}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <FiMoreHorizontal size={30} color={COLORS.purple_light} />
                </TouchableOpacity>
              ),
             
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: false,
              // headerLeft: ({ onPress }) => (
              //   <TouchableOpacity
              //     style={{ marginLeft: SIZES.padding }}
              //     onPress={onPress}
              //   >
              //     <Image
              //       source={icons.back}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity
              //     style={{ marginRight: SIZES.padding }}
              //     onPress={() => console.log("Menu")}
              //   >
              //     <Image
              //       source={icons.menu}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: false,
              // headerLeft: ({ onPress }) => (
              //   <TouchableOpacity
              //     style={{ marginLeft: SIZES.padding }}
              //     onPress={onPress}
              //   >
              //     <Image
              //       source={icons.back}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity
              //     style={{ marginRight: SIZES.padding }}
              //     onPress={() => console.log("Menu")}
              //   >
              //     <Image
              //       source={icons.menu}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Regulation"
            component={Regulation}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: false,
              // headerLeft: ({ onPress }) => (
              //   <TouchableOpacity
              //     style={{ marginLeft: SIZES.padding }}
              //     onPress={onPress}
              //   >
              //     <Image
              //       source={icons.back}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
              // headerRight: () => (
              //   <TouchableOpacity
              //     style={{ marginRight: SIZES.padding }}
              //     onPress={() => console.log("Menu")}
              //   >
              //     <Image
              //       source={icons.menu}
              //       resizeMode="contain"
              //       style={{
              //         width: 25,
              //         height: 25,
              //       }}
              //     />
              //   </TouchableOpacity>
              // ),
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Appointment"
            component={Appointment}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
              // headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <FiMoreHorizontal size={30} color={COLORS.purple_light} />
                </TouchableOpacity>
              ),
            }}
            // options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Category"
            component={Tab6}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: null,
              headerShown: false,
              headerRight: null,
            }}
          />

          {/* Tabs  */}
          <Stack.Screen
            name="Home"
            component={Tab6}
            options={{
              title: null,
              headerTransparent: true,
              headerStyle: styles.header_style,
              headerShown: true,
              headerLeft: ({ onPress }) => (
                <TouchableOpacity
                  style={{ marginLeft: SIZES.padding }}
                  onPress={onPress}
                >
                  <FiChevronLeft
                    size={25}
                    color={COLORS.white}
                    style={{
                      backgroundColor: COLORS.purple_light,
                      borderRadius: 5,
                      padding: 2,
                    }}
                  />
                </TouchableOpacity>
              ),
              // headerLeft: null,
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: SIZES.padding }}
                  onPress={() => console.log("Menu")}
                >
                  <FiMoreHorizontal size={30} color={COLORS.purple_light} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <FlashMessage position="top" />
      {/* <--- here as last component */}
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  circleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    paddingBottom: 10,
    backgroundColor: "gold",
  },
  circle: {
    backgroundColor: "#444",
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  header_style: {
    height: "50px",
    backgroundColor: "green",
    textAlign: "center",
  },
});

export default () => {
  return <App />;
};
