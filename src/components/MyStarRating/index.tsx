import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

interface MyStarRatingProps {
  initialRating: number;
  onRatingPress?: (rating: number) => void;
  size?: number;
  canEdit?: boolean;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MyStarRating: React.FC<MyStarRatingProps> = ({
  initialRating,
  containerStyle,
  onRatingPress,
  size,
  color,
  canEdit,
}) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleStarPress = (selectedRating: number) => {
    const newRating = selectedRating - (rating % 1 === 0.5 ? 0.5 : 0);
    setRating(newRating);
    if (onRatingPress) onRatingPress(newRating);
  };

  const renderStar = (index: number) => {
    const isSelected = index <= Math.floor(rating);
    const isHalfSelected = index > Math.floor(rating) && index - 0.5 <= rating;

    return (
      <TouchableOpacity
        key={index}
        onPress={() => handleStarPress(index)}
        activeOpacity={0.7}
        disabled={!canEdit}
      >
        <FontAwesome
          name={
            isSelected ? "star" : isHalfSelected ? "star-half-full" : "star-o"
          }
          size={size || heightPercentageToDP(2)}
          color={color || "#DAA520"}
          style={{ marginHorizontal: 5 }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center" }, containerStyle]}
    >
      {[1, 2, 3, 4, 5].map((index) => renderStar(index))}
    </View>
  );
};
