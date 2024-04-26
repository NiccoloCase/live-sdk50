import * as Linking from "expo-linking";
import React from "react";
import { useEffect } from "react";
import { store } from "../store";
import { navigate } from "./NavigationService";
import { EmitterSubscription, Platform, View } from "react-native";
import { Spinner } from "../components/Spinner";
import { Colors } from "../constant";
import { LinkRefType, useGetLinkInfoLazyQuery } from "../generated/graphql";

/* Ottiene host e path dall'URL */
const getInfoPathFromUrl = (url: string): any | null => {
  const parsed = Linking.parse(url);
  console.log("parsed", parsed);
  const paths = parsed.path!.split("/");
  return { parsed, paths };
};

/**
 * Provider per la gestione degli eventi di linking
 */
export const LinkingProvider: React.FC<{ children: any }> = ({ children }) => {
  const [getLinkInfo] = useGetLinkInfoLazyQuery();
  const [loading, setLoading] = React.useState(false);
  const eventRef = React.useRef<EmitterSubscription>();

  useEffect(() => {
    initLinkingHandler();

    // Controlla che sia autenticato
    if (store.getState().auth.isAuthenticated)
      // Richiede l'URL con cui è stata aperta l'app
      Linking.getInitialURL()
        .then((url) => {
          if (!url) return;
          handleLinking(url);
        })
        .catch(console.warn);

    return () => {
      if (eventRef.current) eventRef.current.remove();
    };
  }, []);

  const initLinkingHandler = () => {
    if (eventRef.current) eventRef.current.remove();
    eventRef.current = Linking.addEventListener("url", (e) => {
      // Controlla che sia autenticato
      if (!store.getState().auth.isAuthenticated) return;
      const { url } = e;
      handleLinking(url);
    });
  };

  const handleLinking = async (url: string) => {
    try {
      console.log("handleLinking", url);
      // Parametri dell'url
      const { info, paths } = getInfoPathFromUrl(url);

      // EVENTI
      if (paths[0] === "events" && paths[1] !== undefined) {
        navigate("Event", {
          screen: "EventScreen",
          params: { eventId: paths[1] },
        });
      }

      // Controlla se è un link di condivisione
      if (paths[0] === "a") extractLink(paths[1]);
    } catch (e) {
      console.warn(e);
    } finally {
    }
  };

  const extractLink = async (code: string) => {
    try {
      setLoading(true);
      const { data } = await getLinkInfo({
        variables: { code },
      });

      if (data?.getLinkInfo) {
        // EVENTO
        if (
          data.getLinkInfo.refType === LinkRefType.Event &&
          !!data.getLinkInfo.refId
        ) {
          navigate("Event", {
            screen: "EventScreen",
            params: {
              eventId: data.getLinkInfo.refId,
              linkCode: code,
            },
          });
        }
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {children}

      {loading && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.backgroundDark,
            zIndex: 10000,
          }}
        >
          <Spinner />
        </View>
      )}
    </>
  );
};

/**
 * Apre le mappe
 * @param latitude
 * @param longitude
 * @param label
 */
export const openMapsApp = (lat: number, lng: number, label: string) => {
  const scheme = Platform.select({
    ios: "maps://0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${lat},${lng}`;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

  if (url) Linking.openURL(url);
};
