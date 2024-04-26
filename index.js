import "expo-dev-client";

import { registerRootComponent } from "expo";
import "react-native-url-polyfill/auto"; // https://stackoverflow.com/questions/75757771/getting-the-urlsearchparams-set-is-not-implemented-error-when-trying-to-fetch

import App from "./src/App";
import { AppRegistry } from "react-native";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

AppRegistry.registerHeadlessTask("MyBootTask", () => require("./MyBootTask"));
