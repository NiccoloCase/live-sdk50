import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Typography } from "../../constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigateToUserProfile } from "../../navigation/utils";
import { ProfilePicture } from "../ProfilePicture";
import { StyleProp } from "react-native";
import { Inline } from "../Inline";
import { MyText } from "../Text";

interface UserCardProps {
  index: number;
  username: string;
  id: string;
  profileImage?: string;
  resultsLength: number;
  leftSide?: React.ReactNode;
  usernamesRight?: React.ReactNode;
  hideDivider?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const UserCard: React.FC<UserCardProps> = ({
  index,
  id,
  username,
  profileImage,
  resultsLength,
  leftSide,
  usernamesRight,
  hideDivider,
  containerStyle,
}) => {
  const navigateToUser = useNavigateToUserProfile();

  return (
    <TouchableOpacity
      key={id}
      style={[
        styles.userCard,
        {
          borderBottomWidth: index === resultsLength - 1 || hideDivider ? 0 : 1,
        },
        containerStyle,
      ]}
      onPress={() => navigateToUser(id)}
    >
      <ProfilePicture url={profileImage} radius={hp(3.5)} />
      <Inline style={styles.userCardLeft}>
        <MyText bold numberOfLines={1}>
          {username}
        </MyText>
        {usernamesRight}
      </Inline>
      {leftSide && (
        <View style={{ marginLeft: widthPercentageToDP(1.5) }}>{leftSide}</View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    borderBottomColor: "#303030",
    borderBottomWidth: 1.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: hp(1),
  },
  userCardLeft: {
    marginLeft: 10,
    flex: 1,
  },
});
