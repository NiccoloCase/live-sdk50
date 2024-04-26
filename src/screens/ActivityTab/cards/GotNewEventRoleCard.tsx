import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Activity, EventCollaboratorRole } from "../../../generated/graphql";
import { MyText } from "../../../components/Text";
import { useNavigation } from "@react-navigation/native";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { timeSince } from "../../../helper/format";
import { Blurhash } from "react-native-blurhash";
import { Inline } from "../../../components/Inline";
import { EventCollabratorRoleTemplateMap } from "../../ManagerScreens/Event/collaborators/utils";

interface GotNewEventRoleCardProps {
  activity: Activity;
}

export const GotNewEventRoleCard: React.FC<GotNewEventRoleCardProps> = ({
  activity,
}) => {
  const navigation = useNavigation();

  const event = activity?.data?.eventPreview;

  const role = activity?.data?.role;

  const onPress = () => {
    if (!event) return;

    if (role === EventCollaboratorRole.Pr)
      navigation.navigate("EventManager", {
        screen: "PrEventScreen",
        params: {
          eventId: event?.id,
          preload: event,
        },
      });
    else navigation.navigate("EventManager", { screen: "EventManagerScreen" });
  };

  const text = useMemo(() => {
    if (!event) return null;
    if (role === EventCollaboratorRole.Admin)
      return `Sei ADMIN di ${event?.title}`;

    if (role === EventCollaboratorRole.Pr)
      return `Sei un PR di ${event?.title}`;

    const template = EventCollabratorRoleTemplateMap.get(role);
    if (!template) return null;

    return `Hai un nuovo ruolo in ${event?.title}: ${template.text}`;
  }, [role, event]);

  if (!role || !text) return null;
  return (
    <TouchableOpacity onPress={onPress}>
      <Inline
        style={{
          borderRadius: 20,
          overflow: "hidden",
          paddingVertical: heightPercentageToDP(1),
          paddingHorizontal: heightPercentageToDP(1),
        }}
      >
        <Blurhash
          blurhash={event?.image?.blurhash}
          style={StyleSheet.absoluteFillObject}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: Colors.backgroundDark,
              opacity: 0.5,
            },
          ]}
        />
        <MyImage
          url={event.image?.url}
          style={{
            aspectRatio: 1,
            height: heightPercentageToDP(10),
            borderRadius: 10,
            marginRight: 10,
          }}
          height={MyDeliveryH.eventImage.small}
        />
        <View style={{ flex: 1 }}>
          <MyText bold>Nuovo ruolo!</MyText>
          <MyText size="small" mediumEmphasis style={{ marginTop: 4 }}>
            {text}
          </MyText>
        </View>
      </Inline>
    </TouchableOpacity>
  );
};
