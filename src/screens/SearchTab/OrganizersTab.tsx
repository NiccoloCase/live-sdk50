import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { SearchEventFeed } from "./SearchEventFeed";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { MyText } from "../../components/Text";
import { Colors, Spacing } from "../../constant";
import {
  Organizer,
  useGetOrganizersLandingQuery,
} from "../../generated/graphql";
import { MyImage, MyDeliveryH } from "../../components/Image";
import { useNavigation } from "@react-navigation/native";

export const OrganizersTab = () => {
  const navigation = useNavigation();
  const { data, error } = useGetOrganizersLandingQuery();

  return (
    <View
      style={{
        marginTop: heightPercentageToDP(1),
        justifyContent: "center",
        flex: 1,
      }}
    >
      <FlatList
        data={data?.getOrganizersLanding || []}
        numColumns={2}
        contentContainerStyle={{
          paddingHorizontal: Spacing.screenHorizontalPadding,
          paddingTop: heightPercentageToDP(5),
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "50%",
                marginHorizontal: index % 2 === 0 ? 0 : 10,
                marginBottom: 10,
              }}
              onPress={() =>
                navigation.navigate("Event", {
                  screen: "OrganizerScreen",
                  params: {
                    organizerId: item.id,
                    preload: item as Organizer,
                  },
                })
              }
            >
              <MyImage
                style={{
                  aspectRatio: 1,
                  backgroundColor: Colors.backgroundLight,
                  width: "100%",
                  borderRadius: 20,
                }}
                blurhash={item.image?.blurhash!}
                url={item.image?.url!}
                height={MyDeliveryH.organizerImage.big}
              />
              <MyText
                bold
                size="small"
                style={{ textAlign: "center", marginTop: 5 }}
              >
                {item.name}
              </MyText>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View
            style={{
              paddingHorizontal: Spacing.screenHorizontalPadding,
              marginBottom: 10,
            }}
          >
            <MyText bold size="small" mediumEmphasis>
              Organizzatori principali
            </MyText>
          </View>
        )}
      />
    </View>
  );
};

export const styles = StyleSheet.create({});
