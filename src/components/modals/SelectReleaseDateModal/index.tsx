import React, { isValidElement, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ModalComponent } from "../ModalComponent";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";
import { Inline } from "../../Inline";
import { Colors } from "../../../constant";
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectDropdown from "react-native-select-dropdown";
import { FONT_REGULAR } from "../../../constant/typography";
import { Centered } from "../../Centered";
import { formatShortDay, formatTime } from "../../../helper/format";
import { SubmitButton } from "../../buttons";

const hours = [
  {
    text: "00:00 AM",
    value: 0,
  },
  {
    text: "01:00 AM",
    value: 1,
  },
  {
    text: "02:00 AM",
    value: 2,
  },
  {
    text: "03:00 am",
    value: 3,
  },
  {
    text: "04:00 AM",
    value: 4,
  },
  {
    text: "05:00 AM",
    value: 5,
  },
  {
    text: "06:00 AM",
    value: 6,
  },
  {
    text: "07:00 AM",
    value: 7,
  },
  {
    text: "08:00 AM",
    value: 8,
  },
  {
    text: "09:00 AM",
    value: 9,
  },
  {
    text: "10:00 AM",
    value: 10,
  },
  {
    text: "11:00 AM",
    value: 11,
  },
  {
    text: "12:00 PM",
    value: 12,
  },
  {
    text: "01:00 PM",
    value: 13,
  },
  {
    text: "02:00 PM",
    value: 14,
  },
  {
    text: "03:00 PM",
    value: 15,
  },
  {
    text: "04:00 PM",
    value: 16,
  },
  {
    text: "05:00 PM",
    value: 17,
  },
  {
    text: "06:00 PM",
    value: 18,
  },
  {
    text: "07:00 PM",
    value: 19,
  },
  {
    text: "08:00 PM",
    value: 20,
  },
  {
    text: "09:00 PM",
    value: 21,
  },
  {
    text: "10:00 PM",
    value: 22,
  },
  {
    text: "11:00 PM",
    value: 23,
  },
];

interface SelectReleaseDateModalProps {
  isOpen: boolean;
  onSelected: (date: Date | null) => void;
  setIsOpen: (x: boolean) => void;
  value?: Date;
}

export const SelectReleaseDateModal: React.FC<SelectReleaseDateModalProps> = ({
  isOpen,
  onSelected,
  setIsOpen,
  value,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // La data di default è domani
  const [selectedDate, setSelectedDate] = useState<Date>(
    value || getMinValidDate()
  );

  const [hasError, setHasError] = useState(false);

  function getMinValidDate() {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setHours(0);
    now.setDate(now.getDate() + 1);

    return now;
  }

  const onDaySelected = (date: Date) => {
    // Aggiorna la data selezionata
    // senza cambiare l'ora

    // Controlla che sia valida
    if (!date) return;
    if (date.getTime() < getMinValidDate().getTime()) return;

    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setFullYear(date.getFullYear());
    newSelectedDate.setMonth(date.getMonth());
    newSelectedDate.setDate(date.getDate());
    setSelectedDate(newSelectedDate);
  };

  const onTimeSelected = (hour: number) => {
    // Aggiorna l'ora selezionata
    // senza cambiare la data tenendo però conto del fuso orario
    const newSelectedDate = new Date(selectedDate);
    newSelectedDate.setHours(hour);
    newSelectedDate.setMinutes(0);
    newSelectedDate.setSeconds(0);

    setSelectedDate(newSelectedDate);
  };

  const checkIfDateIsValid = () => {
    // Controlla se la data selezionata è valida
    // Controlla che sia almeno il giorno dopo
    const now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setDate(now.getDate() + 1);

    // Leva i secondi, millisecondi e minuti alla data selezionata
    const _selectedDate = new Date(selectedDate);
    selectedDate.setSeconds(0);
    selectedDate.setMilliseconds(0);
    selectedDate.setMinutes(0);

    if (!_selectedDate) return false;
    else if (selectedDate.getTime() < now.getTime()) return false;

    return true;
  };

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(value || getMinValidDate());
    } else {
      setHasError(false);
    }
  }, [isOpen, value]);

  const submit = () => {
    if (checkIfDateIsValid()) {
      setHasError(false);
      onSelected(selectedDate);
    } else {
      setHasError(true);
    }
  };

  return (
    <>
      <ModalComponent
        title="Programma"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        height={heightPercentageToDP(55)}
        style={{
          paddingBottom: heightPercentageToDP(5),
        }}
      >
        <DateTimePicker
          cancelTextIOS="Annulla"
          confirmTextIOS="Conferma"
          buttonTextColorIOS={Colors.primary}
          accentColor={Colors.primary}
          date={selectedDate}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={(date) => {
            setDatePickerVisibility(false);
            onDaySelected(date);
          }}
          onCancel={() => {
            setDatePickerVisibility(false);
          }}
          display="inline"
          minimumDate={getMinValidDate()}
        />

        <Centered>
          <MyText mediumEmphasis>
            Con la pubblicazione programmata, il tuo evento verrà pubblicato
            automaticamente alla data e all'ora selezionate.
          </MyText>
        </Centered>
        <Inline style={styles.wrapper}>
          <View style={styles.boxWrapper}>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                setDatePickerVisibility(true);
              }}
            >
              <MyText bold>Il giorno</MyText>
              <MyText
                size="small"
                mediumEmphasis
                style={{ marginTop: heightPercentageToDP(0.5) }}
              >
                {selectedDate
                  ? formatShortDay(selectedDate, true)
                  : "Seleziona giorno"}
              </MyText>
            </TouchableOpacity>
          </View>

          <View style={styles.boxWrapper}>
            <SelectDropdown
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <Centered>
                    <MyText bold>Alle ore</MyText>
                    <MyText
                      size="small"
                      mediumEmphasis
                      style={{ marginTop: heightPercentageToDP(0.5) }}
                    >
                      {selectedDate
                        ? formatTime(selectedDate)
                        : "Seleziona orario"}
                    </MyText>
                  </Centered>
                );
              }}
              buttonStyle={styles.box}
              data={hours}
              dropdownStyle={{
                borderRadius: 20,
              }}
              rowTextStyle={{
                fontFamily: FONT_REGULAR,
                fontSize: FONT_SIZES.medium,
              }}
              onSelect={(selectedItem, index) => {
                onTimeSelected(selectedItem.value);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.text;
              }}
              rowTextForSelection={(item, index) => {
                return item.text;
              }}
            />
          </View>
        </Inline>

        <MyText
          color={Colors.errorRed}
          bold
          size="small"
          style={{
            marginBottom: heightPercentageToDP(2),
          }}
        >
          {hasError
            ? "La data selezionata non è valida. Seleziona una data valida."
            : ""}
        </MyText>

        <SubmitButton
          backgroundColor={Colors.whiteSmoke}
          style={{ marginHorizontal: widthPercentageToDP(2) }}
          onPress={submit}
        >
          <MyText bold dark>
            Programma pubblicazione
          </MyText>
        </SubmitButton>
      </ModalComponent>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: heightPercentageToDP(5),
    paddingBottom: heightPercentageToDP(3),
  },
  boxWrapper: {
    flex: 1,
    height: "100%",
    paddingHorizontal: widthPercentageToDP(2),
    justifyContent: "flex-end",
  },
  box: {
    backgroundColor: Colors.backgroundLight,
    borderColor: Colors.whiteSmoke,
    borderWidth: 2,
    borderRadius: 20,
    minHeight: heightPercentageToDP(10),
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
