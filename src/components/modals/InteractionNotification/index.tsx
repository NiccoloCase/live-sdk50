import React, { useMemo } from "react";
import { useStoreState } from "../../../store";
import { InteractionNotificationCrad } from "./InteractionNotification";
import { ReplayNotificationCrad } from "./ReplyNotification";

const date = new Date();
// add 1 minutes to date
date.setMinutes(date.getMinutes() + 1);

export const InteractionNotification: React.FC = () => {
  const interactions = useStoreState(
    (state) => state.interactions.interactions
  );
  const replies = useStoreState((state) => state.interactions.replies);

  const data = useMemo(() => {
    const merged = [
      ...interactions.map((i) => ({
        interaction: i,
      })),
      ...replies.map((r) => ({
        reply: r,
      })),
    ];

    const sorted = merged.sort((a: any, b: any) => {
      const aDate = a.interaction
        ? new Date(a.interaction.createdAt)
        : new Date(a.reply.createdAt);
      const bDate = b.interaction
        ? new Date(b.interaction.createdAt)
        : new Date(b.reply.createdAt);
      return bDate.getTime() - aDate.getTime();
    });
    return sorted;
  }, [interactions, replies]);

  return (
    <>
      {data.map((item: any, index) => {
        if (item.interaction)
          return (
            <InteractionNotificationCrad
              key={index}
              interaction={item.interaction}
              visibile={index === data.length - 1}
            />
          );
        else if (item.reply) {
          console.log(item.reply);
          return (
            <ReplayNotificationCrad
              key={index}
              interactionId={item.reply.interactionId}
              username={item.reply.interaction.target.username}
              image={item.reply.interaction.target.profilePicture.url}
              instagramName={item.reply.interaction.target.instagramName}
              visibile={index === data.length - 1}
            />
          );
        } else return null;
      })}
    </>
  );
};
