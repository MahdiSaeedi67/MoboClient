import React from "react";
import { Image, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import { Home } from "../screens/";

import { icons, COLORS } from "../constants";
import { setStatusBarBackgroundColor } from "expo-status-bar";


const Tab = createBottomTabNavigator();

const tabOptions = {
  showLabel: false,
  style: {
    height: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
    
  },
};

const screenOptions = {
    headerShown:false
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? COLORS.primary : COLORS.gray;

          switch (route.name) {
            case "Home":
              return (
                <Image
                  source={icons.home}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
              case "Search":
              return (
                <Image
                  source={icons.search}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Bookmark":
              return (
                <Image
                  source={icons.location}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
            case "Account":
              return (
                <Image
                  source={icons.user}
                  resizeMode="contain"
                  style={{
                    tintColor: tintColor,
                    width: 30,
                    height: 30,
                  }}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen options={screenOptions} name="Home" component={Home} />
      <Tab.Screen options={screenOptions}  name="Search" component={Home} />
      <Tab.Screen options={screenOptions}  name="Bookmark" component={Home} />
      <Tab.Screen options={screenOptions}  name="Account" component={Home} />
    </Tab.Navigator>
  );
};

export default Tabs;
