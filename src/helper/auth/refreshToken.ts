import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

/** Chiave con la quale è salvato il refresh token nello storage */
const REFRESH_TOKEN_KEY = "--_refresh-key-2021-06-01";

/** Chiave con la quale è salvato l'user id nello storage */
const USER_ID_KEY = "---user-key-2021-06-01";

/**
 * Restituisce il token di aggiornamento salvato nella memoria del dispositivo
 */
export const getRefreshTokenFromStorge = async (): Promise<string | null> => {
  if (Platform.OS !== "web" && (await SecureStore.isAvailableAsync()))
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  else return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Restituisce l'userId salvato nella memoria del dispositivo
 */
export const getUserIdFromStorge = async (): Promise<string | null> => {
  if (Platform.OS !== "web" && (await SecureStore.isAvailableAsync()))
    return await SecureStore.getItemAsync(USER_ID_KEY);
  else return await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Salva in memoria
 */
export const setUserIdInStorage = async (userId: string): Promise<void> => {
  try {
    if (Platform.OS !== "web" && (await SecureStore.isAvailableAsync()))
      await SecureStore.setItemAsync(USER_ID_KEY, userId);
    else await AsyncStorage.setItem(USER_ID_KEY, userId);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Modifica il token di aggiornamento salvato nella memoria del dispositivo
 */
export const setRefreshTokenInStorage = async (
  newToken: string
): Promise<void> => {
  try {
    if (Platform.OS !== "web" && (await SecureStore.isAvailableAsync()))
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, newToken);
    else await AsyncStorage.setItem(REFRESH_TOKEN_KEY, newToken);
  } catch (err) {
    console.error(err);
  }
};
