import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather as FeatherIcon, FontAwesome5 } from "@expo/vector-icons";
import { Colors } from "../constant";
import { useStoreActions, useStoreReRender, useStoreState } from "../store";
import { TabBar } from "../components/TabBar";
import { Interaction, User, WhoamiDocument } from "../generated/graphql";
import { PushNotificationsProvider } from "../notifications";
import {
  postOnlineAuthentication,
  authenticateUser,
  postOfflineAuthentication,
} from "../helper/auth";
import { navigationRef, isReadyRef } from "./NavigationService";
import NetInfo from "@react-native-community/netinfo";
import { LinkingProvider } from "./linking";
import { getRefreshTokenFromStorge } from "../helper/auth/refreshToken";
import hexToRgba from "hex-to-rgba";
import { client } from "../graphql";
import { startupVersionCheck } from "../helper/versioning";
import { Image } from "react-native";
import { SignUpScreen } from "../screens/auth/SignUp";
import { WelcomeScreen } from "../screens/auth/Welcome";
import { RadarScreen } from "../screens/Radar";
import { WaitForConnectionScreen } from "../screens/auth/WaitForConnection";
import {
  InvalidVersionScreen,
  UpdatingScreen,
} from "../screens/auth/Versioning";
import { ProfileScreen } from "../screens/user/Profile";
import { BanScreen } from "../screens/auth/Ban";
import { DiscoverScreen } from "../screens/Discover";
import { SearchScreen } from "../screens/SearchTab";

import { DiscoverMatchesScreen } from "../screens/Discover/DiscoverMatches";
import { defaultScreenOptions } from "./utils";
import { ActivityTabButton } from "../components/buttons/ActivityTabButton";
import i18n from "../helper/i18next";
import { OtherProfile } from "../screens/user/OtherProfile";
import { DiscoverRegionScreen } from "../screens/Discover/DiscoverRegion";
import { MapScreen } from "../screens/SearchTab/MapScreen";

/*
--------------------
  AUTENTICAZIONE
--------------------
*/
export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
};
const AuthStack = createStackNavigator<AuthStackParamList>();
const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: Colors.backgroundDark },
    }}
  >
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
  </AuthStack.Navigator>
);

/*
--------------------
  HOME STACK
--------------------
*/
export type RadarStackParamList = {
  Radar: { start?: boolean };
  GetStarted: {
    steps: string[];
  };
  Interaction: {
    interaction: Interaction;
    fromNotification?: boolean;
  };
  Interactions: undefined;
  AcceptedInteraction: { username: string; instaName: string; image: string };
  SetStateScreen: undefined;
  SetInstagramScreen: undefined;
};
const RadarStack = createStackNavigator<RadarStackParamList>();
const RadarStackScreen = () => (
  <RadarStack.Navigator
    screenOptions={defaultScreenOptions}
    initialRouteName="Radar"
  >
    <RadarStack.Screen
      name="Radar"
      component={RadarScreen}
      options={{ header: () => null }}
    />
  </RadarStack.Navigator>
);

/*
--------------------
  DISCOVER STACK
--------------------
*/
export type DiscoverStackParamList = {
  DiscoverHome: undefined;
  DiscoverMatchesScreen: undefined;
  DiscoverRegionScreen: undefined;
};
const DiscoverStack = createStackNavigator<DiscoverStackParamList>();
const DiscoverStackScreen = () => (
  <DiscoverStack.Navigator
    initialRouteName="DiscoverHome"
    screenOptions={defaultScreenOptions}
  >
    <DiscoverStack.Screen
      name="DiscoverHome"
      component={DiscoverScreen}
      options={{ headerShown: false, header: () => null }}
    />

    <DiscoverStack.Screen
      name="DiscoverMatchesScreen"
      component={DiscoverMatchesScreen}
      options={{
        headerShown: true,
        title: "I tuoi match",
        headerBackTitleVisible: false,
      }}
    />

    <DiscoverStack.Screen
      name="DiscoverRegionScreen"
      component={DiscoverRegionScreen}
      options={{ title: "Regione" }}
    />
  </DiscoverStack.Navigator>
);

