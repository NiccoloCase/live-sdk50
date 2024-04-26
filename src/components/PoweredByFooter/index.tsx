//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Inline } from "../Inline";
import { MyText } from "../Text";
import { heightPercentageToDP } from "react-native-responsive-screen";

const PoweredByFooter = () => {
  return (
    <Inline
      style={{ justifyContent: "center", height: heightPercentageToDP(6) }}
    >
      <MyText bold size="small">
        Powered by{" "}
      </MyText>
      <View>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{
            height: heightPercentageToDP(4),
            aspectRatio: 431 / 231,
            marginTop: 2.5,
          }}
          resizeMode="contain"
        />
      </View>
    </Inline>
  );
};

export default React.memo(PoweredByFooter);
