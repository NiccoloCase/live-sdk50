import {
  User,
  SetPushNotificationTokenDocument,
  WhoamiDocument,
} from "../generated/graphql";
import { client } from "../graphql";
import { getExpoPushToken } from "./registerForPushNotifications";

export const setPushNotificationToken = async () => {
  const { data: me } = await client.query({ query: WhoamiDocument });
  const user = me?.whoami as User;

  // Controlla che'utente non sia bannato
  if (!user || user.ban?.banned) return;

  const token = await getExpoPushToken();
  if (!token || user.pushToken === token) {
    console.log("Push token not changed");
    return;
  }

  try {
    await client.mutate({
      mutation: SetPushNotificationTokenDocument,
      variables: {
        token,
      },
    });
    console.log("New push token set");
  } catch (e) {
    console.error(e);
  }
};
