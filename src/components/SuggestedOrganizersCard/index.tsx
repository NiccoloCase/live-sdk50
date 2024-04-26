import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MyText } from "../Text";
import { MyImage, MyDeliveryH } from "../Image";
import { useGetSuggestedOrganizersQuery } from "../../generated/graphql";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export const SuggestedOrganizersCard: React.FC = () => {
  const { data } = useGetSuggestedOrganizersQuery({
    fetchPolicy: "cache-and-network",
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyText bold size="small">
        Organizzatori consigliati
      </MyText>
      <FlatList
        style={{ marginTop: heightPercentageToDP(2) }}
        data={data?.getSuggestedOrganizers}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Event", {
                screen: "OrganizerScreen",
                params: {
                  organizerId: item.id,
                  preload: item,
                },
              })
            }
          >
            <View style={{ marginRight: widthPercentageToDP(2) }}>
              <MyImage
                url={item.image.url}
                blurhash={item.image.blurhash}
                height={MyDeliveryH.organizerImage.small}
                style={{
                  aspectRatio: 1,
                  height: heightPercentageToDP(15),
                  marginBottom: 10,
                  borderRadius: 15,
                }}
              />
              <MyText light size="small" style={{ textAlign: "center" }}>
                {item.name}
              </MyText>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});
