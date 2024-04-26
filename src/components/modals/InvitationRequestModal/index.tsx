import React from "react";
import { ModalComponent } from "../ModalComponent";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { FONT_SIZES, MyText } from "../../Text";
import { View } from "react-native";
import { Inline } from "../../Inline";
import { SubmitButton } from "../../buttons";
import { Colors } from "../../../constant";
import {
  Event,
  useRemoveEventInvitationRequestMutation,
} from "../../../generated/graphql";
import { cache } from "../../../graphql/cache";

interface InvitationRequestModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  event: Partial<Event>;
}

export const InvitationRequestModal: React.FC<InvitationRequestModalProps> = ({
  isOpen,
  setIsOpen,
  event,
}) => {
  const [removeRequestMutation] = useRemoveEventInvitationRequestMutation();

  const deleteRequest = async () => {
    if (!event.id) return;
    try {
      const res = await removeRequestMutation({
        variables: {
          eventId: event.id,
        },
      });

      if (res.data?.removeEventInvitationRequest.success)
        cache.modify({
          id: cache.identify(event),
          fields: {
            isRequested() {
              return false;
            },
          },
        });
    } catch (err) {
      console.warn(err);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      height={heightPercentageToDP(50)}
    >
      <MyText size="big" bold style={{ textAlign: "center" }}>
        Richiesta di invito
      </MyText>
      <View style={{ flex: 1, marginTop: heightPercentageToDP(2) }}>
        <MyText style={{ marginTop: heightPercentageToDP(2) }}>
          Hai richiesto di partecipare all'evento.
        </MyText>

        <MyText mediumEmphasis style={{ marginTop: heightPercentageToDP(0.5) }}>
          La tua richiesta è stata inviata all'organizzatore, verrai contattato
          se la tua richiesta verrà accettata. Prima di allora non potrai
          accedere all'evento.
        </MyText>
      </View>
      <Inline style={{ marginBottom: heightPercentageToDP(2) }}>
        <SubmitButton
          title="Annulla richiesta"
          onPress={deleteRequest}
          containerStyle={{ flex: 1, marginRight: widthPercentageToDP(2) }}
        />
        <SubmitButton
          title="Capito"
          backgroundColor="#fff"
          textStyle={{
            color: Colors.backgroundLight,
            fontSize: FONT_SIZES.medium,
          }}
          onPress={() => setIsOpen(false)}
        />
      </Inline>
    </ModalComponent>
  );
};
