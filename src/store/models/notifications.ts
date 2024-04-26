import { Action, action } from "easy-peasy";
import * as Notifications from "expo-notifications";

export interface NotificationsModel {
  notifications: Notifications.Notification[];
  setNotifications: Action<NotificationsModel, Notifications.Notification[]>;
  addNotification: Action<NotificationsModel, Notifications.Notification>;
  removeNotification: Action<NotificationsModel, string>;
}

const notificationsModel: NotificationsModel = {
  notifications: [],

  /** Imposta le notifiche */
  setNotifications: action((state, notifications) => {
    state.notifications = notifications;
  }),

  /** Imposta le notifiche */
  addNotification: action((state, notification) => {
    state.notifications.push(notification);
  }),

  /** Aggiunge una notifica */
  removeNotification: action((state, identifier) => {
    const index = state.notifications.findIndex(
      (n) => n.request.identifier === identifier
    );

    if (index > -1) state.notifications.splice(index, 1);
  }),
};

export default notificationsModel;
