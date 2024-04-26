import React, { forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import { useGetOfficialEventsQuery } from "../../generated/graphql";
import { MyText } from "../../components/Text";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../constant";
import chroma from "chroma-js";
import Animated, { FadeInUp } from "react-native-reanimated";
import { FollowedEventCard } from "../../components/Event";
import { useTranslation } from "react-i18next";

interface OfficialEventsCardProps {}

export type OfficialEventsCardHandle = {
  refresh: () => Promise<void>;
};

export const OfficialEventsCard = forwardRef<
  OfficialEventsCardHandle,
  OfficialEventsCardProps
>((props, ref) => {
  const { data, error, refetch } = useGetOfficialEventsQuery({
    fetchPolicy: "cache-and-network",
  });
  if (error) console.warn(error);

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      console.log("REFRESH - OFFICIAL EVENTS");
      await refetch();
    },
  }));

  const { t } = useTranslation("discover");

  const renderContent = () => {
    return (
      <View style={styles.container}>
        {data?.getOfficialEvents.slice(0, 3).map((event) => (
          <FollowedEventCard key={event.id} event={event as any} />
        ))}
      </View>
    );
  };

  if (!data?.getOfficialEvents || data.getOfficialEvents.length == 0)
    return null;

  return (
    <View style={{ marginTop: heightPercentageToDP(4) }}>
      <Animated.View
        entering={FadeInUp.delay(300).springify()}
        style={{ marginBottom: heightPercentageToDP(1) }}
      >
        <MyText bold size="small">
          {t("attached-event")}
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
