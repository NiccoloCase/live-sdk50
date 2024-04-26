import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../../locales/en.json";
import it from "../../locales/it.json";
import { getLocales } from "react-native-localize";
import {
  SetLanguageCodeDocument,
  User,
  WhoamiDocument,
} from "../generated/graphql";
import { client } from "../graphql";
import "intl-pluralrules";

export const getCurrentLanguage = () => {
  // return __DEV__ ? "en" : "it";
  return "it";
  const language = getLocales()[0].languageCode;
  return language;
};

i18n.use(initReactI18next).init({
  resources: { en, it },
  lng: getCurrentLanguage(),
  fallbackLng: "it",
  interpolation: {
    escapeValue: false,
  },
});

export const initLanguageService = async () => {
  const language = getCurrentLanguage();
  console.log("LINGUA:", language);
  i18n.changeLanguage(language);

  const { data: me } = await client.query({ query: WhoamiDocument });
  const user = me?.whoami as User;
  if (user.languageCode !== language) {
    await client.mutate({
      mutation: SetLanguageCodeDocument,
      variables: { code: language },
    });
    console.log("Salvata lingua utente sul server");
  }
};

export default i18n;
