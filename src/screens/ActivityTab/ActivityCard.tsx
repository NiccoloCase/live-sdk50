import React from "react";
import { StyleSheet } from "react-native";
import { Activity, ActivityType } from "../../generated/graphql";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { ActivityFriendshipCard } from "./cards/FriendshipCard";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { ActivityTicketCard } from "./cards/TicketCard";
import { ActivityFriendFollowedEventCard } from "./cards/FriendFollowedEventCard";
import { ActivityFriendJoinedEventCard } from "./cards/FriendJoinedEventCard";
import { ActivityEventReminderCard } from "./cards/EventReminderCard";
import { ActivityReviewReminderCard } from "./cards/ReviewReminderCard";
import { ActivityTextCard } from "./cards/TextCard";
import { ActivityEventCreatedCard } from "./cards/EventCreatedCard";
import { ActivityFriendFollowedOrganizerCard } from "./cards/FriendFollowedOrganizer";
import { PrNewInvitationRequestCard } from "./cards/PrNewInvitationRequestCard";
import { GotNewEventRoleCard } from "./cards/GotNewEventRoleCard";

interface ActivityCardProps {
  activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const type = activity.type;

  const renderContent = () => {
    if (!activity.id) return null;

    // UN TUO AMICO HA INIZIATO A SEGUIRE UN EVENTO
    if (type === ActivityType.FriendFollowedEvent)
      return <ActivityFriendFollowedEventCard activity={activity} />;

    // RICHIESTE DI AMICIZIA
    if (
      type === ActivityType.FriendshipRequest ||
      type === ActivityType.FriendshipAccepted ||
      type === ActivityType.FriendshipRejected
    ) {
      return <ActivityFriendshipCard activity={activity} />;
    }

    // UN TUO AMICO E' ENTRATO IN UN EVENTO
    if (type === ActivityType.FriendJoinedEvent)
      return <ActivityFriendJoinedEventCard activity={activity} />;

    // NUOVO TICKET
    if (type === ActivityType.NewTicket)
      return <ActivityTicketCard activity={activity} />;

    // PROMEMORIA EVENTO
    if (type === ActivityType.EventReminder)
      return <ActivityEventReminderCard activity={activity} />;

    // PROMEMORIA RECENSIONE
    if (type === ActivityType.ReviewReminder)
      return <ActivityReviewReminderCard activity={activity} />;

    // TESTUALE
    if (type === ActivityType.Text)
      return <ActivityTextCard activity={activity} />;

    // NUOVO EVENTO CREATO
    if (type === ActivityType.NewEventCreated)
      return <ActivityEventCreatedCard activity={activity} />;

    // AMICO SEGUE ORGANIZZATORE
    if (type === ActivityType.FriendFollowedOrganizer)
      return <ActivityFriendFollowedOrganizerCard activity={activity} />;

    // NUOVA RICHIESTA DI INVITO PER
    if (type === ActivityType.PrNewInvitationRequest)
      return <PrNewInvitationRequestCard activity={activity} />;

    // NUOVO RUOLO
    if (type === ActivityType.GotNewEventRole)
      return <GotNewEventRoleCard activity={activity} />;

    return null;
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      {renderContent()}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: heightPercentageToDP(3),
  },
});
