import React, { useEffect, useMemo } from "react";
import { View, StyleSheet, RefreshControl } from "react-native";
import { Colors, Spacing } from "../../../constant";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileHeader } from "./ProfileHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../../navigation";
import {
  Event,
  User,
  useGetUserAttendedEventsQuery,
  useGetUserByIdQuery,
} from "../../../generated/graphql";
import { EventAttentedCard } from "./EventAttentedCard";
import { MyText } from "../../../components/Text";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RadarSpinner } from "../../../components/Spinner/RadarSpinner";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useStoreState } from "../../../store";

export const OtherProfile: React.FC<
  StackScreenProps<AppStackParamList, "OtherProfile">
> = ({ navigation, route }) => {
  const userId = route.params.userId;
  const clientId = useStoreState((state) => state.auth.userId);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const { data, refetch, error, loading } = useGetUserByIdQuery({
    fetchPolicy: "cache-and-network",
    variables: { id: userId },
  });

  useEffect(() => {
    if (error) console.warn(error);
  }, [error]);

  const user = (data?.getUserById as Partial<User>) || route.params.userPreload;

  const { data: eventsData, refetch: refetch2 } = useGetUserAttendedEventsQuery(
    {
      variables: { userId },
      fetchPolicy: "cache-and-network",
    }
  );

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  const isMe = useMemo(() => {
    if (String(clientId) === String(userId)) return true;
    else return false;
  }, [user]);

  const notSpotted = useMemo(() => {
    if (!user) return null;
    if (loading) return null;
    if (!user?.spotInfo) return true;
    return false;
  }, [user]);

  const isFriend = useMemo(() => {
    if (!user) return null;
    if (
      typeof user?.isFriend !== "boolean" &&
      typeof user.spotInfo?.areFriends !== "boolean"
    )
      return null;

    if (user.isFriend || user.spotInfo?.areFriends) return true;
    else return false;
  }, [user]);

  useEffect(() => {
    navigation.setOptions({
      title: user?.username || "",
    });
  }, [user]);

  const refresh = async () => {
    try {
      setIsRefreshing(true);
      await refetch();
      await refetch2();
    } finally {
      setIsRefreshing(false);
    }
  };

  const renderEvents = () => {
    return (
      <>
        {eventsData?.getUserAttendedEvents &&
          eventsData?.getUserAttendedEvents.length > 0 && (
            <MyText
              style={{
                marginTop: heightPercentageToDP(2),
                marginBottom: heightPercentageToDP(2),
              }}
              mediumEmphasis
              bold
              size="small"
            >
              Eventi a cui ha partecipato
            </MyText>
          )}
        {eventsData?.getUserAttendedEvents.map((e) => (
          <EventAttentedCard
            backgroundColor={Colors.backgroundLight}
            key={e.id}
            userId={userId}
            event={e as Event}
          />
        ))}

        {eventsData?.getUserAttendedEvents.length === 0 && (
          <View
            style={{
              padding: 10,
            }}
          >
            <MyText bold size="small" mediumEmphasis style={{ padding: 20 }}>
              L'utente non ha partecipato ancora a nessun evento
            </MyText>
          </View>
        )}
      </>
    );
  };

  const renderContent = () => {
    if (!user)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <RadarSpinner />
        </View>
      );
    else
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[Colors.primary]}
              tintColor={Colors.whiteSmoke}
              refreshing={isRefreshing}
              onRefresh={refresh}
            />
          }
        >
          <Animated.View entering={FadeInUp.springify()}>
            <ProfileHeader
              user={user}
              width={width}
              height={height}
              isLoaded={!!data?.getUserById}
              isMe={isMe}
              notSpotted={!!notSpotted}
            />
          </Animated.View>

          {notSpotted && !isMe && (
            <Animated.View
              entering={FadeInDown.springify()}
              style={{
                borderRadius: 15,
                marginTop: heightPercentageToDP(3.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText bold mediumEmphasis size="small">
                Non hai mai incontrato {user.username}
              </MyText>
              <MyText
                size="small"
                light
                mediumEmphasis
                style={{ marginTop: heightPercentageToDP(0.5) }}
              >
                Devi incontrare l'utente tramite il Radar per sbloccare il
                profilo
              </MyText>
            </Animated.View>
          )}

          {isFriend === false && (
            <Animated.View
              entering={FadeInDown.springify()}
              style={{
                borderRadius: 15,

                marginTop: heightPercentageToDP(3.5),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyText bold mediumEmphasis size="small">
                Non sei amico di {user.username}
              </MyText>
              <MyText
                size="small"
                light
                mediumEmphasis
                style={{ marginTop: heightPercentageToDP(0.5) }}
              >
                Diventa suo amico per sbloccare il profilo
              </MyText>
            </Animated.View>
          )}

          {(isFriend === true || isMe) && (
            <Animated.View
              entering={FadeInUp.delay(200).springify()}
              style={{
                backgroundColor: Colors.backgroundLight,
                borderRadius: 15,
                padding: 10,
                marginTop: heightPercentageToDP(6),
              }}
            >
              {renderEvents()}
            </Animated.View>
          )}
        </ScrollView>
      );
  };
  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setWidth(e.nativeEvent.layout.width);
        setHeight(e.nativeEvent.layout.height);
      }}
    >
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
});