/*
--------------------
  DISCOVER STACK
--------------------
*/
export type SearchStackParamList = {
  SearchScreen: {
    eventId?: string;
  };
  MapScreen: undefined;
};
const SearchStack = createStackNavigator<SearchStackParamList>();
const SearchStackScreen = () => (
  <SearchStack.Navigator
    initialRouteName="SearchScreen"
    screenOptions={defaultScreenOptions}
  >
    <SearchStack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: false, header: () => null }}
    />

    <SearchStack.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ headerShown: false, header: () => null }}
    />
  </SearchStack.Navigator>
);

/*
--------------------
  PROFILE STACK
--------------------
*/
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfileScreen: undefined;
  MyLinksScreen: undefined;
};
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={({ navigation }) => ({
      ...defaultScreenOptions,
      headerRightContainerStyle: { marginRight: 15 },
    })}
    initialRouteName="ProfileScreen"
  >
    <ProfileStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{ title: i18n.t("profile-screen:title") }}
    />
  </ProfileStack.Navigator>
);

/*
--------------------
  NAVIGAZIONE A TAB
--------------------
*/

export type BottomTabParamList = {
  RadarTab: undefined;
  Profile: undefined;
  DiscoverTab: undefined;
  ActivityTab: undefined;
  //NotificationTab: undefined;
  SearchTab: undefined;
};
const Tabs = createBottomTabNavigator<BottomTabParamList>();
const TabsScreen = () => (
  <Tabs.Navigator
    tabBar={(props: any) => <TabBar {...props} />}
    initialRouteName="DiscoverTab"
    tabBarOptions={{
      activeTintColor: "#fff",
      inactiveTintColor: hexToRgba("#fff", 0.5),
    }}
  >
    <Tabs.Screen
      name="DiscoverTab"
      component={DiscoverStackScreen}
      options={{
        tabBarIcon: ({ color, size }) =>
          color !== "#fff" ? (
            <Image
              source={require("../../assets/images/home-icon-o.png")}
              style={{
                aspectRatio: 1,
                width: size - 1,
                height: size - 1,
              }}
            />
          ) : (
            <Image
              source={require("../../assets/images/home-icon-fill.png")}
              style={{
                aspectRatio: 1,
                width: size - 1,
                height: size - 1,
              }}
            />
          ),
      }}
    />
    <Tabs.Screen
      name="SearchTab"
      component={SearchStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FeatherIcon name="search" size={size} color={color} />
        ),
      }}
    />

    <Tabs.Screen
      name="RadarTab"
      component={RadarStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Image
            source={require("../../assets/images/radarTabIcon.png")}
            style={{
              aspectRatio: 300 / 96,
              width: 80,
            }}
          />
        ),
      }}
    />
    {/* {!__DEV__ && (
      <Tabs.Screen
        name="NotificationTab"
        component={NotificationsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <NotificationsTabButton color={color} size={size} />
          ),
        }}
      />
    )} */}

    <Tabs.Screen
      name="ActivityTab"
      component={DiscoverStackScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <ActivityTabButton color={color} size={size} />
        ),
      }}
    />

    <Tabs.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        title: "Profilo",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="user-circle" size={size} color={color} />
          // <Ionicons name="person" size={size} color={color} />
        ),
      }}
    />
  </Tabs.Navigator>
);

/*
--------------------
  APP
--------------------
*/
export type AppStackParamList = {
  Home: undefined;
  Settings: undefined;
  Notifications: undefined;
  Admin: undefined;
  ReportUser: { userId: string; callback?: () => void };
  User: { userId: string };
  ScannerScreen: undefined;
  MySpotsScreen: undefined;
  MyCoinsScreen: undefined;
  CoinsInfoScreen: undefined;
  MyFriendsScreen: { requestsTab?: boolean };
  School: undefined;
  Event: undefined;
  EventManager: undefined;
  OtherProfile: { userId: string; userPreload: Partial<User> };
  ConfigureUserRealDataScreen: undefined;
  MyTicketsScreen: undefined;
};
const AppStack = createStackNavigator<AppStackParamList>();
const AppStackScreen = () => (
  <>
    <AppStack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerShown: false,
        headerBackTitleVisible: false,
      }}
      //  initialRouteName="ConfigureUserRealDataScreen"
    >
      <AppStack.Screen name="Home" component={TabsScreen} />

      <AppStack.Screen
        name="OtherProfile"
        component={OtherProfile}
        options={{ headerShown: true, title: "" }}
      />
    </AppStack.Navigator>
  </>
);

