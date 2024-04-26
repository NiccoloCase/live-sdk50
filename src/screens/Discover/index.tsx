import React, { useRef, useState } from "react";
import { MyText } from "../../components/Text";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { DiscoverHeader } from "../../components/headers/DiscoverHeader";
import Animated, {
  FadeInUp,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors, Spacing } from "../../constant";
import { EventFeed, EventFeedHandle } from "./EventFeed";
import { FollowedEventsCard, FollowedEventsCardHandle } from "./FollowedEvents";
import { OfficialEventsCard, OfficialEventsCardHandle } from "./OfficialEvents";
import { RefreshControl } from "react-native-gesture-handler";
import DiscoverCarousel from "../../components/DiscoverCarousel";
import { Button } from "react-native";
import { navigate } from "../../navigation/NavigationService";
import { MyAutoTranslated } from "../../components/MyAutoTranslated";
import Regions from "./Regions/Regions";
import { StatsCard } from "../../components/StatsCard";
import { SuggestedOrganizersCard } from "../../components/SuggestedOrganizersCard";
import { useGetUpcomingEventsQuery } from "../../generated/graphql";
import { CurrentEventCard, CurrentEventCardHandle } from "./CurrentEventCard";
import { LandingOrganizersCard } from "../../components/OrganizersLandingCard";
import { useTranslation } from "react-i18next";
import { BlurView } from "@react-native-community/blur";
import { Bubble } from "../../components/Bubble";
import { Blurhash } from "react-native-blurhash";
import chroma from "chroma-js";

export const DiscoverScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  // refs
  const eventFeedRef = useRef<EventFeedHandle>(null);
  const followedEventsRef = useRef<FollowedEventsCardHandle>(null);
  const officialEventsRef = useRef<OfficialEventsCardHandle>(null);
  const currentEventRef = useRef<CurrentEventCardHandle>(null);
  const { t } = useTranslation("discover");

  const refresh = async () => {
    try {
      setRefreshing(true);
      await eventFeedRef.current?.refresh();
      await followedEventsRef.current?.refresh();
      await officialEventsRef.current?.refresh();
      await currentEventRef.current?.refresh();
    } catch (e) {
      console.warn(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <DiscoverHeader />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: Spacing.screenHorizontalPadding,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              tintColor={Colors.whiteSmoke}
              colors={[Colors.whiteSmoke]}
              onRefresh={refresh}
            />
          }
        >
          <Animated.View
            entering={FadeInUp.delay(50).springify()}
            style={{
              marginTop: heightPercentageToDP(3),
            }}
          >
            <DiscoverCarousel />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(400).springify()}
            style={{
              marginBottom: heightPercentageToDP(1.5),
              marginTop: heightPercentageToDP(4),
            }}
          >
            <LandingOrganizersCard />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(500).springify()}
            style={{
              marginBottom: heightPercentageToDP(1),
              marginTop: heightPercentageToDP(4),
            }}
          >
            <MyText bold size="small">
              {t("stats")}
            </MyText>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
