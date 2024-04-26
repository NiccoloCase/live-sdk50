import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { MyImage } from "../../../components/Image";
import { validationConfig } from "../../../config";
import { Colors, Spacing } from "../../../constant";
import { ScrollView } from "react-native-gesture-handler";
import { MyText } from "../../../components/Text";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { Inline } from "../../../components/Inline";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { User } from "../../../generated/graphql";
import { Linking } from "react-native";
import { TouchableOpacity } from "react-native";
import { Blurhash } from "react-native-blurhash";
import {
  FrienddishipStatus,
  FriendshipButton,
} from "../../../components/buttons/FriendshipButton";
import Animated, {
  FadeIn,
  FadeInRight,
  FadeInUp,
  acc,
} from "react-native-reanimated";
import { formatShortDay, formatTime } from "../../../helper/format";
import { useNavigation } from "@react-navigation/native";
import { ProfilePicture } from "../../../components/ProfilePicture";

interface ProfileHeaderProps {
  user: Partial<User>;
  width: number;
  height: number;
  isLoaded?: boolean;
  isMe?: boolean;
  notSpotted?: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  width,
  height,
  isLoaded,
  notSpotted,
  isMe,
}) => {
  const [cardHeight, setCardHeight] = React.useState(0);

  const navigation = useNavigation();

  const handleInstaPress = () => {
    if (!user.links?.instagramName) return;
    const url = `https://www.instagram.com/${user.links?.instagramName}`;
    Linking.openURL(url);
  };

  const renderFollowButton = () => {
    if (!user.id || !isLoaded || isMe || notSpotted) return null;

    const disabled = !user.id || !isLoaded || isMe || notSpotted;

    return (
      <Animated.View
        entering={FadeInRight.springify()}
        style={{
          opacity: disabled ? 0 : 1,
        }}
        pointerEvents={disabled ? "none" : "auto"}
      >
        <Inline>
          <FriendshipButton
            user={user}
            userId={user.id}
            renderButton={(status, ask, acceptRequest) => {
              if (status === FrienddishipStatus.FRIENDS)
                return (
                  <TouchableOpacity
                    style={[
                      styles.friendButton,
                      {
                        backgroundColor: Colors.whiteSmoke,
                      },
                    ]}
                    disabled
                  >
                    <MyText
                      size="small"
                      bold
                      dark
                      style={{
                        marginRight: widthPercentageToDP(1),
                      }}
                    >
                      Siete amici
                    </MyText>
                    <Feather name="check" size={18} color={Colors.darkGrey} />
                  </TouchableOpacity>
                );

              if (status === FrienddishipStatus.ASKED_FRIENDSHIP)
                return (
                  <View>
                    <MyText
                      size="small"
                      light
                      style={{
                        maxWidth: widthPercentageToDP(25),
                        marginBottom: heightPercentageToDP(1),
                      }}
                    >
                      Vuole essere tuo amico
                    </MyText>
                    <TouchableOpacity
                      onPress={acceptRequest}
                      style={[
                        styles.friendButton,
                        {
                          justifyContent: "center",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <MyText size="small" bold style={{ textAlign: "center" }}>
                        Accetta
                      </MyText>
                    </TouchableOpacity>
                  </View>
                );

              if (status === FrienddishipStatus.REQUEST_SENT)
                return (
                  <TouchableOpacity style={styles.friendButton} disabled>
                    <MyText
                      size="small"
                      bold
                      style={{
                        maxWidth: widthPercentageToDP(19),
                        marginRight: widthPercentageToDP(1),
                      }}
                    >
                      Amicizia in attessa...
                    </MyText>
                    <Feather name="clock" size={18} color={Colors.whiteSmoke} />
                  </TouchableOpacity>
                );
              else
                return (
                  <TouchableOpacity style={styles.friendButton} onPress={ask}>
                    <MyText
                      size="small"
                      bold
                      style={{
                        marginRight: widthPercentageToDP(3),
                      }}
                      chainprinter
                    >
                      Richiedi{"\n"}amicizia
                    </MyText>
                    <Feather
                      name="user-plus"
                      size={18}
                      color={Colors.whiteSmoke}
                    />
                  </TouchableOpacity>
                );
            }}
          />
        </Inline>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            width: width * (90 / 100),
            height: height * (80 / 100),
          },
        ]}
        onLayout={(e) => {
          setCardHeight(e.nativeEvent.layout.height);
        }}
      >
        <Blurhash
          style={{
            ...StyleSheet.absoluteFillObject,
          }}
          blurhash={
            user.profilePicture?.blurhash
              ? // ? blurhashToGrayscale(
                //     user.profilePicture?.blurhash,
                //     width,
                //     height,
                //     9,
                //     9
                //   )
                user.profilePicture?.blurhash
              : ""
          }
        />

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: Colors.backgroundDark,
            opacity: 0.2,
          }}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <ProfilePicture
              url={user.profilePicture?.url}
              blurhash={user.profilePicture?.blurhash}
              height={heightPercentageToDP(20)}
              isLive={!!user.spotInfo?.createdAt}
            />
          </View>

          <View>{renderFollowButton()}</View>
        </View>

        <View style={{ marginTop: heightPercentageToDP(2) }}>
          <>
            <MyText
              style={{
                fontFamily: "ChainprinterRegular",
              }}
              size="small"
              mediumEmphasis
            >
              PRIMO INCONTRO
            </MyText>

            <MyText
              style={{
                fontFamily: "ChainprinterRegular",
                marginTop: heightPercentageToDP(0.5),
              }}
              size="big"
            >
              {user?.spotInfo?.createdAt
                ? formatShortDay(user.spotInfo?.createdAt) +
                  " - " +
                  formatTime(user.spotInfo?.createdAt)
                : isLoaded && !isMe
                ? "NON SPOTTATO"
                : "--"}
            </MyText>
          </>

          {user?.spotInfo?.event?.title && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Event", {
                  screen: "EventScreen",
                  params: {
                    eventId: user.spotInfo?.event?.id,
                    preload: user.spotInfo?.event,
                  },
                })
              }
            >
              <View style={{ marginTop: heightPercentageToDP(0.5) }}>
                <MyText
                  size="small"
                  style={{
                    fontFamily: "ChainprinterRegular",
                    marginTop: heightPercentageToDP(0.5),
                  }}
                >
                  {user?.spotInfo?.event?.title
                    ? user?.spotInfo?.event?.title
                    : isLoaded
                    ? "unknown"
                    : "--"}
                </MyText>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: heightPercentageToDP(3) }}>
          <MyText
            style={{
              fontFamily: "ChainprinterRegular",
            }}
            size="small"
            mediumEmphasis
          >
            PERSONE RAGGIUNTE
          </MyText>
          <MyText
            size="title"
            style={{
              fontFamily: "ChainprinterRegular",
              marginTop: heightPercentageToDP(0.5),
            }}
          >
            {typeof user.stats?.spottedCount === "number"
              ? user.stats?.spottedCount
              : "--"}
          </MyText>
        </View>

        <View style={{ marginTop: heightPercentageToDP(3) }}>
          <MyText
            style={{
              fontFamily: "ChainprinterRegular",
            }}
            size="small"
            mediumEmphasis
          >
            AMICI
          </MyText>
          <MyText
            style={{
              fontFamily: "ChainprinterRegular",
              marginTop: heightPercentageToDP(0.5),
            }}
            size="title"
          >
            {typeof user.stats?.friendsCount === "number"
              ? user.stats?.friendsCount
              : "--"}
          </MyText>
        </View>

        <View style={{ marginTop: heightPercentageToDP(3) }}>
          <MyText
            style={{
              fontFamily: "ChainprinterRegular",
            }}
            size="small"
            mediumEmphasis
          >
            EVENTI
          </MyText>
          <MyText
            style={{
              fontFamily: "ChainprinterRegular",
              marginTop: heightPercentageToDP(0.5),
            }}
          >
            {user?.eventsAttendedCount && user.eventsAttendedCount >= 0
              ? user.eventsAttendedCount
              : "--"}
          </MyText>
        </View>

        <TouchableOpacity
          disabled={!user.links?.instagramName}
          onPress={handleInstaPress}
        >
          <View style={{ marginTop: heightPercentageToDP(3) }}>
            <MyText
              style={{
                fontFamily: "ChainprinterRegular",
              }}
              size="small"
              mediumEmphasis
            >
              INSTAGRAM
            </MyText>
            <MyText
              style={{
                fontFamily: "ChainprinterRegular",
                marginTop: heightPercentageToDP(0.5),
              }}
            >
              {user.links?.instagramName
                ? `@${user.links?.instagramName}`
                : "--"}
            </MyText>
          </View>
        </TouchableOpacity>
      </View>

      <Animated.View
        entering={Platform.OS === "android" ? FadeIn.duration(200) : undefined}
        style={{
          backgroundColor: Colors.backgroundDark,
          aspectRatio: 1,
          position: "absolute",
          width: 30,
          top: cardHeight / 2 - 15,
          left: -5,
          borderRadius: 30 / 2,
        }}
      />

      <Animated.View
        entering={Platform.OS === "android" ? FadeIn.duration(200) : undefined}
        style={{
          backgroundColor: Colors.backgroundDark,
          aspectRatio: 1,
          position: "absolute",
          width: 30,
          top: cardHeight / 2 - 15,
          right: -5,
          borderRadius: 30 / 2,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentageToDP(3),
  },
  card: {
    borderRadius: 20,
    height: "100%",
    backgroundColor: Colors.backgroundLight,
    overflow: "hidden",
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: heightPercentageToDP(3),
  },

  friendsCard: {
    paddingVertical: heightPercentageToDP(2),
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  infoBox: {
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 20,
    padding: 20,
    marginRight: widthPercentageToDP(2.2),
    height: "100%",
  },
  friendButton: {
    borderWidth: 2,
    borderColor: Colors.whiteSmoke,
    paddingHorizontal: widthPercentageToDP(4),
    paddingVertical: heightPercentageToDP(0.5),
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
});
