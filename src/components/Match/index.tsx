import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import { MyText } from "../Text";
import Lottie from "lottie-react-native";
import { Colors } from "../../constant";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  ZoomIn,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Vibration } from "react-native";

const CLOSE_BTN_SIZE = heightPercentageToDP(3);

interface MatchDialogProps {
  onDismiss: () => void;
}

export const MatchDialog: React.FC<MatchDialogProps> = ({ onDismiss }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<StackNavigationProp<any>>();

  useEffect(() => {
    Vibration.vibrate(500);
  }, []);

  // TODO VIBRAZIONE
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(800)}
    >
      <Lottie
        source={require("../../../assets/lottie/confetti1.json")}
        autoPlay
        loop={true}
        style={{
          width: Math.min(width, height),
          height: Math.min(width, height),
        }}
      />

      <View
        style={{
          position: "absolute",
          top: insets.top + CLOSE_BTN_SIZE,
          right: CLOSE_BTN_SIZE,
          zIndex: 100,
        }}
      >
        <TouchableOpacity onPress={onDismiss}>
          <FontAwesome name="times" size={CLOSE_BTN_SIZE} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Animated.View entering={ZoomIn.duration(600).delay(200).springify()}>
          <MyText size="title" bold>
            Hai fatto Match!
          </MyText>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(700)}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.replace("LimitMatches")}
          >
            <MyText dark>Vedi</MyText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundDark,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: heightPercentageToDP(5),
    backgroundColor: "#fff",
    paddingHorizontal: heightPercentageToDP(3),
    paddingVertical: heightPercentageToDP(2),
    borderRadius: 20,
  },
});
