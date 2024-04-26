import React, { Component, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "rn-range-slider";
import { MyText } from "../../components/Text";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constant";
import { Inline } from "../../components/Inline";

const RAIL_HEIGHT = heightPercentageToDP(2.9);
const THUMB_SIZE = heightPercentageToDP(3.6);
const RAIL_BORDER_RADIUS = 12;

const Thumb = () => {
  return (
    <View>
      <View
        style={{
          height: THUMB_SIZE,
          aspectRatio: 1,
          borderRadius: 12,
          backgroundColor: Colors.whiteSmoke,
        }}
      />
    </View>
  );
};

const Rail = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: RAIL_HEIGHT,
          backgroundColor: Colors.backgroundLightBright,
          borderRadius: RAIL_BORDER_RADIUS,
        }}
      />
    </View>
  );
};

const RailSelected = () => {
  return (
    <View>
      <LinearGradient
        style={{
          height: RAIL_HEIGHT,
          borderRadius: RAIL_BORDER_RADIUS,
        }}
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
};

const Label: React.FC<{ text: string }> = ({ text }) => {
  return null;
  return (
    <View style={{}}>
      <FontAwesome5
        name="map-marker"
        size={heightPercentageToDP(5)}
        color={Colors.whiteSmoke}
      />

      <View
        style={{
          position: "absolute",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <MyText dark size="small" bold style={{ marginBottom: 10 }}>
          {text}
        </MyText>
      </View>
    </View>
  );
};

const Notch = () => {
  return null;
};

const RangeSlider = () => {
  const [value, setValue] = React.useState(20);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: string) => <Label text={value} />,
    []
  );
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low: number, high: number) => {
    setValue(low);
  }, []);

  return (
    <Inline style={{ width: "100%" }}>
      <Inline style={{}}>
        {/* <View style={{ flex: 1 }}>
          <MyText mediumEmphasis size="small" bold>
            Raggio
          </MyText>
        </View> */}

        <Inline>
          <MyText
            style={{
              fontSize: heightPercentageToDP(3.8),
              minWidth:
                value < 10 ? widthPercentageToDP(7) : widthPercentageToDP(12),
            }}
            bold
          >
            {value}
          </MyText>
          <MyText
            mediumEmphasis
            style={{
              fontSize: heightPercentageToDP(3),
            }}
            bold
          >
            km
          </MyText>
        </Inline>
      </Inline>

      <View style={{ flex: 1 }}>
        <Slider
          min={0}
          max={100}
          step={1}
          low={value}
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel as any}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
          disableRange={true}
          style={
            {
              //   marginHorizontal: -THUMB_SIZE / 2,
            }
          }
        />
      </View>
    </Inline>
  );
};

const styles = StyleSheet.create({});

export default RangeSlider;
