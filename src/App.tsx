import React, { useEffect, useRef } from "react";
import {
  View,
  AppState,
  Platform,
  useWindowDimensions,
  AppStateStatus,
} from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { StatusBar } from "expo-status-bar";
import BackgroundTimer from "react-native-background-timer";
import {
  Montserrat_700Bold,
  Montserrat_400Regular,
  Montserrat_300Light,
  Montserrat_700Bold_Italic,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { StoreProvider } from "easy-peasy";
import { Navigation } from "./navigation";
import { ApolloProvider } from "./graphql";
import { queueLink } from "./graphql/links";
import { store } from "./store";
import { Colors } from "./constant";
import { SnackbarComponent } from "./components/modals/Snackbar";
import { authenticateUser, postOnlineAuthentication } from "./helper/auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import { InteractionNotification } from "./components/modals/InteractionNotification";
import { NotificationAlertScreen } from "./notifications/NotificationAlertScreen";
import { LogBox } from "react-native";
import * as Socket from "./helper/socket";
import { PING_INTERVAL } from "./config";
import "./helper/i18next";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as SystemUI from "expo-system-ui";

const MAX_WIDTH = 500;

SystemUI.setBackgroundColorAsync("transparent");
SplashScreen.preventAutoHideAsync().catch(console.warn);

//Logs.enableExpoCliLogging();

LogBox.ignoreLogs(["new NativeEventEmitter()"]);

const App = () => {
  const { width } = useWindowDimensions();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const interval = useRef<any>(null);

  // VIDEO ONLY
  useEffect(() => LogBox.ignoreLogs(["useSharedValueEffect()"]), []);
  useEffect(() => LogBox.ignoreLogs(["undefined"]), []);

  useEffect(() => {
    return () => {
      console.log("APP CLOSED");
    };
  });

  // CARICAMENTO FONT
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
    Montserrat_300Light,
    Montserrat_700Bold_Italic,
    Poppins: require("../assets/fonts/Poppins-SemiBold.ttf"),
    ChainprinterRegular: require("../assets/fonts/ChainprinterRegular.ttf"),
  });

  useEffect(() => {
    const actions = store.getActions();

    // imposta il colore di sfondo per android (bug fix tastiera)
    if (Platform.OS === "android") {
      //BackgroundColor.setColor(Colors.backgroundDark);
      NavigationBar.setBackgroundColorAsync(Colors.backgroundDark);
    }

    // GESTIONE CONNESSIONE INTERNET
    const unsubscribeNetInfo = NetInfo.addEventListener((state) => {
      const { isConnected } = state;
      // Aggiorna  lo stato
      actions.network.setIsOnline(isConnected);

      if (isConnected) {
        // Esegue le richieste graphql che si sono accumulate durante il periodo offline
        queueLink.open();
        // Esegue l'autenticazione dell'utente
        if (store.getState().auth.offlineAuth) {
          authenticateUser()
            .then((success) => {
              if (!success) actions.auth.logout();
              else postOnlineAuthentication().catch(console.warn);
            })
            .catch(console.warn);
        }
        // Riconnessione a seguito di un periodo offline
        if (store.getState().network.hasBeenOffline) {
          actions.network.setHasBeenOffline(false);
          // ...
        }
      } else {
        // Interrompe l'invio di richieste graphql
        queueLink.close();
        // Informa l'utente dello stato della connessione
        actions.snackbar.open({
          message: "Assicurati di essere connesso ad internet",
        });
      }
    });

    const appStateSubscription = AppState.addEventListener(
      "change",
      _handleAppStateChange
    );

    return () => {
      unsubscribeNetInfo();
      appStateSubscription.remove();
      console.log("APP CLOSED");
    };
  }, []);

  // APP STATE
  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log("APP STATE:", { nextAppState });

    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");

      if (interval.current) BackgroundTimer.clearInterval(interval.current);
    } else {
      console.log("app goes to background");

      // BACKGROUND SOCKET TASK - ANDROID ONLY
      if (store.getState().auth.isAuthenticated && Platform.OS === "android") {
        // Esegue il task in background se esiste già
        if (interval.current) BackgroundTimer.clearInterval(interval.current);

        interval.current = BackgroundTimer.setInterval(async () => {
          // Se il socket è connesso invia un messaggio di keep alive
          const socket = Socket.getSocket();
          if (socket?.connected) {
            console.log("Socket is online");
            socket.emit("online");
          } else {
            console.log("Socket is offline");
            // Se la connessione è caduta prova a riconnettersi
            Socket.reconnect();
            // Pinga il server
            Socket.pingServerAdvertise();
          }
        }, PING_INTERVAL);

        appState.current = nextAppState;
        console.log("AppState", appState.current);
      }
    }
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }} />;
  }

  return (
    <StoreProvider store={store}>
      <ApolloProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView
            style={[
              { flex: 1, backgroundColor: Colors.backgroundDark },
              false &&
                Platform.OS === "web" &&
                width > MAX_WIDTH && {
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: Colors.backgroundDark,
                },
            ]}
          >
            <View
              style={[
                false && Platform.OS === "web" && width > MAX_WIDTH
                  ? { width: MAX_WIDTH, height: "100%" }
                  : { flex: 1 },
                {
                  backgroundColor: Colors.backgroundDark,
                },
              ]}
            >
              <StatusBar style="light" />
              {/* 
              <RegionsProvider> */}
              <Navigation />
              {/* </RegionsProvider> */}

              <View>
                {/* {Platform.OS == "android" && (
                <Button
                  title="Press me"
                  onPress={() => {
                    console.log("INIT GEOFENCES FROM JS");
                    NativeModules.MyNativeModule.initGeofences(() => {
                      console.log("INIT GEOFENCES CALLBACK");
                    });
                  }}
                />
              )} */}
              </View>
              <SnackbarComponent />
              <InteractionNotification />
              <NotificationAlertScreen />
            </View>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </ApolloProvider>
    </StoreProvider>
  );
};

export default App;
