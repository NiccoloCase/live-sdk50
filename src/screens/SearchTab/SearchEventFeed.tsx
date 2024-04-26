import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { View, StyleSheet, Image, RefreshControl } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { MyText } from "../../components/Text";
import { Colors } from "../../constant";
import Carousel from "react-native-reanimated-carousel";
import { getCurrentPositionAsync } from "expo-location";
import { Event, useGetUpcomingEventsQuery } from "../../generated/graphql";
import { useFocusEffect } from "@react-navigation/native";
import { EventFeedItem } from "./EventFeedItem";
import { RadarSpinner } from "../../components/Spinner/RadarSpinner";

const FRIEND_CIRCLE_SIZE = hp(3);
const EVENTS_PER_QUERY = 10;
const MAX_FIRENDS_PREVIEW = 3;

interface FriendsCardsProps {
  friends?: { username: string; profilePicture: { url: string }; id: string }[];
}

const FriendsCard: React.FC<FriendsCardsProps> = ({ friends }) => {
  if (!friends || friends.length < 1) return null;
  const areMore = friends.length > MAX_FIRENDS_PREVIEW;
  const text = useMemo(() => {
    if (!friends) return "";
    if (friends.length === 1) return friends[0].username + " è iscritto";
    return (
      friends.map((x) => x.username).join(", ") +
      (areMore ? "e altri" : "") +
      " sono iscritti"
    );
  }, [friends]);

  return (
    <View style={styles.friendsWrapper}>
      {friends.slice(0, MAX_FIRENDS_PREVIEW).map((item, i) => {
        const uri = item.profilePicture?.url;

        return (
          <Image
            key={uri}
            source={{ uri }}
            style={[
              styles.firendImage,
              { position: "absolute", left: (FRIEND_CIRCLE_SIZE / 2) * i },
            ]}
          />
        );
      })}
      <MyText
        size="small"
        style={{
          marginLeft: ((friends.length + 1) * FRIEND_CIRCLE_SIZE) / 2 + wp(2),
        }}
      >
        {text}
      </MyText>
    </View>
  );
};

export type EventFeedHandle = {
  refresh: () => Promise<void>;
  initialEventId?: string;
};

interface SearchEventFeedProps {
  initialEventId?: string;
  containerHeight?: number;
}

export const SearchEventFeed = forwardRef<
  EventFeedHandle,
  SearchEventFeedProps
>((props, ref) => {
  const { data, fetchMore, refetch } = useGetUpcomingEventsQuery({
    fetchPolicy: "cache-and-network",
    variables: { pagination: { limit: EVENTS_PER_QUERY } },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {},
  });

  const [myPosition, setMyPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [endReached, setEndReached] = useState(false);

  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    // get user gps
    getCurrentPositionAsync({}).then((x) => {
      setMyPosition({
        latitude: x.coords.latitude,
        longitude: x.coords.longitude,
      });
    });
  }, []);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [width, setWidth] = React.useState(0);
  const [activeEventIndex, setActiveEventIndex] = React.useState(0);

  const height = useMemo(() => {
    return Math.max(width, props.containerHeight || 0);
  }, [props]);

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      refresh();
    },
  }));

  const refresh = async () => {
    try {
      console.log("REFRESH - EVENT DISCOVER FEED");
      setIsRefreshing(true);
      await refetch();
    } finally {
      setIsRefreshing(false);
    }
  };

  const [initialIndex, setInitialIndex] = useState(0);

  useFocusEffect(() => {
    calcInitialIndex();
  });

  useEffect(() => {
    calcInitialIndex();
  }, [data, props.initialEventId]);

  const calcInitialIndex = () => {
    // cerca l'indice dell'evento iniziale
    if (props.initialEventId && data?.getUpcomingEvents) {
      const index = data.getUpcomingEvents.findIndex(
        (x) => x.id === props.initialEventId
      );

      if (index >= 0) setInitialIndex(index);
    } else setInitialIndex(0);
  };

  const onSnap = async (index: number) => {
    setActiveEventIndex(index);
    // Controlla se è verso la fine
    if (
      !fetchingMore &&
      !endReached &&
      data?.getUpcomingEvents &&
      index >= data?.getUpcomingEvents.length / 2
    ) {
      const cursor =
        data?.getUpcomingEvents[data?.getUpcomingEvents.length - 1].id;
      if (cursor) {
        console.log("FETCHMORE", { cursor });

        setFetchingMore(true);

        fetchMore({
          variables: { pagination: { limit: EVENTS_PER_QUERY, cursor } },
        })
          .then((x) => {
            if (x.data?.getUpcomingEvents.length < EVENTS_PER_QUERY)
              setEndReached(true);
          })
          .catch(console.warn)
          .finally(() => setFetchingMore(false));
      }
    }
  };

  const renderCarousel = () => {
    if (!data?.getUpcomingEvents)
      return (
        <View
          style={[
            styles.boxScrollView,
            { width },
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <RadarSpinner />
        </View>
      );
    else if (data?.getUpcomingEvents && data.getUpcomingEvents.length === 0)
      return (
        <View
          style={[
            styles.boxScrollView,
            { width },
            {
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <MyText mediumEmphasis size="small" bold>
            Non abbiamo niente da consigliarti!
          </MyText>
          <MyText mediumEmphasis size="small" style={{ marginTop: hp(0.5) }}>
            Prova a cercare tra gli organizzatori
          </MyText>
        </View>
      );
    else
      return (
        <Carousel
          defaultIndex={initialIndex}
          style={[styles.boxScrollView, { width }]}
          loop={false}
          width={width}
          height={height}
          data={data?.getUpcomingEvents || []}
          vertical
          scrollAnimationDuration={500}
          onSnapToItem={onSnap}
          renderItem={({ index, item }) => {
            return (
              <EventFeedItem
                item={item as Event}
                width={width}
                height={height}
                index={index}
                currentIndex={activeEventIndex}
                myPosition={myPosition}
              />
            );
          }}
        />
      );
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
      }}
    >
      {width > 0 && (
        <>
          <View style={[styles.box, { width }]}>{renderCarousel()}</View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    flex: 1,
  },
  box: {
    overflow: "hidden",
    borderRadius: 15,
  },
  boxScrollView: {
    borderRadius: 15,
    overflow: "hidden",
    aspectRatio: 1,
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
});
