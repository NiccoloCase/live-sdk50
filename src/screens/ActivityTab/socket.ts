import { Activity } from "../../generated/graphql";
import { getSocket } from "../../helper/socket";
import { addActivityToCache } from "./services";

export const initActivitySocket = () => {
  const socket = getSocket();
  socket.on("new-activity", (payload: Activity) => {
    addActivityToCache(payload);
  });
};
