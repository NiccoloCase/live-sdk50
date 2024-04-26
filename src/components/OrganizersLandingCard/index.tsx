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
import {
  useGetOrganizersLandingQuery,
  useGetSuggestedOrganizersQuery,
} from "../../generated/graphql";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { getOrganizerTypeName } from "../../helper/organizer";

export const LandingOrganizersCard: React.FC = () => {
  const { data } = useGetOrganizersLandingQuery({
    fetchPolicy: "cache-and-network",
  });

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <MyText bold size="small">
        Organizzatori
      </MyText>
      <FlatList
        style={{ marginTop: heightPercentageToDP(2) }}
        data={data?.getOrganizersLanding}
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
            <View
              style={{
                marginRight: widthPercentageToDP(2),
                alignItems: "center",
              }}
            >
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
              <MyText bold size="small" style={{ textAlign: "center" }}>
                {item.name}
              </MyText>

              {item.type && (
                <View
                  style={{
                    maxWidth: widthPercentageToDP(20),
                    marginTop: 4,
                  }}
                >
                  <MyText
                    mediumEmphasis
                    size="extraSmall"
                    style={{ textAlign: "center" }}
                  >
                    {getOrganizerTypeName(item.type)}
                  </MyText>
                </View>
              )}
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
