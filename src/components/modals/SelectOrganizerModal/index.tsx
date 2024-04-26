import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";
import { debounce, set } from "lodash";
import {
  Organizer,
  useSearchOrganizersQuery,
} from "../../../generated/graphql";
import { Inline } from "../../Inline";
import { Image } from "react-native";

interface SelectModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onSelected: (item: Organizer) => void;
}

export const SelectOrganizerModal: React.FC<SelectModalProps> = ({
  isOpen,
  setIsOpen,
  onSelected,
}) => {
  const { data, refetch } = useSearchOrganizersQuery({
    variables: { text: "" },
  });

  const [options, setOptions] = useState<Organizer[]>([]);

  useEffect(() => {
    setOptions(data?.searchOrganizers as Organizer[]);
  }, [data]);

  // valore della serachbar
  const [searchBarValue, setSearchBarValue] = useState("");

  const ref = useRef<RBSheet>(null);

  // Dimensioni:
  const { height } = useWindowDimensions();
  const modalHeight = height - (height * 15) / 100;

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.open();
    else ref.current.close();
  }, [isOpen]);

  const onOptionSelected = (item: Organizer) => () => {
    setIsOpen(false);
    onSelected(item);
    setOptions([]);
    setSearchBarValue("");
  };

  const searchSchoolDebounced = (value: string) => {
    refetch({ text: value });
  };

  const searchSchool = useCallback(debounce(searchSchoolDebounced, 500), []);

  /**
   * Esegue una ricerca tra le opzioni
   * @param value
   */
  const onSearchBarValueChange = async (value: string) => {
    setSearchBarValue(value);
    searchSchool(value);
  };

  const renderOptions = () => (
    <FlatList
      numColumns={2}
      data={options}
      renderItem={({ item, index }) => {
        return (
          <TouchableHighlight
            key={index}
            underlayColor={"transparent"}
            style={[
              styles.option,
              {
                flex: 1,
                maxWidth: "50%",
                marginLeft: index % 2 === 0 ? 0 : 10,
                marginRight: index % 2 === 0 ? 10 : 0,
              },
            ]}
            onPress={onOptionSelected(item as any)}
          >
            <View>
              {item.image && (
                <Image
                  source={{ uri: item.image.url }}
                  style={{
                    aspectRatio: 1,
                    flex: 1,
                    borderRadius: 15,
                    backgroundColor: Colors.backgroundLight,
                  }}
                />
              )}

              <MyText mediumEmphasis bold style={{ marginTop: hp(0.7) }}>
                {item.name}
              </MyText>
            </View>
          </TouchableHighlight>
        );
      }}
    />
  );

  return (
    // @ts-ignore
    <RBSheet
      ref={ref}
      height={modalHeight}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      customStyles={{ container: styles.container }}
    >
      {/** TITOLO */}
      <MyText bold size="big" style={styles.title}>
        Seleziona organizzatore
      </MyText>

      {/** BARRA DI RICERCA */}

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Cerca organizzatore"
          placeholderTextColor={Colors.lightGrey}
          style={styles.serachBarInput}
          value={searchBarValue}
          onChangeText={onSearchBarValueChange}
        />
        <TouchableOpacity
          disabled={searchBarValue.length === 0}
          onPress={() => {
            setSearchBarValue("");
            setOptions([]);
          }}
        >
          {searchBarValue.length > 0 ? (
            <Feather name="x" color={Colors.whiteSmoke} size={22} />
          ) : (
            <Feather name="search" color={Colors.whiteSmoke} size={22} />
          )}
        </TouchableOpacity>
      </View>

      {/** OPZIONI */}
      {renderOptions()}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: Spacing.screenHorizontalPadding,
    backgroundColor: Colors.backgroundDark,
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  option: {
    paddingVertical: 8,
  },

  searchBar: {
    backgroundColor: Colors.backgroundLight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: hp(1.7),
    borderRadius: 8,
    marginBottom: 35,
    marginTop: hp(2),
  },
  serachBarInput: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: "#fff",
  },
});
