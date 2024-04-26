import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchEventFeed } from "./SearchEventFeed";
import { heightPercentageToDP } from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInUp } from "react-native-reanimated";

interface EventsTabProps {
  eventId?: string;
}

export const EventsTab: React.FC<EventsTabProps> = ({ eventId }) => {
  const [feedHeight, setFeedHeight] = React.useState(0);
  return (
    <View
      style={{
        marginTop: heightPercentageToDP(1),
        justifyContent: "center",
        flex: 1,
      }}
    >
      <View
        style={{ flex: 1, marginTop: heightPercentageToDP(3) }}
        onLayout={(e) => setFeedHeight(e.nativeEvent.layout.height)}
      >
        {feedHeight > 0 && (
          <Animated.View entering={FadeIn} style={{ flex: 1 }}>
            <SearchEventFeed
              initialEventId={eventId}
              containerHeight={feedHeight}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({});