// ROOT STACK
export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};
const RootStack = createStackNavigator<RootStackParamList>();
const RootStackScreen: React.FC<{ isAutheticated: boolean }> = ({
  isAutheticated,
}) => (
  <RootStack.Navigator
    headerMode="none"
    screenOptions={{ animationEnabled: false }}
  >
    {isAutheticated ? (
      <RootStack.Screen name="App" component={AppStackScreen} />
    ) : (
      <RootStack.Screen name="Auth" component={AuthStackScreen} />
    )}
  </RootStack.Navigator>
);

export default useStoreReRender;

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isVersionValid = useStoreState((s) => s.versioning.isVersionValid);
  const isUpdating = useStoreState((s) => s.versioning.isUpdating);

  const isAuth = useStoreState((state) => state.auth.isAuthenticated);

  const singinOffline = useStoreActions(
    (actions) => actions.auth.authenticateOffline
  );
  const [waitForConnection, setWaitForConnection] = useState(false);

  // easy peasy fix for re-rendering (logout)
  useStoreReRender();

  //console.log({ isAuth, isVersionValid, isUpdating, isLoading }); // @remove

  const onlineAuth = async () => {
    // Autentica l'utente
    await authenticateUser();
    await postOnlineAuthentication();

    setWaitForConnection(false);
  };

  const offlineAuth = async () => {
    try {
      // Controlla se è stato salvato in memoria il profilo dell'utente
      // E un refresh token
      const { data: me } = await client.query({ query: WhoamiDocument });
      const user = me?.whoami;
      const refreshToken = await getRefreshTokenFromStorge();

      if (user && refreshToken) {
        singinOffline(user.id);
        await postOfflineAuthentication();
        setWaitForConnection(false);
      } else setWaitForConnection(true);
    } catch (err) {
      setWaitForConnection(true);
    }
  };

  useEffect(() => {
    console.log("isAuth changed in ", isAuth);
  }, [isAuth]);

  // richiede al server un nuovo token di accesso
  useEffect(() => {
    (async () => {
      var t0 = performance.now();
      try {
        const { isConnected } = await NetInfo.fetch();
        // VERSIONING
        const res = await startupVersionCheck();
        if (res === false) throw new Error("Versioning");

        console.log({ res, isConnected }); // @remove

        // AUTENTICAZIONE
        if (isConnected) await onlineAuth();
        else await offlineAuth();
      } catch (err) {
        console.error(err);
      } finally {
        // Termina il caricamento
        setIsLoading(false);
        // Leva lo Splash Screen
        SplashScreen.hideAsync();
      }

      var t1 = performance.now();
      console.log("Startup time: " + (t1 - t0) + " mils"); // @remove
    })();
  }, []);

  // VERSIONE OBSOLETA
  if (isVersionValid === false) return <InvalidVersionScreen />;

  // AGGIORNAMENTO DELL'APP
  if (isUpdating === true) return <UpdatingScreen />;

  // OFFLINE:
  if (waitForConnection)
    return <WaitForConnectionScreen whenConnectionIsBack={onlineAuth} />;

  // CARICAMENTO:
  if (isLoading) return null;

  return (
    <NavigationContainer
      theme={{ colors: { background: Colors.backgroundDark } } as any}
      ref={navigationRef}
      onReady={() => {
        (isReadyRef as any).current = true;
      }}
    >
      <LinkingProvider>
        <PushNotificationsProvider
          navigation={navigationRef}
          isAutheticated={isAuth}
        >
          <RootStackScreen isAutheticated={isAuth} />
          <BanScreen />
        </PushNotificationsProvider>
      </LinkingProvider>
    </NavigationContainer>
  );
};

export { Navigation };
