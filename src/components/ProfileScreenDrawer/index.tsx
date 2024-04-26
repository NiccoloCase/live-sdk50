import React, { useMemo } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Constants from "expo-constants";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../../constant";
import { useStoreState } from "../../store";
import {
  useLogoutMutation,
  useLogoutAllDevicesMutation,
  useWhoamiQuery,
  UserRole,
} from "../../generated/graphql";
import { logout } from "../../helper/auth/logout";

export const ProfileScreenDrawerContent: React.FC<
  DrawerContentComponentProps
> = (props) => {
  const { data: me } = useWhoamiQuery();
  const installationId = useStoreState((a) => a.auth.installationId);
  const [logoutMutation] = useLogoutMutation();
  const [logoutAllDevicesMutation] = useLogoutAllDevicesMutation();

  // Sceglie quale elemento mostrare
  const { state, ...rest } = props;
  const newState = useMemo(() => {
    // Copia lo stato
    const stateCopy = { ...state };

    // Se l'utente è un ospite, nasconde la schermata per invitare una paersona
    if (me) {
      stateCopy.routes = stateCopy.routes.filter((item) => {
        const { role } = me.whoami;
        return item.name !== "InviteUser" || role !== UserRole.Guest;
      });
    }

    return stateCopy;
  }, [me, props]);

  const disconnectFromAllDevices = () => {
    Alert.alert(
      "Disconnetti tutti i dispositivi",
      "Sei sicuro di voler disconnetterti da tutti i dispositivi?",
      [
        {
          text: "Annulla",
          style: "cancel",
        },
        {
          text: "Disconneti",
          style: "destructive",
          onPress: async () => {
            await logoutAllDevicesMutation();
            logout();
          },
        },
      ]
    );
  };

  const handleLogout = async () => {
    if (installationId)
      await logoutMutation({ variables: { deviceId: installationId } });
    logout();
  };

  return (
    <View style={styles.conatiner}>
      <DrawerContentScrollView {...props}>
        <View style={styles.itemsWrapper}>
          <DrawerItemList state={newState} {...rest} />
        </View>
      </DrawerContentScrollView>
      <View>
        <View style={styles.BtnWrapper}>
          <DrawerItem
            {...props}
            onPress={handleLogout}
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={size}
              />
            )}
            label="Esci"
          />
          <DrawerItem
            {...props}
            onPress={disconnectFromAllDevices}
            label="Disconetti da tutti i dispositivi"
            icon={({ size, color }) => (
              <MaterialCommunityIcons
                name="devices"
                color={color}
                size={size}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const BORDER_COLOR = Colors.backgroundLight;
const BORDER_WIDTH = 2;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 30,
    backgroundColor: Colors.backgroundDark,
  },
  itemsWrapper: {
    borderColor: BORDER_COLOR,
    borderBottomWidth: BORDER_WIDTH,
  },
  logoutBtnWrapper: {
    borderColor: BORDER_COLOR,
    borderTopWidth: BORDER_WIDTH,
    borderBottomWidth: BORDER_WIDTH,
  },
});
