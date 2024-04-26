import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectModal } from "../SelectModal";
import {
  autocompletePlace,
  getCoordinatesByGooglePlaceId,
} from "../../../helper/geo";
import { SelectModal2 } from "../SelectModal2";
import { LocationInput } from "../../../generated/graphql";

interface SelectPositionModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSelected: (option: LocationInput) => void;
}
export const SelectPositionModal: React.FC<SelectPositionModalProps> = ({
  isOpen,
  setIsOpen,
  onSelected,
}) => {
  return (
    <SelectModal2
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Cerca luogo"
      defaultOptions={[] as { placeId: string; text: string }[]}
      onSelected={async (option, index) => {
        if (option?.placeId) {
          const res = await getCoordinatesByGooglePlaceId(option?.placeId);

          onSelected({
            googlePlaceId: option?.placeId,
            locationText: option?.text,
            lat: res?.lat,
            lng: res?.lng,
          });

          setIsOpen(false);
        }
      }}
      searchOptions={async (searchKey) => {
        const res = await autocompletePlace(searchKey);
        return res;
      }}
      serachBarPlaceholder="Cerca luogo"
      renderText={(option) => option.text}
    />
  );
};

const styles = StyleSheet.create({});
