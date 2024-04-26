import react, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { User } from "../../generated/graphql";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { MyImage, MyDeliveryH } from "../../components/Image";
import { use } from "i18next";
import { MyText } from "../../components/Text";
import { validationConfig } from "../../config";
import { Inline } from "../../components/Inline";

const MAX_FIRENDS_PREVIEW = 4;

interface EventFeedFriendsCardProps {
  friends: Partial<User>[];
}

export const EventFeedFriendsCard: React.FC<EventFeedFriendsCardProps> = ({
  friends,
}) => {
  if (!friends || friends.length === 0) {
    return null;
  }

  if (!friends || friends.length < 1) return null;
  const areMore = friends.length > MAX_FIRENDS_PREVIEW;
  const text = useMemo(() => {
    if (!friends) return "";
    if (friends.length === 1) return "Interessa a " + friends[0].username;
    if (friends.length === 2)
      return "Interessa a " + friends[0].username + " e " + friends[1].username;
    return (
      "Interessato a " +
      friends[0].username +
      " e altri " +
      (friends.length - 1) +
      " tuoi amici"
    );
  }, [friends]);

  return (
    <View style={styles.container}>
      <Inline style={{ marginRight: 10 }}>
        {friends.map((user, index) => {
          return (
            <View
              style={index === 0 ? { marginLeft: 0 } : { marginLeft: -20 }}
              key={user.id}
            >
              <MyImage
                url={user.profilePicture?.url}
                style={{
                  height: heightPercentageToDP(7),
                  aspectRatio:
                    validationConfig.media.profilePicture.aspectRatio,
                  borderRadius: 10,
                }}
                height={MyDeliveryH.profilePicture.small}
              />
            </View>
          );
        })}
      </Inline>
      <MyText mediumEmphasis size="small">
        {text}
      </MyText>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    marginTop: heightPercentageToDP(1),
  },
});
