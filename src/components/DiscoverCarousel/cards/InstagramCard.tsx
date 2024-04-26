import React, { useEffect, useMemo } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { MyText } from "../../Text";
import { Colors, Spacing } from "../../../constant";
import { ImageBackground } from "react-native";
import { useTranslation } from "react-i18next";
import AnimatedLottieView from "lottie-react-native";
import { Inline } from "../../Inline";
import { BlurView } from "@react-native-community/blur";
import { Bubble } from "../../Bubble";
import { Blurhash } from "react-native-blurhash";

export const InstagramCard = () => {
  const navigation = useNavigation();
  const { t } = useTranslation("components");

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("RadarTab", {
          screen: "SetInstagramScreen",
          initial: false,
        });
      }}
    >
      <View style={styles.box}>
        {Platform.OS === "ios" ? (
          <>
            <Bubble
              colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
              bottom={-20}
              left={-20}
            />
            <BlurView
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              blurType="dark"
              blurAmount={20}
              overlayColor="transparent"
            />
          </>
        ) : (
          <>
            <Bubble
              colors={["#feda75", "#fa7e1e", "#d62976", "#962fbf", "#4f5bd5"]}
              top={-10}
              left={-20}
              opacity={0.5}
              offsetX={0.5}
              offsetY={0.5}
              startScale={1}
              endScale={1.1}
            />
            <Blurhash
              blurhash="LaP_L@%BAe#S0uECk8bpC6Kir=WB"
              style={[StyleSheet.absoluteFillObject, { opacity: 0.2 }]}
            />
          </>
        )}

        <Inline>
          <AnimatedLottieView
            source={require("../../../../assets/lottie/ig2.json")}
            autoPlay
            loop={false}
            style={{
              aspectRatio: 1,
              height: heightPercentageToDP(4),
              marginRight: wp(3),
            }}
            duration={2000}
          />

          <View style={{ flex: 1 }}>
            <MyText bold color={Colors.whiteSmoke}>
              {/* {t("discover-carousel.complete-profile-card.title")} */}
              Collega il tuo profilo Instagram
            </MyText>
            <MyText
              mediumEmphasis
              size="small"
              style={{ marginTop: heightPercentageToDP(0.45) }}
            >
              Condividi il tuo profilo Instagram alle persone che incontri
            </MyText>
          </View>
        </Inline>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  box: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 15,
    width: "100%",
    height: "100%",
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    justifyContent: "center",
    overflow: "hidden",
  },
});
