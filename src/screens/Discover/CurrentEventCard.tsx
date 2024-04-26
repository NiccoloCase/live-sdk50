import { useNavigation } from "@react-navigation/native";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import hexToRgba from "hex-to-rgba";
import {
  Event,
  useGetEventByIdLazyQuery,
  useGetEventByIdQuery,
  useWhoamiQuery,
} from "../../generated/graphql";
import { MyText } from "../../components/Text";
import { MyImage, MyDeliveryH } from "../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Inline } from "../../components/Inline";
import { Colors } from "../../constant";
import { BlurView } from "@react-native-community/blur";
import { Blurhash } from "react-native-blurhash";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOut,
} from "react-native-reanimated";
import AnimatedLottieView from "lottie-react-native";
import { useTranslation } from "react-i18next";

export type CurrentEventCardHandle = {
  refresh: () => Promise<void>;
};

interface CurrentEventCardProps {}

export const CurrentEventCard = forwardRef<
  CurrentEventCardProps,
  CurrentEventCardHandle
>((props, ref) => {
  const navigation = useNavigation();
  const { data: me, refetch: refetchMe } = useWhoamiQuery();
  const { t } = useTranslation("discover");
  const eventId = me?.whoami.currentEventID;

  const [queryEvent, { data }] = useGetEventByIdLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (eventId && data?.getEventById?.id !== eventId) {
      queryEvent({ variables: { id: eventId } });
    }
  }, [eventId]);

  useImperativeHandle(ref, () => ({
    refresh: async () => {
      console.log("REFRESH - CURRENT EVENT");
      const me = await refetchMe();
      if (me.data.whoami.currentEventID) {
        queryEvent({ variables: { id: me.data.whoami.currentEventID } });
      }
    },
  }));

  const event = data?.getEventById;

  if (!event || !me?.whoami.currentEventID) return null;

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.card}>
        <Inline>
          <MyImage
            blurhash={event.image?.blurhash}
            url={event.image?.url}
            height={MyDeliveryH.eventImage.big}
            style={{
              aspectRatio: 1,
              height: heightPercentageToDP(20),
              borderRadius: 20,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <MyText bold>Stai partecipando</MyText>
            <MyText style={{ marginTop: 3 }}>{event.title}</MyText>
          </View>
        </Inline>
      </View>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Event", {
            screen: "LiveFeedScreen",
            params: {
              eventId: event.id,
            },
          })
        }
      >
        <Animated.View
          entering={FadeInUp.springify().delay(200)}
          style={styles.btn}
        >
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            blurRadius={10}
          />
          <Blurhash
            style={StyleSheet.absoluteFill}
            blurhash={event.image?.blurhash || ""}
          />

          <View>
            <MyText bold>{t("enter")}</MyText>
            <MyText size="small" light>
              {t("enter-sub")}
            </MyText>
          </View>
          <AnimatedLottieView
            source={require("../../../assets/lottie/arrow_right.json")}
            autoPlay
            loop
            style={{
              width: heightPercentageToDP(5),
              aspectRatio: 1,
              alignSelf: "center",
              marginLeft: heightPercentageToDP(1),
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 20,
    marginTop: heightPercentageToDP(1),
  },
  container: {
    marginBottom: heightPercentageToDP(4),
    marginTop: heightPercentageToDP(3),
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    marginTop: heightPercentageToDP(1),
    alignItems: "center",
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "center",
  },
});
