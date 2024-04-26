import React, { useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { ActivityCard } from "./ActivityCard";
import { useGetMyTicketActivitiesQuery } from "../../generated/graphql";
import { Colors, Spacing } from "../../constant";
import { useMemo } from "react";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Centered } from "../../components/Centered";
import { MyText } from "../../components/Text";
import chroma from "chroma-js";
import { Inline } from "../../components/Inline";
import { Spinner } from "../../components/Spinner";

interface TicketsActivityProps {}

const ITEMS_PER_QUERY = 5;

export const TicketsActivity: React.FC<TicketsActivityProps> = ({}) => {
  const { data, refetch, fetchMore, loading } = useGetMyTicketActivitiesQuery({
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      if (
        data.getMyTicketActivities &&
        data.getMyTicketActivities.length < ITEMS_PER_QUERY
      )
        setEndReached(true);
      else if (endReached) setEndReached(false);
    },
  });

  const [endReached, setEndReached] = useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const loadMore = async () => {
    if (
      !loading &&
      !isRefreshing &&
      data?.getMyTicketActivities?.length &&
      !endReached
    ) {
      const cursor =
        data.getMyTicketActivities &&
        data.getMyTicketActivities[data.getMyTicketActivities.length - 1]?.id;

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
          newData?.getMyTicketActivities &&
          newData?.getMyTicketActivities?.length < ITEMS_PER_QUERY
        )
          setEndReached(true);
      }
    }
  };

  const onRefresh = React.useCallback(async () => {
    try {
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const isEmpty =
    data?.getMyTicketActivities && data.getMyTicketActivities.length === 0;

  const activities = useMemo(
    () => data?.getMyTicketActivities?.filter((x) => !x?._hidden) || [],
    [data]
  );

  if (isEmpty)
    return (
      <Centered>
        <MyText bold>Nessuna biglietto</MyText>
        <MyText mediumEmphasis>Non hai ancora nessun biglietto</MyText>
      </Centered>
    );

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      keyExtractor={(item, i) => item?.id || i + ""}
      data={activities}
      renderItem={({ item }) => item && <ActivityCard activity={item} />}
      contentContainerStyle={{
        paddingTop: hp(6),
        paddingBottom: hp(6),
        paddingHorizontal: Spacing.screenHorizontalPadding,
      }}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          tintColor={Colors.whiteSmoke}
          colors={[Colors.whiteSmoke]}
        />
      }
      ListFooterComponent={() => (
        <View style={{ height: heightPercentageToDP(5), width: "100%" }}>
          {!endReached ? (
            <Inline style={{ justifyContent: "center" }}>
              <Spinner color={chroma(Colors.whiteSmoke).alpha(0.3).hex()} />
            </Inline>
          ) : null}
        </View>
      )}
      onEndReachedThreshold={0.5}
      scrollEventThrottle={16}
      onEndReached={loadMore}
    />
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
