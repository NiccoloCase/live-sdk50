//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Inline } from "../../Inline";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import chroma from "chroma-js";
import { Colors } from "../../../constant";
import { MyText } from "../../Text";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import hexToRgba from "hex-to-rgba";
import { Countdown } from "../../Countdown";
import { Event } from "../../../generated/graphql";
import { MyImage, MyDeliveryH } from "../../Image";
import { mediumEmphasisOpacity } from "../../../constant/typography";

interface FollowedEventCardProps {
  event: Event;
}
export const FollowedEventCard: React.FC<FollowedEventCardProps> = ({
  event,
}) => {
  const navigation = useNavigation();

  const renderCountdown = (startDate: Date, endDate?: Date) => {
    return (
      <Countdown
        startDate={startDate}
        endDate={endDate}
        render={(state, isStarted, isEnded) => {
          if (isEnded)
            return (
              <MyText bold size="small" mediumEmphasis>
                Evento terminato
              </MyText>
            );
          if (isStarted)
            return (
              <MyText bold size="small" mediumEmphasis>
                In questo momento
              </MyText>
            );

          return (
            <Inline style={styles.coutdown}>
              <View style={styles.coutdownBlock}>
                <MyText bold size="big" mediumEmphasis>
                  {state?.days}
                </MyText>
                <MyText
                  mediumEmphasis
                  size="small"
                  chainprinter
                  style={styles.countdownLabel}
                >
                  {"Giorn" + (state.days == 1 ? "o " : "i")}
                </MyText>
              </View>
              <View style={styles.coutdownBlock}>
                <MyText bold size="big" mediumEmphasis>
                  {state?.hours}
                </MyText>
                <MyText
                  mediumEmphasis
                  size="small"
                  chainprinter
                  style={styles.countdownLabel}
                >
                  {"Or" + (state.hours == 1 ? "a" : "e")}
                </MyText>
              </View>
              <View style={styles.coutdownBlock}>
                <MyText bold size="big" mediumEmphasis>
                  {state?.minutes}
                </MyText>
                <MyText
                  mediumEmphasis
                  size="small"
                  style={styles.countdownLabel}
                  chainprinter
                >
                  {"Minut" + (state.minutes == 1 ? "o " : "i ")}
                </MyText>
              </View>
              <View style={styles.coutdownBlock}>
                <MyText bold size="big" mediumEmphasis>
                  {state?.seconds}
                </MyText>
                <MyText
                  mediumEmphasis
                  size="small"
                  style={styles.countdownLabel}
                  chainprinter
                >
                  {"Second" + (state.seconds == 1 ? "o " : "i")}
                </MyText>
              </View>
            </Inline>
          );
        }}
      />
    );
  };

  const renderTicketBtn = () => {
    if (!event.has_ticketing_system && event.is_ticketing_enabled) return null;

    if (event.haveTicket)
      return (
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            navigation.navigate("Event", {
              screen: "TicketScreen",
              params: {
                eventId: event.id,
                event,
              },
            })
          }
        >
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={heightPercentageToDP(3)}
            color={Colors.mediumGrey}
            style={{ opacity: mediumEmphasisOpacity }}
          />
          <View>
            <MyText
              size="small"
              mediumEmphasis
              style={{ marginLeft: widthPercentageToDP(1.5) }}
            >
              Vedi il tuo biglietto
            </MyText>
          </View>
        </TouchableOpacity>
      );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Event", {
          screen: "EventScreen",
          params: {
            eventId: event.id,
            preload: event,
          },
        });
      }}
    >
      <View key={event.id} style={styles.eventContainer}>
        <Inline style={{ position: "relative" }}>
          <View style={styles.imageWrapper}>
            <MyImage
              url={event.image?.url}
              blurhash={event.image?.blurhash!}
              height={MyDeliveryH.eventImage.small}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View
            style={{
              marginLeft: widthPercentageToDP(3),

              flex: 1,
            }}
          >
            <MyText bold>{event.title}</MyText>

            <View
              style={{
                marginTop: heightPercentageToDP(0.8),
              }}
            >
              {renderCountdown(event.date, event.endDate)}
            </View>
          </View>
        </Inline>
      </View>

      {renderTicketBtn()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    height: heightPercentageToDP(10),
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: chroma(Colors.backgroundLight).brighten(0.4).hex(),
  },
  eventContainer: {
    paddingHorizontal: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    borderWidth: 1,
    borderColor: Colors.backgroundLightBright,
    borderRadius: 20,
  },

  coutdownBlock: {
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  coutdown: {
    borderColor: hexToRgba("#fff", 0.5),
    paddingVertical: heightPercentageToDP(1),
  },
  countdownLabel: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 3,
  },
  btn: {
    paddingHorizontal: widthPercentageToDP(1),
    paddingVertical: heightPercentageToDP(0.8),
    borderRadius: 8,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingTop: heightPercentageToDP(1.1),
  },
});
