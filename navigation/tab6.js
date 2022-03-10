import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Category, Account, Province } from "../screens";
import { FONTS, icons, COLORS } from "../constants";
import Icon, { Icons } from "../components/Icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";

const SearchExpertForm = (onSearch) => {
  console.log('1111',onSearch)
  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder={"نام ,دسته , عنوان شغل"}
        onChange={onSearch}
        //onChange={(e) => {
          
          //setSearchText(e.target.value);
        //}}
      ></TextInput>
    </>
  );
};

const TabArr = [
  {
    route: "خانه",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "home",
    inActiveIcon: "home-outline",
    tabBarColor: COLORS.fiery_Rose,
    tabColor: COLORS.fiery_Rose,
    component: Home,
  },
  {
    route: "تهران",
    label: "Like",
    type: Icons.Ionicons,
    activeIcon: "location",
    inActiveIcon: "location-outline",
    tabBarColor: COLORS.medium_Turquoise,
    tabColor: COLORS.medium_Turquoise,
    component: Province,
  },
  {
    route: "جستجو",
    label: "Search",
    type: Icons.Ionicons,
    activeIcon: "search",
    inActiveIcon: "search-outline",
    tabBarColor: COLORS.naples_Yellow,
    tabColor: COLORS.naples_Yellow,
    component: Category,
    form: SearchExpertForm,
  },
  {
    route: "حساب کاربری",
    label: "Account",
    type: Icons.Ionicons,
    activeIcon: "person",
    inActiveIcon: "person-outline",
    tabBarColor: COLORS.coral,
    tabColor: COLORS.coral,
    component: Account,
  },
];
  

const { width } = Dimensions.get("window");
const MARGIN = 3;
const TAB_BAR_WIDTH = width-1;
const TAB_WIDTH = TAB_BAR_WIDTH / TabArr.length;
  

function MyTabBar({ state, descriptors, navigation }) {
  const [translateX] = useState(new Animated.Value(0));
  const [formPosition] = useState(new Animated.Value(0));
  const [formHeight] = useState(new Animated.Value(0));

  const translateTab = (tab, index) => {
    console.log("tab", tab.form);
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start(() => {
      if (tab.form) {
        openForm();
      } else {
        closeForm();
      }
    });
  };

  const openForm = () => {
    Animated.spring(formPosition, {
      toValue: -70,
      useNativeDriver: true,
    }).start();
    Animated.spring(formHeight, {
      toValue: 65,
      useNativeDriver: true,
    }).start();
  };

  const closeForm = () => {
    Animated.spring(formPosition, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(formHeight, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    translateTab(TabArr[state.index], state.index);
  }, [state.index]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBarContainer}>
        <View style={styles.slidingTabContainer}>
          <Animated.View
            style={[
              styles.slidingTab,
              {
                transform: [{ translateX }],
                backgroundColor: TabArr[state.index].tabBarColor,
              },
            ]}
          />
        </View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const tabBarIcon = options.tabBarIcon;

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center" }}
              key={index}
            >
              <TabIcon
                tabIcon={tabBarIcon}
                isFocused={isFocused}
                label={label}
                tabColor={options.tabColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const TabIcon = ({ isFocused, tabIcon, label, tabColor }) => {
  const [translateY] = useState(new Animated.Value(0));

  const translateIcon = (val) => {
    Animated.spring(translateY, {
      toValue: val,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (isFocused) {
      translateIcon(-14); //move up
    } else {
      translateIcon(0); //centered
    }
  }, [isFocused]);

  return (
    <>
      <Animated.View style={{ transform: [{ translateY }] }}>
        <Icon
          name={isFocused ? tabIcon.activeIcon : tabIcon.inActiveIcon}
          type={tabIcon.type}
          size={26}
          color={isFocused ? COLORS.white : tabColor}
        />
      </Animated.View>

      <Text
        style={{ ...FONTS.h5, color: isFocused ? COLORS.white : "#C0A9F6" }}
      >
        {label}
      </Text>
    </>
  );
};

const Tab = createBottomTabNavigator();

function mapStateToProps(state) {
  return {
    CITY: state.CITY,
  };
}

const Tab6=(props)=> {

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      {TabArr.map((_, index) => {
        return (
          <Tab.Screen
            key={index}
            name={index!==1?_.route:props.CITY}
            component={_.component}
            options={{
              tabBarColor: _.tabBarColor,
              tabColor: _.tabColor,
              tabBarIcon: {
                activeIcon: _.activeIcon,
                inActiveIcon: _.inActiveIcon,
                type: _.type,
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default connect(mapStateToProps)(Tab6)

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    
    //width: TAB_BAR_WIDTH,
    width:'100%',
    height: 60,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor:'transparent'

  },
  tabBarContainer: {
    flexDirection: "row",
    flex:1,
    width:'100%',
    //width: TAB_BAR_WIDTH,
    height: 60,
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    justifyContent: "space-around",
    backgroundColor: "#6C51B1",
    borderTopStartRadius:13,
    borderTopEndRadius:13,
  },
  slidingTabContainer: {
    width: TAB_WIDTH,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor:COLORS.gray,
    alignItems: "center",
  },
  slidingTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    bottom: 33,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
});
