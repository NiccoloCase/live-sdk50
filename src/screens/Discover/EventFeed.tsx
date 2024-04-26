import React, { forwardRef, useImperativeHandle, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { Colors, Spacing } from "../../constant";
import { useGetUpcomingEventsQuery } from "../../generated/graphql";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MyImage } from "../../components/Image/MyImage";
import { Blurhash } from "react-native-blurhash";
import Animated, { FadeInUp, FadeOut } from "react-native-reanimated";
import { MyText } from "../../components/Text";
import { useTranslation } from "react-i18next";
import { MyDeliveryH } from "../../components/Image";

const FRIEND_CIRCLE_SIZE = hp(3);
const EVENTS_PER_QUERY = 10;

export type EventFeedHandle = {
  refresh: () => Promise<void>;
};

export const EventFeed = forwardRef<EventFeedHandle>((props, ref) => {
  const { data, fetchMore, refetch, loading } = useGetUpcomingEventsQuery({
    fetchPolicy: "network-only",
    variables: { pagination: { limit: EVENTS_PER_QUERY } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {},
  });
  const [endReached, setEndReached] = useState(false);
  const [fetchingMore, setFetchingMore] = useState(false);
  const navigation = useNavigation();
  const { t } = useTranslation("discover");

  const [width, setWidth] = React.useState(0);

  const events = data?.getUpcomingEvents || [];

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      console.log("REFRESH - EVENT FEED");
      await refetch();
    },
  }));

  // const onSnap = async (index: number) => {
  //   setActiveEventIndex(index);
  //   // Controlla se è verso la fine
  //   if (
  //     !fetchingMore &&
  //     !endReached &&
  //     data?.getUpcomingEvents &&
  //     index >= data?.getUpcomingEvents.length / 2
  //   ) {
  //     const cursor =
  //       data?.getUpcomingEvents[data?.getUpcomingEvents.length - 1].id;
  //     if (cursor) {
  //       console.log("FETCHMORE", { cursor });

  //       setFetchingMore(true);

  //       fetchMore({
  //         variables: { pagination: { limit: EVENTS_PER_QUERY, cursor } },
  //       })
  //         .then((x) => {
  //           if (x.data?.getUpcomingEvents.length < EVENTS_PER_QUERY)
  //             setEndReached(true);
  //         })
  //         .catch(console.warn)
  //         .finally(() => setFetchingMore(false));
  //     }
  //   }
  // };

  const renderCarousel = () => {
    if (events.length === 0) return null;
    else
      return (
        <FlatList
          style={[{ width }]}
          contentContainerStyle={{
            paddingHorizontal: Spacing.screenHorizontalPadding,
          }}
          scrollEnabled={events.length > 1}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={events.length === 1 ? [...events, "DUMMY"] : events}
          renderItem={({ index, item }) => {
            if (typeof item === "string")
              return (
                <View style={[styles.item, { width: width - wp(15) }]}>
                  {events[0].image?.blurhash && (
                    <Blurhash
                      style={StyleSheet.absoluteFillObject}
                      blurhash={events[0].image?.blurhash}
                    />
                  )}
                </View>
              );

            const uri = item.image?.url;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Event", {
                    screen: "EventScreen",
                    params: { eventId: item.id, preload: item },
                  });
                }}
              >
                <View
                  key={item.id}
                  style={[styles.item, { width: width - wp(15) }]}
                >
                  <MyImage
                    height={MyDeliveryH.eventImage.small}
                    url={uri}
                    style={{
                      width: "100%",
                      aspectRatio: 1,
                      borderRadius: 15,
                    }}
                    blurhash={item.image?.blurhash}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      );
  };

  if (data?.getUpcomingEvents.length && data?.getUpcomingEvents.length > 0)
    return (
      <View style={{ marginTop: hp(4) }}>
        <>
          <Animated.View
            exiting={FadeOut.springify()}
            entering={FadeInUp.delay(300).springify()}
            style={{ marginBottom: hp(1) }}
          >
            <MyText bold size="small">
              {t("in-evidenza")}
            </MyText>
          </Animated.View>

          <Animated.View
            exiting={FadeInUp.springify()}
            entering={FadeInUp.delay(400).springify()}
            style={{
              marginBottom: hp(1),
              marginLeft: -Spacing.screenHorizontalPadding,
              marginRight: -Spacing.screenHorizontalPadding,
            }}
          >
            <View
              style={styles.container}
              onLayout={(e) => {
                setWidth(e.nativeEvent.layout.width);
              }}
            >
              {width > 0 && (
                <>
                  <View style={[{ width }]}>{renderCarousel()}</View>
                </>
              )}
            </View>
          </Animated.View>
        </>
      </View>
    );
  else return null;
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },

  firendImage: {
    width: FRIEND_CIRCLE_SIZE,
    height: FRIEND_CIRCLE_SIZE,
    borderRadius: FRIEND_CIRCLE_SIZE / 2,
    backgroundColor: Colors.backgroundLight,
  },
  friendsWrapper: {
    minHeight: FRIEND_CIRCLE_SIZE,
    marginTop: hp(1),
    justifyContent: "center",
  },
  item: {
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(1.2),
  },
});
