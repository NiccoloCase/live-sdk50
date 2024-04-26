import React, { useEffect, useMemo, useState } from "react";
import { useStoreActions } from "../../../store";
import { Colors, Spacing } from "../../../constant";
import { MyText } from "../../Text";
import { TouchableHighlight, TouchableOpacity, View } from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Constants from "expo-constants";
import { Inline } from "../../Inline";

import { FontAwesome } from "@expo/vector-icons";
import { timeBetweenDates } from "../../../helper/format";
import { Interaction } from "../../../generated/graphql";
import { INTERACTION_EXPIRATION_TIME } from "../../../config";
import { navigate } from "../../../navigation";

interface InteractionNotificationCradProps {
  interaction: Interaction;
  visibile: boolean;
}
export const InteractionNotificationCrad: React.FC<
  InteractionNotificationCradProps
> = ({ interaction, visibile }) => {
  const removeInteraction = useStoreActions(
    (a) => a.interactions.removeInteraction
  );

  console.log("interaction", interaction, "visibile", visibile);

  const [coutdown, setCoutdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    // cowndown
    updateCoutdown();
    const interval = setInterval(() => {
      updateCoutdown();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [interaction]);

  useEffect(() => {
    if (!visibile) return;
    const timeout = setTimeout(() => {
      removeInteraction(interaction.id);
      setCoutdown(null);
    }, 4 * 1000);
    return () => clearInterval(timeout);
  }, [visibile, interaction]);

  const updateCoutdown = () => {
    const date = new Date(interaction.createdAt);
    date.setSeconds(date.getSeconds() + INTERACTION_EXPIRATION_TIME);
    const res = timeBetweenDates(date);
    if (res.seconds <= 0 && res.minutes <= 0) {
      removeInteraction(interaction.id);
      setCoutdown(null);
      return;
    }
    setCoutdown(res);
  };

  const coutdonwText = useMemo(() => {
    if (!coutdown) return null;

    let s = coutdown?.seconds;

    return `${coutdown?.minutes}:${s < 10 ? `0${s}` : s}`;
  }, [coutdown]);

  return (
    <>
      {visibile && (
        <Animated.View
          entering={SlideInRight.duration(200)}
          exiting={SlideOutLeft.duration(200)}
          style={{
            zIndex: 10,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderRadius: 20,
          }}
        >
          <TouchableHighlight
            onPress={() => {
              navigate("RadarTab", {
                screen: "Interaction",
                params: {
                  interaction,
                  fromNotification: true,
                },
              });
              removeInteraction(interaction.id);
            }}
          >
            <View
              style={{
                paddingHorizontal: Spacing.screenHorizontalPadding,
                paddingVertical: heightPercentageToDP(2.5),
                marginTop: Constants.statusBarHeight,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: Colors.whiteSmoke,
                }}
              />

              <Inline>
                <MyText
                  bold
                  size="title"
                  style={{ minWidth: 80 }}
                  color={Colors.primary}
                >
                  {coutdonwText}
                </MyText>
                <View style={{ flex: 1 }}>
                  <MyText bold dark numberOfLines={1}>
                    {interaction.author?.username} ti ha notato
                  </MyText>

                  <MyText dark>Hai 1 minuto per ricambiare! </MyText>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    removeInteraction(interaction.id);
                  }}
                >
                  <FontAwesome name="close" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </Inline>
            </View>
          </TouchableHighlight>
        </Animated.View>
      )}
    </>
  );
};
