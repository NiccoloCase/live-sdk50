//import liraries
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useGetFollowedEventsQuery } from "../../generated/graphql";
import { MyText } from "../../components/Text";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors, Spacing } from "../../constant";
import chroma from "chroma-js";
import { Inline } from "../../components/Inline";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FollowedEventCard } from "../../components/Event";
import { useTranslation } from "react-i18next";

const MAX_FOLLOWED_EVENTS_SHOWN = 4;

const MARGIN = widthPercentageToDP(2);

interface FollowedEventsCardProps {}

export type FollowedEventsCardHandle = {
  refresh: () => Promise<void>;
};

export const FollowedEventsCard = forwardRef<
  FollowedEventsCardHandle,
  FollowedEventsCardProps
>((props, ref) => {
  const navigation = useNavigation();
  const { data, error, loading, refetch } = useGetFollowedEventsQuery({
    fetchPolicy: "cache-and-network",
    variables: { pagination: { limit: MAX_FOLLOWED_EVENTS_SHOWN + 1 } },
  });
  if (error) console.warn(error);

  const window = useWindowDimensions();

  const cardOffset = widthPercentageToDP(10);
  const cardWidth = useMemo(
    () => window.width - Spacing.screenHorizontalPadding - cardOffset,
    [window.width]
  );

  const { t } = useTranslation("discover");

  const items = useMemo(() => {
    return (
      data?.getFollowedEvents
        .filter((event) => !event.isOfficial)
        .slice(0, MAX_FOLLOWED_EVENTS_SHOWN) || []
    );
  }, [data]);

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      console.log("REFRESH - FOLLOWED EVENTS");
      await refetch();
    },
  }));

  const renderContent = () => {
    return (
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        snapToInterval={cardWidth + MARGIN * 2}
        decelerationRate="fast"
        renderItem={({ item, index }) => (
          <View
            style={{
              width:
                index === items.length - 1 ? cardWidth + cardOffset : cardWidth,

              marginRight:
                index === items.length - 1
                  ? -Spacing.screenHorizontalPadding
                  : MARGIN,
            }}
          >
            <FollowedEventCard event={item as any} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: -Spacing.screenHorizontalPadding,
        }}
        contentContainerStyle={{
          paddingHorizontal: Spacing.screenHorizontalPadding,
        }}
        ListFooterComponent={
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 7,
            }}
          >
            {!loading &&
              data?.getFollowedEvents &&
              data.getFollowedEvents.length > MAX_FOLLOWED_EVENTS_SHOWN && (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Event", {
                      screen: "EventsFollowedScreen",
                    })
                  }
                >
                  <Inline
                    style={{
                      backgroundColor: Colors.backgroundLight,
                      paddingVertical: heightPercentageToDP(1.8),
                      justifyContent: "center",
                      borderRadius: 15,
                      padding: 10,
                    }}
                  >
                    <MyText bold mediumEmphasis size="small">
                      {t("show-others")}
                    </MyText>
                  </Inline>
                </TouchableOpacity>
              )}
          </View>
        }
      />
    );
  };

  if (!data?.getFollowedEvents || items.length == 0) return null;

  return (
    <View
      style={{
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(8),
      }}
    >
      <Animated.View
        entering={FadeInUp.delay(300).springify()}
        style={{ marginBottom: heightPercentageToDP(1) }}
      >
        <MyText bold size="small">
          {t("subscribed")}
        </MyText>
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(400).springify()}
        style={{ marginTop: heightPercentageToDP(1) }}
      >
        {renderContent()}
      </Animated.View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  imageWrapper: {
    height: heightPercentageToDP(18),
    aspectRatio: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: chroma(Colors.backgroundLight).brighten(0.4).hex(),
  },
});
