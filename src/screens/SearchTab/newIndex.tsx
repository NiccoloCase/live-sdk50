import React from "react";
import { FONT_SIZES, MyText } from "../../components/Text";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
  SectionList,
} from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Colors, Spacing } from "../../constant";
import { FONT_BOLD } from "../../constant/typography";
import { Inline } from "../../components/Inline";
import { EventsTab } from "./EventsTab";
import { OrganizersTab } from "./OrganizersTab";
import { StackScreenProps } from "@react-navigation/stack";
import { SearchStackParamList } from "../../navigation";
import Costants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  CurvedTransition,
  FadeInLeft,
  FadeInUp,
} from "react-native-reanimated";
import { SearchBar } from "../../components/inputs";
import { useGetEventsByOrganizerQuery } from "../../generated/graphql";
import { MyImage } from "../../components/Image";
import { Feather } from "@expo/vector-icons";
import chroma from "chroma-js";
import { SearchEventCardItem } from "./EventCardItem";
import { EventMapView } from "../../components/Maps";
import { GradientHeaderBackground } from "../../components/headers/GradientBbackground";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { style } from "d3";
import { SearchFilters } from "./SearchFilters";

const DUMMY = new Array(5).fill(undefined);

export const NewSearchScreen: React.FC<
  StackScreenProps<SearchStackParamList, "SearchScreen">
> = ({ route, navigation }) => {
  const { data, fetchMore, refetch, loading } = useGetEventsByOrganizerQuery({
    fetchPolicy: "cache-and-network",
    variables: { organizer: "64f348cdcba9aa9d91b6f287" },
    onCompleted: (data) => {},
  });

  const [headerHeight, setHeaderHeight] = React.useState(0);

  const [containerWidth, setContainerWidth] = React.useState(0);

  const renderSearchbar = () => {
    return (
      <>
        <View style={styles.searchBarContainer}>
          {/** @ts-ignore */}
          <SearchBar
            placeholder="Eventi, locali, organizzatori..."
            placeholderTextColor={Colors.darkGrey}
          />
        </View>
      </>
    );
  };

  const renderDummy = () => {
    return (
      <FlatList
        contentContainerStyle={styles.flatlistContainer}
        data={DUMMY}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SkeletonPlaceholder
            backgroundColor={Colors.backgroundLight}
            highlightColor={Colors.backgroundLightBright}
          >
            <View
              style={{
                width: containerWidth / 2 - 20,
                height: 200,
                borderRadius: 20,
                margin: 10,
              }}
            ></View>
          </SkeletonPlaceholder>
        )}
      />
    );
  };

  const renderHero = () => {
    return (
      <View
        style={{
          marginBottom: heightPercentageToDP(3),
          marginTop: heightPercentageToDP(2),
        }}
        onLayout={(event) => {
          setHeaderHeight(
            event.nativeEvent.layout.y + event.nativeEvent.layout.height
          );
        }}
      >
        <MyText size="title" bold>
          Eventi in Vista
        </MyText>
        <MyText size="big" mediumEmphasis bold>
          Scopri. Partecipa. Divertiti!
        </MyText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GradientHeaderBackground

      //  height={headerHeight}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {renderHero()}
        {renderSearchbar()}

        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: Colors.whiteSmoke,
              borderRadius: 20,
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("MapScreen");
            }}
          >
            <Feather
              name="map-pin"
              size={20}
              color={Colors.darkGrey}
              style={{
                marginRight: 5,
              }}
            />
            <MyText bold size="small" dark>
              Mappa
            </MyText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Costants.statusBarHeight : 0,
    paddingHorizontal: Spacing.screenHorizontalPadding,
  },
  searchBarContainer: {
    marginBottom: heightPercentageToDP(1),
  },
  searchBarTextInput: {
    height: heightPercentageToDP(5),
    fontFamily: FONT_BOLD,
    fontSize: FONT_SIZES.medium,
    color: "#fff",
    flex: 1,
    marginRight: 5,
  },
  tabLabel: {
    paddingHorizontal: widthPercentageToDP(6),
    paddingVertical: heightPercentageToDP(1.3),
    borderRadius: 13,

    borderColor: Colors.whiteSmoke,
    borderWidth: 2,
  },
  selectedTab: {
    // backgroundColor: Colors.backgroundDark,
    marginVertical: 2,
    marginHorizontal: 2,
  },

  flatlistContainer: {
    // paddingTop: heightPercentageToDP(5)
  },
});
