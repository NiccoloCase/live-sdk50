import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  TouchableHighlight,
  TextInput,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";

interface SelectModalProps {
  title?: string;
  subtitle?: string;
  serachBarPlaceholder?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  defaultOptions: string[];
  selectedOption?: string;
  onSelected: (option: string, index: number) => void;
  hideSearchbar?: boolean;
  searchOptions?: (serachKey: string) => Promise<string[]>;
  height?: number;
}

export const SelectModal: React.FC<SelectModalProps> = ({
  isOpen,
  setIsOpen,
  defaultOptions,
  selectedOption,
  onSelected,
  title,
  subtitle,
  serachBarPlaceholder,
  searchOptions,
  hideSearchbar,
  height: custumHeight,
}) => {
  // opzioni mostrate
  const [options, setOptions] = useState(defaultOptions);

  // valore della serachbar
  const [searchBarValue, setSearchBarValue] = useState("");

  const ref = useRef<RBSheet>(null);

  // Dimensioni:
  const { height } = useWindowDimensions();
  const modalHeight = custumHeight || height - (height * 15) / 100;

  useEffect(() => {
    setOptions(defaultOptions);
  }, [defaultOptions]);

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) ref.current.open();
    else ref.current.close();
  }, [isOpen]);

  const onOptionSelected = (index: number) => () => {
    setIsOpen(false);
    onSelected(options[index], index);
  };

  /**
   * Esegue una ricerca tra le opzioni
   * @param value
   */
  const onSearchBarValueChange = async (value: string) => {
    setSearchBarValue(value);
    if (!value || value.length === 0) return setOptions(defaultOptions);

    let results: string[];

    // Se è stata passato una funzione per eseguire una la ricerca custum utilizza quella, altrimenti
    // esegue una semplice ricerca nel testo
    if (typeof searchOptions === "function")
      results = await searchOptions(value);
    else
      results = options.filter((item) =>
        item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );

    setOptions(results);
  };

  const renderOptions = () => (
    <ScrollView keyboardShouldPersistTaps="always">
      {options.map((item, index) => {
        const isSelected = options[index] === selectedOption;

        return (
          <TouchableHighlight
            key={index}
            underlayColor={"transparent"}
            style={[
              styles.option,
              {
                borderLeftColor: isSelected ? Colors.primary : "transparent",
                backgroundColor: "transparent",
              },
            ]}
            onPress={onOptionSelected(index)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
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
      <MyText bold size="title" style={styles.title}>
        {title}
      </MyText>
      {/** SOTTOTITOLO */}
      <MyText light style={styles.subtitle} size="big" mediumEmphasis>
        {subtitle}
      </MyText>
      {/** BARRA DI RICERCA */}
      {!hideSearchbar && (
        <View style={styles.searchBar}>
          <TextInput
            placeholder={serachBarPlaceholder}
            placeholderTextColor={Colors.lightGrey}
            style={styles.serachBarInput}
            value={searchBarValue}
            onChangeText={onSearchBarValueChange}
          />
          <TouchableOpacity
            disabled={searchBarValue.length === 0}
            onPress={() => setSearchBarValue("")}
          >
            {searchBarValue.length > 0 ? (
              <Feather name="x" color={Colors.whiteSmoke} size={22} />
            ) : (
              <Feather name="search" color={Colors.whiteSmoke} size={22} />
            )}
          </TouchableOpacity>
        </View>
      )}
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomColor: Colors.darkGrey,
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    backgroundColor: "red",
  },
  optionText: {
    fontSize: 16,
    color: Colors.lightGrey,
  },
  searchBar: {
    backgroundColor: Colors.backgroundLight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: hp(1.7),
    borderRadius: 8,
    marginBottom: 35,
  },
  serachBarInput: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: "#fff",
  },
});
