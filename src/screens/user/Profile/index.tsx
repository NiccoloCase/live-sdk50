import React, { useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { Inline, inlineStyle } from "../../../components/Inline";
import { MyText } from "../../../components/Text";
import { styles } from "./styles";
import {
  useGetFriendshipRequestsQuery,
  useWhoamiQuery,
} from "../../../generated/graphql";
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Colors } from "../../../constant";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import chroma from "chroma-js";
import { Badge } from "../../../components/Badge";
import { MyAutoTranslated } from "../../../components/MyAutoTranslated";
import { MyImage, MyDeliveryH } from "../../../components/Image";
import { keys, validationConfig } from "../../../config";
import { BlurView } from "@react-native-community/blur";

import { Bubble } from "../../../components/Bubble";
import { Blurhash } from "react-native-blurhash";
import { myRefreshControl } from "../../../components/lists/RefreshControll";

export const ProfileScreen = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const { data: me, refetch } = useWhoamiQuery({
    fetchPolicy: "cache-and-network",
  });
  const navigation = useNavigation();

  const { data: friendshipRequests } = useGetFriendshipRequestsQuery();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfileScreen")}
        >
          <Feather name="edit" size={hp(3)} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const renderAdminBtn = () => {
    if (__DEV__ || me?.whoami.hasAdminArea)
      return (
        <TouchableOpacity onPress={() => {}}>
          <Animated.View
            entering={FadeInUp.duration(400)}
            style={{
              backgroundColor: Colors.backgroundLight,
              padding: hp(2),
              borderRadius: 20,
              paddingVertical: hp(3),
              ...inlineStyle,
            }}
          >
            <MaterialIcons
              name="admin-panel-settings"
              size={hp(3.5)}
              color={Colors.red}
            />
            <MyText color={Colors.red} bold style={{ marginLeft: 15 }}>
              AREA ADMIN
            </MyText>
          </Animated.View>
        </TouchableOpacity>
      );
    else return null;
  };

  const renderLinksAndTicketsButton = () => {
    return (
      <Inline>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyTicketsScreen");
          }}
          style={{ flex: 1, marginRight: 6 }}
        >
          <Animated.View
            entering={FadeInUp.duration(400).delay(100).springify()}
            style={[styles.card, inlineStyle, styles.inlineCard]}
          >
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={hp(3.5)}
              color={Colors.whiteSmoke}
            />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <MyText bold>I tuoi biglietti</MyText>
              <MyText
                mediumEmphasis
                size="small"
                light
                style={{ marginTop: 1 }}
              >
                Biglietti e prenotazioni
              </MyText>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyLinksScreen");
          }}
          style={{ flex: 1, marginRight: 6 }}
        >
          <Animated.View
            entering={FadeInUp.duration(400).delay(100).springify()}
            style={[styles.card, inlineStyle, styles.inlineCard]}
          >
            <MaterialCommunityIcons
              name="link"
              size={hp(3.5)}
              color={Colors.whiteSmoke}
            />
            <View style={{ marginLeft: 15, flex: 1 }}>
              <MyText bold>I tuoi links</MyText>
              <MyText
                mediumEmphasis
                size="small"
                light
                style={{ marginTop: 1 }}
              >
                Monitora l'andamento dei tuoi links affiliati
              </MyText>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Inline>
    );
  };

  const renderEventBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EventManager", {
            screen: "EventManagerScreen",
          });
        }}
      >
        <Animated.View
          entering={FadeInUp.duration(400).delay(100).springify()}
          style={[
            styles.card,
            inlineStyle,
            { marginTop: heightPercentageToDP(1.5) },
          ]}
        >
          <MaterialCommunityIcons
            name="view-dashboard-outline"
            size={hp(3.5)}
            color={Colors.whiteSmoke}
          />
          <View style={{ marginLeft: 15, flex: 1 }}>
            <MyText bold>Gestionale</MyText>
            <MyText mediumEmphasis size="small" light style={{ marginTop: 1 }}>
              Gestisci i tuoi eventi la coordinazione dei tuoi organizzatori
            </MyText>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const renderStats = () => {
    return (
      <>
        {renderEventBtn()}

        {renderLinksAndTicketsButton()}
      </>
    );
  };

  const renderMeCard = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (!me?.whoami.id) return;
          navigation.navigate("OtherProfile", {
            userId: me.whoami.id,
            userPreload: me.whoami,
          });
        }}
      >
        <Animated.View
          entering={FadeInDown.duration(400).delay(0)}
          style={{
            alignItems: "center",
            marginBottom: heightPercentageToDP(8),
          }}
        >
          <View
            style={{
              height: heightPercentageToDP(24),
              aspectRatio: validationConfig.media.profilePicture.aspectRatio,
              overflow: "hidden",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 18,
              backgroundColor: Colors.backgroundLight,
            }}
          >
            {me?.whoami.profilePicture?.url ? (
              <MyImage
                url={me?.whoami.profilePicture?.url}
                blurhash={me?.whoami.profilePicture?.blurhash}
                height={MyDeliveryH.profilePicture.big}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            ) : (
              <MyText size="small" mediumEmphasis light style={{ padding: 20 }}>
                Non hai ancora caricato una foto profilo
              </MyText>
            )}
          </View>

          <MyText
            bold
            size="small"
            style={{ marginTop: heightPercentageToDP(0.6) }}
          >
            {me?.whoami.username}
          </MyText>

          <Inline>
            <MyText
              light
              mediumEmphasis
              size="small"
              style={{
                marginTop: heightPercentageToDP(0.6),
                maxWidth: 100,
                marginRight: 10,
              }}
            >
              Vedi il tuo profilo pubblico
            </MyText>
            <Feather
              name="arrow-right-circle"
              color={Colors.darkGrey}
              size={hp(2)}
            />
          </Inline>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <MyAutoTranslated>
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: hp(3) }}
          refreshControl={myRefreshControl({
            refreshing: isRefreshing,
            onRefresh: onRefresh,
          })}
        >
          {renderMeCard()}
          {renderStats()}
          <View>
            <Animated.View
              entering={FadeInUp.duration(400).springify().delay(200)}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <Inline style={styles.card}>
                  <MaterialIcons name="settings" size={hp(3.5)} color="#fff" />
                  <MyText bold style={{ marginLeft: 15 }}>
                    Impostazioni
                  </MyText>
                </Inline>
              </TouchableOpacity>
            </Animated.View>

            {renderAdminBtn()}
          </View>
        </ScrollView>
      </View>
    </MyAutoTranslated>
  );
};
