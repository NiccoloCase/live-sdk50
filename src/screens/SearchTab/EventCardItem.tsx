//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Event } from "../../generated/graphql";
import { MyText } from "../../components/Text";
import { Colors } from "../../constant";
import { MyImage, MyDeliveryH } from "../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import {
  formatCurrency,
  formatDate,
  formatShortDay,
} from "../../helper/format";
import { DottedLine } from "../../components/DottedLine";
import { Inline } from "../../components/Inline";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInUp,
  ZoomIn,
  combineTransition,
} from "react-native-reanimated";

const borderColor = Colors.backgroundLightBright;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface SearchEventCardItemProps {
  item: Event;
  width: number;
  index: number;
}

const HOLE_SIZE = 30;

const _SearchEventCardItem: React.FC<SearchEventCardItemProps> = ({
  item,
  width,
  index,
}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: borderColor,
        paddingHorizontal: 5,
        width,
        paddingVertical: 5,
        marginBottom: heightPercentageToDP(3),
      }}
    >
      <AnimatedTouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Event", {
            screen: "EventScreen",
            params: {
              eventId: item.id,
              preload: item,
            },
          });
        }}
        entering={FadeInUp.delay(index * 100)}
      >
        <Animated.View
          //  entering={ZoomIn}
          style={{
            marginBottom: 10,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <MyImage
            url={item.image?.url}
            blurhash={item.image?.blurhash}
            style={{ aspectRatio: 1, width: "100%" }}
            height={MyDeliveryH.eventImage.small}
          />
        </Animated.View>

        <View
          style={{
            position: "relative",

            flex: 1,
          }}
        >
          <View
            style={{
              overflow: "hidden",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderStyle: "dotted",
                borderColor: Colors.darkGrey,
                height: 20,
                width: "100%",
                marginTop: -20 + 2,
                opacity: 0.2,
              }}
            />
          </View>

          <View
            style={{
              position: "absolute",
              top: -HOLE_SIZE / 2,
              right: -HOLE_SIZE / 2 - 10,
              backgroundColor: Colors.backgroundDark,
              width: HOLE_SIZE,
              aspectRatio: 1,
              borderRadius: 20,
              zIndex: 100,
              borderStartWidth: 1,
              borderWidth: 1,
              borderColor: borderColor,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: -HOLE_SIZE / 2,
              right: -HOLE_SIZE / 2 - 10 - 1,
              backgroundColor: Colors.backgroundDark,
              height: HOLE_SIZE,
              width: 20,
              aspectRatio: 1,
              zIndex: 100,
              borderStartWidth: 1,
            }}
          />

          <View style={{ padding: 10 }}>
            <Inline>
              <View style={{ flex: 1 }}>
                <MyText bold size="small">
                  {formatDate(item.date)}
                </MyText>
              </View>
              <MyText bold mediumEmphasis size="small">
                20{formatCurrency("EUR")}
              </MyText>
            </Inline>

            <MyText bold style={{ marginTop: heightPercentageToDP(0.5) }}>
              {item.title}
            </MyText>

            <MyText mediumEmphasis light size="small" style={{ marginTop: 5 }}>
              {item.location?.locationText
                .split(",")
                // rimuove l'ultimo elemento
                .slice(0, -1)
                // lascia solo gli ultimi due elementi
                .slice(-2)
                .join(", ")
                // rimuove lo spazio iniziale
                .trim()}
            </MyText>
          </View>
        </View>
      </AnimatedTouchableOpacity>
      <View
        style={{
          backgroundColor: Colors.backgroundDark,
          top: 0,
          right: -HOLE_SIZE - 1,
          bottom: 0,
          width: HOLE_SIZE,

          position: "absolute",
        }}
      ></View>
    </View>
  );
};

export const SearchEventCardItem = React.memo(
  _SearchEventCardItem,
  (prev, next) => {
    if (prev.item.id !== next.item.id) return false;
    return true;
  }
);

const styles = StyleSheet.create({});
