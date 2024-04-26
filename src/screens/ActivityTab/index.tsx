import React, { useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { useGetMyActivitiesQuery } from "../../generated/graphql";
import { Colors } from "../../constant";
import { useMemo } from "react";
import { useIsFocused } from "@react-navigation/native";
import Costants from "expo-constants";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { AllActivity } from "./AllActivity";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { MyText } from "../../components/Text";
import { Inline } from "../../components/Inline";
import { defaultScreenOptions } from "../../navigation/utils";
import { TicketsActivity } from "./TicketsActivity";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "../../navigation";
import { ActivityTabButton } from "../../components/buttons/ActivityTabButton";
import { markAsSeenAllActivities } from "./services";
import Animated, { FadeIn } from "react-native-reanimated";

const ITEMS_PER_QUERY = 15;

type ActivityTabProps = BottomTabScreenProps<BottomTabParamList, "ActivityTab">;

export const ActivityTabScreen: React.FC<ActivityTabProps> = ({
  navigation,
  route,
}) => {
  const { data, refetch, fetchMore, loading } = useGetMyActivitiesQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (data.getMyActivities && data.getMyActivities.length < ITEMS_PER_QUERY)
        setEndReached(true);
      else if (endReached) setEndReached(false);
    },
  });

  const [endReached, setEndReached] = useState(false);

  const isFocus = useIsFocused();
  const [tabIndex, setTabIndex] = useState(0);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const activities = useMemo(
    () => data?.getMyActivities?.filter((x) => !!x && !x._hidden) || [],
    [data]
  );

  // Segna le attività come lette
  useEffect(() => {
    if (!isFocus) return;
    else markAsSeenAllActivities();
  }, [activities, isFocus]);

  const hasUnseenActivities = useMemo(
    () => activities.filter((x) => !!x && !x.seen).length > 0,
    [activities]
  );

  useEffect(() => {
    navigation.setOptions({
      tabBarIcon: ({ color, size }) => (
        <ActivityTabButton
          color={color}
          size={size}
          isBadgeVisible={hasUnseenActivities}
        />
      ),
    });
  }, [hasUnseenActivities]);

  const loadMore = async () => {
    if (
      !loading &&
      !isRefreshing &&
      data?.getMyActivities?.length &&
      !endReached
    ) {
      const cursor =
        data.getMyActivities &&
        data.getMyActivities[data.getMyActivities.length - 1]?.id;

      if (cursor) {
        const { data: newData } = await fetchMore({
          variables: {
            pagination: {
              cursor,
              limit: ITEMS_PER_QUERY,
            },
          },
        });

        if (
          newData?.getMyActivities &&
          newData?.getMyActivities?.length < ITEMS_PER_QUERY
        )
          setEndReached(true);
      }
    }
  };

  const renderTab = (index: number, title: string) => (
    <TouchableOpacity onPress={() => setTabIndex(index as any)}>
      <LinearGradient
        colors={
          index === tabIndex
            ? [Colors.primary, Colors.secondary]
            : [Colors.backgroundDark, Colors.backgroundDark]
        }
        style={[
          {
            marginRight: widthPercentageToDP(2),
          },
          index === tabIndex ? { borderRadius: 13 } : undefined,
        ]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View
          style={[
            styles.tabLabel,
            tabIndex === index ? styles.selectedTab : undefined,
            tabIndex === index
              ? {
                  borderWidth: 0,
                }
              : undefined,
          ]}
        >
          <MyText size="small" bold>
            {title}
          </MyText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <MyText
        bold
        style={{
          textAlign: "center",
          ...(defaultScreenOptions?.headerTitleStyle as any),
        }}
      >
        Attività
      </MyText>
      <Animated.View entering={FadeIn}>
        <Inline
          style={{
            minWidth: "100%",
            justifyContent: "center",
            marginTop: hp(1),
          }}
        >
          {renderTab(0, "Recenti")}
          {renderTab(1, `I tuoi biglietti`)}
        </Inline>
      </Animated.View>
      <Animated.View entering={FadeIn} style={{ flex: 1 }}>
        {tabIndex === 0 ? (
          <AllActivity
            activities={activities as any}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            isEmpty={
              !!(data?.getMyActivities && data.getMyActivities.length === 0)
            }
            loadMore={loadMore}
            endReached={endReached}
          />
        ) : (
          <TicketsActivity />
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Platform.OS === "android" ? Costants.statusBarHeight : 0,
  },
  tabLabel: {
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: heightPercentageToDP(1.3),
    borderRadius: 13,

    borderColor: Colors.whiteSmoke,
    borderWidth: 2,
  },
  selectedTab: {
    marginVertical: 2,
    marginHorizontal: 2,
  },
});
