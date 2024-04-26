//import liraries
import React, { Component, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Inline } from "../../components/Inline";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "../../constant";
import { MyText } from "../../components/Text";
import { Feather } from "@expo/vector-icons";
import Animated, {
  CurvedTransition,
  FadeIn,
  FadeInUp,
  FadingTransition,
  SequencedTransition,
  SlideInUp,
} from "react-native-reanimated";
import RangeSlider from "./RangeSlider";

const CONTENT_HEIGHT = hp(20);

const FILTERS = [
  {
    id: "WHERE",
    text: "Dove?",
  },
  {
    id: "WHEN",
    text: "Stasera",
  },
  {
    id: "PRICE",
    text: "Gratuito",
  },
];

interface SearchFilterProps {
  title: string;
  id: string;
  isSelected?: boolean;
  onPress?: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  title,
  id,
  isSelected,
  onPress,
}) => {
  return (
    <Animated.View layout={CurvedTransition.duration(300)}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.tagButton,
          isSelected && {
            backgroundColor: Colors.whiteSmoke,
          },
        ]}
      >
        <MyText dark={isSelected} size="small" bold>
          {title}
        </MyText>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const SearchFilters = () => {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  const extendedFilters = useMemo(() => {
    const filters = [...FILTERS];
    // estende con iSlected
    const extended = filters.map((filter) => ({
      ...filter,
      isSelected: selectedIds.includes(filter.id),
    }));
    // Ordina mettendo prima i selected
    const sorted = extended.sort((a, b) => {
      if (a.isSelected && !b.isSelected) {
        return -1;
      } else if (!a.isSelected && b.isSelected) {
        return 1;
      } else {
        return filters.indexOf(a) - filters.indexOf(b);
      }
    });

    return sorted;
  }, [selectedIds]);

  const renderContent = () => {
    return (
      <>
        {selectedIds.includes("WHERE") && (
          <Animated.View layout={CurvedTransition} entering={FadeInUp}>
            <View style={styles.contentWrapper}>
              <RangeSlider />

              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignSelf: "flex-start",
                  padding: 10,

                  backgroundColor: Colors.backgroundLightBright,
                  borderRadius: 15,
                  marginBottom: 20,
                  marginTop: 20,
                }}
              >
                <Feather name="target" size={24} color={Colors.darkGrey} />
                <MyText
                  bold
                  style={{ marginLeft: 10 }}
                  size="small"
                  mediumEmphasis
                >
                  Vicino a me
                </MyText>
              </View>*/}

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{
                  //    backgroundColor: "red",
                  marginTop: heightPercentageToDP(4),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: 10,
                    backgroundColor: Colors.backgroundLightBright,
                    borderRadius: 15,
                    marginBottom: 20,
                    marginRight: 5,
                  }}
                >
                  <MyText bold size="small" mediumEmphasis>
                    Firenze
                  </MyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: 10,
                    backgroundColor: Colors.backgroundLightBright,
                    borderRadius: 15,
                    marginBottom: 20,
                    marginRight: 5,
                  }}
                >
                  <MyText bold size="small" mediumEmphasis>
                    Napoli
                  </MyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: 10,
                    backgroundColor: Colors.backgroundLightBright,
                    borderRadius: 15,
                    marginBottom: 20,
                    marginRight: 5,
                  }}
                >
                  <MyText bold size="small" mediumEmphasis>
                    Bergamo
                  </MyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: 10,
                    backgroundColor: Colors.backgroundLightBright,
                    borderRadius: 15,
                    marginBottom: 20,
                    marginRight: 5,
                  }}
                >
                  <MyText bold size="small" mediumEmphasis>
                    Milano
                  </MyText>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    padding: 10,
                    backgroundColor: Colors.backgroundLightBright,
                    borderRadius: 15,
                    marginBottom: 20,
                    marginRight: 5,
                  }}
                >
                  <MyText bold size="small" mediumEmphasis>
                    Roma
                  </MyText>
                </View>
              </ScrollView>
            </View>
          </Animated.View>
        )}
      </>
    );
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {extendedFilters.map((filter) => (
          <SearchFilter
            key={filter.id}
            id={filter.id}
            title={filter.text}
            isSelected={selectedIds.includes(filter.id)}
            onPress={() => {
              setSelectedIds((prev) => {
                if (prev.includes(filter.id)) {
                  return prev.filter((id) => id !== filter.id);
                } else {
                  return [...prev, filter.id];
                }
              });
            }}
          />
        ))}
      </ScrollView>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  tagButton: {
    borderWidth: 1.5,
    borderColor: Colors.darkGrey,
    paddingHorizontal: hp(2.7),
    paddingVertical: hp(2.1),
    borderRadius: 13,
    marginRight: 5,
    backgroundColor: Colors.backgroundLight,
  },
  wrapper: {
    marginVertical: 10,
  },
  contentWrapper: {
    paddingVertical: 10,
    minHeight: CONTENT_HEIGHT,

    borderRadius: 20,
    // backgroundColor: Colors.backgroundLight,
    //paddingHorizontal: 10,
    marginTop: hp(2),
  },
});
