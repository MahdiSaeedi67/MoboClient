import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { icons, COLORS, FONTS, SIZES } from "../constants";

const StarReview = ({ style,rate, vote, small }) => {
  var starComponents = [];
  var fullStar = Math.floor(rate);
  var noStar = Math.floor(5 - rate);
  var halfStar = 5 - fullStar - noStar;

  // Full Star
  for (var i = 0; i < fullStar; i++) {
    starComponents.push(
      <Image
        key={`full-${i}`}
        source={icons.starFull}
        resizeMode="cover"
        style={{
          width: 15,
          height: 15,
        }}
      />
    );
  }

  // Half Star
  for (var i = 0; i < halfStar; i++) {
    starComponents.push(
      <Image
        key={`half-${i}`}
        source={icons.starHalf}
        resizeMode="cover"
        style={{
          width: 15,
          height: 15,
        }}
      />
    );
  }

  // No Star
  for (var i = 0; i < noStar; i++) {
    starComponents.push(
      <Image
        key={`empty-${i}`}
        source={icons.starEmpty}
        resizeMode="cover"
        style={{
          width: 15,
          height: 15,
        }}
      />
    );
  }
  return (
    <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'center' }}>
      {!small && (
        <Text
          style={{
            // marginRight: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
          }}
        >
         {" "}از{" "}{vote}{" "}نظر
        </Text>
      )}
      {starComponents}
      { (
        <Text
          style={{
            // marginLeft: SIZES.base,
            color: COLORS.white,
            ...FONTS.body4,
          }}
        >
          {" "}{rate}
        </Text>
      )}
    </View>
  );
};

export default StarReview;
