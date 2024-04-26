import React from "react";
import { FONT_SIZES, MyText } from "../../components/Text";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
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
import Animated, { FadeInLeft, FadeInUp } from "react-native-reanimated";
import { NewSearchScreen } from "./newIndex";

export const SearchScreen: React.FC<
  StackScreenProps<SearchStackParamList, "SearchScreen">
> = ({ route, navigation }) => {
  const [selectedTab, setSelectedTab] = React.useState<"ORGANIZERS" | "EVENTS">(
    !!route.params?.eventId ? "EVENTS" : "EVENTS"
  );

  const renderTab = (id: string, title: string) => (
    <TouchableOpacity onPress={() => setSelectedTab(id as any)}>
      <LinearGradient
        colors={
          selectedTab === id
            ? [Colors.primary, Colors.secondary]
            : [Colors.backgroundDark, Colors.backgroundDark]
        }
        style={[
          {
            marginRight: widthPercentageToDP(2),
          },
          selectedTab === id ? { borderRadius: 13 } : undefined,
        ]}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View
          style={[
            styles.tabLabel,
            selectedTab === id ? styles.selectedTab : undefined,
            selectedTab === id
              ? {
                  borderWidth: 0,
                }
              : undefined,
          ]}
        >
          <MyText size="small" bold>
            {title}
          </MyText>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderTabs = () => {
    return (
      <Animated.View style={{}} entering={FadeInLeft}>
        <ScrollView
          horizontal
          //  style={{ paddingTop: heightPercentageToDP(1.4) }}
        >
          {renderTab("EVENTS", "Eventi")}
          {renderTab("ORGANIZERS", "Organizzatori")}
        </ScrollView>
      </Animated.View>
    );
  };

  const renderContent = () => {
    if (selectedTab === "EVENTS") {
      return <EventsTab eventId={route.params?.eventId} />;
    } else if (selectedTab === "ORGANIZERS") {
      return <OrganizersTab />;
    }
  };

  // @ts-ignore
  if (__DEV__) return <NewSearchScreen route={route} navigation={navigation} />;

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            marginTop: heightPercentageToDP(1),
          }}
        >
          <Inline>
            <View
              style={{
                flex: 1,
                // paddingLeft: widthPercentageToDP(2)
              }}
            >
              {/* <SearchBar
                value={searchText}
                setValue={setSearchText}
                onChangeText={setSearchText}
                placeholder="Cerca tra eventi, organizzatori, locali..."
              /> */}

              {renderTabs()}
            </View>
          </Inline>
        </View>
        {renderContent()}
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Costants.statusBarHeight : 0,
  },
  searchBarContainer: {
    marginHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundPrimary,
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 2,
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
});
