import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ProfilePicture } from "../ProfilePicture";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { MyText } from "../Text";
import { SearchBar } from "../inputs";
import { useSearchUserByText } from "../../helper/hooks";
import { User } from "../../generated/graphql";
import { Colors } from "../../constant";
import { inlineStyle } from "../Inline";
import { validationConfig } from "../../config";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";

interface UserSearchProps extends React.ComponentProps<typeof View> {
  exclude?: string[];
  onUserSelected: (user: User) => void;
  renderEmptyBody?: () => React.ReactNode;
}

const CARDS_MARGIN = widthPercentageToDP(1);
const CARD_PER_ROW = 3;

export const UserSearch: React.FC<UserSearchProps> = ({
  exclude,
  onUserSelected,
  renderEmptyBody,
  ...props
}) => {
  const [width, setWidth] = useState(0);
  const [onTextChange, results] = useSearchUserByText();
  const [value, setValue] = useState("");

  const foundUsers = useMemo(() => {
    let _exclude = exclude || [];

    return results.filter((x) => _exclude.findIndex((i) => i === x.id) === -1);
  }, [results, exclude]);

  const cardWidth = useMemo(
    () => (width - CARDS_MARGIN * CARD_PER_ROW) / CARD_PER_ROW,
    [width]
  );

  return (
    <View {...props}>
      <SearchBar
        autoFocus
        containerStyle={{
          backgroundColor: Colors.whiteSmoke,
          marginTop: 20,
        }}
        textColor="#000"
        placeholder="Cerca per username o telefono"
        onChangeText={onTextChange as any}
        value={value}
        setValue={setValue}
        showX
      />
      {value.length === 0 && renderEmptyBody ? (
        renderEmptyBody()
      ) : (
        <FlatList
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          data={foundUsers}
          keyExtractor={(x) => x.id}
          contentContainerStyle={{ paddingTop: heightPercentageToDP(4) }}
          style={{ flex: 1 }}
          numColumns={CARD_PER_ROW}
          renderItem={({ item, index }) => (
            <Animated.View entering={ZoomIn.duration(300)} exiting={ZoomOut}>
              <TouchableOpacity
                onPress={() => onUserSelected(item)}
                style={[
                  { marginBottom: heightPercentageToDP(3.5) },
                  {
                    width: cardWidth,
                    marginLeft: index % CARD_PER_ROW === 0 ? 0 : CARDS_MARGIN,
                    marginRight: index % CARD_PER_ROW === 2 ? 0 : CARDS_MARGIN,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                <ProfilePicture
                  url={item.profilePicture?.url}
                  blurhash={item.profilePicture?.blurhash}
                  height={
                    (cardWidth * 0.9) /
                    validationConfig.media.profilePicture.aspectRatio
                  }
                />
                <MyText
                  bold
                  size="small"
                  style={{ marginTop: heightPercentageToDP(0.8) }}
                >
                  {item.username}
                </MyText>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
