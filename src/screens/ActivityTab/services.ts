import {
  Activity,
  GetMyActivitiesDocument,
  HasUnseenActivitiesDocument,
  SeeActivitiesDocument,
} from "../../generated/graphql";
import { client } from "../../graphql";
import { cache } from "../../graphql/cache";

export const markAsSeenAllActivities = async () => {
  // Prendi tutte le attività non lette
  const query: any = cache.readQuery({
    query: GetMyActivitiesDocument,
  });

  if (!query) return;

  const activities = query.getMyActivities;

  if (!activities) return;

  // Se non ci sono attività non lette, non fare nulla
  const unseenActivities = activities.filter(
    (x: any) => !!x && !x.seen && !x._hidden
  );
  if (unseenActivities.length === 0) return;

  const updated = activities.map((x: any) => {
    if (!x.seen) {
      return {
        ...x,
        seen: true,
      };
    }
    return x;
  });
  // Aggiorna la cache
  cache.writeQuery({
    query: GetMyActivitiesDocument,
    data: { getMyActivities: updated },
  });

  cache.writeQuery({
    query: HasUnseenActivitiesDocument,
    data: {
      hasUnseenActivities: false,
    },
  });

  // Chiamata al server per segnare come lette tutte le attività
  try {
    const { data, errors } = await client.mutate({
      mutation: SeeActivitiesDocument,
    });

    if (data.seeActivities) {
      console.log("Attività segnate come lette");
    } else {
      console.warn("Errore durante la segnalazione delle attività come lette");
      console.warn(errors);
    }
  } catch (e) {
    console.warn(e);
    console.warn("Errore durante la segnalazione delle attività come lette");
  }
};

export const addActivityToCache = (activity: Activity) => {
  const query = client.readQuery({ query: GetMyActivitiesDocument });
  if (!query || !query.getMyActivities) return;

  const newActivity: Activity = {
    __typename: "Activity",
    id: (activity as any)?.id || (activity as any)?._id,
    seen: false,
    text: null,
    ...(activity as any),
    createdAt:
      typeof activity.createdAt === "string"
        ? new Date(activity.createdAt).getTime()
        : activity.createdAt,
  };

  // Controlla che l'attività non esista già
  const index = query.getMyActivities.findIndex(
    (x: Activity) => x.id === activity.id
  );
  if (index > -1) return;

  // Salva l'attività nella cache
  client.writeQuery({
    query: GetMyActivitiesDocument,
    data: {
      getMyActivities: [newActivity, ...query.getMyActivities],
    },
  });
};

/**
 * Nasconde un'attività
 * @param id
 */
export const hideActivity = (id: string) => {
  cache.modify({
    id: cache.identify({
      __typename: "Activity",
      id: id,
    }),
    fields: {
      _hidden() {
        return true;
      },
    },
  });
};
