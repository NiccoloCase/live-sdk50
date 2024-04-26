import React from "react";
import {
  GetFriendshipRequestsDocument,
  GetFriendshipRequestsSentDocument,
  GetSpottedUsersDocument,
  SpottedItem,
  User,
  useAcceptFriendshipMutation,
  useAskFriendshipMutation,
  useGetFriendshipRequestsSentQuery,
} from "../../../generated/graphql";
import { useStoreActions } from "../../../store";

interface FriendshipButtonProps {
  userId: string;
  user: Partial<User>;
  renderButton: (
    status: FrienddishipStatus,
    askFriendship: () => void,
    acceptRequest: () => void
  ) => React.ReactElement;
}

export enum FrienddishipStatus {
  FRIENDS = "FRIENDS",
  NOT_FRIENDS = "NOT_FRIENDS",
  REQUEST_SENT = "REQUEST_SENT",
  ASKED_FRIENDSHIP = "ASKED_FRIENDSHIP",
}

export const FriendshipButton: React.FC<FriendshipButtonProps> = ({
  user,
  userId,
  renderButton,
}) => {
  const [acceptFriendshipMutation, { error }] = useAcceptFriendshipMutation();
  const [askFriendship] = useAskFriendshipMutation();
  const { data: requestsData } = useGetFriendshipRequestsSentQuery({
    fetchPolicy: "cache-and-network",
  });

  const openSnack = useStoreActions((a) => a.snackbar.open);

  // ACCETTA RICHIESTA DI AMICIZIA
  const acceptRequest = async () => {
    try {
      const data = await acceptFriendshipMutation({
        variables: { targetId: userId },
        optimisticResponse: {
          __typename: "Mutation",
          acceptFriendship: {
            __typename: "ProcessResult",
            success: true,
          },
        },
        update: (cache, { data }) => {
          if (!data?.acceptFriendship.success) return;

          // MODIFICA CACHE QUERY UTENTE
          cache.modify({
            id: cache.identify({ __typename: "User", id: userId }),
            fields: {
              isFriend: () => true,
              hasRequestedFriendship: () => false,
              spotInfo: (current) => {
                return {
                  ...current,
                  areFriends: true,
                };
              },
            },
          });

          // MODIFICA CACHE LISTA RICHIESTE RICEVUTE
          const cachedData: any = cache.readQuery({
            query: GetFriendshipRequestsDocument,
          });
          if (cachedData) {
            cache.writeQuery({
              query: GetFriendshipRequestsDocument,
              data: {
                getFriendshipRequests: cachedData.getFriendshipRequests.filter(
                  (x: User) => x.id !== userId
                ),
              },
            });
          }

          // MODIFICA CACHE SPOTS
          const cachedSpotsData: any = cache.readQuery({
            query: GetSpottedUsersDocument,
          });
          if (cachedSpotsData?.getSpottedUsers?.items) {
            cache.writeQuery({
              query: GetSpottedUsersDocument,
              data: {
                getSpottedUsers: {
                  ...cachedSpotsData?.getSpottedUsers,
                  items: cachedSpotsData.getSpottedUsers.items.map(
                    (x: SpottedItem) => {
                      if (!x?.user?.id) return x;

                      if (x.user.id === userId) {
                        return {
                          ...x,
                          areFriends: true,
                        };
                      }
                      return x;
                    }
                  ),
                },
              },
            });
          }
        },
      });

      if (data.data?.acceptFriendship.success) {
        openSnack({ message: "Richiesta accettata" });
      } else {
        throw data.errors;
      }
    } catch (e) {
      openSnack({ message: "Si è verificato un errore" });
      console.warn(e);
    }
  };

  // RICHIEDE AMICIZIA
  const requestFriendship = async () => {
    askFriendship({
      optimisticResponse: {
        __typename: "Mutation",
        askFriendship: {
          __typename: "ProcessResult",
          success: true,
        },
      },
      variables: { targetId: userId },
      update: (cache, { data }) => {
        if (!data?.askFriendship.success) return;
        const cachedData: any = cache.readQuery({
          query: GetFriendshipRequestsSentDocument,
        });
        if (cachedData) {
          cache.writeQuery({
            query: GetFriendshipRequestsSentDocument,
            data: {
              getFriendshipRequestsSent: [
                ...cachedData.getFriendshipRequestsSent,
                userId,
              ],
            },
          });
        }
      },
    })
      .then(console.log)
      .catch(console.warn);
  };

  const status = React.useMemo(() => {
    if (user.spotInfo?.areFriends === true || user.isFriend === true)
      return FrienddishipStatus.FRIENDS;

    if (user.hasRequestedFriendship === true)
      return FrienddishipStatus.ASKED_FRIENDSHIP;

    if (
      requestsData?.getFriendshipRequestsSent &&
      requestsData.getFriendshipRequestsSent.some(
        (request) => request === userId
      )
    )
      return FrienddishipStatus.REQUEST_SENT;

    return FrienddishipStatus.NOT_FRIENDS;
  }, [requestsData?.getFriendshipRequestsSent, user, userId]);

  return <>{renderButton(status, requestFriendship, acceptRequest)}</>;
};
