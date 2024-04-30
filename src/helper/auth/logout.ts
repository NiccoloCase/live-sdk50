import { LogoutDocument } from "../../generated/graphql";
import { clearCache, client } from "../../graphql";
import { store } from "../../store";
import { logoutSocket } from "../socket";

export const logout = async (skipServer?: boolean) => {
  if (!skipServer) {
    const { data } = await client.mutate({
      mutation: LogoutDocument,
    });
    if (!data.logout.success) return;
  }
  // Elimina credenziali di accesso
  store.getActions().auth.logout();
  // Disconnette da firebase
  //auth().signOut().catch(console.warn);
  // Elimina la cache graphql
  clearCache();
  // Disconnette dal socket
  logoutSocket();
};
