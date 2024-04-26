import React, { useMemo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Badge } from "../../Badge";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { useWhoamiQuery } from "../../../generated/graphql";
import { useNavigation } from "@react-navigation/native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const RADIUS = hp(0.8);

interface ActivityTabButtonProps {
  color: string;
  size: number;
}

export const NotificationsTabButton: React.FC<ActivityTabButtonProps> = ({
  color,
  size,
}) => {
  const { data } = useWhoamiQuery();

  const hasBadge = useMemo(() => {
    if (!data || !data.whoami.notifications) return false;
    const count = data.whoami.notifications.filter((x) => !x.seen).length;
    return count > 0;
  }, [data]);

  return (
    <View>
      <FontAwesome5 name="heart" size={size} color={color} />
      {hasBadge && (
        <View
          style={[
            styles.badge,
            {
              bottom: 0 - RADIUS - 2,
              right: size / 2 - RADIUS / 2,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: "relative" },
  badge: {
    position: "absolute",

    aspectRatio: 1,
    width: RADIUS,
    backgroundColor: Colors.secondary,
    borderRadius: hp(1),
  },
});
