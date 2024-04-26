import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { MyText } from "../../Text";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Colors, Spacing } from "../../../constant";
import { timeBetweenDates, formatShortDay } from "../../../helper/format/time";
import { Inline } from "../../Inline";
import hexToRgba from "hex-to-rgba";
import { SUBMIT_BUTTON_HEIGHT } from "../../buttons";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../Image";

interface EventCardProps {
  date: Date;
  description: string;
  title: string;
  imageUrl: string;
  location: string;
  only_18: boolean;
  price?: number;
  priceText?: string;
}

export const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  imageUrl,
  price,
  only_18,
  location,
  priceText,
}) => {
  const [coutdown, setCoutdown] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const navigation = useNavigation();

  useEffect(() => {
    // cowndown
    updateCoutdown();
    const interval = setInterval(() => {
      updateCoutdown();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const updateCoutdown = () => {
    const res = timeBetweenDates(date);
    setCoutdown(res);
  };

  const renderCoutdown = () => {
    if (!coutdown) return null;
    if (Number(date) - Number(new Date()) < 10)
      return (
        <MyText bold size="title">
          In questo momento!
        </MyText>
      );
    return (
      <Inline style={styles.coutdown}>
        <View style={styles.coutdownBlock}>
          <MyText bold size="title" mediumEmphasis>
            {coutdown?.days}
          </MyText>
          <MyText mediumEmphasis size="small">
            {" Giorn" + (coutdown.days == 1 ? "o " : "i ")}
          </MyText>
        </View>
        <View style={styles.coutdownBlock}>
          <MyText bold size="title" mediumEmphasis>
            {coutdown?.hours}
          </MyText>
          <MyText mediumEmphasis size="small">
            {" Or" + (coutdown.hours == 1 ? "a" : "e")}
          </MyText>
        </View>
        <View style={styles.coutdownBlock}>
          <MyText bold size="title" mediumEmphasis>
            {coutdown?.minutes}
          </MyText>
          <MyText mediumEmphasis size="small">
            {" Minut" + (coutdown.minutes == 1 ? "o " : "i ")}
          </MyText>
        </View>
        <View style={styles.coutdownBlock}>
          <MyText bold size="title" mediumEmphasis>
            {coutdown?.seconds}
          </MyText>
          <MyText mediumEmphasis size="small">
            {" Second" + (coutdown.seconds == 1 ? "o " : "i ")}
          </MyText>
        </View>
      </Inline>
    );
  };

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInUp.delay(600).duration(500)}
    >
      <View style={styles.content}>
        {/** TITOLO */}
        <Inline>
          <MyText bold size="title" style={{ paddingBottom: hp(1), flex: 1 }}>
            {title}
          </MyText>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("LimitEventDettails", {
                description,
                date,
                location,
                price,
                only_18,
                priceText,
              })
            }
          >
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={[0, 1]}
              end={[1, 0]}
              style={{ padding: 6, borderRadius: 10 }}
            >
              <MyText size="small">Dettagli evento</MyText>
            </LinearGradient>
          </TouchableOpacity>
        </Inline>

        <Inline>
          <View style={{ flex: 1 }}>{renderCoutdown()}</View>
          <MyText mediumEmphasis>{formatShortDay(date, true)}</MyText>
        </Inline>
      </View>

      <MyImage
        url={imageUrl}
        height={MyDeliveryH.eventImage.big}
        style={styles.image}
        resizeMode="contain"
      />

      {/* <BlurView
        blurType="dark"
        style={{
          ...StyleSheet.absoluteFillObject,
          borderRadius: 20,
        }}
        blurAmount={15}
      />
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          //  backgroundColor: chroma("#000").alpha(0.9).hex(),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Inline style={{ padding: 30 }}>
          <Feather
            name="lock"
            size={heightPercentageToDP(10)}
            color={Colors.primary}
            style={{ alignSelf: "center", marginBottom: hp(1) }}
          />
          <View style={{ flex: 1, marginLeft: 20 }}>
            <MyText bold size="title">
              Manca poco!
            </MyText>
            <MyText mediumEmphasis bold style={{ marginTop: 5 }}>
              Preparati a una vasta scelta di eventi esclusivi
            </MyText>
          </View>
        </Inline>
        <TouchableOpacity
          style={{ backgroundColor: hexToRgba("#fff", 0.3), borderRadius: 20 }}
          onPress={() => {
            navigation.navigate("RadarTab");
          }}
        >
          <Inline style={{ padding: 30 }}>
            <MyText bold dark>
              Metre aspetti, sfrutta la funzionalità Radar e scopri le persone
              vicine a te!
            </MyText>
          </Inline>
        </TouchableOpacity>
      </View> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: SUBMIT_BUTTON_HEIGHT + 6,
  },
  image: { width: "100%", aspectRatio: 1, borderRadius: 20, marginTop: 6 },
  coutdownBlock: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
  },
  coutdown: {
    // borderTopWidth: 1,
    //borderBottomWidth: 1,
    borderColor: hexToRgba("#fff", 0.5),
    paddingVertical: hp(1),
  },
  content: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    paddingTop: hp(2),
    // paddingBottom: hp(3),
    backgroundColor: Colors.backgroundLight,
    borderRadius: 17,
  },
});
