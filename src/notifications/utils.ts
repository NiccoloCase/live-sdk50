import * as Notifications from "expo-notifications";

export const sendLocalNotification = async (
  id: string,
  title: string,
  body: string,
  data: any = undefined
) => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      categoryIdentifier: id,
    },
    trigger: {
      seconds: 5,
    },
  });
  return notificationId;
};
