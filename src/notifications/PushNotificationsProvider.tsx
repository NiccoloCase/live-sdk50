import React, { Children, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { Colors } from "../constant";
import { store } from "../store";
import { navigate } from "../navigation/NavigationService";
import { NotificationCode } from "../generated/graphql";

interface PushNotificationsProviderProps {
  navigation: any;
  children: any;
  isAutheticated: boolean;
}

export const PushNotificationsProvider: React.FC<
  PushNotificationsProviderProps
> = ({ navigation, children, isAutheticated }) => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();

  useEffect(() => {
    if (!lastNotificationResponse || !isAutheticated) return;

    const data = lastNotificationResponse.notification.request.content.data;

    const id =
      (lastNotificationResponse.notification.request.trigger as any)
        .channelId ||
      (lastNotificationResponse.notification.request.content as any)
        .categoryIdentifier;

    if (
      lastNotificationResponse.actionIdentifier ===
      Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      // NUOVA INTERAZIONE
      if (id === "received-interaction") {
        navigate("RadarTab", {
          screen: "Interaction",
          params: {
            interaction: data.interaction,
            fromNotification: true,
          },
          initial: false,
        });
        //Risposta ad una interazione
      } else if (id === "reciprocal-interaction") {
        navigate("RadarTab", {
          screen: "AcceptedInteraction",
          params: {
            username: data.interaction.target.username,
            instaName: data.interaction.target.instagramName,
            image: data.interaction.target.profilePicture.url,
          },
          initial: false,
        });
      }
      // NUOVO BIGLIETTO
      if (id === NotificationCode.NewTicket) {
        navigate("Event", {
          screen: "TicketScreen",
          params: {
            eventId: data.eventId,
          },
        });
      }
      // NUOVO LIVE FEED
      if (id === NotificationCode.LiveFeedNotification) {
        if (data.itemId)
          navigate("Event", {
            screen: "LiveFeedGiveawayScreen",
            params: {
              eventId: data.itemId,
            },
          });
      }
    }
    // GIVEAWAY STA PER INIZIARE
    if (id === NotificationCode.LiveFeedGiveawayStarting) {
      navigate("Event", {
        screen: "LiveFeedScreen",
        params: {
          eventId: data.eventId,
        },
      });
    }

    // SPOT TIME
    if (id === "spot-time" || id == "school-spot-mode") {
      navigate("RadarTab", {
        screen: "Radar",
        params: {
          start: true,
        },
      });
    }
  }, [lastNotificationResponse, navigate, navigation, isAutheticated]);

  useEffect(() => {
    // IMPOSTA IL CANALE DI NOTIFICHE (ANDROID)
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: Colors.secondary,
      });
    }

    /**
     * GESTISCE LE NOTIFICHE IN FOREGROUND
     */
    Notifications.setNotificationHandler({
      handleNotification: async (notification: Notifications.Notification) => {
        // Schermata in cui si trova l'utente
        const currentRoute: any =
          navigation &&
          navigation.current &&
          typeof navigation.current.getCurrentRoute === "function"
            ? navigation.current.getCurrentRoute()
            : {};
        // Mostra solo la notifica di ingresso a un evento
        const id =
          (notification.request.trigger as any).channelId ||
          (notification.request.content as any).categoryIdentifier;

        console.log("notification identifier: ", id);

        if (id === NotificationCode.NewTicket)
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };

        if (id === NotificationCode.JoinedEvent)
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };

        // SPOT-TIME
        if (id === "spot-time" || id == "school-spot-mode")
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };

        // GIVEAWAY
        if (id === NotificationCode.LiveFeedGiveawayStarting)
          return {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };

        if (id === "region-test") {
          return {
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
          };
        }

        // DEFAULT
        return {
          shouldShowAlert: false,
          shouldPlaySound: false,
          shouldSetBadge: false,
        };
      },
    });

    /**
     * QUNANDO VIENE RICEVUTA UNA NOTIFICA IN BACKGROUND E IN FOREGROUND
     */
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Aggiunge la notifica all'array di notifiche
        store.getActions().notifications.addNotification(notification);
      }
    );

    /**
     *  QUANDO L'UTENTE INTERAGISCE CON LA NOTIFICA
     */
    const responseListener =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          // Schermata in cui si trova l'utente
          const currentRoute: any =
            navigation &&
            navigation.current &&
            typeof navigation.current.getCurrentRoute === "function"
              ? navigation.current.getCurrentRoute()
              : {};

          // L'UTENTE HA CLICCATO LA NOTIFICA
          if (
            response.actionIdentifier ===
            Notifications.DEFAULT_ACTION_IDENTIFIER
          ) {
            const id =
              (response.notification.request.trigger as any).channelId ||
              (response.notification.request.content as any).categoryIdentifier;

            const data = response.notification.request.content.data;

            console.log("notification identifier: ", id);
            console.log("notification data: ", JSON.stringify(data));

            if (id === "new-match") {
              navigate("Discover", { screen: "DiscoverMatchesScreen" });
            }
            if (id === "received-interaction") {
              // refNav("RadarTab");
              navigate("RadarTab", {
                screen: "Interaction",
                params: {
                  interaction: data.interaction,
                  fromNotification: true,
                },
              });
            }
            if (id === "reciprocated-interaction") {
              navigate("RadarTab", {
                screen: "AcceptedInteraction",
                params: {
                  username: data.interaction.target.username,
                  instaName: data.interaction.target.instagramName,
                  image: data.interaction.target.profilePicture.url,
                },
              });
            }
            if (id === NotificationCode.NewTicket) {
              navigate("Event", {
                screen: "TicketScreen",
                params: {
                  eventId: data.eventId,
                },
              });
            }
            if (id === NotificationCode.LiveFeedNotification) {
              navigate("Event", {
                screen: "LiveFeedScreen",
                params: {
                  eventId: data.eventId,
                },
              });
            }

            if (id === "spot-time" || id == "school-spot-mode") {
              console.log("NAVGATE TO SPOT TIME");
              navigate("RadarTab", {
                screen: "Radar",
                params: {
                  start: true,
                },
              });
            }
          }
        }
      );

    () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return children;
};
