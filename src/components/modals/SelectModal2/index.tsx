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
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Spacing, Colors } from "../../../constant";
import { Feather } from "@expo/vector-icons";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";
import { SearchBar } from "../../inputs";

interface SelectModalProps<T> {
  title?: string;
  subtitle?: string;
  serachBarPlaceholder?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  defaultOptions: T[];
  selectedOption?: T;
  onSelected: (option: T, index: number) => void;
  hideSearchbar?: boolean;
  searchOptions?: (serachKey: string) => Promise<T[]>;
  renderText?: (option: T) => string;
  throttle?: boolean;
}

export const SelectModal2: <T>(
  props: SelectModalProps<T>
) => React.ReactElement = ({
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
  renderText,
  throttle,
}) => {
  // opzioni mostrate
  const [options, setOptions] = useState(defaultOptions);

  // valore della serachbar
  const [searchBarValue, setSearchBarValue] = useState("");

  const ref = useRef<RBSheet>(null);
  /*get safe area view height*/
  const { top } = useSafeAreaInsets();

  // Dimensioni:
  const { height } = useWindowDimensions();
  console.log("height", height);
  const modalHeight = height - top;
  console.log("modalHeight", modalHeight);

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

  const _searchOptions = async (value: string) => {
    if (!searchOptions) return;
    const res = await searchOptions(value);
    setOptions(res);
  };

  const searchOptionsDebounced = useCallback(
    _.debounce(_searchOptions, 500),
    []
  );

  /**
   * Esegue una ricerca tra le opzioni
   * @param value
   */
  const onSearchBarValueChange = async (value: string) => {
    setSearchBarValue(value);
    if (!value || value.length === 0) return setOptions(defaultOptions);

    // Se è stata passato una funzione per eseguire una la ricerca custum utilizza quella, altrimenti
    // esegue una semplice ricerca nel testo
    if (typeof searchOptions === "function") searchOptionsDebounced(value);
    else {
      const results = options.filter((item) => {
        if (typeof item === "string")
          return item.toLowerCase().includes(value.toLowerCase());
        else return item;
      });
      setOptions(results);
    }
  };

  const renderOptions = () => (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{ paddingTop: heightPercentageToDP(3) }}
    >
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
            <Text style={styles.optionText}>
              {renderText
                ? renderText(item)
                : typeof item === "string"
                ? item
                : ""}
            </Text>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  );

  return (
    // @ts-ignore
    <RBSheet
      ref={ref}
      height={modalHeight / 2}
      closeOnDragDown={true}
      closeOnPressMask={true}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      customStyles={{ container: styles.container }}
    >
      {/** TITOLO */}
      <MyText bold size="big" style={styles.title}>
        {title}
      </MyText>
      {/** SOTTOTITOLO */}
      {subtitle && (
        <MyText light style={styles.subtitle} size="big" mediumEmphasis>
          {subtitle}
        </MyText>
      )}
      {/** BARRA DI RICERCA */}
      {!hideSearchbar && (
        <SearchBar
          placeholder={serachBarPlaceholder}
          value={searchBarValue}
          onChangeText={onSearchBarValueChange}
          style={styles.searchBar}
          placeholderTextColor={Colors.darkGrey}
          setValue={setSearchBarValue}
          containerStyle={{
            backgroundColor: Colors.whiteSmoke,
            marginTop: 20,
          }}
          autoFocus
          textColor="#000"
          showX
        />
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
    backgroundColor: Colors.backgroundLight,
  },
  title: {
    marginTop: 4,
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
    paddingVertical: hp(2),
    borderRadius: 11,
    marginBottom: 35,
  },
  serachBarInput: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: "#fff",
  },
});
