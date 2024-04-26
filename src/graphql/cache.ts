import { InMemoryCache } from "@apollo/client";
import {
  cursorPagination,
  cursorPaginationV2,
  offsetPagination,
} from "./utils";
import { AsyncStorageWrapper, CachePersistor } from "apollo3-cache-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "lodash";

// Cache
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getLimitUsers: cursorPagination(["gender"]),
        getUsersAdmin: cursorPagination(["onlyLimit"]),
        getReportedUsers: cursorPagination(),
        getMatches: {
          merge(_, incoming) {
            return incoming;
          },
        },
        getUpcomingEvents: cursorPagination(),
        getInteractions: cursorPagination(),
        getSpottedUsers: cursorPaginationV2(),
        getFriends: cursorPaginationV2(),
        getFriendshipRequests: {
          merge(_, incoming) {
            return incoming;
          },
        },
        getFriendshipRequestsSent: {
          merge(_, incoming) {
            return incoming;
          },
        },
        getEventById: {
          keyArgs: ["id"],
          merge(existing, incoming, { mergeObjects }) {
            return incoming;
          },
        },
        getReviewsByOrganizer: offsetPagination(["organizerId"]),
        getEventsToReview: cursorPagination(),
        getFollowedEvents: cursorPagination(),
        getUsersFollowingEvent: cursorPagination(["eventId"]),
        getEventLiveFeed: cursorPagination(["eventId"]),
        getUserAttendedEvents: {
          keyArgs: ["userId"],
          merge(_, incoming) {
            return incoming;
          },
        },
        getMyEvents: cursorPagination(),
        getMyTickets: cursorPagination(),

        getUserById: {
          keyArgs: ["id"],
          merge(existing, incoming, { mergeObjects }) {
            return mergeObjects(existing, incoming);
          },
        },

        getOrganizerManagers: {
          keyArgs: ["organizerId"],
          merge(_, incoming) {
            return incoming;
          },
        },
        adminGetEventTickets: cursorPagination(["eventId"]),
        adminGetEventPrTickets: cursorPagination(["eventId", "prId"]),
        getMyPrInvitationRequests: cursorPagination(["eventId"]),
        adminGetEventPackages: {
          keyArgs: ["eventId"],
          merge(_, incoming) {
            return incoming;
          },
        },
        adminGetEventInvitationRequests: {
          keyArgs: ["eventId"],
          merge(_, incoming) {
            return incoming;
          },
        },
        prGetEventInvitationRequests: {
          keyArgs: ["eventId"],
          merge(_, incoming) {
            return incoming;
          },
        },
        getEventLinks: cursorPagination(["eventId"]),

        // ATTIVITA'
        hasUnseenActivities: {
          keyArgs: [],
          merge(_, incoming) {
            return incoming;
          },
        },
        getMyTicketActivities: cursorPagination([]),
        getMyActivities: cursorPagination([]),
      },
    },
    User: {
      fields: {
        notifications: {
          merge(_, incoming) {
            return incoming;
          },
        },
        profilePicture: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Event: {
      fields: {
        isFollowing: {
          merge(_, incoming) {
            return incoming;
          },
        },
        has_ticketing_system: {
          merge(_, incoming) {
            return incoming;
          },
        },
        is_ticketing_enabled: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export const cachePersistor = new CachePersistor({
  cache,
  storage: new AsyncStorageWrapper(AsyncStorage),
});
