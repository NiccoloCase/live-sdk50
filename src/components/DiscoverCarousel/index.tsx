import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { ScrollView } from "react-native";
import { Colors, Spacing } from "../../constant";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { MyText } from "../Text";
import { SchoolCard } from "./cards/SchoolCard";
import { CompleteProfileCard } from "./cards/CompleteProfileCard";
import { useWhoamiQuery } from "../../generated/graphql";
import { setIn } from "formik";
import { InstagramCard } from "./cards/InstagramCard";
import { RadarCarouselCard } from "./cards/RadarCard";
import { get_age } from "../../helper/format";

export const DISCOVER_CAROUSEL_HEIGHT = heightPercentageToDP(11.3);
const SNAP_TIME = 60 * 1000;

const DiscoverCarousel = () => {
  const scrollView = useRef<ScrollView>(null);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const { data: me } = useWhoamiQuery();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const cards = useMemo(() => {
    const c = [];

    if (!me?.whoami.profilePicture?.url) c.push("COMPLETE_PROFILE");
    if (!me?.whoami.links?.instagramName) c.push("INSTAGRAM");

    c.push("RADAR");

    // Se l'utente ha meno di 18 anni
    if (me?.whoami.birthday && get_age(me.whoami.birthday) <= 18)
      c.push("SCHOOL");

    return c;
  }, [me]);

  useEffect(() => {
    if (cards.length < 2 || !scrollView.current) return;

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (index >= cards.length - 1) snapTo(0);
      else snapTo(index + 1);
    }, SNAP_TIME);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [cards, index, width]);

  const snapTo = (i: number) => {
    if (!scrollView.current || width < 1) return;
    setIndex(i);

    setTimeout(() => {
      scrollView.current?.scrollTo({
        x: i * width,
        y: 0,
        animated: true,
      });
    }, 1);
  };

  const renderCards = () => {
    return cards.map((card, i) => {
      if (card === "INSTAGRAM")
        return (
          <View style={[styles.card, { width }]} key={card}>
            <InstagramCard />
          </View>
        );
      else if (card === "SCHOOL")
        return (
          <View style={[styles.card, { width }]} key={card}>
            <SchoolCard />
          </View>
        );
      else if (card === "COMPLETE_PROFILE")
        return (
          <View style={[styles.card, { width }]} key={card}>
            <CompleteProfileCard />
          </View>
        );
      else if (card === "RADAR")
        return (
          <View style={[styles.card, { width }]} key={card}>
            <RadarCarouselCard />
          </View>
        );
      else return null;
    });
  };

  if (cards.length < 1) return null;

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        setHeight(e.nativeEvent.layout.height);
        setWidth(e.nativeEvent.layout.width);
      }}
    >
      <ScrollView
        scrollToOverflowEnabled
        ref={scrollView}
        removeClippedSubviews={false}
        style={{ overflow: "visible" }}
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={20}
        onScroll={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
          );
          setIndex(index);
        }}
      >
        {renderCards()}
      </ScrollView>

      <View>
        {cards.length > 1 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 7,
            }}
          >
            {cards.map((_, i) => {
              return (
                <View
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 4,
                    backgroundColor:
                      i === index ? Colors.darkGrey : Colors.backgroundPrimary,
                    marginHorizontal: 5,
                  }}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.screenHorizontalPadding,
    flex: 1,
  },
  card: {
    paddingHorizontal: Spacing.screenHorizontalPadding,
    zIndex: 100,
    height: DISCOVER_CAROUSEL_HEIGHT,
    borderRadius: 10,
  },
});

export default DiscoverCarousel;
