//import liraries
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MyImage } from "../../../components/Image";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Spacing } from "../../../constant";
import { MyText } from "../../../components/Text";
import hexToRgba from "hex-to-rgba";
import { BlurView } from "@react-native-community/blur";
import { Inline } from "../../../components/Inline";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { getDistanceFromLatLonInMeters } from "../../../helper/geo";

const BORDER_RADIUS = 20;

interface RegionCardProps {
  disabled?: boolean;
}

export const RegionCard: React.FC<RegionCardProps> = ({ disabled }) => {
  const navigation = useNavigation();
  const [distance, setDistance] = React.useState<number | null>(null);

  useEffect(() => {
    Location.getCurrentPositionAsync()
      .then((location) => {
        const distance = getDistanceFromLatLonInMeters(
          location.coords.longitude,
          location.coords.latitude,
          11.248632,
          43.768732
        );
        if (distance) setDistance(distance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const distanceText = React.useMemo(() => {
    if (distance) {
      if (distance < 1000) {
        return `${distance.toFixed(0)}m da te`;
      } else {
        return `${(distance / 1000).toFixed(2)}km da te`;
      }
    }
    return null;
  }, [distance]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("DiscoverRegionScreen");
      }}
    >
      <View style={{ marginRight: widthPercentageToDP(3) }}>
        <View style={{ borderRadius: BORDER_RADIUS, overflow: "hidden" }}>
          <MyImage
            url="https://static.destinationflorence.com/immagini/ba/25/62/db/header_cittadino_20180529171819.jpg"
            style={{
              height: heightPercentageToDP(20),
              aspectRatio: 16 / 9,
            }}
            height={100}
          />

          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                //  flexDirection: "column-reverse",
                padding: 15,
                backgroundColor: hexToRgba("#000", 0.5),
              },
            ]}
          >
            <View style={{ flex: 1 }}>
              <MyText
                bold
                size="big"
                style={{
                  textShadowColor: "#000",
                  textShadowOffset: { width: 0, height: 3 },
                  textShadowRadius: 20,
                  elevation: 10,
                }}
              >
                Santo Spirito
              </MyText>
              <MyText mediumEmphasis>Via Santo Spirito, FI</MyText>
            </View>
            <Inline>
              <View
                style={{
                  backgroundColor: hexToRgba("#fff", 0.3),
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                {distance && (
                  <MyText bold size="small">
                    {distanceText}
                  </MyText>
                )}
              </View>
            </Inline>
          </View>
        </View>

        {disabled && (
          <BlurView
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: BORDER_RADIUS,
              },
            ]}
            blurType="light"
            blurAmount={5}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.screenHorizontalPadding,
  },
});
