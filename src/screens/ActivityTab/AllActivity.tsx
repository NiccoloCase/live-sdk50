import React from "react";
import { FlatList, StyleSheet, RefreshControl, View } from "react-native";
import { ActivityCard } from "./ActivityCard";
import { Activity } from "../../generated/graphql";
import { Colors, Spacing } from "../../constant";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Centered } from "../../components/Centered";
import { MyText } from "../../components/Text";
import { Spinner } from "../../components/Spinner";
import chroma from "chroma-js";
import { Inline } from "../../components/Inline";

interface AllActivityProps {
  activities: Activity[];
  onRefresh: () => void;
  isRefreshing: boolean;
  isEmpty?: boolean;
  endReached?: boolean;
  loadMore: () => void;
}

export const AllActivity: React.FC<AllActivityProps> = ({
  activities,
  onRefresh,
  isRefreshing,
  isEmpty,
  endReached,
  loadMore,
}) => {
  if (isEmpty)
    return (
      <Centered>
        <MyText bold>Nessuna attività recente</MyText>
        <MyText mediumEmphasis>Qui compariranno le tue attività</MyText>
      </Centered>
    );

  return (
    <FlatList
      style={{ flex: 1 }}
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
