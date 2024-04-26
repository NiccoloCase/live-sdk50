import { Platform } from "react-native";
import * as Device from "expo-device";
import { keys } from "../../config";

const FORCE_PRODUCTION = true;
const PORT = 5112;

const URL = keys.SERVER_URL;

export const SERVER_URL = //"http://192.168.1.53:5112"
  FORCE_PRODUCTION || !__DEV__
    ? // API per la produzione
      URL
    : __DEV__ && Device.isDevice
    ? URL
    : // API per lo sviluppo
      `http://${Platform.OS === "android" ? "10.0.2.2" : "localhost"}:${PORT}`;

/**
 * Chiave di stripe
 */
export const STRIPE_PUBLISHABLE_KEY =
  keys.STRIPE[FORCE_PRODUCTION || !__DEV__ ? "production" : "development"]
    .PUBLISHABLE_KEY;

/**
 * URL dell'API del server
 */
export const API_URL = SERVER_URL + "/api";

/**
 * URL dell'endpoint di graphql
 */
export const GRAPHQL_API = API_URL + "/graphql";

/**
 * PATH dell'endpoint di socket.io
 */

export const SOCKET_IO_PATH = "/api/socket.io";

/**
 * Url delle risorse statiche
 */
export const STATIC_URL = SERVER_URL + "/static";

export const STATIC = {
  // Privacy policy
  PRIVACY_POLICY_URL: "https://spotlive.it/#/privacy",
  // Terms of service
  TERMS_OF_SERVICE_URL: STATIC_URL + "/terms-of-service.pdf",
  // Eventi
  EVENTS_URL: STATIC_URL + "/events.json",
  // Comuni
  COMUNI_URL: STATIC_URL + "/comuni.json",
};
