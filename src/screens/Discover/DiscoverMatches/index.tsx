import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MyText } from "../../../components/Text";
import { Match, useGetMatchesQuery } from "../../../generated/graphql";
import { Inline } from "../../../components/Inline";
import Animated, { FadeInUp } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors, Spacing } from "../../../constant";
import Lottie from "lottie-react-native";
import { Spinner } from "../../../components/Spinner";
import { cryptHalfString } from "../../../helper/format";
import { validationConfig } from "../../../config";
import { LinearGradient } from "expo-linear-gradient";
import { useStoreState } from "../../../store";
import { useTranslation } from "react-i18next";

const MATCH_SPACING = 5;
const numColumns = 3;

interface MatchCardProps {
  item: Match;
  index: number;
}

export const MatchCard: React.FC<MatchCardProps> = ({ item, index }) => {
  const navigation = useNavigation();
  const window = useWindowDimensions();
  const clientId = useStoreState((s) => s.auth.userId);
  const { t } = useTranslation("discover");

  const unseenMessagesCount = useMemo(() => {
    if (!item.messages) return 0;
    return item.messages.filter((item) => {
      return !item.seen && item.sender !== clientId;
    }).length;
  }, [item]);

  return (
    <TouchableOpacity
      disabled={true}
      onPress={() => {
        // navigation.navigate("LimitChat", {
        //   user: item.user,
        //   matchId: item.id,
        // });
      }}
    >
      <Animated.View entering={FadeInUp.delay(150 * index)}>
        <LinearGradient
          colors={[Colors.primary, Colors.secondary]}
          start={[0, 1]}
          end={[1, 0]}
          style={[
            styles.card,
            {
              width:
                (window.width -
                  MATCH_SPACING * 4 -
                  Spacing.screenHorizontalPadding * 2) /
                3,
              marginLeft:
                index % numColumns != 0
                  ? MATCH_SPACING
                  : Spacing.screenHorizontalPadding,
              marginRight:
                index % numColumns != numColumns - 1
                  ? MATCH_SPACING
                  : Spacing.screenHorizontalPadding,
            },
          ]}
        >
          {item.user.profilePicture && (
            <Image
              // resizeMode="cover"
              source={{ uri: item?.user.profilePicture.url }}
              style={[styles.picture]}
            />
          )}

          <MyText bold>{cryptHalfString(item?.user.username)}</MyText>
        </LinearGradient>

        {unseenMessagesCount > 0 && (
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              marginTop: -5,
              marginRight: 0,
              backgroundColor: "blue",
              borderRadius: 20,
              minWidth: 25,
              minHeight: 25,
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
            }}
          >
            <MyText>
              {unseenMessagesCount > 10 ? "10+" : unseenMessagesCount}
            </MyText>
          </LinearGradient>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const DiscoverMatchesScreen = () => {
  const { data, loading } = useGetMatchesQuery({
    fetchPolicy: "cache-and-network",
  });
  const { t } = useTranslation("discover");
  const matches = useMemo(() => {
    // rimuove gli uenti doppioni (in caso di bug al server)
    const array =
      data?.getMatches.filter((item, index, self) => {
        return self.findIndex((t) => t.user.id === item.user.id) === index;
      }) || [];
    // ordina i match mettendo prima quelli nuovi (in base a createdAt)
    array.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      else if (a.createdAt < b.createdAt) return 1;
      else return 0;
    });
    return array || [];
  }, [data]);

  const renderContent = () => {
    if (matches.length > 0)
      return (
        <FlatList
          contentContainerStyle={{ paddingTop: 10 }}
          data={matches}
          numColumns={numColumns}
          renderItem={({ item, index }) => (
            <MatchCard item={item as any} index={index} />
          )}
          keyExtractor={(item) => item?.user.id}
        />
      );
    else if (!loading && matches.length === 0)
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Lottie
            source={require("../../../../assets/lottie/sad.json")}
            autoPlay
            loop
            style={{ width: wp(50), height: wp(50), marginBottom: hp(2) }}
          />
          <MyText bold mediumEmphasis>
            {t("no-matches")}
          </MyText>
        </View>
      );
    else
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Spinner size={hp(7)} />
        </View>
      );
  };

  return (
    <SafeAreaView style={styles.container}>{renderContent()}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: hp(2) },
  card: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(2),
    paddingBottom: 4,
    paddingTop: 4,
    paddingHorizontal: 4,
  },
  picture: {
    //height: hp(7),
    borderRadius: 20,
    aspectRatio: validationConfig.media.profilePicture.aspectRatio,
    marginBottom: hp(0.5),
    width: "100%",
    backgroundColor: Colors.backgroundLight,
  },
});
