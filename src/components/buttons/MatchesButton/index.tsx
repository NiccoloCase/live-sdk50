import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "../../Badge";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { useGetMatchesQuery } from "../../../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import { Inline } from "../../Inline";
import Animated, { FadeInUp } from "react-native-reanimated";

export const MatchesButton = () => {
  const { data } = useGetMatchesQuery({ fetchPolicy: "cache-and-network" });
  const navigation = useNavigation();

  const matchsCount = useMemo(() => {
    // rimuove gli uenti doppioni (in caso di bug al server)
    const array = data?.getMatches.filter((item, index, self) => {
      return self.findIndex((t) => t.user.id === item.user.id) === index;
    });
    return array?.length || 0;
  }, [data]);

  return (
    <Inline>
      <TouchableOpacity
        onPress={() => navigation.navigate("DiscoverMatchesScreen")}
        style={styles.wrapper}
      >
        <Feather name="heart" size={hp(3.3)} color="#fff" />
        {matchsCount > 0 && (
          <Badge text={String(matchsCount)} style={styles.badge} />
        )}
      </TouchableOpacity>

      {/* <Animated.View entering={FadeInUp.delay(200)}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ScannerScreen")}
          style={[styles.wrapper, { marginLeft: wp(2.2) }]}
        >
          <Ionicons name="md-scan-sharp" size={hp(3.3)} color="#fff" />
        </TouchableOpacity>
      </Animated.View> */}
    </Inline>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: "relative" },
  badge: {
    position: "absolute",
    top: hp(1),
    right: -hp(1),
    borderColor: Colors.backgroundDark,
    borderWidth: 1.5,
  },
});
