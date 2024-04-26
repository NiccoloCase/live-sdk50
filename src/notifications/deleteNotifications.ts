import { store } from "../store";
import * as Notifications from "expo-notifications";

/**
 * Elimina la notifica di un nuovo messaggio
 */
export const deleteMessageNotification = async (messageId: string) => {
  try {
    const notifications = store.getState().notifications.notifications;

    const index = notifications.findIndex(
      (n) =>
        (n.request.content as any).categoryIdentifier === "received-message" &&
        typeof n.request.content.data.message === "object" &&
        (n.request.content.data.message as any).id === messageId
    );

    if (index === -1) return;

    const { identifier } = notifications[index].request;

    await Notifications.dismissNotificationAsync(identifier);

    // Rimuove la notifica dalla lista
    store.getActions().notifications.removeNotification(identifier);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Elimina tutte le notifiche di messaggi
 */
export const deleteAllMessagesNotification = async () => {
  try {
    const notifications = await Notifications.getPresentedNotificationsAsync();

    for (let notification of notifications) {
      if (
        (notification.request.content as any).categoryIdentifier ===
        "received-message"
      ) {
        const { identifier } = notification.request;

        await Notifications.dismissNotificationAsync(identifier);
        // Rimuove la notifica dalla lista
        store.getActions().notifications.removeNotification(identifier);
      }
    }
  } catch (err) {
    console.error(err);
  }
};
