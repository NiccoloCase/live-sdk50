import { CommonActions, useNavigation } from "@react-navigation/native";
import { store, useStoreState } from "../store";
import { Linking, Platform, StyleSheet, View } from "react-native";
import { Alert } from "react-native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { FONT_SIZES } from "../components/Text";
import { Colors, Spacing, Typography } from "../constant";
import FeatherIcon from "@expo/vector-icons/Feather";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { User } from "../generated/graphql";
import hexToRgba from "hex-to-rgba";
import Animated, { ZoomIn } from "react-native-reanimated";

/** Naviga fino al profilo dell'utente passato */
export const navigateToUserProfileAction = (
  userId?: string,
  userPreload?: Partial<User>
): CommonActions.Action => {
  return CommonActions.navigate("OtherProfile", {
    userId: userId,
    userPreload,
  });
};

/**
 * Hook per navigare alla schermata del profilo dell'utente
 */
export const useNavigateToUserProfile = () => {
  const { dispatch } = useNavigation();

  const navigate = (userId: string, preload?: Partial<User>) => () => {
    dispatch(navigateToUserProfileAction(userId, preload));
  };
  return navigate;
};

export const callNumber = (phone: string) => {
  console.log("callNumber ----> ", phone);
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telprompt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then((supported) => {
      if (!supported) {
        Alert.alert("Non è possibile chiamare questo numero");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch((err) => console.log(err));
};

export const goToInstagram = (username: string) => {
  const url = "https://instagram.com/" + username;
  Linking.openURL(url);
};

export const goToWebsite = (url: string) => {
  Linking.openURL(url);
};

// /**
//  * Restituisce una funzione che reindirizza alla schermata
//  * della chat con l'utente passato
//  */
// export const useNavigateToUserChat = () => {
//   const { dispatch } = useNavigation();
//   const ownId = useStoreState((s) => s.auth.userId);

//   const { data: conversationsData } = useGetMyConversationsQuery();

//   const navigate = (user: Pick<User, "id" | "profileImage" | "username">) => {
//     if (user.id === ownId) return;

//     const chatProps = {
//       chatTitle: user.username,
//       chatImage: user.profileImage,
//       isPrivateChat: true,
//       userId: user.id,
//       unreadMessages: [],
//     };

//     // Controlla se è già stata avviata una conversazione con l'utente
//     const chat = conversationsData?.getMyConversations.find(
//       (c) => c.user?.id === user.id
//     );

//     dispatch(
//       CommonActions.navigate("Home", {
//         screen: "Chat",
//         params: {
//           screen: "Chat",
//           params: {
//             chatId: chat?.id || "",
//             chatNotYetCreated: !chat,
//             ...chatProps,
//           },
//         },
//       })
//     );
//   };
//   return navigate;
// };

export const defaultScreenOptions: StackNavigationOptions = {
  headerTitleStyle: {
    fontSize: FONT_SIZES.big,
    fontFamily: Typography.FONT_BOLD,
  },
  headerStyle: {
    backgroundColor: Colors.backgroundDark,
    shadowColor: "transparent",
    borderBottomWidth: 0,
    elevation: 0,
  },
  headerTitleAlign: "center",
  headerTintColor: "#fff",
  cardStyle: { backgroundColor: Colors.backgroundDark },
  headerLeftContainerStyle: {
    marginRight: 0,
  },

  headerBackImage: ({ tintColor }) => (
    <View style={{ padding: 5 }}>
      <FeatherIcon
        name="chevron-left"
        color={tintColor}
        size={heightPercentageToDP(3.6)}
      />
    </View>
  ),
  headerBackTitleVisible: false,
};
