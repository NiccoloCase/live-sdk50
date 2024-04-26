import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "../../../navigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { Colors } from "../../../constant";
import { keys } from "../../../config";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MyText } from "../../../components/Text";
import { useTranslation } from "react-i18next";
import { Video, ResizeMode } from "expo-av";
import Costants from "expo-constants";
import { BlurView } from "expo-blur";

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeIn.delay(80).duration(600)}
        style={{
          ...StyleSheet.absoluteFillObject,
          bottom: 80,
          backgroundColor: Colors.backgroundDark,
        }}
      >
        {/* <Video
          style={{ flex: 1 }}
          source={require("../../../../assets/videos/radar.mp4")}
          shouldPlay
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping={false}
          isMuted={true}
        /> */}
      </Animated.View>

      <SafeAreaView style={styles.content}>
        <View
          style={{
            flex: 1,

            paddingTop:
              (Platform.OS === "android" ? Costants.statusBarHeight : 0) +
              heightPercentageToDP(2),
            alignItems: "center",
          }}
        >
          <MyText bold>
            {t("welcome-screen:title", { APP_NAME: keys.APP_NAME })}
          </MyText>
        </View>

        <View
          style={{
            backgroundColor: Colors.backgroundDark,
            paddingHorizontal: hp(2.5),
            paddingVertical: hp(3),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            overflow: "hidden",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={styles.button}
          >
            <MyText bold dark size="big">
              {t("welcome-screen:start")}
            </MyText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  content: {
    justifyContent: "flex-end",

    // paddingTop: hp(5),
    flex: 1,
    // marginHorizontal: hp(2.5),
  },
  heroText: {
    fontSize: 36,
    marginBottom: hp(2),
  },
  button: {
    height: hp(8.5),
    marginVertical: hp(1),
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.whiteSmoke,
  },
  link: { marginTop: hp(2.2), alignItems: "center" },
});
