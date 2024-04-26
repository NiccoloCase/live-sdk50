import React, { useMemo } from "react";
import { View } from "react-native";
import { Event } from "../../generated/graphql";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../components/Image";
import { Blurhash } from "react-native-blurhash";
import chroma from "chroma-js";
import { Colors } from "../../constant";
import { MyText } from "../../components/Text";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Inline, inlineStyle } from "../../components/Inline";
import hexToRgba from "hex-to-rgba";
import { formatShortDay } from "../../helper/format";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { EventFeedFriendsCard } from "./FriendsCard";
import { abbreviateText } from "../../helper/format/text";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { getDistanceFromLatLonInMeters } from "../../helper/geo";
import { openMapsApp } from "../../navigation/linking";
import AnimatedLottieView from "lottie-react-native";

const FOOTER_OVERLAY = 20;
const MARGIN_VERTICAL = 5;
const BOTTOM_SLIDEANIMATION__HEIGHT = 0;

interface EventFeedItemProps {
  item: Event;
  width: number;
  height: number;
  index: number;
  currentIndex: number;
  myPosition?: {
    latitude: number;
    longitude: number;
  } | null;
}
export const EventFeedItem: React.FC<EventFeedItemProps> = ({
  item,
  width,
  height,
  index,
  currentIndex,
  myPosition,
}) => {
  const navigation = useNavigation();
  const uri = item.image?.url;

  const distance = useMemo(() => {
    if (!myPosition || !item.location) return null;

    console.log({ myPosition, lo: item.location.point.coordinates });

    const d = getDistanceFromLatLonInMeters(
      myPosition?.longitude,
      myPosition?.latitude,
      item.location.point.coordinates[0],
      item.location.point.coordinates[1]
    );
    if (!d) return null;
    // normalizzo la distanza
    const meters = Math.floor(d / 100) * 100;

    let text;

    if (meters < 1000) text = meters + "m";
    else text = (meters / 1000).toFixed(1) + " km";

    return text + " da te";
  }, [myPosition]);

  const renderInvitationButton = (item: Event) => {
    console.log(item);
    if (item.haveTicket)
      return (
        <TouchableOpacity
          style={inlineStyle}
          onPress={() => {
            navigation.navigate("Event", {
              screen: "TicketScreen",
              params: {
                eventId: item.id,
                event: item,
              },
            });
          }}
        >
          <View style={styles.invitationBtn}>
            <Inline>
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={heightPercentageToDP(3)}
                color={Colors.whiteSmoke}
                style={{ marginRight: hp(1) }}
              />
              <View>
                <MyText bold size="small">
                  Parteciperai all'evento
                </MyText>
                <MyText size="small" mediumEmphasis light>
                  Vedi il tuo biglietto
                </MyText>
              </View>
            </Inline>
          </View>
        </TouchableOpacity>
      );

    if (item.isRequested)
      return (
        <TouchableOpacity
          style={inlineStyle}
          onPress={() => {
            navigation.navigate("Event", {
              screen: "EventInvitationRequestScreen",
              params: {
                event: item,
              },
            });
          }}
        >
          <View style={styles.invitationBtn}>
            <MyText size="small" bold>
              Hai chiesto di partecipare
            </MyText>
            <MyText size="small" mediumEmphasis light>
              Aspetta la risposta dell'organizzatore
            </MyText>
          </View>
        </TouchableOpacity>
      );

    if (item.invitation_requests_enabled)
      return (
        <TouchableOpacity
          style={inlineStyle}
          onPress={() => {
            navigation.navigate("Event", {
              screen: "EventInvitationRequestScreen",
              params: {
                event: item,
              },
            });
          }}
        >
          <View style={[styles.invitationBtn, inlineStyle]}>
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={heightPercentageToDP(3)}
              color={Colors.whiteSmoke}
              style={{ marginRight: hp(1) }}
            />
            <MyText bold mediumEmphasis size="small">
              Vuoi partecipare?
            </MyText>
          </View>
        </TouchableOpacity>
      );

    return null;
  };

  const renderFooter = (item: Event) => {
    return (
      <View
        style={{
          paddingHorizontal: hp(2),
          paddingVertical: hp(2),
          marginTop: FOOTER_OVERLAY,
          height: "100%",
        }}
      >
        <Inline>
          <MyText bold size="big" style={{ flex: 1 }}>
            {item.title}
          </MyText>
          <MyText bold mediumEmphasis size="small">
            {formatShortDay(item.date, true)}
          </MyText>
        </Inline>

        <Inline style={{ width: 200 }}>
          {(item.isOfficial || item.isVerified) && (
            <View style={styles.tag}>
              <MaterialIcons
                name="verified"
                size={hp(1.5)}
                color={Colors.whiteSmoke}
                style={{ marginRight: hp(0.5) }}
              />
              <MyText bold mediumEmphasis size="small">
                {item.isOfficial ? "Evento ufficiale" : "Evento verificato"}
              </MyText>
            </View>
          )}

          {item.location && (
            <TouchableOpacity
              onPress={() => {
                if (
                  item.location?.point.coordinates[1] &&
                  item.location?.point.coordinates[0]
                )
                  openMapsApp(
                    item.location?.point.coordinates[1]!,
                    item.location?.point.coordinates[0]!,
                    item.location?.locationText!
                  );
              }}
            >
              <View style={styles.tag}>
                <Feather
                  name="map-pin"
                  size={hp(1.5)}
                  color={Colors.whiteSmoke}
                />
                {distance ? (
                  <MyText
                    style={{ marginLeft: hp(0.5) }}
                    bold
                    mediumEmphasis
                    size="small"
                  >
                    {distance}
                  </MyText>
                ) : null}
              </View>
            </TouchableOpacity>
          )}

          {item.minAge && (
            <View style={styles.tag}>
              <Feather
                name="user"
                size={hp(1.5)}
                color={Colors.whiteSmoke}
                style={{ marginRight: hp(0.5) }}
              />
              <MyText bold mediumEmphasis size="small">
                {item.minAge}+
              </MyText>
            </View>
          )}
        </Inline>

        <View style={{ flex: 1 }}>
          {item.description &&
            !(
              item.haveTicket ||
              item.isRequested ||
              item.invitation_requests_enabled
            ) && (
              <View style={{ marginTop: hp(3) }}>
                <MyText mediumEmphasis size="small" numberOfLines={4}>
                  {abbreviateText(item.description, 200)}
                </MyText>
              </View>
            )}
        </View>

        <EventFeedFriendsCard
          friends={item.friendsFollowingPreview?.filter((x) => !!x) as any[]}
        />
        {renderInvitationButton(item)}
      </View>
    );
  };

  return (
    <>
      <View
        key={item.id}
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Event", {
              screen: "EventScreen",
              params: { eventId: item.id, preload: item },
            });
          }}
        >
          <View
            style={{
              width,
              height,
              overflow: "hidden",
              borderRadius: 15,
            }}
          >
            <MyImage
              url={uri}
              style={{
                width,
                aspectRatio: 1,
                position: "absolute",
                zIndex: 100,
                borderRadius: 15,
              }}
              height={MyDeliveryH.eventImage.big}
            />

            <View
              style={[
                styles.footer,
                {
                  marginTop: width - FOOTER_OVERLAY,
                  height:
                    height -
                    (width - FOOTER_OVERLAY) -
                    (index === 0 ? BOTTOM_SLIDEANIMATION__HEIGHT : 0),
                },
              ]}
            >
              <Blurhash
                blurhash={item.image?.blurhash!}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: chroma(Colors.backgroundLight)
                    .brighten(0.4)
                    .hex(),
                  opacity: 0.3,
                }}
              />

              {renderFooter(item as Event)}
            </View>

            {false && index === 0 && (
              <View
                style={{
                  height: BOTTOM_SLIDEANIMATION__HEIGHT,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {currentIndex === 0 && (
                  <AnimatedLottieView
                    source={require("../../../assets/lottie/arrow_down.json")}
                    autoPlay
                    loop
                    style={{
                      aspectRatio: 1,
                      height: heightPercentageToDP(7),
                      position: "absolute",
                      marginTop: -5,
                      opacity: 0.5,
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.backgroundLight,
    width: "100%",
    justifyContent: "center",
    overflow: "hidden",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  tag: {
    backgroundColor: hexToRgba(Colors.whiteSmoke, 0.1),
    padding: 8,
    borderRadius: 9,
    marginTop: hp(1),
    flexDirection: "row",
    alignItems: "center",
    marginRight: hp(0.7),
  },
  invitationBtn: {
    backgroundColor: hexToRgba(Colors.whiteSmoke, 0.1),
    borderRadius: 9,
    padding: hp(1),
    marginTop: hp(2),
    marginBottom: hp(2),
  },
});
