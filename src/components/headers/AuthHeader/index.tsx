import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors, Typography } from "../../../constant";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { mediumEmphasisOpacity } from "../../../constant/typography";
import Animated, { FadeInUp } from "react-native-reanimated";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  title,
  subtitle,
  containerStyle,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={{ flex: 1 }}>
        <Animated.View entering={FadeInUp.duration(300)}>
          <Text style={styles.title}>{title}</Text>
        </Animated.View>
        <Animated.View entering={FadeInUp.delay(200).duration(400)}>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </Animated.View>
      </View>
      {navigation.canGoBack() && (
        <View>
          <TouchableOpacity onPress={navigation.goBack}>
            <Feather name="x" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2.4),
    marginTop: Platform.OS == "android" ? hp(1.5) : 0,
    flexDirection: "row",
  },
  title: {
    color: "#fff",
    fontSize: hp(4.5),
    fontFamily: Typography.FONT_BOLD,
  },
  subtitle: {
    color: "#fff",
    fontSize: hp(2.5),
    marginTop: 0,
    fontFamily: Typography.FONT_LIGHT,
    opacity: mediumEmphasisOpacity,
  },
});
