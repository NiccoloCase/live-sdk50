import React, { useEffect } from "react";
import { useStoreActions } from "../../../store";
import { Colors, Spacing } from "../../../constant";
import { MyText } from "../../Text";
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Constants from "expo-constants";
import { Inline } from "../../Inline";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Lottie from "lottie-react-native";
import { navigate } from "../../../navigation";

interface ReplayNotificationCradProps {
  interactionId: string;
  username: string;
  image: string;
  visibile: boolean;
  instagramName: string;
}
export const ReplayNotificationCrad: React.FC<ReplayNotificationCradProps> = ({
  interactionId,
  visibile,
  username,
  image,
  instagramName,
}) => {
  const removeReplay = useStoreActions((a) => a.interactions.removeReply);

  useEffect(() => {
    if (!visibile) return;
    const timeout = setTimeout(() => {
      removeReplay(interactionId);
    }, 4 * 1000);
    return () => clearInterval(timeout);
  }, [visibile, interactionId]);

  return (
    <>
      {visibile && (
        <>
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
                  screen: "AcceptedInteraction",
                  params: {
                    username: username,
                    instaName: instagramName,
                    image: image,
                  },
                });
                removeReplay(interactionId);
              }}
            >
              <View
                style={{
                  paddingHorizontal: Spacing.screenHorizontalPadding,
                  paddingVertical: heightPercentageToDP(2.5),
                  marginTop: Constants.statusBarHeight,
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
                    borderRadius: 20,
                  }}
                />

                <Inline>
                  {visibile && (
                    <Lottie
                      source={require("../../../../assets/lottie/confetti1.json")}
                      style={{
                        //backgroundColor: "red",
                        position: "absolute",
                        width: "100%",
                        aspectRatio: 1,
                      }}
                      autoPlay
                      loop={false}
                    />
                  )}

                  <View style={{ flex: 1, paddingRight: 5 }}>
                    <MyText bold dark>
                      {username} ha ricambiato la tua interazione!
                    </MyText>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      removeReplay(interactionId);
                    }}
                  >
                    <FontAwesome
                      name="close"
                      size={24}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </Inline>
              </View>
            </TouchableHighlight>
          </Animated.View>
        </>
      )}
    </>
  );
};
