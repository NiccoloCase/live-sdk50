import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Activity = {
  __typename?: 'Activity';
  _hidden?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  ownerId: Scalars['ID'];
  seen?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  type: ActivityType;
};

export enum ActivityType {
  EndEventReminder = 'END_EVENT_REMINDER',
  EventReminder = 'EVENT_REMINDER',
  FriendshipAccepted = 'FRIENDSHIP_ACCEPTED',
  FriendshipRejected = 'FRIENDSHIP_REJECTED',
  FriendshipRequest = 'FRIENDSHIP_REQUEST',
  FriendFollowedEvent = 'FRIEND_FOLLOWED_EVENT',
  FriendFollowedOrganizer = 'FRIEND_FOLLOWED_ORGANIZER',
  FriendJoinedEvent = 'FRIEND_JOINED_EVENT',
  GotNewEventRole = 'GOT_NEW_EVENT_ROLE',
  JoinedEvent = 'JOINED_EVENT',
  LiveFeedGiveawayStarting = 'LIVE_FEED_GIVEAWAY_STARTING',
  LiveFeedNotification = 'LIVE_FEED_NOTIFICATION',
  NewEventCreated = 'NEW_EVENT_CREATED',
  NewPrInvitationRequest = 'NEW_PR_INVITATION_REQUEST',
  NewTicket = 'NEW_TICKET',
  PrNewInvitationRequest = 'PR_NEW_INVITATION_REQUEST',
  ReviewReminder = 'REVIEW_REMINDER',
  Text = 'TEXT'
}

export type AddPrToEventResult = {
  __typename?: 'AddPrToEventResult';
  alreadyPr?: Maybe<Scalars['Boolean']>;
  errorCode?: Maybe<Scalars['String']>;
  pr?: Maybe<Pr>;
  success: Scalars['Boolean'];
};

export type AdminAreaInfo = {
  __typename?: 'AdminAreaInfo';
  isAppAdmin?: Maybe<Scalars['Boolean']>;
};

export type AgeRangeStats = {
  __typename?: 'AgeRangeStats';
  from?: Maybe<Scalars['Int']>;
  to?: Maybe<Scalars['Int']>;
  value: Scalars['Float'];
};

export type Asset = {
  __typename?: 'Asset';
  aspectRatio?: Maybe<Scalars['Float']>;
  blurhash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  public_id: Scalars['String'];
  type?: Maybe<AssetType>;
  url: Scalars['String'];
};

export type AssetInput = {
  aspectRatio?: Maybe<Scalars['Float']>;
  asset_id: Scalars['String'];
  blurhash?: Maybe<Scalars['String']>;
  public_id: Scalars['String'];
  type?: Maybe<AssetType>;
  url: Scalars['String'];
};

export type AssetRef = {
  __typename?: 'AssetRef';
  aspectRatio?: Maybe<Scalars['Float']>;
  blurhash?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export enum AssetType {
  Audio = 'Audio',
  Image = 'Image',
  Video = 'Video'
}

export type Assistence = {
  __typename?: 'Assistence';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  text?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export enum AssistenceType {
  Generic = 'GENERIC',
  OrganizerRequest = 'ORGANIZER_REQUEST'
}

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Int'];
  refreshToken: Scalars['String'];
};

export type BanObj = {
  __typename?: 'BanObj';
  banned?: Maybe<Scalars['Boolean']>;
  date?: Maybe<Scalars['Date']>;
  reason?: Maybe<Scalars['String']>;
};

export type BuyPackageResult = {
  __typename?: 'BuyPackageResult';
  errorCode?: Maybe<EventTicketingErrorCode>;
  success: Scalars['Boolean'];
  ticket?: Maybe<Ticket>;
};

export type CoinsInfo = {
  __typename?: 'CoinsInfo';
  count: Scalars['Int'];
};

export type CreatePackageResult = {
  __typename?: 'CreatePackageResult';
  errorCode?: Maybe<EventTicketingErrorCode>;
  package?: Maybe<EventPackage>;
  success: Scalars['Boolean'];
};

export type CreateReviewResponse = {
  __typename?: 'CreateReviewResponse';
  errorCode?: Maybe<Scalars['String']>;
  review?: Maybe<Review>;
};

export type CursorPaginationOptions = {
  cursor?: Maybe<Scalars['ID']>;
  limit?: Maybe<Scalars['Int']>;
};


export type DayOpeningHours = {
  __typename?: 'DayOpeningHours';
  close: Scalars['Int'];
  open: Scalars['Int'];
};

export type DayOpeningHoursInput = {
  close: Scalars['Int'];
  open: Scalars['Int'];
};

export type DeleteEventPackageResult = {
  __typename?: 'DeleteEventPackageResult';
  alreadyIssued?: Maybe<Scalars['Boolean']>;
  errorCode?: Maybe<EventTicketingErrorCode>;
  success: Scalars['Boolean'];
};

export type EditEventPackageStatusResult = {
  __typename?: 'EditEventPackageStatusResult';
  cannotUnsetSoldout?: Maybe<Scalars['Boolean']>;
  errorCode?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type EditOrganizerInputValues = {
  description?: Maybe<Scalars['String']>;
  instagramUsername?: Maybe<Scalars['String']>;
  location?: Maybe<LocationInput>;
  openingHours?: Maybe<OpeningHoursInput>;
  phoneNumber?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type EditOrganizerRemoveFields = {
  description?: Maybe<Scalars['Boolean']>;
  instagramUsername?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Scalars['Boolean']>;
  openingHours?: Maybe<Scalars['Boolean']>;
  phoneNumber?: Maybe<Scalars['Boolean']>;
  website?: Maybe<Scalars['Boolean']>;
};

export type EmailResponse = {
  __typename?: 'EmailResponse';
  recipient?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Event = {
  __typename?: 'Event';
  PRs?: Maybe<Array<Maybe<Pr>>>;
  adminOnly?: Maybe<Scalars['Boolean']>;
  contactInfo?: Maybe<EventContactInfo>;
  creator?: Maybe<User>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  eventType?: Maybe<EventType>;
  friendsFollowingPreview?: Maybe<Array<Maybe<User>>>;
  has_ticket_system?: Maybe<Scalars['Boolean']>;
  has_ticketing_system?: Maybe<Scalars['Boolean']>;
  haveTicket?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  image?: Maybe<AssetRef>;
  invitation_requests_enabled?: Maybe<Scalars['Boolean']>;
  isEnded?: Maybe<Scalars['Boolean']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  isOfficial?: Maybe<Scalars['Boolean']>;
  isParticipating?: Maybe<Scalars['Boolean']>;
  isRequested?: Maybe<Scalars['Boolean']>;
  isVerified?: Maybe<Scalars['Boolean']>;
  is_ticketing_enabled?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  locationText?: Maybe<Scalars['String']>;
  minAge?: Maybe<Scalars['Int']>;
  myReview?: Maybe<Review>;
  myRoles?: Maybe<Array<Maybe<EventCollaboratorRole>>>;
  organizer?: Maybe<Organizer>;
  packages?: Maybe<Array<EventPackage>>;
  participantsCount: Scalars['Int'];
  priceRange?: Maybe<EventPriceRange>;
  priceText?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['Date']>;
  released?: Maybe<Scalars['Boolean']>;
  ticketsCount?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  visibilityType?: Maybe<EventVisibilityType>;
};

export enum EventCollaboratorRole {
  Admin = 'ADMIN',
  Cashier = 'CASHIER',
  Dj = 'DJ',
  Interviewer = 'INTERVIEWER',
  Photographer = 'PHOTOGRAPHER',
  Pr = 'PR',
  Vocalist = 'VOCALIST'
}

export type EventContactInfo = {
  __typename?: 'EventContactInfo';
  instagram?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  wsNumber?: Maybe<Scalars['String']>;
};

export type EventContactInfoInput = {
  instagram?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  wsNumber?: Maybe<Scalars['String']>;
};

export type EventPackage = {
  __typename?: 'EventPackage';
  billingAccount?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Date'];
  currency: Scalars['String'];
  drinks?: Maybe<Scalars['Int']>;
  enabled?: Maybe<Scalars['Boolean']>;
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  maxTickets?: Maybe<Scalars['Int']>;
  maxTicketsPerUser?: Maybe<Scalars['Int']>;
  minAge?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  paymentTypes: Array<EventPackagePaymentType>;
  sex?: Maybe<EventPackageSexType>;
  skipLine?: Maybe<Scalars['Boolean']>;
  soldout?: Maybe<Scalars['Boolean']>;
  type?: Maybe<EventPackageType>;
  updatedAt: Scalars['Date'];
  userPrice: Scalars['Float'];
};

export enum EventPackagePaymentType {
  Invitation = 'INVITATION',
  Online = 'ONLINE',
  OnSite = 'ON_SITE'
}

export enum EventPackageSexType {
  F = 'F',
  M = 'M'
}

export enum EventPackageType {
  Invitation = 'INVITATION',
  List = 'LIST',
  Table = 'TABLE',
  Ticket = 'TICKET'
}

export type EventPreview = {
  __typename?: 'EventPreview';
  id: Scalars['ID'];
  image?: Maybe<AssetRef>;
  title: Scalars['String'];
};

export type EventPriceRange = {
  __typename?: 'EventPriceRange';
  currency?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type EventRoleItem = {
  __typename?: 'EventRoleItem';
  roles?: Maybe<Array<Maybe<EventCollaboratorRole>>>;
  user?: Maybe<User>;
};

export enum EventTicketingErrorCode {
  EventNotExists = 'EVENT_NOT_EXISTS',
  EventPackageNotExists = 'EVENT_PACKAGE_NOT_EXISTS',
  InvitationNotFound = 'INVITATION_NOT_FOUND',
  MaxTicketsPerUserReached = 'MAX_TICKETS_PER_USER_REACHED',
  NotAdmin = 'NOT_ADMIN',
  PackageNotEnabled = 'PACKAGE_NOT_ENABLED',
  PackageSoldout = 'PACKAGE_SOLDOUT',
  PackageTypeMissmatch = 'PACKAGE_TYPE_MISSMATCH',
  PaymentTypeNotAllowed = 'PAYMENT_TYPE_NOT_ALLOWED',
  PrNotFound = 'PR_NOT_FOUND',
  UserProfileNotComplete = 'USER_PROFILE_NOT_COMPLETE'
}

export enum EventType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export enum EventVisibilityType {
  AdminOnly = 'ADMIN_ONLY',
  Private = 'PRIVATE',
  PrivateHidden = 'PRIVATE_HIDDEN',
  Public = 'PUBLIC'
}

export type FirebaseAuthResponse = {
  __typename?: 'FirebaseAuthResponse';
  newUser?: Maybe<Scalars['Boolean']>;
  success: Scalars['Boolean'];
  tokens?: Maybe<AuthPayload>;
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY'
}

export type GetFriendsResponse = {
  __typename?: 'GetFriendsResponse';
  cursor?: Maybe<Scalars['String']>;
  endReached?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<User>>>;
};

export type GetSpottedUsersResponse = {
  __typename?: 'GetSpottedUsersResponse';
  cursor?: Maybe<Scalars['String']>;
  endReached?: Maybe<Scalars['Boolean']>;
  items?: Maybe<Array<Maybe<SpottedItem>>>;
};

export type GivewayWinner = {
  __typename?: 'GivewayWinner';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type InitRegionsResponse = {
  __typename?: 'InitRegionsResponse';
  currentRegion?: Maybe<Region>;
  pingId: Scalars['ID'];
  regions: Array<Region>;
};

export type Interaction = {
  __typename?: 'Interaction';
  author?: Maybe<User>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  mutual?: Maybe<Scalars['Boolean']>;
  target?: Maybe<User>;
  targetId: Scalars['ID'];
  type: InteractionType;
  userId: Scalars['ID'];
};

export enum InteractionType {
  Greet = 'GREET'
}

export type Invitation = {
  __typename?: 'Invitation';
  eventId: Scalars['ID'];
  id: Scalars['ID'];
  packageDoc?: Maybe<EventPackage>;
  packageId?: Maybe<Scalars['ID']>;
  pr?: Maybe<Pr>;
  prId?: Maybe<Scalars['ID']>;
  userDoc?: Maybe<User>;
  userId: Scalars['ID'];
};

export type InvitationRequestResponse = {
  __typename?: 'InvitationRequestResponse';
  alreadyRequested?: Maybe<Scalars['Boolean']>;
  errorCode?: Maybe<EventTicketingErrorCode>;
  invitation?: Maybe<Invitation>;
  success: Scalars['Boolean'];
};


export type LikeResponse = {
  __typename?: 'LikeResponse';
  isMatch?: Maybe<Scalars['Boolean']>;
  success: Scalars['Boolean'];
};

export type LimitEvent = {
  __typename?: 'LimitEvent';
  joined?: Maybe<Scalars['Boolean']>;
};

export type Link = {
  __typename?: 'Link';
  _id: Scalars['ID'];
  clicksCount: Scalars['Int'];
  eventRef?: Maybe<Event>;
  owner?: Maybe<LinkOwner>;
  ownerId: Scalars['ID'];
  refId: Scalars['ID'];
  refType: LinkRefType;
  url?: Maybe<Scalars['String']>;
};

export type LinkOwner = {
  __typename?: 'LinkOwner';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export enum LinkRefType {
  Event = 'Event'
}

export type LiveFeedGiveaway = {
  __typename?: 'LiveFeedGiveaway';
  countdownDurationSeconds?: Maybe<Scalars['Int']>;
  countdownStart?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  subscribers: Array<Scalars['String']>;
  subscriptionCloseDate?: Maybe<Scalars['Date']>;
  subscriptionOpen?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  winners?: Maybe<Array<Maybe<GivewayWinner>>>;
};

export type LiveFeedImageInput = {
  aspectRatio?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['ID']>;
  url: Scalars['String'];
};

export type LiveFeedItem = {
  __typename?: 'LiveFeedItem';
  author: Scalars['String'];
  createdAt: Scalars['Date'];
  eventId: Scalars['ID'];
  giveaway?: Maybe<LiveFeedGiveaway>;
  id: Scalars['ID'];
  image?: Maybe<LiveFeedItemImage>;
  notification?: Maybe<LiveFeedItemNotification>;
  pinned?: Maybe<Scalars['Boolean']>;
  poll?: Maybe<LiveFeedItemPoll>;
  type: LiveFeedItemType;
};

export type LiveFeedItemImage = {
  __typename?: 'LiveFeedItemImage';
  aspectRatio?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
};

export type LiveFeedItemNotification = {
  __typename?: 'LiveFeedItemNotification';
  body?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  title?: Maybe<Scalars['String']>;
  type: LiveFeedNotificationType;
};

export type LiveFeedItemPoll = {
  __typename?: 'LiveFeedItemPoll';
  closed?: Maybe<Scalars['Boolean']>;
  options: Array<LiveFeedItemPoolOption>;
  selectedOption?: Maybe<Scalars['ID']>;
  title: Scalars['String'];
};

export type LiveFeedItemPoolOption = {
  __typename?: 'LiveFeedItemPoolOption';
  _id: Scalars['ID'];
  data?: Maybe<Scalars['JSON']>;
  title: Scalars['String'];
  voted: Array<Scalars['ID']>;
};

export enum LiveFeedItemType {
  Giveaway = 'GIVEAWAY',
  Notification = 'NOTIFICATION',
  Poll = 'POLL'
}

export enum LiveFeedNotificationType {
  InteractionMatch = 'INTERACTION_MATCH',
  TextNotification = 'TEXT_NOTIFICATION',
  UserJoined = 'USER_JOINED'
}

export type LiveFeedPollOptionInput = {
  data?: Maybe<Scalars['JSON']>;
  title: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  googlePlaceId?: Maybe<Scalars['String']>;
  locationText: Scalars['String'];
  point: Point;
};

export type LocationInput = {
  googlePlaceId?: Maybe<Scalars['String']>;
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  locationText: Scalars['String'];
};

export type Match = {
  __typename?: 'Match';
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  messages?: Maybe<Array<MatchMessage>>;
  user: User;
};

export type MatchMessage = {
  __typename?: 'MatchMessage';
  code: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  seen?: Maybe<Scalars['Boolean']>;
  sender: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendship: ProcessResult;
  addTextStatus?: Maybe<UserTextStatus>;
  addUserRoleToEvent: ProcessResult;
  adminAcceptInvitationRequest: ProcessResult;
  adminAddPrToEvent: AddPrToEventResult;
  adminAuth: VerfyUserResponse;
  adminCreateEvent?: Maybe<Event>;
  adminCreateTextActivity?: Maybe<Activity>;
  adminCreateTicketingSystem: ProcessResult;
  adminDeleteEvent: ProcessResult;
  adminEditEvent?: Maybe<Event>;
  adminEditPrPackagesAvailability?: Maybe<Pr>;
  adminEnableTicketing: ProcessResult;
  adminMarkEventAsEnded: ProcessResult;
  adminRejectInvitationRequest: ProcessResult;
  adminRemovePrFromEvent: ProcessResult;
  adminRevokeUserTicket: ProcessResult;
  adminScanTicket: ScanTicketResult;
  adminSendSpotTimeNotification: ProcessResult;
  askFriendship: ProcessResult;
  banUser: ProcessResult;
  blockUser: ProcessResult;
  calcLiveFeedGiveawayWinners: ProcessResult;
  cancelEventScheduling: ProcessResult;
  changeEmail: EmailResponse;
  changePasswordWithToken: ProcessResult;
  createAssistence: ProcessResult;
  createEventPackage: CreatePackageResult;
  createInteraction?: Maybe<Interaction>;
  createLiveFeedGiveaway?: Maybe<LiveFeedItem>;
  createLiveFeedNotification?: Maybe<LiveFeedItem>;
  createLiveFeedPoll?: Maybe<LiveFeedItem>;
  createOrganizer?: Maybe<Organizer>;
  createReview?: Maybe<CreateReviewResponse>;
  deleteAccount: ProcessResult;
  deleteEventPackage: DeleteEventPackageResult;
  deleteLoggedAccount: ProcessResult;
  dislikeUser: ProcessResult;
  editEventPackage: CreatePackageResult;
  editEventPackageStatus: EditEventPackageStatusResult;
  editMyPrInfo: Pr;
  editOrganizer?: Maybe<Organizer>;
  editOrganizerImage?: Maybe<Organizer>;
  editPassword: ProcessResult;
  firebasePhoneAuth: FirebaseAuthResponse;
  followEvent: ProcessResult;
  followOrganizer: ProcessResult;
  forgotPassword: ProcessResult;
  generateEventLink?: Maybe<Link>;
  importPrsFromEvent: ProcessResult;
  initRegions?: Maybe<InitRegionsResponse>;
  leaveSchool: ProcessResult;
  likeUser: LikeResponse;
  login: AuthPayload;
  logout: ProcessResult;
  logoutAllDevices: ProcessResult;
  makeUserOrganizerManager?: Maybe<OrganizerManager>;
  markUserAsEventParticipant: ProcessResult;
  nearbyStartup: NearbyStartupResult;
  prAccetInvitationRequest: ProcessResult;
  prRejectInvitationRequest: ProcessResult;
  reciprocateInteraction: ProcessResult;
  rejectFriendship: ProcessResult;
  releaseEvent: ProcessResult;
  removeCollaboratorFromEvent: ProcessResult;
  removeEventRequest: ProcessResult;
  removeFriendship: ProcessResult;
  removeMeFromEvent: ProcessResult;
  removeReview: ProcessResult;
  removeUserOrganizerManager?: Maybe<ProcessResult>;
  removeUserReports: ProcessResult;
  removeUserRoleFromEvent: ProcessResult;
  reportUser: ProcessResult;
  requestPackageToPr: InvitationRequestResponse;
  reservePackage: BuyPackageResult;
  savePhoneSessionInfo?: Maybe<Scalars['ID']>;
  seeActivities?: Maybe<ProcessResult>;
  seeAllMessages: ProcessResult;
  sendConfirmationEmail: EmailResponse;
  sendEventInvitationRequest: ProcessResult;
  setLanguageCode: ProcessResult;
  setPushNotificationToken: ProcessResult;
  signup: EmailResponse;
  signupWithFirebasePhone: VerfyUserResponse;
  signupWithPhone: VerfyUserResponse;
  spotUser: SpotResult;
  startSchoolSpotMode: ProcessResult;
  subscribeLiveFeedGiveaway: ProcessResult;
  unfollowEvent: ProcessResult;
  unfollowOrganizer: ProcessResult;
  updateRealName: ProcessResult;
  updateUserProfile?: Maybe<User>;
  verfyUser: VerfyUserResponse;
  verifyPhone: ProcessResult;
  voteLiveFeedPoll: ProcessResult;
};


export type MutationAcceptFriendshipArgs = {
  targetId: Scalars['ID'];
};


export type MutationAddTextStatusArgs = {
  text?: Maybe<Scalars['String']>;
};


export type MutationAddUserRoleToEventArgs = {
  eventId: Scalars['ID'];
  role: EventCollaboratorRole;
  userId: Scalars['ID'];
};


export type MutationAdminAcceptInvitationRequestArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationAdminAddPrToEventArgs = {
  eventId: Scalars['ID'];
  prId: Scalars['ID'];
};


export type MutationAdminAuthArgs = {
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationAdminCreateEventArgs = {
  contactInfo?: Maybe<EventContactInfoInput>;
  controlledRelease?: Maybe<Scalars['Boolean']>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  image: AssetInput;
  joinCode?: Maybe<Scalars['String']>;
  location: LocationInput;
  locationText?: Maybe<Scalars['String']>;
  minAge?: Maybe<Scalars['Int']>;
  organizer?: Maybe<Scalars['ID']>;
  priceText?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['Date']>;
  ticketingSystem?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
};


export type MutationAdminCreateTextActivityArgs = {
  body: Scalars['String'];
  ownerId: Scalars['ID'];
  title: Scalars['String'];
};


export type MutationAdminCreateTicketingSystemArgs = {
  eventId: Scalars['ID'];
};


export type MutationAdminDeleteEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationAdminEditEventArgs = {
  description?: Maybe<Scalars['String']>;
  eventId: Scalars['ID'];
  image?: Maybe<AssetInput>;
  title?: Maybe<Scalars['String']>;
};


export type MutationAdminEditPrPackagesAvailabilityArgs = {
  eventId: Scalars['ID'];
  packages: Array<PrPackageAvailabilityInput>;
  prId: Scalars['ID'];
};


export type MutationAdminEnableTicketingArgs = {
  enable: Scalars['Boolean'];
  eventId: Scalars['ID'];
};


export type MutationAdminMarkEventAsEndedArgs = {
  eventId: Scalars['ID'];
};


export type MutationAdminRejectInvitationRequestArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationAdminRemovePrFromEventArgs = {
  eventId: Scalars['ID'];
  prId: Scalars['ID'];
};


export type MutationAdminRevokeUserTicketArgs = {
  eventId: Scalars['ID'];
  ticketId: Scalars['ID'];
};


export type MutationAdminScanTicketArgs = {
  eventId: Scalars['ID'];
  ticketCode: Scalars['ID'];
  ticketId: Scalars['ID'];
};


export type MutationAdminSendSpotTimeNotificationArgs = {
  eventId: Scalars['ID'];
};


export type MutationAskFriendshipArgs = {
  targetId: Scalars['ID'];
};


export type MutationBanUserArgs = {
  reason?: Maybe<Scalars['String']>;
  userId: Scalars['ID'];
};


export type MutationBlockUserArgs = {
  userId: Scalars['ID'];
};


export type MutationCalcLiveFeedGiveawayWinnersArgs = {
  eventId: Scalars['ID'];
};


export type MutationCancelEventSchedulingArgs = {
  eventId: Scalars['ID'];
};


export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordWithTokenArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateAssistenceArgs = {
  text: Scalars['String'];
  type: AssistenceType;
};


export type MutationCreateEventPackageArgs = {
  currency: Scalars['String'];
  drinks?: Maybe<Scalars['Int']>;
  eventId: Scalars['ID'];
  hidden?: Maybe<Scalars['Boolean']>;
  maxTickets?: Maybe<Scalars['Int']>;
  maxTicketsPerUser?: Maybe<Scalars['Int']>;
  minAge?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  paymentTypes: Array<EventPackagePaymentType>;
  sex?: Maybe<EventPackageSexType>;
  skipLine?: Maybe<Scalars['Boolean']>;
  type?: Maybe<EventPackageType>;
  userPrice: Scalars['Int'];
};


export type MutationCreateInteractionArgs = {
  targetId: Scalars['ID'];
  type: InteractionType;
};


export type MutationCreateLiveFeedGiveawayArgs = {
  countdownDurationSeconds: Scalars['Int'];
  countdownStart: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  eventId: Scalars['ID'];
  image?: Maybe<LiveFeedImageInput>;
  title: Scalars['String'];
};


export type MutationCreateLiveFeedNotificationArgs = {
  body?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['JSON']>;
  eventId: Scalars['ID'];
  image?: Maybe<LiveFeedImageInput>;
  pushNotification: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
  type: LiveFeedNotificationType;
};


export type MutationCreateLiveFeedPollArgs = {
  eventId: Scalars['ID'];
  image?: Maybe<LiveFeedImageInput>;
  options: Array<Maybe<LiveFeedPollOptionInput>>;
  title: Scalars['String'];
};


export type MutationCreateOrganizerArgs = {
  description?: Maybe<Scalars['String']>;
  image: AssetInput;
  name: Scalars['String'];
  type?: Maybe<OrganizerType>;
};


export type MutationCreateReviewArgs = {
  comment?: Maybe<Scalars['String']>;
  event: Scalars['ID'];
  rating: Scalars['Int'];
};


export type MutationDeleteAccountArgs = {
  password: Scalars['String'];
};


export type MutationDeleteEventPackageArgs = {
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
};


export type MutationDislikeUserArgs = {
  targetId: Scalars['ID'];
};


export type MutationEditEventPackageArgs = {
  drinks?: Maybe<Scalars['Int']>;
  eventId: Scalars['ID'];
  maxTickets?: Maybe<Scalars['Int']>;
  maxTicketsPerUser?: Maybe<Scalars['Int']>;
  minAge?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  packageId: Scalars['ID'];
  paymentTypes?: Maybe<Array<EventPackagePaymentType>>;
  sex?: Maybe<EventPackageSexType>;
  skipLine?: Maybe<Scalars['Boolean']>;
};


export type MutationEditEventPackageStatusArgs = {
  enabled?: Maybe<Scalars['Boolean']>;
  eventId: Scalars['ID'];
  hidden?: Maybe<Scalars['Boolean']>;
  packageId: Scalars['ID'];
  soldout?: Maybe<Scalars['Boolean']>;
};


export type MutationEditMyPrInfoArgs = {
  eventId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};


export type MutationEditOrganizerArgs = {
  id: Scalars['ID'];
  remove?: Maybe<EditOrganizerRemoveFields>;
  values?: Maybe<EditOrganizerInputValues>;
};


export type MutationEditOrganizerImageArgs = {
  id: Scalars['ID'];
  image: AssetInput;
};


export type MutationEditPasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationFirebasePhoneAuthArgs = {
  token: Scalars['String'];
};


export type MutationFollowEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationFollowOrganizerArgs = {
  id: Scalars['ID'];
};


export type MutationForgotPasswordArgs = {
  code: Scalars['String'];
  firebaseSessionInfo: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationGenerateEventLinkArgs = {
  eventId: Scalars['ID'];
};


export type MutationImportPrsFromEventArgs = {
  fromEventId: Scalars['ID'];
  prsIds: Array<Scalars['ID']>;
  toEventId: Scalars['ID'];
};


export type MutationInitRegionsArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};


export type MutationLikeUserArgs = {
  targetId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};


export type MutationMakeUserOrganizerManagerArgs = {
  organizerId: Scalars['ID'];
  role: OrganizerUserRole;
  userId: Scalars['ID'];
};


export type MutationMarkUserAsEventParticipantArgs = {
  joinCode: Scalars['ID'];
};


export type MutationPrAccetInvitationRequestArgs = {
  invitationId: Scalars['ID'];
};


export type MutationPrRejectInvitationRequestArgs = {
  invitationId: Scalars['ID'];
};


export type MutationReciprocateInteractionArgs = {
  interactionId: Scalars['ID'];
};


export type MutationRejectFriendshipArgs = {
  targetId: Scalars['ID'];
};


export type MutationReleaseEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationRemoveCollaboratorFromEventArgs = {
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveEventRequestArgs = {
  invitationId: Scalars['ID'];
};


export type MutationRemoveFriendshipArgs = {
  targetId: Scalars['ID'];
};


export type MutationRemoveMeFromEventArgs = {
  eventId: Scalars['ID'];
  role?: Maybe<EventCollaboratorRole>;
};


export type MutationRemoveReviewArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserOrganizerManagerArgs = {
  organizerId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveUserReportsArgs = {
  userId: Scalars['ID'];
};


export type MutationRemoveUserRoleFromEventArgs = {
  eventId: Scalars['ID'];
  role: EventCollaboratorRole;
  userId: Scalars['ID'];
};


export type MutationReportUserArgs = {
  reason: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationRequestPackageToPrArgs = {
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
  prId: Scalars['ID'];
};


export type MutationReservePackageArgs = {
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
};


export type MutationSavePhoneSessionInfoArgs = {
  phoneNumber: Scalars['String'];
  sessionInfo: Scalars['String'];
};


export type MutationSeeAllMessagesArgs = {
  matchId: Scalars['ID'];
};


export type MutationSendConfirmationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSendEventInvitationRequestArgs = {
  eventId: Scalars['ID'];
  mode: RequestContactMode;
};


export type MutationSetLanguageCodeArgs = {
  code: Scalars['String'];
};


export type MutationSetPushNotificationTokenArgs = {
  token: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignupWithFirebasePhoneArgs = {
  firebaseToken: Scalars['String'];
  username: Scalars['String'];
};


export type MutationSignupWithPhoneArgs = {
  password: Scalars['String'];
  sessionId: Scalars['ID'];
  username: Scalars['String'];
};


export type MutationSpotUserArgs = {
  userId: Scalars['ID'];
};


export type MutationSubscribeLiveFeedGiveawayArgs = {
  itemId: Scalars['ID'];
};


export type MutationUnfollowEventArgs = {
  eventId: Scalars['ID'];
};


export type MutationUnfollowOrganizerArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateRealNameArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationUpdateUserProfileArgs = {
  birthday?: Maybe<Scalars['Date']>;
  favDrink?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  instagramName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  profileImage?: Maybe<AssetInput>;
  schoolID?: Maybe<Scalars['ID']>;
  username?: Maybe<Scalars['String']>;
};


export type MutationVerfyUserArgs = {
  token: Scalars['String'];
};


export type MutationVerifyPhoneArgs = {
  code: Scalars['String'];
  sessionId: Scalars['String'];
};


export type MutationVoteLiveFeedPollArgs = {
  itemId: Scalars['ID'];
  optionId: Scalars['ID'];
};

export type NearToInput = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  maxDistance?: Maybe<Scalars['Float']>;
  minDistance?: Maybe<Scalars['Float']>;
};

export type NearUserResponse = {
  __typename?: 'NearUserResponse';
  blocked?: Maybe<Scalars['Boolean']>;
  offline?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
};

export type NearbyStartupResult = {
  __typename?: 'NearbyStartupResult';
  pingID?: Maybe<Scalars['ID']>;
  spotCode?: Maybe<Scalars['ID']>;
  success: Scalars['Boolean'];
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ID'];
  code?: Maybe<NotificationCode>;
  createdAt: Scalars['Date'];
  data?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  seen?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export enum NotificationCode {
  EventsReminder = 'EVENTS_REMINDER',
  FriendshipAccepted = 'FRIENDSHIP_ACCEPTED',
  FriendshipRejected = 'FRIENDSHIP_REJECTED',
  FriendshipRequest = 'FRIENDSHIP_REQUEST',
  FriendJoinedEvent = 'FRIEND_JOINED_EVENT',
  JoinedEvent = 'JOINED_EVENT',
  LiveFeedGiveawayStarting = 'LIVE_FEED_GIVEAWAY_STARTING',
  LiveFeedNotification = 'LIVE_FEED_NOTIFICATION',
  NewMatch = 'NEW_MATCH',
  NewPrInvitationRequest = 'NEW_PR_INVITATION_REQUEST',
  NewTicket = 'NEW_TICKET',
  ReviewsReminder = 'REVIEWS_REMINDER'
}

export type OpeningHours = {
  __typename?: 'OpeningHours';
  friday?: Maybe<DayOpeningHours>;
  monday?: Maybe<DayOpeningHours>;
  saturday?: Maybe<DayOpeningHours>;
  sunday?: Maybe<DayOpeningHours>;
  thursday?: Maybe<DayOpeningHours>;
  tuesday?: Maybe<DayOpeningHours>;
  wednesday?: Maybe<DayOpeningHours>;
};

export type OpeningHoursInput = {
  friday?: Maybe<DayOpeningHoursInput>;
  monday?: Maybe<DayOpeningHoursInput>;
  saturday?: Maybe<DayOpeningHoursInput>;
  sunday?: Maybe<DayOpeningHoursInput>;
  thursday?: Maybe<DayOpeningHoursInput>;
  tuesday?: Maybe<DayOpeningHoursInput>;
  wednesday?: Maybe<DayOpeningHoursInput>;
};

export type Organizer = {
  __typename?: 'Organizer';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image: AssetRef;
  instagramUsername?: Maybe<Scalars['String']>;
  isFollowing?: Maybe<Scalars['Boolean']>;
  isPhysicalPlace?: Maybe<Scalars['Boolean']>;
  location?: Maybe<Location>;
  myRole?: Maybe<OrganizerUserRole>;
  name: Scalars['String'];
  openingHours?: Maybe<OpeningHours>;
  phoneNumber?: Maybe<Scalars['String']>;
  rating: Scalars['Float'];
  reviewsCount: Scalars['Int'];
  reviewsPreview?: Maybe<Array<Review>>;
  suggested?: Maybe<Scalars['Boolean']>;
  totalRatingCount: Scalars['Int'];
  type?: Maybe<OrganizerType>;
  website?: Maybe<Scalars['String']>;
};

export type OrganizerManager = {
  __typename?: 'OrganizerManager';
  role: OrganizerUserRole;
  user?: Maybe<User>;
  userId: Scalars['ID'];
};

export enum OrganizerType {
  CulturalOrganization = 'CULTURAL_ORGANIZATION',
  Disco = 'DISCO',
  DiscoEvent = 'DISCO_EVENT',
  Museum = 'MUSEUM',
  PrivateOrganizer = 'PRIVATE_ORGANIZER',
  Pub = 'PUB',
  School = 'SCHOOL',
  SportClub = 'SPORT_CLUB'
}

export enum OrganizerUserRole {
  Admin = 'ADMIN',
  EventCreator = 'EVENT_CREATOR',
  Manager = 'MANAGER'
}

export type Pr = {
  __typename?: 'PR';
  name: Scalars['String'];
  packagesAvailability?: Maybe<Array<PrPackageAvailability>>;
  phoneNumber?: Maybe<Scalars['String']>;
  removed?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
};

export type PrPackageAvailability = {
  __typename?: 'PRPackageAvailability';
  available: Scalars['Int'];
  issued: Scalars['Int'];
  packageDoc?: Maybe<EventPackage>;
  packageId: Scalars['ID'];
};

export type PrPackageAvailabilityInput = {
  available: Scalars['Int'];
  packageId: Scalars['ID'];
};

export type PaginationOptions = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};

export type PhoneSession = {
  __typename?: 'PhoneSession';
  createdAt?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  isVerified?: Maybe<Scalars['Boolean']>;
  phoneNumber: Scalars['String'];
  sessionInfo: Scalars['String'];
};

export type Point = {
  __typename?: 'Point';
  coordinates: Array<Scalars['Float']>;
};

export type PointLocation = {
  coordinates: Array<Scalars['Float']>;
  locationName: Scalars['String'];
};

export type Prize = {
  __typename?: 'Prize';
  code: Scalars['String'];
  isActive?: Maybe<Scalars['Boolean']>;
  price: Scalars['Int'];
  title: Scalars['String'];
};

export type ProcessResult = {
  __typename?: 'ProcessResult';
  errorCode?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  adminGetEventPackages?: Maybe<Array<EventPackage>>;
  adminGetEventPrTickets: Array<Ticket>;
  adminGetEventTickets: Array<Ticket>;
  adminGetTicketingStats?: Maybe<TicketingStats>;
  adminGetTicketsTrendStats?: Maybe<Array<Maybe<TicketTrendValue>>>;
  adminGetTicketsUsersStats?: Maybe<TicketsUsersStats>;
  getAdminAreaInfo?: Maybe<AdminAreaInfo>;
  getAssistence?: Maybe<Array<Assistence>>;
  getEventById?: Maybe<Event>;
  getEventByLinkCode?: Maybe<Event>;
  getEventLinks: Array<Link>;
  getEventLiveFeed: Array<LiveFeedItem>;
  getEventPRs?: Maybe<Array<Maybe<Pr>>>;
  getEventPackageTicketCount?: Maybe<Scalars['Int']>;
  getEventsAvailableToImport: Array<Event>;
  getEventsByOrganizer: Array<Event>;
  getEventsRoles?: Maybe<Array<Maybe<EventRoleItem>>>;
  getEventsToReview: Array<Event>;
  getFollowedEvents: Array<Event>;
  getFriends?: Maybe<GetFriendsResponse>;
  getFriendsInEvent: Array<User>;
  getFriendshipRequests: Array<User>;
  getFriendshipRequestsSent: Array<Scalars['ID']>;
  getInteractions: Array<Maybe<Interaction>>;
  getLinkInfo?: Maybe<Link>;
  getLiveFeedItem?: Maybe<LiveFeedItem>;
  getMatches: Array<Match>;
  getMyActivities?: Maybe<Array<Maybe<Activity>>>;
  getMyEvents: Array<Event>;
  getMyLikes: Array<Scalars['ID']>;
  getMyLinks: Array<Link>;
  getMyOrganizers: Array<Organizer>;
  getMyPrInfo?: Maybe<Pr>;
  getMyPrInvitationRequests: Array<Maybe<Invitation>>;
  getMyTicketActivities?: Maybe<Array<Maybe<Activity>>>;
  getMyTickets?: Maybe<Array<Ticket>>;
  getMyTicketsByEvent?: Maybe<Array<Ticket>>;
  getNearbyUserById: NearUserResponse;
  getOfficialEvents: Array<Event>;
  getOrganizerById?: Maybe<Organizer>;
  getOrganizerManagers?: Maybe<Array<OrganizerManager>>;
  getOrganizersLanding: Array<Organizer>;
  getPastEventsByOrganizer: Array<Event>;
  getPinnedLiveFeedItem?: Maybe<LiveFeedItem>;
  getPrizes?: Maybe<Array<Prize>>;
  getReportedUsers: Array<User>;
  getReviewsByOrganizer: Array<Review>;
  getSchoolById?: Maybe<School>;
  getSpottedUsers?: Maybe<GetSpottedUsersResponse>;
  getSuggestedOrganizers: Array<Organizer>;
  getUpcomingEvents: Array<Event>;
  getUpcomingEventsByOrganizer: Array<Event>;
  getUserAttendedEvents: Array<Event>;
  getUserById: User;
  getUsersAdmin: Array<User>;
  getUsersFollowingEvent: Array<User>;
  getUsersInEventTinder: Array<User>;
  hasUnseenActivities?: Maybe<Scalars['Boolean']>;
  isEmailAlreadyUsed: Scalars['Boolean'];
  isPhoneNumberAlreadyUsed: Scalars['Boolean'];
  isUsernameAlreadyUsed: Scalars['Boolean'];
  searchEvents: Array<Event>;
  searchOrganizers: Array<Organizer>;
  searchSchools: Array<School>;
  searchSpottedUsers: Array<SpottedItem>;
  searchUserByPhoneNumber?: Maybe<User>;
  searchUserByText: Array<User>;
  searchUserByTextOrPhoneNumber: Array<User>;
  whoami: User;
};


export type QueryAdminGetEventPackagesArgs = {
  eventId: Scalars['ID'];
};


export type QueryAdminGetEventPrTicketsArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
  prId: Scalars['ID'];
};


export type QueryAdminGetEventTicketsArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryAdminGetTicketingStatsArgs = {
  eventId: Scalars['ID'];
};


export type QueryAdminGetTicketsTrendStatsArgs = {
  eventId: Scalars['ID'];
};


export type QueryAdminGetTicketsUsersStatsArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetAssistenceArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetEventByLinkCodeArgs = {
  code: Scalars['String'];
};


export type QueryGetEventLinksArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetEventLiveFeedArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetEventPRsArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetEventPackageTicketCountArgs = {
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
};


export type QueryGetEventsAvailableToImportArgs = {
  eventId?: Maybe<Scalars['ID']>;
  organizerId?: Maybe<Scalars['ID']>;
  withPrsOnly?: Maybe<Scalars['Boolean']>;
};


export type QueryGetEventsByOrganizerArgs = {
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetEventsRolesArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetEventsToReviewArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetFollowedEventsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetFriendsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetFriendsInEventArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetInteractionsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetLinkInfoArgs = {
  code: Scalars['ID'];
};


export type QueryGetLiveFeedItemArgs = {
  itemId: Scalars['ID'];
};


export type QueryGetMyActivitiesArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetMyEventsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetMyPrInfoArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetMyPrInvitationRequestsArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetMyTicketActivitiesArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetMyTicketsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetMyTicketsByEventArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetNearbyUserByIdArgs = {
  userId: Scalars['ID'];
};


export type QueryGetOrganizerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrganizerManagersArgs = {
  organizerId: Scalars['ID'];
};


export type QueryGetPastEventsByOrganizerArgs = {
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetPinnedLiveFeedItemArgs = {
  eventId: Scalars['ID'];
};


export type QueryGetReportedUsersArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetReviewsByOrganizerArgs = {
  organizerId: Scalars['ID'];
  pagination?: Maybe<PaginationOptions>;
};


export type QueryGetSchoolByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetSpottedUsersArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetUpcomingEventsArgs = {
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetUpcomingEventsByOrganizerArgs = {
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetUserAttendedEventsArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetUsersAdminArgs = {
  onlyLimit?: Maybe<Scalars['Boolean']>;
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetUsersFollowingEventArgs = {
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryGetUsersInEventTinderArgs = {
  eventId: Scalars['ID'];
  gender?: Maybe<Gender>;
  pagination?: Maybe<CursorPaginationOptions>;
};


export type QueryIsEmailAlreadyUsedArgs = {
  email: Scalars['String'];
};


export type QueryIsPhoneNumberAlreadyUsedArgs = {
  phoneNumber: Scalars['String'];
};


export type QueryIsUsernameAlreadyUsedArgs = {
  username: Scalars['String'];
};


export type QuerySearchEventsArgs = {
  text: Scalars['String'];
};


export type QuerySearchOrganizersArgs = {
  text?: Maybe<Scalars['String']>;
};


export type QuerySearchSchoolsArgs = {
  name: Scalars['String'];
};


export type QuerySearchSpottedUsersArgs = {
  searchText: Scalars['String'];
};


export type QuerySearchUserByPhoneNumberArgs = {
  phoneNumber: Scalars['String'];
};


export type QuerySearchUserByTextArgs = {
  text: Scalars['String'];
};


export type QuerySearchUserByTextOrPhoneNumberArgs = {
  text?: Maybe<Scalars['String']>;
};

export type Region = {
  __typename?: 'Region';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identifier: Scalars['String'];
  name: Scalars['String'];
  point: Point;
  radius: Scalars['Float'];
};

export enum RequestContactMode {
  Instagram = 'INSTAGRAM',
  Phone = 'PHONE',
  Pr = 'PR'
}

export type Review = {
  __typename?: 'Review';
  _hidden?: Maybe<Scalars['Boolean']>;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['Date'];
  event?: Maybe<Scalars['ID']>;
  eventPreview?: Maybe<EventPreview>;
  id: Scalars['ID'];
  isVerified?: Maybe<Scalars['Boolean']>;
  organizer: Scalars['ID'];
  rating: Scalars['Float'];
  user: User;
};

export type ScanTicketResult = {
  __typename?: 'ScanTicketResult';
  errorCode?: Maybe<ScanTicketResultErrorCode>;
  package?: Maybe<EventPackage>;
  success: Scalars['Boolean'];
  ticket?: Maybe<Ticket>;
};

export enum ScanTicketResultErrorCode {
  EventEnded = 'EVENT_ENDED',
  NoPermissionToScan = 'NO_PERMISSION_TO_SCAN',
  TicketAlreadyUsed = 'TICKET_ALREADY_USED',
  TicketForDifferentEvent = 'TICKET_FOR_DIFFERENT_EVENT',
  TicketNotValid = 'TICKET_NOT_VALID',
  TicketRevoked = 'TICKET_REVOKED',
  UnableToScan = 'UNABLE_TO_SCAN'
}

export type School = {
  __typename?: 'School';
  add?: Maybe<Scalars['String']>;
  admins?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID'];
  lastSpotModeDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  prov?: Maybe<Scalars['String']>;
  type_description?: Maybe<Scalars['String']>;
};

export type SchoolInfo = {
  __typename?: 'SchoolInfo';
  id?: Maybe<Scalars['ID']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type SharedUsersItem = {
  __typename?: 'SharedUsersItem';
  new?: Maybe<Scalars['Boolean']>;
  userId: Scalars['ID'];
};

export type SpotInfo = {
  __typename?: 'SpotInfo';
  areFriends?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  event?: Maybe<Event>;
  eventId?: Maybe<Scalars['ID']>;
};

export type SpotResult = {
  __typename?: 'SpotResult';
  new?: Maybe<Scalars['Boolean']>;
  sharedUsers?: Maybe<Array<Maybe<SharedUsersItem>>>;
  success: Scalars['Boolean'];
};

export type SpottedItem = {
  __typename?: 'SpottedItem';
  areFriends?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  user: User;
};

export type Ticket = {
  __typename?: 'Ticket';
  adminNote?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  eventId: Scalars['ID'];
  eventInfo?: Maybe<TicketEventInfo>;
  id: Scalars['ID'];
  notPaid?: Maybe<Scalars['Boolean']>;
  packageId?: Maybe<Scalars['ID']>;
  paymentType?: Maybe<EventPackagePaymentType>;
  pr?: Maybe<Pr>;
  revoked?: Maybe<Scalars['Boolean']>;
  used?: Maybe<Scalars['Boolean']>;
  user?: Maybe<User>;
  userId: Scalars['ID'];
  userIdentity?: Maybe<TicketUserIdentity>;
};

export type TicketEventInfo = {
  __typename?: 'TicketEventInfo';
  event?: Maybe<Event>;
  package?: Maybe<EventPackage>;
};

export type TicketTrendValue = {
  __typename?: 'TicketTrendValue';
  count?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['Date']>;
};

export type TicketUserIdentity = {
  __typename?: 'TicketUserIdentity';
  birthday?: Maybe<Scalars['Date']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  lastName?: Maybe<Scalars['String']>;
};

export type TicketingProcessResult = {
  __typename?: 'TicketingProcessResult';
  errorCode?: Maybe<EventTicketingErrorCode>;
  success: Scalars['Boolean'];
};

export type TicketingStats = {
  __typename?: 'TicketingStats';
  packages: Array<TicketingStatsPackage>;
  paymentTypes: Array<TicketingStatsPaymentType>;
  totalTickets: Scalars['Int'];
};

export type TicketingStatsPackage = {
  __typename?: 'TicketingStatsPackage';
  count: Scalars['Int'];
  package: EventPackage;
};

export type TicketingStatsPaymentType = {
  __typename?: 'TicketingStatsPaymentType';
  count: Scalars['Int'];
  type: EventPackagePaymentType;
};

export type TicketsUsersStats = {
  __typename?: 'TicketsUsersStats';
  ageRangeStats: Array<AgeRangeStats>;
  femaleCount: Scalars['Float'];
  maleCount?: Maybe<Scalars['Int']>;
  nonBinaryCount: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['ID'];
  newEmail?: Maybe<Scalars['String']>;
  scope: TokenScope;
  userId: Scalars['String'];
};

export type TokenGenerationResult = {
  __typename?: 'TokenGenerationResult';
  email: Scalars['String'];
  tokenDigits: Scalars['Int'];
};

export enum TokenScope {
  AccountDeletion = 'ACCOUNT_DELETION',
  EditEmail = 'EDIT_EMAIL',
  ForgotPassword = 'FORGOT_PASSWORD',
  UserConfirmation = 'USER_CONFIRMATION'
}

export type User = {
  __typename?: 'User';
  ban?: Maybe<BanObj>;
  birthday?: Maybe<Scalars['Date']>;
  coins?: Maybe<CoinsInfo>;
  created_at: Scalars['Date'];
  currentEvent?: Maybe<Event>;
  currentEventID?: Maybe<Scalars['ID']>;
  eventsAttendedCount?: Maybe<Scalars['Int']>;
  favDrink?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  hasAdminArea?: Maybe<Scalars['Boolean']>;
  hasRequestedFriendship?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  isFriend?: Maybe<Scalars['Boolean']>;
  languageCode?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  limitEvent?: Maybe<LimitEvent>;
  links?: Maybe<UserLinks>;
  notifications?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  phoneNumber?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<AssetRef>;
  pushToken?: Maybe<Scalars['String']>;
  role?: Maybe<UserRole>;
  school?: Maybe<SchoolInfo>;
  spotInfo?: Maybe<SpotInfo>;
  stats?: Maybe<UserStatistics>;
  textStatus?: Maybe<UserTextStatus>;
  username: Scalars['String'];
};

export type UserLinks = {
  __typename?: 'UserLinks';
  instagramName?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Organizer = 'ORGANIZER',
  Pr = 'PR'
}

export type UserStatistics = {
  __typename?: 'UserStatistics';
  acceptedInteractionsCount?: Maybe<Scalars['Int']>;
  friendsCount?: Maybe<Scalars['Int']>;
  recivedInteractionsCount?: Maybe<Scalars['Int']>;
  sentInteractionsCount?: Maybe<Scalars['Int']>;
  spottedCount?: Maybe<Scalars['Int']>;
};

export type UserTextStatus = {
  __typename?: 'UserTextStatus';
  createdAt?: Maybe<Scalars['Date']>;
  text?: Maybe<Scalars['String']>;
};

export type VerfyUserResponse = {
  __typename?: 'VerfyUserResponse';
  success: Scalars['Boolean'];
  tokens?: Maybe<AuthPayload>;
};

export type ActivityFieldsFragment = (
  { __typename?: 'Activity' }
  & Pick<Activity, 'id' | 'ownerId' | 'createdAt' | 'type' | 'data' | 'text' | 'seen' | '_hidden'>
);

export type GetMyActivitiesQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetMyActivitiesQuery = (
  { __typename?: 'Query' }
  & { getMyActivities?: Maybe<Array<Maybe<(
    { __typename?: 'Activity' }
    & ActivityFieldsFragment
  )>>> }
);

export type GetMyTicketActivitiesQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetMyTicketActivitiesQuery = (
  { __typename?: 'Query' }
  & { getMyTicketActivities?: Maybe<Array<Maybe<(
    { __typename?: 'Activity' }
    & ActivityFieldsFragment
  )>>> }
);

export type SeeActivitiesMutationVariables = Exact<{ [key: string]: never; }>;


export type SeeActivitiesMutation = (
  { __typename?: 'Mutation' }
  & { seeActivities?: Maybe<(
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  )> }
);

export type HasUnseenActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type HasUnseenActivitiesQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hasUnseenActivities'>
);

export type GetAssistenceQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAssistenceQuery = (
  { __typename?: 'Query' }
  & { getAssistence?: Maybe<Array<(
    { __typename?: 'Assistence' }
    & Pick<Assistence, 'userId' | 'text' | 'id'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
    )> }
  )>> }
);

export type CreateAssistenceMutationVariables = Exact<{
  text: Scalars['String'];
  type: AssistenceType;
}>;


export type CreateAssistenceMutation = (
  { __typename?: 'Mutation' }
  & { createAssistence: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type IsPhoneNumberAlreadyUsedQueryVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type IsPhoneNumberAlreadyUsedQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isPhoneNumberAlreadyUsed'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type SavePhoneSessionInfoMutationVariables = Exact<{
  sessionInfo: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type SavePhoneSessionInfoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'savePhoneSessionInfo'>
);

export type DeleteLoggedAccountMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteLoggedAccountMutation = (
  { __typename?: 'Mutation' }
  & { deleteLoggedAccount: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type FirebasePhoneAuthMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type FirebasePhoneAuthMutation = (
  { __typename?: 'Mutation' }
  & { firebasePhoneAuth: (
    { __typename?: 'FirebaseAuthResponse' }
    & Pick<FirebaseAuthResponse, 'success' | 'newUser'>
    & { tokens?: Maybe<(
      { __typename?: 'AuthPayload' }
      & Pick<AuthPayload, 'accessToken' | 'refreshToken' | 'expiresIn'>
    )> }
  ) }
);

export type AdminAuthMutationVariables = Exact<{
  phoneNumber: Scalars['String'];
  password: Scalars['String'];
}>;


export type AdminAuthMutation = (
  { __typename?: 'Mutation' }
  & { adminAuth: (
    { __typename?: 'VerfyUserResponse' }
    & Pick<VerfyUserResponse, 'success'>
    & { tokens?: Maybe<(
      { __typename?: 'AuthPayload' }
      & Pick<AuthPayload, 'accessToken' | 'refreshToken' | 'expiresIn'>
    )> }
  ) }
);

export type SignupWithFirebasePhoneMutationVariables = Exact<{
  token: Scalars['String'];
  username: Scalars['String'];
}>;


export type SignupWithFirebasePhoneMutation = (
  { __typename?: 'Mutation' }
  & { signupWithFirebasePhone: (
    { __typename?: 'VerfyUserResponse' }
    & Pick<VerfyUserResponse, 'success'>
    & { tokens?: Maybe<(
      { __typename?: 'AuthPayload' }
      & Pick<AuthPayload, 'accessToken' | 'refreshToken' | 'expiresIn'>
    )> }
  ) }
);

export type EventFieldsFragment = (
  { __typename?: 'Event' }
  & Pick<Event, 'id' | 'title' | 'date' | 'endDate' | 'isEnded' | 'description' | 'minAge' | 'priceText' | 'isFollowing' | 'isVerified' | 'isOfficial' | 'haveTicket' | 'isParticipating' | 'isRequested' | 'is_ticketing_enabled' | 'has_ticketing_system' | 'adminOnly' | 'invitation_requests_enabled' | 'has_ticket_system'>
  & { image?: Maybe<(
    { __typename?: 'AssetRef' }
    & Pick<AssetRef, 'url' | 'blurhash'>
  )>, location?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'locationText'>
    & { point: (
      { __typename?: 'Point' }
      & Pick<Point, 'coordinates'>
    ) }
  )>, contactInfo?: Maybe<(
    { __typename?: 'EventContactInfo' }
    & Pick<EventContactInfo, 'name' | 'phoneNumber' | 'wsNumber' | 'instagram'>
  )> }
);

export type PrFieldsFragment = (
  { __typename?: 'PR' }
  & Pick<Pr, 'name' | 'userId' | 'phoneNumber' | 'removed'>
  & { packagesAvailability?: Maybe<Array<(
    { __typename?: 'PRPackageAvailability' }
    & Pick<PrPackageAvailability, 'packageId' | 'issued' | 'available'>
    & { packageDoc?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )> }
  )>> }
);

export type TicketFieldsFragment = (
  { __typename?: 'Ticket' }
  & Pick<Ticket, 'id' | 'code' | 'used' | 'createdAt' | 'revoked'>
  & { eventInfo?: Maybe<(
    { __typename?: 'TicketEventInfo' }
    & { event?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'title' | 'date' | 'eventType'>
      & { location?: Maybe<(
        { __typename?: 'Location' }
        & Pick<Location, 'locationText'>
        & { point: (
          { __typename?: 'Point' }
          & Pick<Point, 'coordinates'>
        ) }
      )> }
    )>, package?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )> }
  )> }
);

export type EventPackageFieldsFragment = (
  { __typename?: 'EventPackage' }
  & Pick<EventPackage, 'id' | 'name' | 'userPrice' | 'currency' | 'paymentTypes' | 'type' | 'hidden' | 'minAge' | 'sex' | 'code' | 'enabled' | 'skipLine' | 'drinks' | 'soldout' | 'maxTickets' | 'maxTicketsPerUser'>
);

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetEventByIdQuery = (
  { __typename?: 'Query' }
  & { getEventById?: Maybe<(
    { __typename?: 'Event' }
    & Pick<Event, 'releaseDate' | 'released' | 'myRoles' | 'eventType'>
    & { organizer?: Maybe<(
      { __typename?: 'Organizer' }
      & OrganizerFieldsFragment
    )>, creator?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )>, myReview?: Maybe<(
      { __typename?: 'Review' }
      & ReviewFieldsFragment
    )>, packages?: Maybe<Array<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )>> }
    & EventFieldsFragment
  )> }
);

export type GetUserAttendedEventsQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetUserAttendedEventsQuery = (
  { __typename?: 'Query' }
  & { getUserAttendedEvents: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type SearchEventsQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchEventsQuery = (
  { __typename?: 'Query' }
  & { searchEvents: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type AdminCreateEventMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  date: Scalars['Date'];
  endDate?: Maybe<Scalars['Date']>;
  image: AssetInput;
  location: LocationInput;
  minAge?: Maybe<Scalars['Int']>;
  priceText?: Maybe<Scalars['String']>;
  organizer?: Maybe<Scalars['ID']>;
  contactInfo?: Maybe<EventContactInfoInput>;
  controlledRelease?: Maybe<Scalars['Boolean']>;
  releaseDate?: Maybe<Scalars['Date']>;
  ticketingSystem?: Maybe<Scalars['Boolean']>;
}>;


export type AdminCreateEventMutation = (
  { __typename?: 'Mutation' }
  & { adminCreateEvent?: Maybe<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type AdminEditEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<AssetInput>;
}>;


export type AdminEditEventMutation = (
  { __typename?: 'Mutation' }
  & { adminEditEvent?: Maybe<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type GetUpcomingEventsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetUpcomingEventsQuery = (
  { __typename?: 'Query' }
  & { getUpcomingEvents: Array<(
    { __typename?: 'Event' }
    & { friendsFollowingPreview?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )>>> }
    & EventFieldsFragment
  )> }
);

export type UnfollowEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type UnfollowEventMutation = (
  { __typename?: 'Mutation' }
  & { unfollowEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type FollowEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type FollowEventMutation = (
  { __typename?: 'Mutation' }
  & { followEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type GetFriendsInEventQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetFriendsInEventQuery = (
  { __typename?: 'Query' }
  & { getFriendsInEvent: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'phoneNumber'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  )> }
);

export type GetUsersFollowingEventQueryVariables = Exact<{
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetUsersFollowingEventQuery = (
  { __typename?: 'Query' }
  & { getUsersFollowingEvent: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'phoneNumber'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )>, spotInfo?: Maybe<(
      { __typename?: 'SpotInfo' }
      & Pick<SpotInfo, 'areFriends' | 'createdAt'>
    )> }
  )> }
);

export type GetEventsToReviewQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetEventsToReviewQuery = (
  { __typename?: 'Query' }
  & { getEventsToReview: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type GetFollowedEventsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetFollowedEventsQuery = (
  { __typename?: 'Query' }
  & { getFollowedEvents: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type GetOfficialEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOfficialEventsQuery = (
  { __typename?: 'Query' }
  & { getOfficialEvents: Array<(
    { __typename?: 'Event' }
    & { PRs?: Maybe<Array<Maybe<(
      { __typename?: 'PR' }
      & Pick<Pr, 'name' | 'userId'>
    )>>> }
    & EventFieldsFragment
  )> }
);

export type AdminScanTicketMutationVariables = Exact<{
  ticketId: Scalars['ID'];
  ticketCode: Scalars['ID'];
  eventId: Scalars['ID'];
}>;


export type AdminScanTicketMutation = (
  { __typename?: 'Mutation' }
  & { adminScanTicket: (
    { __typename?: 'ScanTicketResult' }
    & Pick<ScanTicketResult, 'success' | 'errorCode'>
    & { package?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )>, ticket?: Maybe<(
      { __typename?: 'Ticket' }
      & Pick<Ticket, 'id' | 'adminNote' | 'createdAt' | 'notPaid' | 'paymentType'>
      & { userIdentity?: Maybe<(
        { __typename?: 'TicketUserIdentity' }
        & Pick<TicketUserIdentity, 'firstName' | 'lastName' | 'birthday' | 'gender'>
      )> }
    )> }
  ) }
);

export type SendEventInvitationRequestMutationVariables = Exact<{
  eventId: Scalars['ID'];
  mode: RequestContactMode;
}>;


export type SendEventInvitationRequestMutation = (
  { __typename?: 'Mutation' }
  & { sendEventInvitationRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type RequestPackageToPrMutationVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
  prId: Scalars['ID'];
}>;


export type RequestPackageToPrMutation = (
  { __typename?: 'Mutation' }
  & { requestPackageToPr: (
    { __typename?: 'InvitationRequestResponse' }
    & Pick<InvitationRequestResponse, 'success' | 'alreadyRequested' | 'errorCode'>
    & { invitation?: Maybe<(
      { __typename?: 'Invitation' }
      & Pick<Invitation, 'id'>
      & { pr?: Maybe<(
        { __typename?: 'PR' }
        & Pick<Pr, 'userId' | 'name'>
      )> }
    )> }
  ) }
);

export type RemoveEventRequestMutationVariables = Exact<{
  invitationId: Scalars['ID'];
}>;


export type RemoveEventRequestMutation = (
  { __typename?: 'Mutation' }
  & { removeEventRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type AdminAcceptInvitationRequestMutationVariables = Exact<{
  userId: Scalars['ID'];
  eventId: Scalars['ID'];
}>;


export type AdminAcceptInvitationRequestMutation = (
  { __typename?: 'Mutation' }
  & { adminAcceptInvitationRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminRejectInvitationRequestMutationVariables = Exact<{
  userId: Scalars['ID'];
  eventId: Scalars['ID'];
}>;


export type AdminRejectInvitationRequestMutation = (
  { __typename?: 'Mutation' }
  & { adminRejectInvitationRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminGetTicketingStatsQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminGetTicketingStatsQuery = (
  { __typename?: 'Query' }
  & { adminGetTicketingStats?: Maybe<(
    { __typename?: 'TicketingStats' }
    & Pick<TicketingStats, 'totalTickets'>
    & { packages: Array<(
      { __typename?: 'TicketingStatsPackage' }
      & Pick<TicketingStatsPackage, 'count'>
      & { package: (
        { __typename?: 'EventPackage' }
        & Pick<EventPackage, 'id' | 'name'>
      ) }
    )>, paymentTypes: Array<(
      { __typename?: 'TicketingStatsPaymentType' }
      & Pick<TicketingStatsPaymentType, 'type' | 'count'>
    )> }
  )> }
);

export type AdminGetEventTicketsQueryVariables = Exact<{
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type AdminGetEventTicketsQuery = (
  { __typename?: 'Query' }
  & { adminGetEventTickets: Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'used' | 'createdAt' | 'userId' | 'paymentType' | 'packageId' | 'revoked'>
    & { userIdentity?: Maybe<(
      { __typename?: 'TicketUserIdentity' }
      & Pick<TicketUserIdentity, 'gender' | 'birthday' | 'firstName' | 'lastName'>
    )>, pr?: Maybe<(
      { __typename?: 'PR' }
      & Pick<Pr, 'name' | 'userId'>
    )>, eventInfo?: Maybe<(
      { __typename?: 'TicketEventInfo' }
      & { package?: Maybe<(
        { __typename?: 'EventPackage' }
        & Pick<EventPackage, 'name' | 'id' | 'code'>
      )> }
    )> }
  )> }
);

export type AdminGetEventPrTicketsQueryVariables = Exact<{
  eventId: Scalars['ID'];
  prId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type AdminGetEventPrTicketsQuery = (
  { __typename?: 'Query' }
  & { adminGetEventPrTickets: Array<(
    { __typename?: 'Ticket' }
    & Pick<Ticket, 'id' | 'used' | 'createdAt' | 'userId' | 'packageId' | 'revoked'>
    & { userIdentity?: Maybe<(
      { __typename?: 'TicketUserIdentity' }
      & Pick<TicketUserIdentity, 'gender' | 'birthday' | 'firstName' | 'lastName'>
    )>, eventInfo?: Maybe<(
      { __typename?: 'TicketEventInfo' }
      & { package?: Maybe<(
        { __typename?: 'EventPackage' }
        & Pick<EventPackage, 'name' | 'id' | 'code'>
      )> }
    )> }
  )> }
);

export type GetEventPRsQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetEventPRsQuery = (
  { __typename?: 'Query' }
  & { getEventPRs?: Maybe<Array<Maybe<(
    { __typename?: 'PR' }
    & PrFieldsFragment
  )>>> }
);

export type AdminAddPrToEventMutationVariables = Exact<{
  prId: Scalars['ID'];
  eventId: Scalars['ID'];
}>;


export type AdminAddPrToEventMutation = (
  { __typename?: 'Mutation' }
  & { adminAddPrToEvent: (
    { __typename?: 'AddPrToEventResult' }
    & Pick<AddPrToEventResult, 'success' | 'errorCode' | 'alreadyPr'>
    & { pr?: Maybe<(
      { __typename?: 'PR' }
      & PrFieldsFragment
    )> }
  ) }
);

export type AdminRemovePrFromEventMutationVariables = Exact<{
  prId: Scalars['ID'];
  eventId: Scalars['ID'];
}>;


export type AdminRemovePrFromEventMutation = (
  { __typename?: 'Mutation' }
  & { adminRemovePrFromEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type MyPrInfoQueryVariables = Exact<{
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type MyPrInfoQuery = (
  { __typename?: 'Query' }
  & { getMyPrInfo?: Maybe<(
    { __typename?: 'PR' }
    & PrFieldsFragment
  )>, getMyPrInvitationRequests: Array<Maybe<(
    { __typename?: 'Invitation' }
    & Pick<Invitation, 'id' | 'userId' | 'packageId'>
    & { userDoc?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'firstName' | 'lastName' | 'birthday' | 'gender'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )>, packageDoc?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )> }
  )>> }
);

export type AdminEditPrPackagesAvailabilityMutationVariables = Exact<{
  prId: Scalars['ID'];
  eventId: Scalars['ID'];
  packages: Array<PrPackageAvailabilityInput> | PrPackageAvailabilityInput;
}>;


export type AdminEditPrPackagesAvailabilityMutation = (
  { __typename?: 'Mutation' }
  & { adminEditPrPackagesAvailability?: Maybe<(
    { __typename?: 'PR' }
    & PrFieldsFragment
  )> }
);

export type EditMyPrInfoMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  eventId: Scalars['ID'];
}>;


export type EditMyPrInfoMutation = (
  { __typename?: 'Mutation' }
  & { editMyPrInfo: (
    { __typename?: 'PR' }
    & PrFieldsFragment
  ) }
);

export type AdminRevokeUserTicketMutationVariables = Exact<{
  eventId: Scalars['ID'];
  ticketId: Scalars['ID'];
}>;


export type AdminRevokeUserTicketMutation = (
  { __typename?: 'Mutation' }
  & { adminRevokeUserTicket: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminDeleteEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminDeleteEventMutation = (
  { __typename?: 'Mutation' }
  & { adminDeleteEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminMarkEventAsEndedMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminMarkEventAsEndedMutation = (
  { __typename?: 'Mutation' }
  & { adminMarkEventAsEnded: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type ReleaseEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type ReleaseEventMutation = (
  { __typename?: 'Mutation' }
  & { releaseEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type GetMyEventsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetMyEventsQuery = (
  { __typename?: 'Query' }
  & { getMyEvents: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'released' | 'releaseDate' | 'myRoles'>
    & EventFieldsFragment
  )> }
);

export type GetEventsRolesQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetEventsRolesQuery = (
  { __typename?: 'Query' }
  & { getEventsRoles?: Maybe<Array<Maybe<(
    { __typename?: 'EventRoleItem' }
    & Pick<EventRoleItem, 'roles'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )> }
  )>>> }
);

export type CancelEventSchedulingMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type CancelEventSchedulingMutation = (
  { __typename?: 'Mutation' }
  & { cancelEventScheduling: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type CreateEventPackageMutationVariables = Exact<{
  eventId: Scalars['ID'];
  name: Scalars['String'];
  userPrice: Scalars['Int'];
  currency: Scalars['String'];
  paymentTypes: Array<EventPackagePaymentType> | EventPackagePaymentType;
  type?: Maybe<EventPackageType>;
  hidden?: Maybe<Scalars['Boolean']>;
  minAge?: Maybe<Scalars['Int']>;
  sex?: Maybe<EventPackageSexType>;
  drinks?: Maybe<Scalars['Int']>;
  skipLine?: Maybe<Scalars['Boolean']>;
  maxTickets?: Maybe<Scalars['Int']>;
  maxTicketsPerUser?: Maybe<Scalars['Int']>;
}>;


export type CreateEventPackageMutation = (
  { __typename?: 'Mutation' }
  & { createEventPackage: (
    { __typename?: 'CreatePackageResult' }
    & Pick<CreatePackageResult, 'success' | 'errorCode'>
    & { package?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )> }
  ) }
);

export type EditEventPackageMutationVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
  name: Scalars['String'];
  paymentTypes: Array<EventPackagePaymentType> | EventPackagePaymentType;
  minAge?: Maybe<Scalars['Int']>;
  sex?: Maybe<EventPackageSexType>;
  drinks?: Maybe<Scalars['Int']>;
  skipLine?: Maybe<Scalars['Boolean']>;
  maxTicketsPerUser?: Maybe<Scalars['Int']>;
  maxTickets?: Maybe<Scalars['Int']>;
}>;


export type EditEventPackageMutation = (
  { __typename?: 'Mutation' }
  & { editEventPackage: (
    { __typename?: 'CreatePackageResult' }
    & Pick<CreatePackageResult, 'success' | 'errorCode'>
    & { package?: Maybe<(
      { __typename?: 'EventPackage' }
      & EventPackageFieldsFragment
    )> }
  ) }
);

export type DeleteEventPackageMutationVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
}>;


export type DeleteEventPackageMutation = (
  { __typename?: 'Mutation' }
  & { deleteEventPackage: (
    { __typename?: 'DeleteEventPackageResult' }
    & Pick<DeleteEventPackageResult, 'success' | 'alreadyIssued' | 'errorCode'>
  ) }
);

export type AdminGetEventPackagesQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminGetEventPackagesQuery = (
  { __typename?: 'Query' }
  & { adminGetEventPackages?: Maybe<Array<(
    { __typename?: 'EventPackage' }
    & EventPackageFieldsFragment
  )>> }
);

export type EditEventPackageStatusMutationVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
  hidden?: Maybe<Scalars['Boolean']>;
  soldout?: Maybe<Scalars['Boolean']>;
  enabled?: Maybe<Scalars['Boolean']>;
}>;


export type EditEventPackageStatusMutation = (
  { __typename?: 'Mutation' }
  & { editEventPackageStatus: (
    { __typename?: 'EditEventPackageStatusResult' }
    & Pick<EditEventPackageStatusResult, 'success' | 'errorCode' | 'cannotUnsetSoldout'>
  ) }
);

export type ReservePackageMutationVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
}>;


export type ReservePackageMutation = (
  { __typename?: 'Mutation' }
  & { reservePackage: (
    { __typename?: 'BuyPackageResult' }
    & Pick<BuyPackageResult, 'success' | 'errorCode'>
    & { ticket?: Maybe<(
      { __typename?: 'Ticket' }
      & TicketFieldsFragment
    )> }
  ) }
);

export type GetMyTicketsByEventQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GetMyTicketsByEventQuery = (
  { __typename?: 'Query' }
  & { getMyTicketsByEvent?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFieldsFragment
  )>> }
);

export type PrAccetInvitationRequestMutationVariables = Exact<{
  invitationId: Scalars['ID'];
}>;


export type PrAccetInvitationRequestMutation = (
  { __typename?: 'Mutation' }
  & { prAccetInvitationRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type PrRejectInvitationRequestMutationVariables = Exact<{
  invitationId: Scalars['ID'];
}>;


export type PrRejectInvitationRequestMutation = (
  { __typename?: 'Mutation' }
  & { prRejectInvitationRequest: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminCreateTicketingSystemMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminCreateTicketingSystemMutation = (
  { __typename?: 'Mutation' }
  & { adminCreateTicketingSystem: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type AdminEnableTicketingMutationVariables = Exact<{
  eventId: Scalars['ID'];
  enable: Scalars['Boolean'];
}>;


export type AdminEnableTicketingMutation = (
  { __typename?: 'Mutation' }
  & { adminEnableTicketing: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type GetEventPackageTicketCountQueryVariables = Exact<{
  eventId: Scalars['ID'];
  packageId: Scalars['ID'];
}>;


export type GetEventPackageTicketCountQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getEventPackageTicketCount'>
);

export type AdminGetAdvancedTicketingStatsQueryVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type AdminGetAdvancedTicketingStatsQuery = (
  { __typename?: 'Query' }
  & { adminGetTicketsUsersStats?: Maybe<(
    { __typename?: 'TicketsUsersStats' }
    & Pick<TicketsUsersStats, 'totalCount' | 'maleCount' | 'femaleCount' | 'nonBinaryCount'>
    & { ageRangeStats: Array<(
      { __typename?: 'AgeRangeStats' }
      & Pick<AgeRangeStats, 'to' | 'from' | 'value'>
    )> }
  )>, adminGetTicketsTrendStats?: Maybe<Array<Maybe<(
    { __typename?: 'TicketTrendValue' }
    & Pick<TicketTrendValue, 'date' | 'count'>
  )>>> }
);

export type AddUserRoleToEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
  role: EventCollaboratorRole;
}>;


export type AddUserRoleToEventMutation = (
  { __typename?: 'Mutation' }
  & { addUserRoleToEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type RemoveUserRoleFromEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
  role: EventCollaboratorRole;
}>;


export type RemoveUserRoleFromEventMutation = (
  { __typename?: 'Mutation' }
  & { removeUserRoleFromEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type RemoveCollaboratorFromEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  userId: Scalars['ID'];
}>;


export type RemoveCollaboratorFromEventMutation = (
  { __typename?: 'Mutation' }
  & { removeCollaboratorFromEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type GetEventsAvailableToImportQueryVariables = Exact<{
  eventId?: Maybe<Scalars['ID']>;
  organizerId?: Maybe<Scalars['ID']>;
  withPrsOnly?: Maybe<Scalars['Boolean']>;
}>;


export type GetEventsAvailableToImportQuery = (
  { __typename?: 'Query' }
  & { getEventsAvailableToImport: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'id' | 'title' | 'date'>
    & { image?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )>, PRs?: Maybe<Array<Maybe<(
      { __typename?: 'PR' }
      & Pick<Pr, 'name' | 'userId'>
    )>>> }
  )> }
);

export type ImportPrsFromEventMutationVariables = Exact<{
  fromEventId: Scalars['ID'];
  toEventId: Scalars['ID'];
  prsIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type ImportPrsFromEventMutation = (
  { __typename?: 'Mutation' }
  & { importPrsFromEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type RemoveMeFromEventMutationVariables = Exact<{
  eventId: Scalars['ID'];
  role?: Maybe<EventCollaboratorRole>;
}>;


export type RemoveMeFromEventMutation = (
  { __typename?: 'Mutation' }
  & { removeMeFromEvent: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetInteractionsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetInteractionsQuery = (
  { __typename?: 'Query' }
  & { getInteractions: Array<Maybe<(
    { __typename?: 'Interaction' }
    & Pick<Interaction, 'id' | 'type' | 'createdAt' | 'userId' | 'mutual' | 'targetId'>
    & { author?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url'>
      )> }
    )>, target?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )>> }
);

export type CreateInteractionMutationVariables = Exact<{
  targetId: Scalars['ID'];
  type: InteractionType;
}>;


export type CreateInteractionMutation = (
  { __typename?: 'Mutation' }
  & { createInteraction?: Maybe<(
    { __typename?: 'Interaction' }
    & Pick<Interaction, 'userId' | 'targetId' | 'type' | 'createdAt' | 'id'>
  )> }
);

export type ReciprocateInteractionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ReciprocateInteractionMutation = (
  { __typename?: 'Mutation' }
  & { reciprocateInteraction: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type LinkFieldsFragment = (
  { __typename?: 'Link' }
  & Pick<Link, '_id' | 'refId' | 'refType' | 'clicksCount' | 'url'>
);

export type GetMyLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyLinksQuery = (
  { __typename?: 'Query' }
  & { getMyLinks: Array<(
    { __typename?: 'Link' }
    & { eventRef?: Maybe<(
      { __typename?: 'Event' }
      & Pick<Event, 'id' | 'title'>
      & { image?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )> }
    & LinkFieldsFragment
  )> }
);

export type GetEventLinksQueryVariables = Exact<{
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetEventLinksQuery = (
  { __typename?: 'Query' }
  & { getEventLinks: Array<(
    { __typename?: 'Link' }
    & { owner?: Maybe<(
      { __typename?: 'LinkOwner' }
      & Pick<LinkOwner, 'id' | 'username'>
    )> }
    & LinkFieldsFragment
  )> }
);

export type GetEventByLinkCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type GetEventByLinkCodeQuery = (
  { __typename?: 'Query' }
  & { getEventByLinkCode?: Maybe<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )> }
);

export type GenerateEventLinkMutationVariables = Exact<{
  eventId: Scalars['ID'];
}>;


export type GenerateEventLinkMutation = (
  { __typename?: 'Mutation' }
  & { generateEventLink?: Maybe<(
    { __typename?: 'Link' }
    & LinkFieldsFragment
  )> }
);

export type GetLinkInfoQueryVariables = Exact<{
  code: Scalars['ID'];
}>;


export type GetLinkInfoQuery = (
  { __typename?: 'Query' }
  & { getLinkInfo?: Maybe<(
    { __typename?: 'Link' }
    & LinkFieldsFragment
  )> }
);

export type LiveFeedItemFieldsFragment = (
  { __typename?: 'LiveFeedItem' }
  & Pick<LiveFeedItem, 'id' | 'type' | 'createdAt'>
  & { image?: Maybe<(
    { __typename?: 'LiveFeedItemImage' }
    & Pick<LiveFeedItemImage, 'url' | 'aspectRatio'>
  )>, notification?: Maybe<(
    { __typename?: 'LiveFeedItemNotification' }
    & Pick<LiveFeedItemNotification, 'type' | 'title' | 'body' | 'data'>
  )>, poll?: Maybe<(
    { __typename?: 'LiveFeedItemPoll' }
    & Pick<LiveFeedItemPoll, 'title' | 'closed' | 'selectedOption'>
    & { options: Array<(
      { __typename?: 'LiveFeedItemPoolOption' }
      & Pick<LiveFeedItemPoolOption, '_id' | 'voted' | 'title'>
    )> }
  )>, giveaway?: Maybe<(
    { __typename?: 'LiveFeedGiveaway' }
    & Pick<LiveFeedGiveaway, 'title' | 'description' | 'subscriptionOpen' | 'subscribers' | 'subscriptionCloseDate' | 'countdownStart' | 'countdownDurationSeconds'>
    & { winners?: Maybe<Array<Maybe<(
      { __typename?: 'GivewayWinner' }
      & Pick<GivewayWinner, 'id' | 'username'>
    )>>> }
  )> }
);

export type GetEventLiveFeedQueryVariables = Exact<{
  eventId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetEventLiveFeedQuery = (
  { __typename?: 'Query' }
  & { getEventLiveFeed: Array<(
    { __typename?: 'LiveFeedItem' }
    & LiveFeedItemFieldsFragment
  )>, getPinnedLiveFeedItem?: Maybe<(
    { __typename?: 'LiveFeedItem' }
    & LiveFeedItemFieldsFragment
  )> }
);

export type VoteLiveFeedPollMutationVariables = Exact<{
  itemId: Scalars['ID'];
  optionId: Scalars['ID'];
}>;


export type VoteLiveFeedPollMutation = (
  { __typename?: 'Mutation' }
  & { voteLiveFeedPoll: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetLiveFeedItemQueryVariables = Exact<{
  itemId: Scalars['ID'];
}>;


export type GetLiveFeedItemQuery = (
  { __typename?: 'Query' }
  & { getLiveFeedItem?: Maybe<(
    { __typename?: 'LiveFeedItem' }
    & LiveFeedItemFieldsFragment
  )> }
);

export type SubscribeLiveFeedGiveawayMutationVariables = Exact<{
  itemId: Scalars['ID'];
}>;


export type SubscribeLiveFeedGiveawayMutation = (
  { __typename?: 'Mutation' }
  & { subscribeLiveFeedGiveaway: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success' | 'errorCode'>
  ) }
);

export type OrganizerFieldsFragment = (
  { __typename?: 'Organizer' }
  & Pick<Organizer, 'id' | 'name' | 'type' | 'description' | 'reviewsCount' | 'totalRatingCount' | 'rating' | 'isFollowing' | 'isPhysicalPlace' | 'website' | 'phoneNumber' | 'instagramUsername' | 'myRole'>
  & { image: (
    { __typename?: 'AssetRef' }
    & Pick<AssetRef, 'url' | 'blurhash'>
  ), reviewsPreview?: Maybe<Array<(
    { __typename?: 'Review' }
    & ReviewFieldsFragment
  )>>, location?: Maybe<(
    { __typename?: 'Location' }
    & Pick<Location, 'locationText'>
    & { point: (
      { __typename?: 'Point' }
      & Pick<Point, 'coordinates'>
    ) }
  )>, openingHours?: Maybe<(
    { __typename?: 'OpeningHours' }
    & { monday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, tuesday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, wednesday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, thursday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, friday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, saturday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )>, sunday?: Maybe<(
      { __typename?: 'DayOpeningHours' }
      & Pick<DayOpeningHours, 'open' | 'close'>
    )> }
  )> }
);

export type SearchOrganizersQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchOrganizersQuery = (
  { __typename?: 'Query' }
  & { searchOrganizers: Array<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type CreateOrganizerMutationVariables = Exact<{
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type?: Maybe<OrganizerType>;
  image: AssetInput;
}>;


export type CreateOrganizerMutation = (
  { __typename?: 'Mutation' }
  & { createOrganizer?: Maybe<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type FollowOrganizerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type FollowOrganizerMutation = (
  { __typename?: 'Mutation' }
  & { followOrganizer: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type UnfollowOrganizerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UnfollowOrganizerMutation = (
  { __typename?: 'Mutation' }
  & { unfollowOrganizer: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetOrganizersLandingQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizersLandingQuery = (
  { __typename?: 'Query' }
  & { getOrganizersLanding: Array<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type GetMyOrganizersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyOrganizersQuery = (
  { __typename?: 'Query' }
  & { getMyOrganizers: Array<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type GetSuggestedOrganizersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSuggestedOrganizersQuery = (
  { __typename?: 'Query' }
  & { getSuggestedOrganizers: Array<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type EditOrganizerImageMutationVariables = Exact<{
  id: Scalars['ID'];
  image: AssetInput;
}>;


export type EditOrganizerImageMutation = (
  { __typename?: 'Mutation' }
  & { editOrganizerImage?: Maybe<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type EditOrganizerMutationVariables = Exact<{
  id: Scalars['ID'];
  values: EditOrganizerInputValues;
  remove: EditOrganizerRemoveFields;
}>;


export type EditOrganizerMutation = (
  { __typename?: 'Mutation' }
  & { editOrganizer?: Maybe<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type MakeUserOrganizerManagerMutationVariables = Exact<{
  userId: Scalars['ID'];
  organizerId: Scalars['ID'];
  role: OrganizerUserRole;
}>;


export type MakeUserOrganizerManagerMutation = (
  { __typename?: 'Mutation' }
  & { makeUserOrganizerManager?: Maybe<(
    { __typename?: 'OrganizerManager' }
    & Pick<OrganizerManager, 'role' | 'userId'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )> }
  )> }
);

export type GetOrganizerManagersQueryVariables = Exact<{
  organizerId: Scalars['ID'];
}>;


export type GetOrganizerManagersQuery = (
  { __typename?: 'Query' }
  & { getOrganizerManagers?: Maybe<Array<(
    { __typename?: 'OrganizerManager' }
    & Pick<OrganizerManager, 'userId' | 'role'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )> }
  )>> }
);

export type RemoveUserOrganizerManagerMutationVariables = Exact<{
  userId: Scalars['ID'];
  organizerId: Scalars['ID'];
}>;


export type RemoveUserOrganizerManagerMutation = (
  { __typename?: 'Mutation' }
  & { removeUserOrganizerManager?: Maybe<(
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  )> }
);

export type GetEventsByOrganizerQueryVariables = Exact<{
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetEventsByOrganizerQuery = (
  { __typename?: 'Query' }
  & { getEventsByOrganizer: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'myRoles' | 'released'>
    & EventFieldsFragment
  )> }
);

export type GetUpcomingEventsByOrganizerQueryVariables = Exact<{
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetUpcomingEventsByOrganizerQuery = (
  { __typename?: 'Query' }
  & { getUpcomingEventsByOrganizer: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'myRoles' | 'released'>
    & EventFieldsFragment
  )> }
);

export type GetPastEventsByOrganizerQueryVariables = Exact<{
  organizer: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetPastEventsByOrganizerQuery = (
  { __typename?: 'Query' }
  & { getPastEventsByOrganizer: Array<(
    { __typename?: 'Event' }
    & Pick<Event, 'myRoles' | 'released'>
    & EventFieldsFragment
  )> }
);

export type GetOrganizerByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrganizerByIdQuery = (
  { __typename?: 'Query' }
  & { getOrganizerById?: Maybe<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type GetOrganizerLandingQueryVariables = Exact<{
  organizerId: Scalars['ID'];
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetOrganizerLandingQuery = (
  { __typename?: 'Query' }
  & { getUpcomingEventsByOrganizer: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )>, getPastEventsByOrganizer: Array<(
    { __typename?: 'Event' }
    & EventFieldsFragment
  )>, getOrganizerById?: Maybe<(
    { __typename?: 'Organizer' }
    & OrganizerFieldsFragment
  )> }
);

export type GetPrizesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPrizesQuery = (
  { __typename?: 'Query' }
  & { getPrizes?: Maybe<Array<(
    { __typename?: 'Prize' }
    & Pick<Prize, 'isActive' | 'price' | 'title' | 'code'>
  )>> }
);

export type RegionFieldsFragment = (
  { __typename?: 'Region' }
  & Pick<Region, 'id' | 'identifier' | 'name' | 'description' | 'radius'>
  & { point: (
    { __typename?: 'Point' }
    & Pick<Point, 'coordinates'>
  ) }
);

export type InitRegionsMutationVariables = Exact<{
  lat: Scalars['Float'];
  lng: Scalars['Float'];
}>;


export type InitRegionsMutation = (
  { __typename?: 'Mutation' }
  & { initRegions?: Maybe<(
    { __typename?: 'InitRegionsResponse' }
    & Pick<InitRegionsResponse, 'pingId'>
    & { currentRegion?: Maybe<(
      { __typename?: 'Region' }
      & RegionFieldsFragment
    )>, regions: Array<(
      { __typename?: 'Region' }
      & Pick<Region, 'identifier' | 'radius'>
      & { point: (
        { __typename?: 'Point' }
        & Pick<Point, 'coordinates'>
      ) }
    )> }
  )> }
);

export type ReviewFieldsFragment = (
  { __typename?: 'Review' }
  & Pick<Review, 'id' | 'rating' | 'createdAt' | 'comment' | 'isVerified' | '_hidden'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  ), eventPreview?: Maybe<(
    { __typename?: 'EventPreview' }
    & Pick<EventPreview, 'id' | 'title'>
    & { image?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  )> }
);

export type GetReviewsByOrganizerQueryVariables = Exact<{
  organizerId: Scalars['ID'];
  pagination?: Maybe<PaginationOptions>;
}>;


export type GetReviewsByOrganizerQuery = (
  { __typename?: 'Query' }
  & { getReviewsByOrganizer: Array<(
    { __typename?: 'Review' }
    & ReviewFieldsFragment
  )> }
);

export type CreateReviewMutationVariables = Exact<{
  rating: Scalars['Int'];
  event: Scalars['ID'];
  comment?: Maybe<Scalars['String']>;
}>;


export type CreateReviewMutation = (
  { __typename?: 'Mutation' }
  & { createReview?: Maybe<(
    { __typename?: 'CreateReviewResponse' }
    & Pick<CreateReviewResponse, 'errorCode'>
    & { review?: Maybe<(
      { __typename?: 'Review' }
      & ReviewFieldsFragment
    )> }
  )> }
);

export type RemoveReviewMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveReviewMutation = (
  { __typename?: 'Mutation' }
  & { removeReview: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type SearchSchoolsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SearchSchoolsQuery = (
  { __typename?: 'Query' }
  & { searchSchools: Array<(
    { __typename?: 'School' }
    & Pick<School, 'id' | 'name' | 'prov' | 'add' | 'type_description'>
  )> }
);

export type GetSchoolByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetSchoolByIdQuery = (
  { __typename?: 'Query' }
  & { getSchoolById?: Maybe<(
    { __typename?: 'School' }
    & Pick<School, 'id' | 'add' | 'name' | 'prov' | 'lastSpotModeDate'>
    & { admins?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url'>
      )>, links?: Maybe<(
        { __typename?: 'UserLinks' }
        & Pick<UserLinks, 'instagramName'>
      )> }
    )>>> }
  )> }
);

export type LeaveSchoolMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveSchoolMutation = (
  { __typename?: 'Mutation' }
  & { leaveSchool: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type StartSchoolSpotModeMutationVariables = Exact<{ [key: string]: never; }>;


export type StartSchoolSpotModeMutation = (
  { __typename?: 'Mutation' }
  & { startSchoolSpotMode: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'phoneNumber' | 'pushToken' | 'gender' | 'favDrink' | 'birthday' | 'role'>
  & { profilePicture?: Maybe<(
    { __typename?: 'AssetRef' }
    & Pick<AssetRef, 'url' | 'aspectRatio' | 'blurhash'>
  )>, links?: Maybe<(
    { __typename?: 'UserLinks' }
    & Pick<UserLinks, 'instagramName'>
  )>, textStatus?: Maybe<(
    { __typename?: 'UserTextStatus' }
    & Pick<UserTextStatus, 'text' | 'createdAt'>
  )> }
);

export type WhoamiQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoamiQuery = (
  { __typename?: 'Query' }
  & { whoami: (
    { __typename?: 'User' }
    & Pick<User, 'languageCode' | 'hasAdminArea' | 'firstName' | 'lastName' | 'currentEventID'>
    & { ban?: Maybe<(
      { __typename?: 'BanObj' }
      & Pick<BanObj, 'banned' | 'reason'>
    )>, stats?: Maybe<(
      { __typename?: 'UserStatistics' }
      & Pick<UserStatistics, 'spottedCount' | 'sentInteractionsCount' | 'recivedInteractionsCount' | 'acceptedInteractionsCount' | 'friendsCount'>
    )>, coins?: Maybe<(
      { __typename?: 'CoinsInfo' }
      & Pick<CoinsInfo, 'count'>
    )>, school?: Maybe<(
      { __typename?: 'SchoolInfo' }
      & Pick<SchoolInfo, 'id' | 'isAdmin'>
    )> }
    & UserFieldsFragment
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  profileImage?: Maybe<AssetInput>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  favDrink?: Maybe<Scalars['String']>;
  instagramName?: Maybe<Scalars['String']>;
  schoolID?: Maybe<Scalars['ID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateUserProfile?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'languageCode' | 'hasAdminArea' | 'firstName' | 'lastName'>
    & { ban?: Maybe<(
      { __typename?: 'BanObj' }
      & Pick<BanObj, 'banned' | 'reason'>
    )>, stats?: Maybe<(
      { __typename?: 'UserStatistics' }
      & Pick<UserStatistics, 'spottedCount' | 'sentInteractionsCount' | 'recivedInteractionsCount' | 'acceptedInteractionsCount' | 'friendsCount'>
    )>, coins?: Maybe<(
      { __typename?: 'CoinsInfo' }
      & Pick<CoinsInfo, 'count'>
    )>, school?: Maybe<(
      { __typename?: 'SchoolInfo' }
      & Pick<SchoolInfo, 'id' | 'isAdmin'>
    )> }
    & UserFieldsFragment
  )> }
);

export type SetPushNotificationTokenMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type SetPushNotificationTokenMutation = (
  { __typename?: 'Mutation' }
  & { setPushNotificationToken: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type SetLanguageCodeMutationVariables = Exact<{
  code: Scalars['String'];
}>;


export type SetLanguageCodeMutation = (
  { __typename?: 'Mutation' }
  & { setLanguageCode: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type ChangeEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ChangeEmailMutation = (
  { __typename?: 'Mutation' }
  & { changeEmail: (
    { __typename?: 'EmailResponse' }
    & Pick<EmailResponse, 'success' | 'recipient'>
  ) }
);

export type ChangePasswordWithTokenMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordWithTokenMutation = (
  { __typename?: 'Mutation' }
  & { changePasswordWithToken: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type EditPasswordMutationVariables = Exact<{
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type EditPasswordMutation = (
  { __typename?: 'Mutation' }
  & { editPassword: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type BanUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
}>;


export type BanUserMutation = (
  { __typename?: 'Mutation' }
  & { banUser: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetUsersAdminQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
  onlyLimit?: Maybe<Scalars['Boolean']>;
}>;


export type GetUsersAdminQuery = (
  { __typename?: 'Query' }
  & { getUsersAdmin: Array<(
    { __typename?: 'User' }
    & { ban?: Maybe<(
      { __typename?: 'BanObj' }
      & Pick<BanObj, 'banned'>
    )> }
    & UserFieldsFragment
  )> }
);

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = (
  { __typename?: 'Query' }
  & { getUserById: (
    { __typename?: 'User' }
    & Pick<User, 'hasRequestedFriendship' | 'eventsAttendedCount'>
    & { spotInfo?: Maybe<(
      { __typename?: 'SpotInfo' }
      & Pick<SpotInfo, 'areFriends' | 'createdAt'>
      & { event?: Maybe<(
        { __typename?: 'Event' }
        & Pick<Event, 'id' | 'title'>
        & { image?: Maybe<(
          { __typename?: 'AssetRef' }
          & Pick<AssetRef, 'url' | 'blurhash'>
        )> }
      )> }
    )>, stats?: Maybe<(
      { __typename?: 'UserStatistics' }
      & Pick<UserStatistics, 'spottedCount' | 'friendsCount'>
    )> }
    & UserFieldsFragment
  ) }
);

export type ReportUserMutationVariables = Exact<{
  userId: Scalars['ID'];
  reason: Scalars['String'];
}>;


export type ReportUserMutation = (
  { __typename?: 'Mutation' }
  & { reportUser: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetReportedUsersQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetReportedUsersQuery = (
  { __typename?: 'Query' }
  & { getReportedUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'gender'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )>, ban?: Maybe<(
      { __typename?: 'BanObj' }
      & Pick<BanObj, 'banned'>
    )> }
  )> }
);

export type RemoveUserReportsMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type RemoveUserReportsMutation = (
  { __typename?: 'Mutation' }
  & { removeUserReports: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetNearbyUserByIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type GetNearbyUserByIdQuery = (
  { __typename?: 'Query' }
  & { getNearbyUserById: (
    { __typename?: 'NearUserResponse' }
    & Pick<NearUserResponse, 'blocked' | 'offline'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )> }
  ) }
);

export type SpotUserMutationVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type SpotUserMutation = (
  { __typename?: 'Mutation' }
  & { spotUser: (
    { __typename?: 'SpotResult' }
    & Pick<SpotResult, 'success' | 'new'>
    & { sharedUsers?: Maybe<Array<Maybe<(
      { __typename?: 'SharedUsersItem' }
      & Pick<SharedUsersItem, 'userId' | 'new'>
    )>>> }
  ) }
);

export type MarkUserAsEventParticipantMutationVariables = Exact<{
  joinCode: Scalars['ID'];
}>;


export type MarkUserAsEventParticipantMutation = (
  { __typename?: 'Mutation' }
  & { markUserAsEventParticipant: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetSpottedUsersQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetSpottedUsersQuery = (
  { __typename?: 'Query' }
  & { getSpottedUsers?: Maybe<(
    { __typename?: 'GetSpottedUsersResponse' }
    & Pick<GetSpottedUsersResponse, 'cursor' | 'endReached'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'SpottedItem' }
      & Pick<SpottedItem, 'createdAt' | 'id' | 'areFriends'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username' | 'id'>
        & { profilePicture?: Maybe<(
          { __typename?: 'AssetRef' }
          & Pick<AssetRef, 'url' | 'blurhash'>
        )> }
      ) }
    )>>> }
  )> }
);

export type SearchSpottedUsersQueryVariables = Exact<{
  searchText: Scalars['String'];
}>;


export type SearchSpottedUsersQuery = (
  { __typename?: 'Query' }
  & { searchSpottedUsers: Array<(
    { __typename?: 'SpottedItem' }
    & Pick<SpottedItem, 'createdAt' | 'id' | 'areFriends'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    ) }
  )> }
);

export type AddTextStatusMutationVariables = Exact<{
  text?: Maybe<Scalars['String']>;
}>;


export type AddTextStatusMutation = (
  { __typename?: 'Mutation' }
  & { addTextStatus?: Maybe<(
    { __typename?: 'UserTextStatus' }
    & Pick<UserTextStatus, 'text' | 'createdAt'>
  )> }
);

export type NearbyStartupMutationVariables = Exact<{ [key: string]: never; }>;


export type NearbyStartupMutation = (
  { __typename?: 'Mutation' }
  & { nearbyStartup: (
    { __typename?: 'NearbyStartupResult' }
    & Pick<NearbyStartupResult, 'pingID' | 'spotCode' | 'success'>
  ) }
);

export type GetFriendsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetFriendsQuery = (
  { __typename?: 'Query' }
  & { getFriends?: Maybe<(
    { __typename?: 'GetFriendsResponse' }
    & Pick<GetFriendsResponse, 'cursor' | 'endReached'>
    & { items?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'id'>
      & { profilePicture?: Maybe<(
        { __typename?: 'AssetRef' }
        & Pick<AssetRef, 'url' | 'blurhash'>
      )> }
    )>>> }
  )> }
);

export type AskFriendshipMutationVariables = Exact<{
  targetId: Scalars['ID'];
}>;


export type AskFriendshipMutation = (
  { __typename?: 'Mutation' }
  & { askFriendship: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type AcceptFriendshipMutationVariables = Exact<{
  targetId: Scalars['ID'];
}>;


export type AcceptFriendshipMutation = (
  { __typename?: 'Mutation' }
  & { acceptFriendship: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type RejectFriendshipMutationVariables = Exact<{
  targetId: Scalars['ID'];
}>;


export type RejectFriendshipMutation = (
  { __typename?: 'Mutation' }
  & { rejectFriendship: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type RemoveFriendshipMutationVariables = Exact<{
  targetId: Scalars['ID'];
}>;


export type RemoveFriendshipMutation = (
  { __typename?: 'Mutation' }
  & { removeFriendship: (
    { __typename?: 'ProcessResult' }
    & Pick<ProcessResult, 'success'>
  ) }
);

export type GetFriendshipRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendshipRequestsQuery = (
  { __typename?: 'Query' }
  & { getFriendshipRequests: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  )> }
);

export type GetFriendshipRequestsSentQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFriendshipRequestsSentQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getFriendshipRequestsSent'>
);

export type SearchUserByPhoneNumberQueryVariables = Exact<{
  phoneNumber: Scalars['String'];
}>;


export type SearchUserByPhoneNumberQuery = (
  { __typename?: 'Query' }
  & { searchUserByPhoneNumber?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id' | 'firstName' | 'lastName'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  )> }
);

export type GetAdminAreaInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAdminAreaInfoQuery = (
  { __typename?: 'Query' }
  & { getAdminAreaInfo?: Maybe<(
    { __typename?: 'AdminAreaInfo' }
    & Pick<AdminAreaInfo, 'isAppAdmin'>
  )> }
);

export type SearchUserByTextOrPhoneNumberQueryVariables = Exact<{
  text: Scalars['String'];
}>;


export type SearchUserByTextOrPhoneNumberQuery = (
  { __typename?: 'Query' }
  & { searchUserByTextOrPhoneNumber: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
    & { profilePicture?: Maybe<(
      { __typename?: 'AssetRef' }
      & Pick<AssetRef, 'url' | 'blurhash'>
    )> }
  )> }
);

export type GetMyTicketsQueryVariables = Exact<{
  pagination?: Maybe<CursorPaginationOptions>;
}>;


export type GetMyTicketsQuery = (
  { __typename?: 'Query' }
  & { getMyTickets?: Maybe<Array<(
    { __typename?: 'Ticket' }
    & TicketFieldsFragment
  )>> }
);

export const ActivityFieldsFragmentDoc = gql`
    fragment ActivityFields on Activity {
  id
  ownerId
  createdAt
  type
  data
  text
  seen
  _hidden @client
}
    `;
export const EventFieldsFragmentDoc = gql`
    fragment EventFields on Event {
  id
  title
  date
  endDate
  isEnded
  image {
    url
    blurhash
  }
  description
  minAge
  priceText
  location {
    point {
      coordinates
    }
    locationText
  }
  isFollowing
  isVerified
  isOfficial
  haveTicket
  isParticipating
  isRequested
  is_ticketing_enabled
  has_ticketing_system
  adminOnly
  contactInfo {
    name
    phoneNumber
    wsNumber
    instagram
  }
  invitation_requests_enabled
  has_ticket_system
}
    `;
export const EventPackageFieldsFragmentDoc = gql`
    fragment EventPackageFields on EventPackage {
  id
  name
  userPrice
  currency
  paymentTypes
  type
  hidden
  minAge
  sex
  code
  enabled
  skipLine
  drinks
  soldout
  maxTickets
  maxTicketsPerUser
}
    `;
export const PrFieldsFragmentDoc = gql`
    fragment PrFields on PR {
  name
  userId
  phoneNumber
  packagesAvailability {
    packageId
    issued
    available
    packageDoc {
      ...EventPackageFields
    }
  }
  removed
}
    ${EventPackageFieldsFragmentDoc}`;
export const TicketFieldsFragmentDoc = gql`
    fragment TicketFields on Ticket {
  id
  code
  used
  createdAt
  revoked
  eventInfo {
    event {
      id
      title
      date
      location {
        point {
          coordinates
        }
        locationText
      }
      eventType
    }
    package {
      ...EventPackageFields
    }
  }
}
    ${EventPackageFieldsFragmentDoc}`;
export const LinkFieldsFragmentDoc = gql`
    fragment LinkFields on Link {
  _id
  refId
  refType
  clicksCount
  url
}
    `;
export const LiveFeedItemFieldsFragmentDoc = gql`
    fragment LiveFeedItemFields on LiveFeedItem {
  id
  type
  createdAt
  image {
    url
    aspectRatio
  }
  notification {
    type
    title
    body
    data
  }
  poll {
    title
    closed
    selectedOption
    options {
      _id
      voted
      title
    }
  }
  giveaway {
    title
    description
    subscriptionOpen
    subscribers
    subscriptionCloseDate
    countdownStart
    countdownDurationSeconds
    winners {
      id
      username
    }
  }
}
    `;
export const ReviewFieldsFragmentDoc = gql`
    fragment ReviewFields on Review {
  id
  rating
  createdAt
  comment
  isVerified
  user {
    id
    username
    profilePicture {
      url
      blurhash
    }
  }
  eventPreview {
    id
    title
    image {
      url
      blurhash
    }
  }
  _hidden @client
}
    `;
export const OrganizerFieldsFragmentDoc = gql`
    fragment OrganizerFields on Organizer {
  id
  name
  image {
    url
    blurhash
  }
  type
  description
  reviewsCount
  totalRatingCount
  rating
  reviewsPreview {
    ...ReviewFields
  }
  isFollowing
  isPhysicalPlace
  location {
    point {
      coordinates
    }
    locationText
  }
  website
  phoneNumber
  instagramUsername
  openingHours {
    monday {
      open
      close
    }
    tuesday {
      open
      close
    }
    wednesday {
      open
      close
    }
    thursday {
      open
      close
    }
    friday {
      open
      close
    }
    saturday {
      open
      close
    }
    sunday {
      open
      close
    }
  }
  myRole
}
    ${ReviewFieldsFragmentDoc}`;
export const RegionFieldsFragmentDoc = gql`
    fragment RegionFields on Region {
  id
  identifier
  name
  description
  point {
    coordinates
  }
  radius
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  username
  phoneNumber
  pushToken
  gender
  profilePicture {
    url
    aspectRatio
    blurhash
  }
  favDrink
  birthday
  role
  links {
    instagramName
  }
  textStatus {
    text
    createdAt
  }
}
    `;
export const GetMyActivitiesDocument = gql`
    query GetMyActivities($pagination: CursorPaginationOptions) {
  getMyActivities(pagination: $pagination) {
    ...ActivityFields
  }
}
    ${ActivityFieldsFragmentDoc}`;

/**
 * __useGetMyActivitiesQuery__
 *
 * To run a query within a React component, call `useGetMyActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyActivitiesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyActivitiesQuery, GetMyActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyActivitiesQuery, GetMyActivitiesQueryVariables>(GetMyActivitiesDocument, options);
      }
export function useGetMyActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyActivitiesQuery, GetMyActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyActivitiesQuery, GetMyActivitiesQueryVariables>(GetMyActivitiesDocument, options);
        }
export type GetMyActivitiesQueryHookResult = ReturnType<typeof useGetMyActivitiesQuery>;
export type GetMyActivitiesLazyQueryHookResult = ReturnType<typeof useGetMyActivitiesLazyQuery>;
export type GetMyActivitiesQueryResult = Apollo.QueryResult<GetMyActivitiesQuery, GetMyActivitiesQueryVariables>;
export const GetMyTicketActivitiesDocument = gql`
    query GetMyTicketActivities($pagination: CursorPaginationOptions) {
  getMyTicketActivities(pagination: $pagination) {
    ...ActivityFields
  }
}
    ${ActivityFieldsFragmentDoc}`;

/**
 * __useGetMyTicketActivitiesQuery__
 *
 * To run a query within a React component, call `useGetMyTicketActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketActivitiesQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyTicketActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketActivitiesQuery, GetMyTicketActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketActivitiesQuery, GetMyTicketActivitiesQueryVariables>(GetMyTicketActivitiesDocument, options);
      }
export function useGetMyTicketActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketActivitiesQuery, GetMyTicketActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketActivitiesQuery, GetMyTicketActivitiesQueryVariables>(GetMyTicketActivitiesDocument, options);
        }
export type GetMyTicketActivitiesQueryHookResult = ReturnType<typeof useGetMyTicketActivitiesQuery>;
export type GetMyTicketActivitiesLazyQueryHookResult = ReturnType<typeof useGetMyTicketActivitiesLazyQuery>;
export type GetMyTicketActivitiesQueryResult = Apollo.QueryResult<GetMyTicketActivitiesQuery, GetMyTicketActivitiesQueryVariables>;
export const SeeActivitiesDocument = gql`
    mutation SeeActivities {
  seeActivities {
    success
  }
}
    `;
export type SeeActivitiesMutationFn = Apollo.MutationFunction<SeeActivitiesMutation, SeeActivitiesMutationVariables>;

/**
 * __useSeeActivitiesMutation__
 *
 * To run a mutation, you first call `useSeeActivitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeeActivitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seeActivitiesMutation, { data, loading, error }] = useSeeActivitiesMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeeActivitiesMutation(baseOptions?: Apollo.MutationHookOptions<SeeActivitiesMutation, SeeActivitiesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SeeActivitiesMutation, SeeActivitiesMutationVariables>(SeeActivitiesDocument, options);
      }
export type SeeActivitiesMutationHookResult = ReturnType<typeof useSeeActivitiesMutation>;
export type SeeActivitiesMutationResult = Apollo.MutationResult<SeeActivitiesMutation>;
export type SeeActivitiesMutationOptions = Apollo.BaseMutationOptions<SeeActivitiesMutation, SeeActivitiesMutationVariables>;
export const HasUnseenActivitiesDocument = gql`
    query HasUnseenActivities {
  hasUnseenActivities
}
    `;

/**
 * __useHasUnseenActivitiesQuery__
 *
 * To run a query within a React component, call `useHasUnseenActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasUnseenActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasUnseenActivitiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHasUnseenActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<HasUnseenActivitiesQuery, HasUnseenActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasUnseenActivitiesQuery, HasUnseenActivitiesQueryVariables>(HasUnseenActivitiesDocument, options);
      }
export function useHasUnseenActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasUnseenActivitiesQuery, HasUnseenActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasUnseenActivitiesQuery, HasUnseenActivitiesQueryVariables>(HasUnseenActivitiesDocument, options);
        }
export type HasUnseenActivitiesQueryHookResult = ReturnType<typeof useHasUnseenActivitiesQuery>;
export type HasUnseenActivitiesLazyQueryHookResult = ReturnType<typeof useHasUnseenActivitiesLazyQuery>;
export type HasUnseenActivitiesQueryResult = Apollo.QueryResult<HasUnseenActivitiesQuery, HasUnseenActivitiesQueryVariables>;
export const GetAssistenceDocument = gql`
    query GetAssistence {
  getAssistence {
    userId
    text
    id
    user {
      username
      id
    }
  }
}
    `;

/**
 * __useGetAssistenceQuery__
 *
 * To run a query within a React component, call `useGetAssistenceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssistenceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssistenceQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAssistenceQuery(baseOptions?: Apollo.QueryHookOptions<GetAssistenceQuery, GetAssistenceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssistenceQuery, GetAssistenceQueryVariables>(GetAssistenceDocument, options);
      }
export function useGetAssistenceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssistenceQuery, GetAssistenceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssistenceQuery, GetAssistenceQueryVariables>(GetAssistenceDocument, options);
        }
export type GetAssistenceQueryHookResult = ReturnType<typeof useGetAssistenceQuery>;
export type GetAssistenceLazyQueryHookResult = ReturnType<typeof useGetAssistenceLazyQuery>;
export type GetAssistenceQueryResult = Apollo.QueryResult<GetAssistenceQuery, GetAssistenceQueryVariables>;
export const CreateAssistenceDocument = gql`
    mutation CreateAssistence($text: String!, $type: AssistenceType!) {
  createAssistence(text: $text, type: $type) {
    success
  }
}
    `;
export type CreateAssistenceMutationFn = Apollo.MutationFunction<CreateAssistenceMutation, CreateAssistenceMutationVariables>;

/**
 * __useCreateAssistenceMutation__
 *
 * To run a mutation, you first call `useCreateAssistenceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssistenceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssistenceMutation, { data, loading, error }] = useCreateAssistenceMutation({
 *   variables: {
 *      text: // value for 'text'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateAssistenceMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssistenceMutation, CreateAssistenceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssistenceMutation, CreateAssistenceMutationVariables>(CreateAssistenceDocument, options);
      }
export type CreateAssistenceMutationHookResult = ReturnType<typeof useCreateAssistenceMutation>;
export type CreateAssistenceMutationResult = Apollo.MutationResult<CreateAssistenceMutation>;
export type CreateAssistenceMutationOptions = Apollo.BaseMutationOptions<CreateAssistenceMutation, CreateAssistenceMutationVariables>;
export const IsPhoneNumberAlreadyUsedDocument = gql`
    query IsPhoneNumberAlreadyUsed($phoneNumber: String!) {
  isPhoneNumberAlreadyUsed(phoneNumber: $phoneNumber)
}
    `;

/**
 * __useIsPhoneNumberAlreadyUsedQuery__
 *
 * To run a query within a React component, call `useIsPhoneNumberAlreadyUsedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsPhoneNumberAlreadyUsedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsPhoneNumberAlreadyUsedQuery({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useIsPhoneNumberAlreadyUsedQuery(baseOptions: Apollo.QueryHookOptions<IsPhoneNumberAlreadyUsedQuery, IsPhoneNumberAlreadyUsedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsPhoneNumberAlreadyUsedQuery, IsPhoneNumberAlreadyUsedQueryVariables>(IsPhoneNumberAlreadyUsedDocument, options);
      }
export function useIsPhoneNumberAlreadyUsedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsPhoneNumberAlreadyUsedQuery, IsPhoneNumberAlreadyUsedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsPhoneNumberAlreadyUsedQuery, IsPhoneNumberAlreadyUsedQueryVariables>(IsPhoneNumberAlreadyUsedDocument, options);
        }
export type IsPhoneNumberAlreadyUsedQueryHookResult = ReturnType<typeof useIsPhoneNumberAlreadyUsedQuery>;
export type IsPhoneNumberAlreadyUsedLazyQueryHookResult = ReturnType<typeof useIsPhoneNumberAlreadyUsedLazyQuery>;
export type IsPhoneNumberAlreadyUsedQueryResult = Apollo.QueryResult<IsPhoneNumberAlreadyUsedQuery, IsPhoneNumberAlreadyUsedQueryVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SavePhoneSessionInfoDocument = gql`
    mutation SavePhoneSessionInfo($sessionInfo: String!, $phoneNumber: String!) {
  savePhoneSessionInfo(sessionInfo: $sessionInfo, phoneNumber: $phoneNumber)
}
    `;
export type SavePhoneSessionInfoMutationFn = Apollo.MutationFunction<SavePhoneSessionInfoMutation, SavePhoneSessionInfoMutationVariables>;

/**
 * __useSavePhoneSessionInfoMutation__
 *
 * To run a mutation, you first call `useSavePhoneSessionInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSavePhoneSessionInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [savePhoneSessionInfoMutation, { data, loading, error }] = useSavePhoneSessionInfoMutation({
 *   variables: {
 *      sessionInfo: // value for 'sessionInfo'
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useSavePhoneSessionInfoMutation(baseOptions?: Apollo.MutationHookOptions<SavePhoneSessionInfoMutation, SavePhoneSessionInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SavePhoneSessionInfoMutation, SavePhoneSessionInfoMutationVariables>(SavePhoneSessionInfoDocument, options);
      }
export type SavePhoneSessionInfoMutationHookResult = ReturnType<typeof useSavePhoneSessionInfoMutation>;
export type SavePhoneSessionInfoMutationResult = Apollo.MutationResult<SavePhoneSessionInfoMutation>;
export type SavePhoneSessionInfoMutationOptions = Apollo.BaseMutationOptions<SavePhoneSessionInfoMutation, SavePhoneSessionInfoMutationVariables>;
export const DeleteLoggedAccountDocument = gql`
    mutation DeleteLoggedAccount {
  deleteLoggedAccount {
    success
  }
}
    `;
export type DeleteLoggedAccountMutationFn = Apollo.MutationFunction<DeleteLoggedAccountMutation, DeleteLoggedAccountMutationVariables>;

/**
 * __useDeleteLoggedAccountMutation__
 *
 * To run a mutation, you first call `useDeleteLoggedAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLoggedAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLoggedAccountMutation, { data, loading, error }] = useDeleteLoggedAccountMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteLoggedAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLoggedAccountMutation, DeleteLoggedAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLoggedAccountMutation, DeleteLoggedAccountMutationVariables>(DeleteLoggedAccountDocument, options);
      }
export type DeleteLoggedAccountMutationHookResult = ReturnType<typeof useDeleteLoggedAccountMutation>;
export type DeleteLoggedAccountMutationResult = Apollo.MutationResult<DeleteLoggedAccountMutation>;
export type DeleteLoggedAccountMutationOptions = Apollo.BaseMutationOptions<DeleteLoggedAccountMutation, DeleteLoggedAccountMutationVariables>;
export const FirebasePhoneAuthDocument = gql`
    mutation FirebasePhoneAuth($token: String!) {
  firebasePhoneAuth(token: $token) {
    success
    tokens {
      accessToken
      refreshToken
      expiresIn
    }
    newUser
  }
}
    `;
export type FirebasePhoneAuthMutationFn = Apollo.MutationFunction<FirebasePhoneAuthMutation, FirebasePhoneAuthMutationVariables>;

/**
 * __useFirebasePhoneAuthMutation__
 *
 * To run a mutation, you first call `useFirebasePhoneAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFirebasePhoneAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [firebasePhoneAuthMutation, { data, loading, error }] = useFirebasePhoneAuthMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useFirebasePhoneAuthMutation(baseOptions?: Apollo.MutationHookOptions<FirebasePhoneAuthMutation, FirebasePhoneAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FirebasePhoneAuthMutation, FirebasePhoneAuthMutationVariables>(FirebasePhoneAuthDocument, options);
      }
export type FirebasePhoneAuthMutationHookResult = ReturnType<typeof useFirebasePhoneAuthMutation>;
export type FirebasePhoneAuthMutationResult = Apollo.MutationResult<FirebasePhoneAuthMutation>;
export type FirebasePhoneAuthMutationOptions = Apollo.BaseMutationOptions<FirebasePhoneAuthMutation, FirebasePhoneAuthMutationVariables>;
export const AdminAuthDocument = gql`
    mutation AdminAuth($phoneNumber: String!, $password: String!) {
  adminAuth(phoneNumber: $phoneNumber, password: $password) {
    success
    tokens {
      accessToken
      refreshToken
      expiresIn
    }
  }
}
    `;
export type AdminAuthMutationFn = Apollo.MutationFunction<AdminAuthMutation, AdminAuthMutationVariables>;

/**
 * __useAdminAuthMutation__
 *
 * To run a mutation, you first call `useAdminAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAuthMutation, { data, loading, error }] = useAdminAuthMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useAdminAuthMutation(baseOptions?: Apollo.MutationHookOptions<AdminAuthMutation, AdminAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminAuthMutation, AdminAuthMutationVariables>(AdminAuthDocument, options);
      }
export type AdminAuthMutationHookResult = ReturnType<typeof useAdminAuthMutation>;
export type AdminAuthMutationResult = Apollo.MutationResult<AdminAuthMutation>;
export type AdminAuthMutationOptions = Apollo.BaseMutationOptions<AdminAuthMutation, AdminAuthMutationVariables>;
export const SignupWithFirebasePhoneDocument = gql`
    mutation signupWithFirebasePhone($token: String!, $username: String!) {
  signupWithFirebasePhone(firebaseToken: $token, username: $username) {
    success
    tokens {
      accessToken
      refreshToken
      expiresIn
    }
  }
}
    `;
export type SignupWithFirebasePhoneMutationFn = Apollo.MutationFunction<SignupWithFirebasePhoneMutation, SignupWithFirebasePhoneMutationVariables>;

/**
 * __useSignupWithFirebasePhoneMutation__
 *
 * To run a mutation, you first call `useSignupWithFirebasePhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupWithFirebasePhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupWithFirebasePhoneMutation, { data, loading, error }] = useSignupWithFirebasePhoneMutation({
 *   variables: {
 *      token: // value for 'token'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useSignupWithFirebasePhoneMutation(baseOptions?: Apollo.MutationHookOptions<SignupWithFirebasePhoneMutation, SignupWithFirebasePhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupWithFirebasePhoneMutation, SignupWithFirebasePhoneMutationVariables>(SignupWithFirebasePhoneDocument, options);
      }
export type SignupWithFirebasePhoneMutationHookResult = ReturnType<typeof useSignupWithFirebasePhoneMutation>;
export type SignupWithFirebasePhoneMutationResult = Apollo.MutationResult<SignupWithFirebasePhoneMutation>;
export type SignupWithFirebasePhoneMutationOptions = Apollo.BaseMutationOptions<SignupWithFirebasePhoneMutation, SignupWithFirebasePhoneMutationVariables>;
export const GetEventByIdDocument = gql`
    query GetEventById($id: ID!) {
  getEventById(id: $id) {
    ...EventFields
    organizer {
      ...OrganizerFields
    }
    creator {
      id
      username
      profilePicture {
        url
        blurhash
      }
    }
    myReview {
      ...ReviewFields
    }
    releaseDate
    released
    packages {
      ...EventPackageFields
    }
    myRoles
    eventType
  }
}
    ${EventFieldsFragmentDoc}
${OrganizerFieldsFragmentDoc}
${ReviewFieldsFragmentDoc}
${EventPackageFieldsFragmentDoc}`;

/**
 * __useGetEventByIdQuery__
 *
 * To run a query within a React component, call `useGetEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventByIdQuery(baseOptions: Apollo.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
      }
export function useGetEventByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>;
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>;
export type GetEventByIdQueryResult = Apollo.QueryResult<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetUserAttendedEventsDocument = gql`
    query getUserAttendedEvents($userId: ID!) {
  getUserAttendedEvents(userId: $userId) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetUserAttendedEventsQuery__
 *
 * To run a query within a React component, call `useGetUserAttendedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAttendedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAttendedEventsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserAttendedEventsQuery(baseOptions: Apollo.QueryHookOptions<GetUserAttendedEventsQuery, GetUserAttendedEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAttendedEventsQuery, GetUserAttendedEventsQueryVariables>(GetUserAttendedEventsDocument, options);
      }
export function useGetUserAttendedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAttendedEventsQuery, GetUserAttendedEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAttendedEventsQuery, GetUserAttendedEventsQueryVariables>(GetUserAttendedEventsDocument, options);
        }
export type GetUserAttendedEventsQueryHookResult = ReturnType<typeof useGetUserAttendedEventsQuery>;
export type GetUserAttendedEventsLazyQueryHookResult = ReturnType<typeof useGetUserAttendedEventsLazyQuery>;
export type GetUserAttendedEventsQueryResult = Apollo.QueryResult<GetUserAttendedEventsQuery, GetUserAttendedEventsQueryVariables>;
export const SearchEventsDocument = gql`
    query SearchEvents($text: String!) {
  searchEvents(text: $text) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useSearchEventsQuery__
 *
 * To run a query within a React component, call `useSearchEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchEventsQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchEventsQuery(baseOptions: Apollo.QueryHookOptions<SearchEventsQuery, SearchEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchEventsQuery, SearchEventsQueryVariables>(SearchEventsDocument, options);
      }
export function useSearchEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchEventsQuery, SearchEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchEventsQuery, SearchEventsQueryVariables>(SearchEventsDocument, options);
        }
export type SearchEventsQueryHookResult = ReturnType<typeof useSearchEventsQuery>;
export type SearchEventsLazyQueryHookResult = ReturnType<typeof useSearchEventsLazyQuery>;
export type SearchEventsQueryResult = Apollo.QueryResult<SearchEventsQuery, SearchEventsQueryVariables>;
export const AdminCreateEventDocument = gql`
    mutation AdminCreateEvent($title: String!, $description: String!, $date: Date!, $endDate: Date, $image: AssetInput!, $location: LocationInput!, $minAge: Int, $priceText: String, $organizer: ID, $contactInfo: EventContactInfoInput, $controlledRelease: Boolean, $releaseDate: Date, $ticketingSystem: Boolean) {
  adminCreateEvent(
    title: $title
    description: $description
    date: $date
    endDate: $endDate
    image: $image
    minAge: $minAge
    location: $location
    priceText: $priceText
    organizer: $organizer
    contactInfo: $contactInfo
    controlledRelease: $controlledRelease
    releaseDate: $releaseDate
    ticketingSystem: $ticketingSystem
  ) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export type AdminCreateEventMutationFn = Apollo.MutationFunction<AdminCreateEventMutation, AdminCreateEventMutationVariables>;

/**
 * __useAdminCreateEventMutation__
 *
 * To run a mutation, you first call `useAdminCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateEventMutation, { data, loading, error }] = useAdminCreateEventMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      date: // value for 'date'
 *      endDate: // value for 'endDate'
 *      image: // value for 'image'
 *      location: // value for 'location'
 *      minAge: // value for 'minAge'
 *      priceText: // value for 'priceText'
 *      organizer: // value for 'organizer'
 *      contactInfo: // value for 'contactInfo'
 *      controlledRelease: // value for 'controlledRelease'
 *      releaseDate: // value for 'releaseDate'
 *      ticketingSystem: // value for 'ticketingSystem'
 *   },
 * });
 */
export function useAdminCreateEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateEventMutation, AdminCreateEventMutationVariables>(AdminCreateEventDocument, options);
      }
export type AdminCreateEventMutationHookResult = ReturnType<typeof useAdminCreateEventMutation>;
export type AdminCreateEventMutationResult = Apollo.MutationResult<AdminCreateEventMutation>;
export type AdminCreateEventMutationOptions = Apollo.BaseMutationOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>;
export const AdminEditEventDocument = gql`
    mutation AdminEditEvent($eventId: ID!, $title: String, $description: String, $image: AssetInput) {
  adminEditEvent(
    eventId: $eventId
    title: $title
    description: $description
    image: $image
  ) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;
export type AdminEditEventMutationFn = Apollo.MutationFunction<AdminEditEventMutation, AdminEditEventMutationVariables>;

/**
 * __useAdminEditEventMutation__
 *
 * To run a mutation, you first call `useAdminEditEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEditEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEditEventMutation, { data, loading, error }] = useAdminEditEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useAdminEditEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminEditEventMutation, AdminEditEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminEditEventMutation, AdminEditEventMutationVariables>(AdminEditEventDocument, options);
      }
export type AdminEditEventMutationHookResult = ReturnType<typeof useAdminEditEventMutation>;
export type AdminEditEventMutationResult = Apollo.MutationResult<AdminEditEventMutation>;
export type AdminEditEventMutationOptions = Apollo.BaseMutationOptions<AdminEditEventMutation, AdminEditEventMutationVariables>;
export const GetUpcomingEventsDocument = gql`
    query GetUpcomingEvents($pagination: CursorPaginationOptions) {
  getUpcomingEvents(pagination: $pagination) {
    ...EventFields
    friendsFollowingPreview {
      username
      id
      profilePicture {
        url
        blurhash
      }
    }
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetUpcomingEventsQuery__
 *
 * To run a query within a React component, call `useGetUpcomingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingEventsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetUpcomingEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetUpcomingEventsQuery, GetUpcomingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingEventsQuery, GetUpcomingEventsQueryVariables>(GetUpcomingEventsDocument, options);
      }
export function useGetUpcomingEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingEventsQuery, GetUpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingEventsQuery, GetUpcomingEventsQueryVariables>(GetUpcomingEventsDocument, options);
        }
export type GetUpcomingEventsQueryHookResult = ReturnType<typeof useGetUpcomingEventsQuery>;
export type GetUpcomingEventsLazyQueryHookResult = ReturnType<typeof useGetUpcomingEventsLazyQuery>;
export type GetUpcomingEventsQueryResult = Apollo.QueryResult<GetUpcomingEventsQuery, GetUpcomingEventsQueryVariables>;
export const UnfollowEventDocument = gql`
    mutation UnfollowEvent($eventId: ID!) {
  unfollowEvent(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type UnfollowEventMutationFn = Apollo.MutationFunction<UnfollowEventMutation, UnfollowEventMutationVariables>;

/**
 * __useUnfollowEventMutation__
 *
 * To run a mutation, you first call `useUnfollowEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowEventMutation, { data, loading, error }] = useUnfollowEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useUnfollowEventMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowEventMutation, UnfollowEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowEventMutation, UnfollowEventMutationVariables>(UnfollowEventDocument, options);
      }
export type UnfollowEventMutationHookResult = ReturnType<typeof useUnfollowEventMutation>;
export type UnfollowEventMutationResult = Apollo.MutationResult<UnfollowEventMutation>;
export type UnfollowEventMutationOptions = Apollo.BaseMutationOptions<UnfollowEventMutation, UnfollowEventMutationVariables>;
export const FollowEventDocument = gql`
    mutation FollowEvent($eventId: ID!) {
  followEvent(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type FollowEventMutationFn = Apollo.MutationFunction<FollowEventMutation, FollowEventMutationVariables>;

/**
 * __useFollowEventMutation__
 *
 * To run a mutation, you first call `useFollowEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followEventMutation, { data, loading, error }] = useFollowEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useFollowEventMutation(baseOptions?: Apollo.MutationHookOptions<FollowEventMutation, FollowEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowEventMutation, FollowEventMutationVariables>(FollowEventDocument, options);
      }
export type FollowEventMutationHookResult = ReturnType<typeof useFollowEventMutation>;
export type FollowEventMutationResult = Apollo.MutationResult<FollowEventMutation>;
export type FollowEventMutationOptions = Apollo.BaseMutationOptions<FollowEventMutation, FollowEventMutationVariables>;
export const GetFriendsInEventDocument = gql`
    query GetFriendsInEvent($eventId: ID!) {
  getFriendsInEvent(eventId: $eventId) {
    id
    username
    phoneNumber
    profilePicture {
      url
      blurhash
    }
  }
}
    `;

/**
 * __useGetFriendsInEventQuery__
 *
 * To run a query within a React component, call `useGetFriendsInEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsInEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsInEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetFriendsInEventQuery(baseOptions: Apollo.QueryHookOptions<GetFriendsInEventQuery, GetFriendsInEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsInEventQuery, GetFriendsInEventQueryVariables>(GetFriendsInEventDocument, options);
      }
export function useGetFriendsInEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsInEventQuery, GetFriendsInEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsInEventQuery, GetFriendsInEventQueryVariables>(GetFriendsInEventDocument, options);
        }
export type GetFriendsInEventQueryHookResult = ReturnType<typeof useGetFriendsInEventQuery>;
export type GetFriendsInEventLazyQueryHookResult = ReturnType<typeof useGetFriendsInEventLazyQuery>;
export type GetFriendsInEventQueryResult = Apollo.QueryResult<GetFriendsInEventQuery, GetFriendsInEventQueryVariables>;
export const GetUsersFollowingEventDocument = gql`
    query GetUsersFollowingEvent($eventId: ID!, $pagination: CursorPaginationOptions) {
  getUsersFollowingEvent(eventId: $eventId, pagination: $pagination) {
    id
    username
    phoneNumber
    profilePicture {
      url
      blurhash
    }
    spotInfo {
      areFriends
      createdAt
    }
  }
}
    `;

/**
 * __useGetUsersFollowingEventQuery__
 *
 * To run a query within a React component, call `useGetUsersFollowingEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersFollowingEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersFollowingEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetUsersFollowingEventQuery(baseOptions: Apollo.QueryHookOptions<GetUsersFollowingEventQuery, GetUsersFollowingEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersFollowingEventQuery, GetUsersFollowingEventQueryVariables>(GetUsersFollowingEventDocument, options);
      }
export function useGetUsersFollowingEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersFollowingEventQuery, GetUsersFollowingEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersFollowingEventQuery, GetUsersFollowingEventQueryVariables>(GetUsersFollowingEventDocument, options);
        }
export type GetUsersFollowingEventQueryHookResult = ReturnType<typeof useGetUsersFollowingEventQuery>;
export type GetUsersFollowingEventLazyQueryHookResult = ReturnType<typeof useGetUsersFollowingEventLazyQuery>;
export type GetUsersFollowingEventQueryResult = Apollo.QueryResult<GetUsersFollowingEventQuery, GetUsersFollowingEventQueryVariables>;
export const GetEventsToReviewDocument = gql`
    query GetEventsToReview($pagination: CursorPaginationOptions) {
  getEventsToReview(pagination: $pagination) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetEventsToReviewQuery__
 *
 * To run a query within a React component, call `useGetEventsToReviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsToReviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsToReviewQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetEventsToReviewQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsToReviewQuery, GetEventsToReviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsToReviewQuery, GetEventsToReviewQueryVariables>(GetEventsToReviewDocument, options);
      }
export function useGetEventsToReviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsToReviewQuery, GetEventsToReviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsToReviewQuery, GetEventsToReviewQueryVariables>(GetEventsToReviewDocument, options);
        }
export type GetEventsToReviewQueryHookResult = ReturnType<typeof useGetEventsToReviewQuery>;
export type GetEventsToReviewLazyQueryHookResult = ReturnType<typeof useGetEventsToReviewLazyQuery>;
export type GetEventsToReviewQueryResult = Apollo.QueryResult<GetEventsToReviewQuery, GetEventsToReviewQueryVariables>;
export const GetFollowedEventsDocument = gql`
    query GetFollowedEvents($pagination: CursorPaginationOptions) {
  getFollowedEvents(pagination: $pagination) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetFollowedEventsQuery__
 *
 * To run a query within a React component, call `useGetFollowedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowedEventsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetFollowedEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowedEventsQuery, GetFollowedEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowedEventsQuery, GetFollowedEventsQueryVariables>(GetFollowedEventsDocument, options);
      }
export function useGetFollowedEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowedEventsQuery, GetFollowedEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowedEventsQuery, GetFollowedEventsQueryVariables>(GetFollowedEventsDocument, options);
        }
export type GetFollowedEventsQueryHookResult = ReturnType<typeof useGetFollowedEventsQuery>;
export type GetFollowedEventsLazyQueryHookResult = ReturnType<typeof useGetFollowedEventsLazyQuery>;
export type GetFollowedEventsQueryResult = Apollo.QueryResult<GetFollowedEventsQuery, GetFollowedEventsQueryVariables>;
export const GetOfficialEventsDocument = gql`
    query GetOfficialEvents {
  getOfficialEvents {
    ...EventFields
    PRs {
      name
      userId
    }
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetOfficialEventsQuery__
 *
 * To run a query within a React component, call `useGetOfficialEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOfficialEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOfficialEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOfficialEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetOfficialEventsQuery, GetOfficialEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOfficialEventsQuery, GetOfficialEventsQueryVariables>(GetOfficialEventsDocument, options);
      }
export function useGetOfficialEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOfficialEventsQuery, GetOfficialEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOfficialEventsQuery, GetOfficialEventsQueryVariables>(GetOfficialEventsDocument, options);
        }
export type GetOfficialEventsQueryHookResult = ReturnType<typeof useGetOfficialEventsQuery>;
export type GetOfficialEventsLazyQueryHookResult = ReturnType<typeof useGetOfficialEventsLazyQuery>;
export type GetOfficialEventsQueryResult = Apollo.QueryResult<GetOfficialEventsQuery, GetOfficialEventsQueryVariables>;
export const AdminScanTicketDocument = gql`
    mutation AdminScanTicket($ticketId: ID!, $ticketCode: ID!, $eventId: ID!) {
  adminScanTicket(ticketId: $ticketId, ticketCode: $ticketCode, eventId: $eventId) {
    success
    errorCode
    package {
      ...EventPackageFields
    }
    ticket {
      id
      adminNote
      createdAt
      userIdentity {
        firstName
        lastName
        birthday
        gender
      }
      notPaid
      paymentType
    }
  }
}
    ${EventPackageFieldsFragmentDoc}`;
export type AdminScanTicketMutationFn = Apollo.MutationFunction<AdminScanTicketMutation, AdminScanTicketMutationVariables>;

/**
 * __useAdminScanTicketMutation__
 *
 * To run a mutation, you first call `useAdminScanTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminScanTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminScanTicketMutation, { data, loading, error }] = useAdminScanTicketMutation({
 *   variables: {
 *      ticketId: // value for 'ticketId'
 *      ticketCode: // value for 'ticketCode'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminScanTicketMutation(baseOptions?: Apollo.MutationHookOptions<AdminScanTicketMutation, AdminScanTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminScanTicketMutation, AdminScanTicketMutationVariables>(AdminScanTicketDocument, options);
      }
export type AdminScanTicketMutationHookResult = ReturnType<typeof useAdminScanTicketMutation>;
export type AdminScanTicketMutationResult = Apollo.MutationResult<AdminScanTicketMutation>;
export type AdminScanTicketMutationOptions = Apollo.BaseMutationOptions<AdminScanTicketMutation, AdminScanTicketMutationVariables>;
export const SendEventInvitationRequestDocument = gql`
    mutation SendEventInvitationRequest($eventId: ID!, $mode: RequestContactMode!) {
  sendEventInvitationRequest(eventId: $eventId, mode: $mode) {
    success
  }
}
    `;
export type SendEventInvitationRequestMutationFn = Apollo.MutationFunction<SendEventInvitationRequestMutation, SendEventInvitationRequestMutationVariables>;

/**
 * __useSendEventInvitationRequestMutation__
 *
 * To run a mutation, you first call `useSendEventInvitationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEventInvitationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEventInvitationRequestMutation, { data, loading, error }] = useSendEventInvitationRequestMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useSendEventInvitationRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendEventInvitationRequestMutation, SendEventInvitationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendEventInvitationRequestMutation, SendEventInvitationRequestMutationVariables>(SendEventInvitationRequestDocument, options);
      }
export type SendEventInvitationRequestMutationHookResult = ReturnType<typeof useSendEventInvitationRequestMutation>;
export type SendEventInvitationRequestMutationResult = Apollo.MutationResult<SendEventInvitationRequestMutation>;
export type SendEventInvitationRequestMutationOptions = Apollo.BaseMutationOptions<SendEventInvitationRequestMutation, SendEventInvitationRequestMutationVariables>;
export const RequestPackageToPrDocument = gql`
    mutation RequestPackageToPr($eventId: ID!, $packageId: ID!, $prId: ID!) {
  requestPackageToPr(eventId: $eventId, packageId: $packageId, prId: $prId) {
    success
    alreadyRequested
    errorCode
    invitation {
      id
      pr {
        userId
        name
      }
    }
  }
}
    `;
export type RequestPackageToPrMutationFn = Apollo.MutationFunction<RequestPackageToPrMutation, RequestPackageToPrMutationVariables>;

/**
 * __useRequestPackageToPrMutation__
 *
 * To run a mutation, you first call `useRequestPackageToPrMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPackageToPrMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPackageToPrMutation, { data, loading, error }] = useRequestPackageToPrMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *      prId: // value for 'prId'
 *   },
 * });
 */
export function useRequestPackageToPrMutation(baseOptions?: Apollo.MutationHookOptions<RequestPackageToPrMutation, RequestPackageToPrMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPackageToPrMutation, RequestPackageToPrMutationVariables>(RequestPackageToPrDocument, options);
      }
export type RequestPackageToPrMutationHookResult = ReturnType<typeof useRequestPackageToPrMutation>;
export type RequestPackageToPrMutationResult = Apollo.MutationResult<RequestPackageToPrMutation>;
export type RequestPackageToPrMutationOptions = Apollo.BaseMutationOptions<RequestPackageToPrMutation, RequestPackageToPrMutationVariables>;
export const RemoveEventRequestDocument = gql`
    mutation RemoveEventRequest($invitationId: ID!) {
  removeEventRequest(invitationId: $invitationId) {
    success
  }
}
    `;
export type RemoveEventRequestMutationFn = Apollo.MutationFunction<RemoveEventRequestMutation, RemoveEventRequestMutationVariables>;

/**
 * __useRemoveEventRequestMutation__
 *
 * To run a mutation, you first call `useRemoveEventRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEventRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEventRequestMutation, { data, loading, error }] = useRemoveEventRequestMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useRemoveEventRequestMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEventRequestMutation, RemoveEventRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEventRequestMutation, RemoveEventRequestMutationVariables>(RemoveEventRequestDocument, options);
      }
export type RemoveEventRequestMutationHookResult = ReturnType<typeof useRemoveEventRequestMutation>;
export type RemoveEventRequestMutationResult = Apollo.MutationResult<RemoveEventRequestMutation>;
export type RemoveEventRequestMutationOptions = Apollo.BaseMutationOptions<RemoveEventRequestMutation, RemoveEventRequestMutationVariables>;
export const AdminAcceptInvitationRequestDocument = gql`
    mutation AdminAcceptInvitationRequest($userId: ID!, $eventId: ID!) {
  adminAcceptInvitationRequest(userId: $userId, eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type AdminAcceptInvitationRequestMutationFn = Apollo.MutationFunction<AdminAcceptInvitationRequestMutation, AdminAcceptInvitationRequestMutationVariables>;

/**
 * __useAdminAcceptInvitationRequestMutation__
 *
 * To run a mutation, you first call `useAdminAcceptInvitationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAcceptInvitationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAcceptInvitationRequestMutation, { data, loading, error }] = useAdminAcceptInvitationRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminAcceptInvitationRequestMutation(baseOptions?: Apollo.MutationHookOptions<AdminAcceptInvitationRequestMutation, AdminAcceptInvitationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminAcceptInvitationRequestMutation, AdminAcceptInvitationRequestMutationVariables>(AdminAcceptInvitationRequestDocument, options);
      }
export type AdminAcceptInvitationRequestMutationHookResult = ReturnType<typeof useAdminAcceptInvitationRequestMutation>;
export type AdminAcceptInvitationRequestMutationResult = Apollo.MutationResult<AdminAcceptInvitationRequestMutation>;
export type AdminAcceptInvitationRequestMutationOptions = Apollo.BaseMutationOptions<AdminAcceptInvitationRequestMutation, AdminAcceptInvitationRequestMutationVariables>;
export const AdminRejectInvitationRequestDocument = gql`
    mutation AdminRejectInvitationRequest($userId: ID!, $eventId: ID!) {
  adminRejectInvitationRequest(userId: $userId, eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type AdminRejectInvitationRequestMutationFn = Apollo.MutationFunction<AdminRejectInvitationRequestMutation, AdminRejectInvitationRequestMutationVariables>;

/**
 * __useAdminRejectInvitationRequestMutation__
 *
 * To run a mutation, you first call `useAdminRejectInvitationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRejectInvitationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRejectInvitationRequestMutation, { data, loading, error }] = useAdminRejectInvitationRequestMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminRejectInvitationRequestMutation(baseOptions?: Apollo.MutationHookOptions<AdminRejectInvitationRequestMutation, AdminRejectInvitationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminRejectInvitationRequestMutation, AdminRejectInvitationRequestMutationVariables>(AdminRejectInvitationRequestDocument, options);
      }
export type AdminRejectInvitationRequestMutationHookResult = ReturnType<typeof useAdminRejectInvitationRequestMutation>;
export type AdminRejectInvitationRequestMutationResult = Apollo.MutationResult<AdminRejectInvitationRequestMutation>;
export type AdminRejectInvitationRequestMutationOptions = Apollo.BaseMutationOptions<AdminRejectInvitationRequestMutation, AdminRejectInvitationRequestMutationVariables>;
export const AdminGetTicketingStatsDocument = gql`
    query AdminGetTicketingStats($eventId: ID!) {
  adminGetTicketingStats(eventId: $eventId) {
    totalTickets
    packages {
      package {
        id
        name
      }
      count
    }
    paymentTypes {
      type
      count
    }
  }
}
    `;

/**
 * __useAdminGetTicketingStatsQuery__
 *
 * To run a query within a React component, call `useAdminGetTicketingStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetTicketingStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetTicketingStatsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminGetTicketingStatsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetTicketingStatsQuery, AdminGetTicketingStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetTicketingStatsQuery, AdminGetTicketingStatsQueryVariables>(AdminGetTicketingStatsDocument, options);
      }
export function useAdminGetTicketingStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetTicketingStatsQuery, AdminGetTicketingStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetTicketingStatsQuery, AdminGetTicketingStatsQueryVariables>(AdminGetTicketingStatsDocument, options);
        }
export type AdminGetTicketingStatsQueryHookResult = ReturnType<typeof useAdminGetTicketingStatsQuery>;
export type AdminGetTicketingStatsLazyQueryHookResult = ReturnType<typeof useAdminGetTicketingStatsLazyQuery>;
export type AdminGetTicketingStatsQueryResult = Apollo.QueryResult<AdminGetTicketingStatsQuery, AdminGetTicketingStatsQueryVariables>;
export const AdminGetEventTicketsDocument = gql`
    query AdminGetEventTickets($eventId: ID!, $pagination: CursorPaginationOptions) {
  adminGetEventTickets(eventId: $eventId, pagination: $pagination) {
    id
    used
    createdAt
    userId
    userIdentity {
      gender
      birthday
      firstName
      lastName
    }
    pr {
      name
      userId
    }
    paymentType
    packageId
    revoked
    eventInfo {
      package {
        name
        id
        code
      }
    }
  }
}
    `;

/**
 * __useAdminGetEventTicketsQuery__
 *
 * To run a query within a React component, call `useAdminGetEventTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEventTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEventTicketsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminGetEventTicketsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEventTicketsQuery, AdminGetEventTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEventTicketsQuery, AdminGetEventTicketsQueryVariables>(AdminGetEventTicketsDocument, options);
      }
export function useAdminGetEventTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEventTicketsQuery, AdminGetEventTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEventTicketsQuery, AdminGetEventTicketsQueryVariables>(AdminGetEventTicketsDocument, options);
        }
export type AdminGetEventTicketsQueryHookResult = ReturnType<typeof useAdminGetEventTicketsQuery>;
export type AdminGetEventTicketsLazyQueryHookResult = ReturnType<typeof useAdminGetEventTicketsLazyQuery>;
export type AdminGetEventTicketsQueryResult = Apollo.QueryResult<AdminGetEventTicketsQuery, AdminGetEventTicketsQueryVariables>;
export const AdminGetEventPrTicketsDocument = gql`
    query AdminGetEventPrTickets($eventId: ID!, $prId: ID!, $pagination: CursorPaginationOptions) {
  adminGetEventPrTickets(eventId: $eventId, prId: $prId, pagination: $pagination) {
    id
    used
    createdAt
    userId
    userIdentity {
      gender
      birthday
      firstName
      lastName
    }
    packageId
    revoked
    eventInfo {
      package {
        name
        id
        code
      }
    }
  }
}
    `;

/**
 * __useAdminGetEventPrTicketsQuery__
 *
 * To run a query within a React component, call `useAdminGetEventPrTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEventPrTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEventPrTicketsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      prId: // value for 'prId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useAdminGetEventPrTicketsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEventPrTicketsQuery, AdminGetEventPrTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEventPrTicketsQuery, AdminGetEventPrTicketsQueryVariables>(AdminGetEventPrTicketsDocument, options);
      }
export function useAdminGetEventPrTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEventPrTicketsQuery, AdminGetEventPrTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEventPrTicketsQuery, AdminGetEventPrTicketsQueryVariables>(AdminGetEventPrTicketsDocument, options);
        }
export type AdminGetEventPrTicketsQueryHookResult = ReturnType<typeof useAdminGetEventPrTicketsQuery>;
export type AdminGetEventPrTicketsLazyQueryHookResult = ReturnType<typeof useAdminGetEventPrTicketsLazyQuery>;
export type AdminGetEventPrTicketsQueryResult = Apollo.QueryResult<AdminGetEventPrTicketsQuery, AdminGetEventPrTicketsQueryVariables>;
export const GetEventPRsDocument = gql`
    query GetEventPRs($eventId: ID!) {
  getEventPRs(eventId: $eventId) {
    ...PrFields
  }
}
    ${PrFieldsFragmentDoc}`;

/**
 * __useGetEventPRsQuery__
 *
 * To run a query within a React component, call `useGetEventPRsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventPRsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventPRsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventPRsQuery(baseOptions: Apollo.QueryHookOptions<GetEventPRsQuery, GetEventPRsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventPRsQuery, GetEventPRsQueryVariables>(GetEventPRsDocument, options);
      }
export function useGetEventPRsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventPRsQuery, GetEventPRsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventPRsQuery, GetEventPRsQueryVariables>(GetEventPRsDocument, options);
        }
export type GetEventPRsQueryHookResult = ReturnType<typeof useGetEventPRsQuery>;
export type GetEventPRsLazyQueryHookResult = ReturnType<typeof useGetEventPRsLazyQuery>;
export type GetEventPRsQueryResult = Apollo.QueryResult<GetEventPRsQuery, GetEventPRsQueryVariables>;
export const AdminAddPrToEventDocument = gql`
    mutation AdminAddPrToEvent($prId: ID!, $eventId: ID!) {
  adminAddPrToEvent(eventId: $eventId, prId: $prId) {
    success
    errorCode
    alreadyPr
    pr {
      ...PrFields
    }
  }
}
    ${PrFieldsFragmentDoc}`;
export type AdminAddPrToEventMutationFn = Apollo.MutationFunction<AdminAddPrToEventMutation, AdminAddPrToEventMutationVariables>;

/**
 * __useAdminAddPrToEventMutation__
 *
 * To run a mutation, you first call `useAdminAddPrToEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAddPrToEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAddPrToEventMutation, { data, loading, error }] = useAdminAddPrToEventMutation({
 *   variables: {
 *      prId: // value for 'prId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminAddPrToEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminAddPrToEventMutation, AdminAddPrToEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminAddPrToEventMutation, AdminAddPrToEventMutationVariables>(AdminAddPrToEventDocument, options);
      }
export type AdminAddPrToEventMutationHookResult = ReturnType<typeof useAdminAddPrToEventMutation>;
export type AdminAddPrToEventMutationResult = Apollo.MutationResult<AdminAddPrToEventMutation>;
export type AdminAddPrToEventMutationOptions = Apollo.BaseMutationOptions<AdminAddPrToEventMutation, AdminAddPrToEventMutationVariables>;
export const AdminRemovePrFromEventDocument = gql`
    mutation AdminRemovePrFromEvent($prId: ID!, $eventId: ID!) {
  adminRemovePrFromEvent(eventId: $eventId, prId: $prId) {
    success
    errorCode
  }
}
    `;
export type AdminRemovePrFromEventMutationFn = Apollo.MutationFunction<AdminRemovePrFromEventMutation, AdminRemovePrFromEventMutationVariables>;

/**
 * __useAdminRemovePrFromEventMutation__
 *
 * To run a mutation, you first call `useAdminRemovePrFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRemovePrFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRemovePrFromEventMutation, { data, loading, error }] = useAdminRemovePrFromEventMutation({
 *   variables: {
 *      prId: // value for 'prId'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminRemovePrFromEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminRemovePrFromEventMutation, AdminRemovePrFromEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminRemovePrFromEventMutation, AdminRemovePrFromEventMutationVariables>(AdminRemovePrFromEventDocument, options);
      }
export type AdminRemovePrFromEventMutationHookResult = ReturnType<typeof useAdminRemovePrFromEventMutation>;
export type AdminRemovePrFromEventMutationResult = Apollo.MutationResult<AdminRemovePrFromEventMutation>;
export type AdminRemovePrFromEventMutationOptions = Apollo.BaseMutationOptions<AdminRemovePrFromEventMutation, AdminRemovePrFromEventMutationVariables>;
export const MyPrInfoDocument = gql`
    query MyPrInfo($eventId: ID!, $pagination: CursorPaginationOptions) {
  getMyPrInfo(eventId: $eventId) {
    ...PrFields
  }
  getMyPrInvitationRequests(eventId: $eventId, pagination: $pagination) {
    id
    userId
    userDoc {
      username
      profilePicture {
        url
        blurhash
      }
      firstName
      lastName
      birthday
      gender
    }
    packageId
    packageDoc {
      ...EventPackageFields
    }
  }
}
    ${PrFieldsFragmentDoc}
${EventPackageFieldsFragmentDoc}`;

/**
 * __useMyPrInfoQuery__
 *
 * To run a query within a React component, call `useMyPrInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPrInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPrInfoQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMyPrInfoQuery(baseOptions: Apollo.QueryHookOptions<MyPrInfoQuery, MyPrInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPrInfoQuery, MyPrInfoQueryVariables>(MyPrInfoDocument, options);
      }
export function useMyPrInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPrInfoQuery, MyPrInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPrInfoQuery, MyPrInfoQueryVariables>(MyPrInfoDocument, options);
        }
export type MyPrInfoQueryHookResult = ReturnType<typeof useMyPrInfoQuery>;
export type MyPrInfoLazyQueryHookResult = ReturnType<typeof useMyPrInfoLazyQuery>;
export type MyPrInfoQueryResult = Apollo.QueryResult<MyPrInfoQuery, MyPrInfoQueryVariables>;
export const AdminEditPrPackagesAvailabilityDocument = gql`
    mutation AdminEditPrPackagesAvailability($prId: ID!, $eventId: ID!, $packages: [PRPackageAvailabilityInput!]!) {
  adminEditPrPackagesAvailability(
    prId: $prId
    eventId: $eventId
    packages: $packages
  ) {
    ...PrFields
  }
}
    ${PrFieldsFragmentDoc}`;
export type AdminEditPrPackagesAvailabilityMutationFn = Apollo.MutationFunction<AdminEditPrPackagesAvailabilityMutation, AdminEditPrPackagesAvailabilityMutationVariables>;

/**
 * __useAdminEditPrPackagesAvailabilityMutation__
 *
 * To run a mutation, you first call `useAdminEditPrPackagesAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEditPrPackagesAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEditPrPackagesAvailabilityMutation, { data, loading, error }] = useAdminEditPrPackagesAvailabilityMutation({
 *   variables: {
 *      prId: // value for 'prId'
 *      eventId: // value for 'eventId'
 *      packages: // value for 'packages'
 *   },
 * });
 */
export function useAdminEditPrPackagesAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<AdminEditPrPackagesAvailabilityMutation, AdminEditPrPackagesAvailabilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminEditPrPackagesAvailabilityMutation, AdminEditPrPackagesAvailabilityMutationVariables>(AdminEditPrPackagesAvailabilityDocument, options);
      }
export type AdminEditPrPackagesAvailabilityMutationHookResult = ReturnType<typeof useAdminEditPrPackagesAvailabilityMutation>;
export type AdminEditPrPackagesAvailabilityMutationResult = Apollo.MutationResult<AdminEditPrPackagesAvailabilityMutation>;
export type AdminEditPrPackagesAvailabilityMutationOptions = Apollo.BaseMutationOptions<AdminEditPrPackagesAvailabilityMutation, AdminEditPrPackagesAvailabilityMutationVariables>;
export const EditMyPrInfoDocument = gql`
    mutation editMyPrInfo($name: String, $phoneNumber: String, $eventId: ID!) {
  editMyPrInfo(name: $name, phoneNumber: $phoneNumber, eventId: $eventId) {
    ...PrFields
  }
}
    ${PrFieldsFragmentDoc}`;
export type EditMyPrInfoMutationFn = Apollo.MutationFunction<EditMyPrInfoMutation, EditMyPrInfoMutationVariables>;

/**
 * __useEditMyPrInfoMutation__
 *
 * To run a mutation, you first call `useEditMyPrInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditMyPrInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editMyPrInfoMutation, { data, loading, error }] = useEditMyPrInfoMutation({
 *   variables: {
 *      name: // value for 'name'
 *      phoneNumber: // value for 'phoneNumber'
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEditMyPrInfoMutation(baseOptions?: Apollo.MutationHookOptions<EditMyPrInfoMutation, EditMyPrInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditMyPrInfoMutation, EditMyPrInfoMutationVariables>(EditMyPrInfoDocument, options);
      }
export type EditMyPrInfoMutationHookResult = ReturnType<typeof useEditMyPrInfoMutation>;
export type EditMyPrInfoMutationResult = Apollo.MutationResult<EditMyPrInfoMutation>;
export type EditMyPrInfoMutationOptions = Apollo.BaseMutationOptions<EditMyPrInfoMutation, EditMyPrInfoMutationVariables>;
export const AdminRevokeUserTicketDocument = gql`
    mutation AdminRevokeUserTicket($eventId: ID!, $ticketId: ID!) {
  adminRevokeUserTicket(eventId: $eventId, ticketId: $ticketId) {
    success
    errorCode
  }
}
    `;
export type AdminRevokeUserTicketMutationFn = Apollo.MutationFunction<AdminRevokeUserTicketMutation, AdminRevokeUserTicketMutationVariables>;

/**
 * __useAdminRevokeUserTicketMutation__
 *
 * To run a mutation, you first call `useAdminRevokeUserTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRevokeUserTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRevokeUserTicketMutation, { data, loading, error }] = useAdminRevokeUserTicketMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      ticketId: // value for 'ticketId'
 *   },
 * });
 */
export function useAdminRevokeUserTicketMutation(baseOptions?: Apollo.MutationHookOptions<AdminRevokeUserTicketMutation, AdminRevokeUserTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminRevokeUserTicketMutation, AdminRevokeUserTicketMutationVariables>(AdminRevokeUserTicketDocument, options);
      }
export type AdminRevokeUserTicketMutationHookResult = ReturnType<typeof useAdminRevokeUserTicketMutation>;
export type AdminRevokeUserTicketMutationResult = Apollo.MutationResult<AdminRevokeUserTicketMutation>;
export type AdminRevokeUserTicketMutationOptions = Apollo.BaseMutationOptions<AdminRevokeUserTicketMutation, AdminRevokeUserTicketMutationVariables>;
export const AdminDeleteEventDocument = gql`
    mutation AdminDeleteEvent($eventId: ID!) {
  adminDeleteEvent(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type AdminDeleteEventMutationFn = Apollo.MutationFunction<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>;

/**
 * __useAdminDeleteEventMutation__
 *
 * To run a mutation, you first call `useAdminDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteEventMutation, { data, loading, error }] = useAdminDeleteEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminDeleteEventMutation(baseOptions?: Apollo.MutationHookOptions<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>(AdminDeleteEventDocument, options);
      }
export type AdminDeleteEventMutationHookResult = ReturnType<typeof useAdminDeleteEventMutation>;
export type AdminDeleteEventMutationResult = Apollo.MutationResult<AdminDeleteEventMutation>;
export type AdminDeleteEventMutationOptions = Apollo.BaseMutationOptions<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>;
export const AdminMarkEventAsEndedDocument = gql`
    mutation AdminMarkEventAsEnded($eventId: ID!) {
  adminMarkEventAsEnded(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type AdminMarkEventAsEndedMutationFn = Apollo.MutationFunction<AdminMarkEventAsEndedMutation, AdminMarkEventAsEndedMutationVariables>;

/**
 * __useAdminMarkEventAsEndedMutation__
 *
 * To run a mutation, you first call `useAdminMarkEventAsEndedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminMarkEventAsEndedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminMarkEventAsEndedMutation, { data, loading, error }] = useAdminMarkEventAsEndedMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminMarkEventAsEndedMutation(baseOptions?: Apollo.MutationHookOptions<AdminMarkEventAsEndedMutation, AdminMarkEventAsEndedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminMarkEventAsEndedMutation, AdminMarkEventAsEndedMutationVariables>(AdminMarkEventAsEndedDocument, options);
      }
export type AdminMarkEventAsEndedMutationHookResult = ReturnType<typeof useAdminMarkEventAsEndedMutation>;
export type AdminMarkEventAsEndedMutationResult = Apollo.MutationResult<AdminMarkEventAsEndedMutation>;
export type AdminMarkEventAsEndedMutationOptions = Apollo.BaseMutationOptions<AdminMarkEventAsEndedMutation, AdminMarkEventAsEndedMutationVariables>;
export const ReleaseEventDocument = gql`
    mutation ReleaseEvent($eventId: ID!) {
  releaseEvent(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type ReleaseEventMutationFn = Apollo.MutationFunction<ReleaseEventMutation, ReleaseEventMutationVariables>;

/**
 * __useReleaseEventMutation__
 *
 * To run a mutation, you first call `useReleaseEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReleaseEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [releaseEventMutation, { data, loading, error }] = useReleaseEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useReleaseEventMutation(baseOptions?: Apollo.MutationHookOptions<ReleaseEventMutation, ReleaseEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReleaseEventMutation, ReleaseEventMutationVariables>(ReleaseEventDocument, options);
      }
export type ReleaseEventMutationHookResult = ReturnType<typeof useReleaseEventMutation>;
export type ReleaseEventMutationResult = Apollo.MutationResult<ReleaseEventMutation>;
export type ReleaseEventMutationOptions = Apollo.BaseMutationOptions<ReleaseEventMutation, ReleaseEventMutationVariables>;
export const GetMyEventsDocument = gql`
    query getMyEvents($pagination: CursorPaginationOptions) {
  getMyEvents(pagination: $pagination) {
    ...EventFields
    released
    releaseDate
    myRoles
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetMyEventsQuery__
 *
 * To run a query within a React component, call `useGetMyEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEventsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyEventsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
      }
export function useGetMyEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyEventsQuery, GetMyEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyEventsQuery, GetMyEventsQueryVariables>(GetMyEventsDocument, options);
        }
export type GetMyEventsQueryHookResult = ReturnType<typeof useGetMyEventsQuery>;
export type GetMyEventsLazyQueryHookResult = ReturnType<typeof useGetMyEventsLazyQuery>;
export type GetMyEventsQueryResult = Apollo.QueryResult<GetMyEventsQuery, GetMyEventsQueryVariables>;
export const GetEventsRolesDocument = gql`
    query GetEventsRoles($eventId: ID!) {
  getEventsRoles(eventId: $eventId) {
    roles
    user {
      username
      id
      profilePicture {
        url
        blurhash
      }
    }
  }
}
    `;

/**
 * __useGetEventsRolesQuery__
 *
 * To run a query within a React component, call `useGetEventsRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsRolesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventsRolesQuery(baseOptions: Apollo.QueryHookOptions<GetEventsRolesQuery, GetEventsRolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsRolesQuery, GetEventsRolesQueryVariables>(GetEventsRolesDocument, options);
      }
export function useGetEventsRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsRolesQuery, GetEventsRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsRolesQuery, GetEventsRolesQueryVariables>(GetEventsRolesDocument, options);
        }
export type GetEventsRolesQueryHookResult = ReturnType<typeof useGetEventsRolesQuery>;
export type GetEventsRolesLazyQueryHookResult = ReturnType<typeof useGetEventsRolesLazyQuery>;
export type GetEventsRolesQueryResult = Apollo.QueryResult<GetEventsRolesQuery, GetEventsRolesQueryVariables>;
export const CancelEventSchedulingDocument = gql`
    mutation CancelEventScheduling($eventId: ID!) {
  cancelEventScheduling(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type CancelEventSchedulingMutationFn = Apollo.MutationFunction<CancelEventSchedulingMutation, CancelEventSchedulingMutationVariables>;

/**
 * __useCancelEventSchedulingMutation__
 *
 * To run a mutation, you first call `useCancelEventSchedulingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelEventSchedulingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelEventSchedulingMutation, { data, loading, error }] = useCancelEventSchedulingMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useCancelEventSchedulingMutation(baseOptions?: Apollo.MutationHookOptions<CancelEventSchedulingMutation, CancelEventSchedulingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelEventSchedulingMutation, CancelEventSchedulingMutationVariables>(CancelEventSchedulingDocument, options);
      }
export type CancelEventSchedulingMutationHookResult = ReturnType<typeof useCancelEventSchedulingMutation>;
export type CancelEventSchedulingMutationResult = Apollo.MutationResult<CancelEventSchedulingMutation>;
export type CancelEventSchedulingMutationOptions = Apollo.BaseMutationOptions<CancelEventSchedulingMutation, CancelEventSchedulingMutationVariables>;
export const CreateEventPackageDocument = gql`
    mutation CreateEventPackage($eventId: ID!, $name: String!, $userPrice: Int!, $currency: String!, $paymentTypes: [EventPackagePaymentType!]!, $type: EventPackageType, $hidden: Boolean, $minAge: Int, $sex: EventPackageSexType, $drinks: Int, $skipLine: Boolean, $maxTickets: Int, $maxTicketsPerUser: Int) {
  createEventPackage(
    eventId: $eventId
    name: $name
    userPrice: $userPrice
    currency: $currency
    paymentTypes: $paymentTypes
    type: $type
    hidden: $hidden
    minAge: $minAge
    sex: $sex
    drinks: $drinks
    skipLine: $skipLine
    maxTickets: $maxTickets
    maxTicketsPerUser: $maxTicketsPerUser
  ) {
    success
    errorCode
    package {
      ...EventPackageFields
    }
  }
}
    ${EventPackageFieldsFragmentDoc}`;
export type CreateEventPackageMutationFn = Apollo.MutationFunction<CreateEventPackageMutation, CreateEventPackageMutationVariables>;

/**
 * __useCreateEventPackageMutation__
 *
 * To run a mutation, you first call `useCreateEventPackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventPackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventPackageMutation, { data, loading, error }] = useCreateEventPackageMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      name: // value for 'name'
 *      userPrice: // value for 'userPrice'
 *      currency: // value for 'currency'
 *      paymentTypes: // value for 'paymentTypes'
 *      type: // value for 'type'
 *      hidden: // value for 'hidden'
 *      minAge: // value for 'minAge'
 *      sex: // value for 'sex'
 *      drinks: // value for 'drinks'
 *      skipLine: // value for 'skipLine'
 *      maxTickets: // value for 'maxTickets'
 *      maxTicketsPerUser: // value for 'maxTicketsPerUser'
 *   },
 * });
 */
export function useCreateEventPackageMutation(baseOptions?: Apollo.MutationHookOptions<CreateEventPackageMutation, CreateEventPackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEventPackageMutation, CreateEventPackageMutationVariables>(CreateEventPackageDocument, options);
      }
export type CreateEventPackageMutationHookResult = ReturnType<typeof useCreateEventPackageMutation>;
export type CreateEventPackageMutationResult = Apollo.MutationResult<CreateEventPackageMutation>;
export type CreateEventPackageMutationOptions = Apollo.BaseMutationOptions<CreateEventPackageMutation, CreateEventPackageMutationVariables>;
export const EditEventPackageDocument = gql`
    mutation EditEventPackage($eventId: ID!, $packageId: ID!, $name: String!, $paymentTypes: [EventPackagePaymentType!]!, $minAge: Int, $sex: EventPackageSexType, $drinks: Int, $skipLine: Boolean, $maxTicketsPerUser: Int, $maxTickets: Int) {
  editEventPackage(
    eventId: $eventId
    packageId: $packageId
    name: $name
    paymentTypes: $paymentTypes
    minAge: $minAge
    drinks: $drinks
    skipLine: $skipLine
    sex: $sex
    maxTicketsPerUser: $maxTicketsPerUser
    maxTickets: $maxTickets
  ) {
    success
    errorCode
    package {
      ...EventPackageFields
    }
  }
}
    ${EventPackageFieldsFragmentDoc}`;
export type EditEventPackageMutationFn = Apollo.MutationFunction<EditEventPackageMutation, EditEventPackageMutationVariables>;

/**
 * __useEditEventPackageMutation__
 *
 * To run a mutation, you first call `useEditEventPackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEventPackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEventPackageMutation, { data, loading, error }] = useEditEventPackageMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *      name: // value for 'name'
 *      paymentTypes: // value for 'paymentTypes'
 *      minAge: // value for 'minAge'
 *      sex: // value for 'sex'
 *      drinks: // value for 'drinks'
 *      skipLine: // value for 'skipLine'
 *      maxTicketsPerUser: // value for 'maxTicketsPerUser'
 *      maxTickets: // value for 'maxTickets'
 *   },
 * });
 */
export function useEditEventPackageMutation(baseOptions?: Apollo.MutationHookOptions<EditEventPackageMutation, EditEventPackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEventPackageMutation, EditEventPackageMutationVariables>(EditEventPackageDocument, options);
      }
export type EditEventPackageMutationHookResult = ReturnType<typeof useEditEventPackageMutation>;
export type EditEventPackageMutationResult = Apollo.MutationResult<EditEventPackageMutation>;
export type EditEventPackageMutationOptions = Apollo.BaseMutationOptions<EditEventPackageMutation, EditEventPackageMutationVariables>;
export const DeleteEventPackageDocument = gql`
    mutation DeleteEventPackage($eventId: ID!, $packageId: ID!) {
  deleteEventPackage(eventId: $eventId, packageId: $packageId) {
    success
    alreadyIssued
    errorCode
  }
}
    `;
export type DeleteEventPackageMutationFn = Apollo.MutationFunction<DeleteEventPackageMutation, DeleteEventPackageMutationVariables>;

/**
 * __useDeleteEventPackageMutation__
 *
 * To run a mutation, you first call `useDeleteEventPackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventPackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventPackageMutation, { data, loading, error }] = useDeleteEventPackageMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *   },
 * });
 */
export function useDeleteEventPackageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEventPackageMutation, DeleteEventPackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEventPackageMutation, DeleteEventPackageMutationVariables>(DeleteEventPackageDocument, options);
      }
export type DeleteEventPackageMutationHookResult = ReturnType<typeof useDeleteEventPackageMutation>;
export type DeleteEventPackageMutationResult = Apollo.MutationResult<DeleteEventPackageMutation>;
export type DeleteEventPackageMutationOptions = Apollo.BaseMutationOptions<DeleteEventPackageMutation, DeleteEventPackageMutationVariables>;
export const AdminGetEventPackagesDocument = gql`
    query AdminGetEventPackages($eventId: ID!) {
  adminGetEventPackages(eventId: $eventId) {
    ...EventPackageFields
  }
}
    ${EventPackageFieldsFragmentDoc}`;

/**
 * __useAdminGetEventPackagesQuery__
 *
 * To run a query within a React component, call `useAdminGetEventPackagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetEventPackagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetEventPackagesQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminGetEventPackagesQuery(baseOptions: Apollo.QueryHookOptions<AdminGetEventPackagesQuery, AdminGetEventPackagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetEventPackagesQuery, AdminGetEventPackagesQueryVariables>(AdminGetEventPackagesDocument, options);
      }
export function useAdminGetEventPackagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetEventPackagesQuery, AdminGetEventPackagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetEventPackagesQuery, AdminGetEventPackagesQueryVariables>(AdminGetEventPackagesDocument, options);
        }
export type AdminGetEventPackagesQueryHookResult = ReturnType<typeof useAdminGetEventPackagesQuery>;
export type AdminGetEventPackagesLazyQueryHookResult = ReturnType<typeof useAdminGetEventPackagesLazyQuery>;
export type AdminGetEventPackagesQueryResult = Apollo.QueryResult<AdminGetEventPackagesQuery, AdminGetEventPackagesQueryVariables>;
export const EditEventPackageStatusDocument = gql`
    mutation EditEventPackageStatus($eventId: ID!, $packageId: ID!, $hidden: Boolean, $soldout: Boolean, $enabled: Boolean) {
  editEventPackageStatus(
    eventId: $eventId
    packageId: $packageId
    hidden: $hidden
    soldout: $soldout
    enabled: $enabled
  ) {
    success
    errorCode
    cannotUnsetSoldout
  }
}
    `;
export type EditEventPackageStatusMutationFn = Apollo.MutationFunction<EditEventPackageStatusMutation, EditEventPackageStatusMutationVariables>;

/**
 * __useEditEventPackageStatusMutation__
 *
 * To run a mutation, you first call `useEditEventPackageStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditEventPackageStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editEventPackageStatusMutation, { data, loading, error }] = useEditEventPackageStatusMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *      hidden: // value for 'hidden'
 *      soldout: // value for 'soldout'
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useEditEventPackageStatusMutation(baseOptions?: Apollo.MutationHookOptions<EditEventPackageStatusMutation, EditEventPackageStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditEventPackageStatusMutation, EditEventPackageStatusMutationVariables>(EditEventPackageStatusDocument, options);
      }
export type EditEventPackageStatusMutationHookResult = ReturnType<typeof useEditEventPackageStatusMutation>;
export type EditEventPackageStatusMutationResult = Apollo.MutationResult<EditEventPackageStatusMutation>;
export type EditEventPackageStatusMutationOptions = Apollo.BaseMutationOptions<EditEventPackageStatusMutation, EditEventPackageStatusMutationVariables>;
export const ReservePackageDocument = gql`
    mutation ReservePackage($eventId: ID!, $packageId: ID!) {
  reservePackage(eventId: $eventId, packageId: $packageId) {
    success
    errorCode
    ticket {
      ...TicketFields
    }
  }
}
    ${TicketFieldsFragmentDoc}`;
export type ReservePackageMutationFn = Apollo.MutationFunction<ReservePackageMutation, ReservePackageMutationVariables>;

/**
 * __useReservePackageMutation__
 *
 * To run a mutation, you first call `useReservePackageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReservePackageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reservePackageMutation, { data, loading, error }] = useReservePackageMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *   },
 * });
 */
export function useReservePackageMutation(baseOptions?: Apollo.MutationHookOptions<ReservePackageMutation, ReservePackageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReservePackageMutation, ReservePackageMutationVariables>(ReservePackageDocument, options);
      }
export type ReservePackageMutationHookResult = ReturnType<typeof useReservePackageMutation>;
export type ReservePackageMutationResult = Apollo.MutationResult<ReservePackageMutation>;
export type ReservePackageMutationOptions = Apollo.BaseMutationOptions<ReservePackageMutation, ReservePackageMutationVariables>;
export const GetMyTicketsByEventDocument = gql`
    query GetMyTicketsByEvent($eventId: ID!) {
  getMyTicketsByEvent(eventId: $eventId) {
    ...TicketFields
  }
}
    ${TicketFieldsFragmentDoc}`;

/**
 * __useGetMyTicketsByEventQuery__
 *
 * To run a query within a React component, call `useGetMyTicketsByEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketsByEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketsByEventQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetMyTicketsByEventQuery(baseOptions: Apollo.QueryHookOptions<GetMyTicketsByEventQuery, GetMyTicketsByEventQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketsByEventQuery, GetMyTicketsByEventQueryVariables>(GetMyTicketsByEventDocument, options);
      }
export function useGetMyTicketsByEventLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketsByEventQuery, GetMyTicketsByEventQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketsByEventQuery, GetMyTicketsByEventQueryVariables>(GetMyTicketsByEventDocument, options);
        }
export type GetMyTicketsByEventQueryHookResult = ReturnType<typeof useGetMyTicketsByEventQuery>;
export type GetMyTicketsByEventLazyQueryHookResult = ReturnType<typeof useGetMyTicketsByEventLazyQuery>;
export type GetMyTicketsByEventQueryResult = Apollo.QueryResult<GetMyTicketsByEventQuery, GetMyTicketsByEventQueryVariables>;
export const PrAccetInvitationRequestDocument = gql`
    mutation PrAccetInvitationRequest($invitationId: ID!) {
  prAccetInvitationRequest(invitationId: $invitationId) {
    success
    errorCode
  }
}
    `;
export type PrAccetInvitationRequestMutationFn = Apollo.MutationFunction<PrAccetInvitationRequestMutation, PrAccetInvitationRequestMutationVariables>;

/**
 * __usePrAccetInvitationRequestMutation__
 *
 * To run a mutation, you first call `usePrAccetInvitationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePrAccetInvitationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [prAccetInvitationRequestMutation, { data, loading, error }] = usePrAccetInvitationRequestMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function usePrAccetInvitationRequestMutation(baseOptions?: Apollo.MutationHookOptions<PrAccetInvitationRequestMutation, PrAccetInvitationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PrAccetInvitationRequestMutation, PrAccetInvitationRequestMutationVariables>(PrAccetInvitationRequestDocument, options);
      }
export type PrAccetInvitationRequestMutationHookResult = ReturnType<typeof usePrAccetInvitationRequestMutation>;
export type PrAccetInvitationRequestMutationResult = Apollo.MutationResult<PrAccetInvitationRequestMutation>;
export type PrAccetInvitationRequestMutationOptions = Apollo.BaseMutationOptions<PrAccetInvitationRequestMutation, PrAccetInvitationRequestMutationVariables>;
export const PrRejectInvitationRequestDocument = gql`
    mutation PrRejectInvitationRequest($invitationId: ID!) {
  prRejectInvitationRequest(invitationId: $invitationId) {
    success
    errorCode
  }
}
    `;
export type PrRejectInvitationRequestMutationFn = Apollo.MutationFunction<PrRejectInvitationRequestMutation, PrRejectInvitationRequestMutationVariables>;

/**
 * __usePrRejectInvitationRequestMutation__
 *
 * To run a mutation, you first call `usePrRejectInvitationRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePrRejectInvitationRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [prRejectInvitationRequestMutation, { data, loading, error }] = usePrRejectInvitationRequestMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function usePrRejectInvitationRequestMutation(baseOptions?: Apollo.MutationHookOptions<PrRejectInvitationRequestMutation, PrRejectInvitationRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PrRejectInvitationRequestMutation, PrRejectInvitationRequestMutationVariables>(PrRejectInvitationRequestDocument, options);
      }
export type PrRejectInvitationRequestMutationHookResult = ReturnType<typeof usePrRejectInvitationRequestMutation>;
export type PrRejectInvitationRequestMutationResult = Apollo.MutationResult<PrRejectInvitationRequestMutation>;
export type PrRejectInvitationRequestMutationOptions = Apollo.BaseMutationOptions<PrRejectInvitationRequestMutation, PrRejectInvitationRequestMutationVariables>;
export const AdminCreateTicketingSystemDocument = gql`
    mutation AdminCreateTicketingSystem($eventId: ID!) {
  adminCreateTicketingSystem(eventId: $eventId) {
    success
    errorCode
  }
}
    `;
export type AdminCreateTicketingSystemMutationFn = Apollo.MutationFunction<AdminCreateTicketingSystemMutation, AdminCreateTicketingSystemMutationVariables>;

/**
 * __useAdminCreateTicketingSystemMutation__
 *
 * To run a mutation, you first call `useAdminCreateTicketingSystemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateTicketingSystemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateTicketingSystemMutation, { data, loading, error }] = useAdminCreateTicketingSystemMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminCreateTicketingSystemMutation(baseOptions?: Apollo.MutationHookOptions<AdminCreateTicketingSystemMutation, AdminCreateTicketingSystemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminCreateTicketingSystemMutation, AdminCreateTicketingSystemMutationVariables>(AdminCreateTicketingSystemDocument, options);
      }
export type AdminCreateTicketingSystemMutationHookResult = ReturnType<typeof useAdminCreateTicketingSystemMutation>;
export type AdminCreateTicketingSystemMutationResult = Apollo.MutationResult<AdminCreateTicketingSystemMutation>;
export type AdminCreateTicketingSystemMutationOptions = Apollo.BaseMutationOptions<AdminCreateTicketingSystemMutation, AdminCreateTicketingSystemMutationVariables>;
export const AdminEnableTicketingDocument = gql`
    mutation AdminEnableTicketing($eventId: ID!, $enable: Boolean!) {
  adminEnableTicketing(eventId: $eventId, enable: $enable) {
    success
    errorCode
  }
}
    `;
export type AdminEnableTicketingMutationFn = Apollo.MutationFunction<AdminEnableTicketingMutation, AdminEnableTicketingMutationVariables>;

/**
 * __useAdminEnableTicketingMutation__
 *
 * To run a mutation, you first call `useAdminEnableTicketingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminEnableTicketingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminEnableTicketingMutation, { data, loading, error }] = useAdminEnableTicketingMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      enable: // value for 'enable'
 *   },
 * });
 */
export function useAdminEnableTicketingMutation(baseOptions?: Apollo.MutationHookOptions<AdminEnableTicketingMutation, AdminEnableTicketingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AdminEnableTicketingMutation, AdminEnableTicketingMutationVariables>(AdminEnableTicketingDocument, options);
      }
export type AdminEnableTicketingMutationHookResult = ReturnType<typeof useAdminEnableTicketingMutation>;
export type AdminEnableTicketingMutationResult = Apollo.MutationResult<AdminEnableTicketingMutation>;
export type AdminEnableTicketingMutationOptions = Apollo.BaseMutationOptions<AdminEnableTicketingMutation, AdminEnableTicketingMutationVariables>;
export const GetEventPackageTicketCountDocument = gql`
    query GetEventPackageTicketCount($eventId: ID!, $packageId: ID!) {
  getEventPackageTicketCount(eventId: $eventId, packageId: $packageId)
}
    `;

/**
 * __useGetEventPackageTicketCountQuery__
 *
 * To run a query within a React component, call `useGetEventPackageTicketCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventPackageTicketCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventPackageTicketCountQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      packageId: // value for 'packageId'
 *   },
 * });
 */
export function useGetEventPackageTicketCountQuery(baseOptions: Apollo.QueryHookOptions<GetEventPackageTicketCountQuery, GetEventPackageTicketCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventPackageTicketCountQuery, GetEventPackageTicketCountQueryVariables>(GetEventPackageTicketCountDocument, options);
      }
export function useGetEventPackageTicketCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventPackageTicketCountQuery, GetEventPackageTicketCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventPackageTicketCountQuery, GetEventPackageTicketCountQueryVariables>(GetEventPackageTicketCountDocument, options);
        }
export type GetEventPackageTicketCountQueryHookResult = ReturnType<typeof useGetEventPackageTicketCountQuery>;
export type GetEventPackageTicketCountLazyQueryHookResult = ReturnType<typeof useGetEventPackageTicketCountLazyQuery>;
export type GetEventPackageTicketCountQueryResult = Apollo.QueryResult<GetEventPackageTicketCountQuery, GetEventPackageTicketCountQueryVariables>;
export const AdminGetAdvancedTicketingStatsDocument = gql`
    query AdminGetAdvancedTicketingStats($eventId: ID!) {
  adminGetTicketsUsersStats(eventId: $eventId) {
    totalCount
    maleCount
    femaleCount
    nonBinaryCount
    ageRangeStats {
      to
      from
      value
    }
  }
  adminGetTicketsTrendStats(eventId: $eventId) {
    date
    count
  }
}
    `;

/**
 * __useAdminGetAdvancedTicketingStatsQuery__
 *
 * To run a query within a React component, call `useAdminGetAdvancedTicketingStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminGetAdvancedTicketingStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminGetAdvancedTicketingStatsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminGetAdvancedTicketingStatsQuery(baseOptions: Apollo.QueryHookOptions<AdminGetAdvancedTicketingStatsQuery, AdminGetAdvancedTicketingStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminGetAdvancedTicketingStatsQuery, AdminGetAdvancedTicketingStatsQueryVariables>(AdminGetAdvancedTicketingStatsDocument, options);
      }
export function useAdminGetAdvancedTicketingStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminGetAdvancedTicketingStatsQuery, AdminGetAdvancedTicketingStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminGetAdvancedTicketingStatsQuery, AdminGetAdvancedTicketingStatsQueryVariables>(AdminGetAdvancedTicketingStatsDocument, options);
        }
export type AdminGetAdvancedTicketingStatsQueryHookResult = ReturnType<typeof useAdminGetAdvancedTicketingStatsQuery>;
export type AdminGetAdvancedTicketingStatsLazyQueryHookResult = ReturnType<typeof useAdminGetAdvancedTicketingStatsLazyQuery>;
export type AdminGetAdvancedTicketingStatsQueryResult = Apollo.QueryResult<AdminGetAdvancedTicketingStatsQuery, AdminGetAdvancedTicketingStatsQueryVariables>;
export const AddUserRoleToEventDocument = gql`
    mutation AddUserRoleToEvent($eventId: ID!, $userId: ID!, $role: EventCollaboratorRole!) {
  addUserRoleToEvent(eventId: $eventId, userId: $userId, role: $role) {
    success
    errorCode
  }
}
    `;
export type AddUserRoleToEventMutationFn = Apollo.MutationFunction<AddUserRoleToEventMutation, AddUserRoleToEventMutationVariables>;

/**
 * __useAddUserRoleToEventMutation__
 *
 * To run a mutation, you first call `useAddUserRoleToEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserRoleToEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserRoleToEventMutation, { data, loading, error }] = useAddUserRoleToEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useAddUserRoleToEventMutation(baseOptions?: Apollo.MutationHookOptions<AddUserRoleToEventMutation, AddUserRoleToEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserRoleToEventMutation, AddUserRoleToEventMutationVariables>(AddUserRoleToEventDocument, options);
      }
export type AddUserRoleToEventMutationHookResult = ReturnType<typeof useAddUserRoleToEventMutation>;
export type AddUserRoleToEventMutationResult = Apollo.MutationResult<AddUserRoleToEventMutation>;
export type AddUserRoleToEventMutationOptions = Apollo.BaseMutationOptions<AddUserRoleToEventMutation, AddUserRoleToEventMutationVariables>;
export const RemoveUserRoleFromEventDocument = gql`
    mutation RemoveUserRoleFromEvent($eventId: ID!, $userId: ID!, $role: EventCollaboratorRole!) {
  removeUserRoleFromEvent(eventId: $eventId, userId: $userId, role: $role) {
    success
    errorCode
  }
}
    `;
export type RemoveUserRoleFromEventMutationFn = Apollo.MutationFunction<RemoveUserRoleFromEventMutation, RemoveUserRoleFromEventMutationVariables>;

/**
 * __useRemoveUserRoleFromEventMutation__
 *
 * To run a mutation, you first call `useRemoveUserRoleFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserRoleFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserRoleFromEventMutation, { data, loading, error }] = useRemoveUserRoleFromEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useRemoveUserRoleFromEventMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserRoleFromEventMutation, RemoveUserRoleFromEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserRoleFromEventMutation, RemoveUserRoleFromEventMutationVariables>(RemoveUserRoleFromEventDocument, options);
      }
export type RemoveUserRoleFromEventMutationHookResult = ReturnType<typeof useRemoveUserRoleFromEventMutation>;
export type RemoveUserRoleFromEventMutationResult = Apollo.MutationResult<RemoveUserRoleFromEventMutation>;
export type RemoveUserRoleFromEventMutationOptions = Apollo.BaseMutationOptions<RemoveUserRoleFromEventMutation, RemoveUserRoleFromEventMutationVariables>;
export const RemoveCollaboratorFromEventDocument = gql`
    mutation RemoveCollaboratorFromEvent($eventId: ID!, $userId: ID!) {
  removeCollaboratorFromEvent(eventId: $eventId, userId: $userId) {
    success
    errorCode
  }
}
    `;
export type RemoveCollaboratorFromEventMutationFn = Apollo.MutationFunction<RemoveCollaboratorFromEventMutation, RemoveCollaboratorFromEventMutationVariables>;

/**
 * __useRemoveCollaboratorFromEventMutation__
 *
 * To run a mutation, you first call `useRemoveCollaboratorFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCollaboratorFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCollaboratorFromEventMutation, { data, loading, error }] = useRemoveCollaboratorFromEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveCollaboratorFromEventMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCollaboratorFromEventMutation, RemoveCollaboratorFromEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCollaboratorFromEventMutation, RemoveCollaboratorFromEventMutationVariables>(RemoveCollaboratorFromEventDocument, options);
      }
export type RemoveCollaboratorFromEventMutationHookResult = ReturnType<typeof useRemoveCollaboratorFromEventMutation>;
export type RemoveCollaboratorFromEventMutationResult = Apollo.MutationResult<RemoveCollaboratorFromEventMutation>;
export type RemoveCollaboratorFromEventMutationOptions = Apollo.BaseMutationOptions<RemoveCollaboratorFromEventMutation, RemoveCollaboratorFromEventMutationVariables>;
export const GetEventsAvailableToImportDocument = gql`
    query GetEventsAvailableToImport($eventId: ID, $organizerId: ID, $withPrsOnly: Boolean = false) {
  getEventsAvailableToImport(
    eventId: $eventId
    organizerId: $organizerId
    withPrsOnly: $withPrsOnly
  ) {
    id
    title
    date
    image {
      url
      blurhash
    }
    PRs {
      name
      userId
    }
  }
}
    `;

/**
 * __useGetEventsAvailableToImportQuery__
 *
 * To run a query within a React component, call `useGetEventsAvailableToImportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsAvailableToImportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsAvailableToImportQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      organizerId: // value for 'organizerId'
 *      withPrsOnly: // value for 'withPrsOnly'
 *   },
 * });
 */
export function useGetEventsAvailableToImportQuery(baseOptions?: Apollo.QueryHookOptions<GetEventsAvailableToImportQuery, GetEventsAvailableToImportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsAvailableToImportQuery, GetEventsAvailableToImportQueryVariables>(GetEventsAvailableToImportDocument, options);
      }
export function useGetEventsAvailableToImportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsAvailableToImportQuery, GetEventsAvailableToImportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsAvailableToImportQuery, GetEventsAvailableToImportQueryVariables>(GetEventsAvailableToImportDocument, options);
        }
export type GetEventsAvailableToImportQueryHookResult = ReturnType<typeof useGetEventsAvailableToImportQuery>;
export type GetEventsAvailableToImportLazyQueryHookResult = ReturnType<typeof useGetEventsAvailableToImportLazyQuery>;
export type GetEventsAvailableToImportQueryResult = Apollo.QueryResult<GetEventsAvailableToImportQuery, GetEventsAvailableToImportQueryVariables>;
export const ImportPrsFromEventDocument = gql`
    mutation ImportPrsFromEvent($fromEventId: ID!, $toEventId: ID!, $prsIds: [ID!]!) {
  importPrsFromEvent(
    fromEventId: $fromEventId
    toEventId: $toEventId
    prsIds: $prsIds
  ) {
    success
    errorCode
  }
}
    `;
export type ImportPrsFromEventMutationFn = Apollo.MutationFunction<ImportPrsFromEventMutation, ImportPrsFromEventMutationVariables>;

/**
 * __useImportPrsFromEventMutation__
 *
 * To run a mutation, you first call `useImportPrsFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportPrsFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importPrsFromEventMutation, { data, loading, error }] = useImportPrsFromEventMutation({
 *   variables: {
 *      fromEventId: // value for 'fromEventId'
 *      toEventId: // value for 'toEventId'
 *      prsIds: // value for 'prsIds'
 *   },
 * });
 */
export function useImportPrsFromEventMutation(baseOptions?: Apollo.MutationHookOptions<ImportPrsFromEventMutation, ImportPrsFromEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportPrsFromEventMutation, ImportPrsFromEventMutationVariables>(ImportPrsFromEventDocument, options);
      }
export type ImportPrsFromEventMutationHookResult = ReturnType<typeof useImportPrsFromEventMutation>;
export type ImportPrsFromEventMutationResult = Apollo.MutationResult<ImportPrsFromEventMutation>;
export type ImportPrsFromEventMutationOptions = Apollo.BaseMutationOptions<ImportPrsFromEventMutation, ImportPrsFromEventMutationVariables>;
export const RemoveMeFromEventDocument = gql`
    mutation RemoveMeFromEvent($eventId: ID!, $role: EventCollaboratorRole) {
  removeMeFromEvent(eventId: $eventId, role: $role) {
    success
  }
}
    `;
export type RemoveMeFromEventMutationFn = Apollo.MutationFunction<RemoveMeFromEventMutation, RemoveMeFromEventMutationVariables>;

/**
 * __useRemoveMeFromEventMutation__
 *
 * To run a mutation, you first call `useRemoveMeFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMeFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMeFromEventMutation, { data, loading, error }] = useRemoveMeFromEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useRemoveMeFromEventMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMeFromEventMutation, RemoveMeFromEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveMeFromEventMutation, RemoveMeFromEventMutationVariables>(RemoveMeFromEventDocument, options);
      }
export type RemoveMeFromEventMutationHookResult = ReturnType<typeof useRemoveMeFromEventMutation>;
export type RemoveMeFromEventMutationResult = Apollo.MutationResult<RemoveMeFromEventMutation>;
export type RemoveMeFromEventMutationOptions = Apollo.BaseMutationOptions<RemoveMeFromEventMutation, RemoveMeFromEventMutationVariables>;
export const GetInteractionsDocument = gql`
    query GetInteractions($pagination: CursorPaginationOptions) {
  getInteractions(pagination: $pagination) {
    id
    type
    createdAt
    userId
    mutual
    targetId
    author {
      id
      username
      profilePicture {
        url
      }
    }
    target {
      id
      username
    }
  }
}
    `;

/**
 * __useGetInteractionsQuery__
 *
 * To run a query within a React component, call `useGetInteractionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInteractionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInteractionsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetInteractionsQuery(baseOptions?: Apollo.QueryHookOptions<GetInteractionsQuery, GetInteractionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInteractionsQuery, GetInteractionsQueryVariables>(GetInteractionsDocument, options);
      }
export function useGetInteractionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInteractionsQuery, GetInteractionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInteractionsQuery, GetInteractionsQueryVariables>(GetInteractionsDocument, options);
        }
export type GetInteractionsQueryHookResult = ReturnType<typeof useGetInteractionsQuery>;
export type GetInteractionsLazyQueryHookResult = ReturnType<typeof useGetInteractionsLazyQuery>;
export type GetInteractionsQueryResult = Apollo.QueryResult<GetInteractionsQuery, GetInteractionsQueryVariables>;
export const CreateInteractionDocument = gql`
    mutation CreateInteraction($targetId: ID!, $type: InteractionType!) {
  createInteraction(type: $type, targetId: $targetId) {
    userId
    targetId
    type
    createdAt
    id
  }
}
    `;
export type CreateInteractionMutationFn = Apollo.MutationFunction<CreateInteractionMutation, CreateInteractionMutationVariables>;

/**
 * __useCreateInteractionMutation__
 *
 * To run a mutation, you first call `useCreateInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInteractionMutation, { data, loading, error }] = useCreateInteractionMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useCreateInteractionMutation(baseOptions?: Apollo.MutationHookOptions<CreateInteractionMutation, CreateInteractionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInteractionMutation, CreateInteractionMutationVariables>(CreateInteractionDocument, options);
      }
export type CreateInteractionMutationHookResult = ReturnType<typeof useCreateInteractionMutation>;
export type CreateInteractionMutationResult = Apollo.MutationResult<CreateInteractionMutation>;
export type CreateInteractionMutationOptions = Apollo.BaseMutationOptions<CreateInteractionMutation, CreateInteractionMutationVariables>;
export const ReciprocateInteractionDocument = gql`
    mutation ReciprocateInteraction($id: ID!) {
  reciprocateInteraction(interactionId: $id) {
    success
  }
}
    `;
export type ReciprocateInteractionMutationFn = Apollo.MutationFunction<ReciprocateInteractionMutation, ReciprocateInteractionMutationVariables>;

/**
 * __useReciprocateInteractionMutation__
 *
 * To run a mutation, you first call `useReciprocateInteractionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReciprocateInteractionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reciprocateInteractionMutation, { data, loading, error }] = useReciprocateInteractionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReciprocateInteractionMutation(baseOptions?: Apollo.MutationHookOptions<ReciprocateInteractionMutation, ReciprocateInteractionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReciprocateInteractionMutation, ReciprocateInteractionMutationVariables>(ReciprocateInteractionDocument, options);
      }
export type ReciprocateInteractionMutationHookResult = ReturnType<typeof useReciprocateInteractionMutation>;
export type ReciprocateInteractionMutationResult = Apollo.MutationResult<ReciprocateInteractionMutation>;
export type ReciprocateInteractionMutationOptions = Apollo.BaseMutationOptions<ReciprocateInteractionMutation, ReciprocateInteractionMutationVariables>;
export const GetMyLinksDocument = gql`
    query GetMyLinks {
  getMyLinks {
    ...LinkFields
    eventRef {
      id
      title
      image {
        url
        blurhash
      }
    }
  }
}
    ${LinkFieldsFragmentDoc}`;

/**
 * __useGetMyLinksQuery__
 *
 * To run a query within a React component, call `useGetMyLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyLinksQuery(baseOptions?: Apollo.QueryHookOptions<GetMyLinksQuery, GetMyLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyLinksQuery, GetMyLinksQueryVariables>(GetMyLinksDocument, options);
      }
export function useGetMyLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyLinksQuery, GetMyLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyLinksQuery, GetMyLinksQueryVariables>(GetMyLinksDocument, options);
        }
export type GetMyLinksQueryHookResult = ReturnType<typeof useGetMyLinksQuery>;
export type GetMyLinksLazyQueryHookResult = ReturnType<typeof useGetMyLinksLazyQuery>;
export type GetMyLinksQueryResult = Apollo.QueryResult<GetMyLinksQuery, GetMyLinksQueryVariables>;
export const GetEventLinksDocument = gql`
    query GetEventLinks($eventId: ID!, $pagination: CursorPaginationOptions) {
  getEventLinks(eventId: $eventId, pagination: $pagination) {
    ...LinkFields
    owner {
      id
      username
    }
  }
}
    ${LinkFieldsFragmentDoc}`;

/**
 * __useGetEventLinksQuery__
 *
 * To run a query within a React component, call `useGetEventLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventLinksQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetEventLinksQuery(baseOptions: Apollo.QueryHookOptions<GetEventLinksQuery, GetEventLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventLinksQuery, GetEventLinksQueryVariables>(GetEventLinksDocument, options);
      }
export function useGetEventLinksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventLinksQuery, GetEventLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventLinksQuery, GetEventLinksQueryVariables>(GetEventLinksDocument, options);
        }
export type GetEventLinksQueryHookResult = ReturnType<typeof useGetEventLinksQuery>;
export type GetEventLinksLazyQueryHookResult = ReturnType<typeof useGetEventLinksLazyQuery>;
export type GetEventLinksQueryResult = Apollo.QueryResult<GetEventLinksQuery, GetEventLinksQueryVariables>;
export const GetEventByLinkCodeDocument = gql`
    query GetEventByLinkCode($code: String!) {
  getEventByLinkCode(code: $code) {
    ...EventFields
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetEventByLinkCodeQuery__
 *
 * To run a query within a React component, call `useGetEventByLinkCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByLinkCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByLinkCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetEventByLinkCodeQuery(baseOptions: Apollo.QueryHookOptions<GetEventByLinkCodeQuery, GetEventByLinkCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventByLinkCodeQuery, GetEventByLinkCodeQueryVariables>(GetEventByLinkCodeDocument, options);
      }
export function useGetEventByLinkCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventByLinkCodeQuery, GetEventByLinkCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventByLinkCodeQuery, GetEventByLinkCodeQueryVariables>(GetEventByLinkCodeDocument, options);
        }
export type GetEventByLinkCodeQueryHookResult = ReturnType<typeof useGetEventByLinkCodeQuery>;
export type GetEventByLinkCodeLazyQueryHookResult = ReturnType<typeof useGetEventByLinkCodeLazyQuery>;
export type GetEventByLinkCodeQueryResult = Apollo.QueryResult<GetEventByLinkCodeQuery, GetEventByLinkCodeQueryVariables>;
export const GenerateEventLinkDocument = gql`
    mutation GenerateEventLink($eventId: ID!) {
  generateEventLink(eventId: $eventId) {
    ...LinkFields
  }
}
    ${LinkFieldsFragmentDoc}`;
export type GenerateEventLinkMutationFn = Apollo.MutationFunction<GenerateEventLinkMutation, GenerateEventLinkMutationVariables>;

/**
 * __useGenerateEventLinkMutation__
 *
 * To run a mutation, you first call `useGenerateEventLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateEventLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateEventLinkMutation, { data, loading, error }] = useGenerateEventLinkMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGenerateEventLinkMutation(baseOptions?: Apollo.MutationHookOptions<GenerateEventLinkMutation, GenerateEventLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateEventLinkMutation, GenerateEventLinkMutationVariables>(GenerateEventLinkDocument, options);
      }
export type GenerateEventLinkMutationHookResult = ReturnType<typeof useGenerateEventLinkMutation>;
export type GenerateEventLinkMutationResult = Apollo.MutationResult<GenerateEventLinkMutation>;
export type GenerateEventLinkMutationOptions = Apollo.BaseMutationOptions<GenerateEventLinkMutation, GenerateEventLinkMutationVariables>;
export const GetLinkInfoDocument = gql`
    query GetLinkInfo($code: ID!) {
  getLinkInfo(code: $code) {
    ...LinkFields
  }
}
    ${LinkFieldsFragmentDoc}`;

/**
 * __useGetLinkInfoQuery__
 *
 * To run a query within a React component, call `useGetLinkInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkInfoQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetLinkInfoQuery(baseOptions: Apollo.QueryHookOptions<GetLinkInfoQuery, GetLinkInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLinkInfoQuery, GetLinkInfoQueryVariables>(GetLinkInfoDocument, options);
      }
export function useGetLinkInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLinkInfoQuery, GetLinkInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLinkInfoQuery, GetLinkInfoQueryVariables>(GetLinkInfoDocument, options);
        }
export type GetLinkInfoQueryHookResult = ReturnType<typeof useGetLinkInfoQuery>;
export type GetLinkInfoLazyQueryHookResult = ReturnType<typeof useGetLinkInfoLazyQuery>;
export type GetLinkInfoQueryResult = Apollo.QueryResult<GetLinkInfoQuery, GetLinkInfoQueryVariables>;
export const GetEventLiveFeedDocument = gql`
    query GetEventLiveFeed($eventId: ID!, $pagination: CursorPaginationOptions) {
  getEventLiveFeed(eventId: $eventId, pagination: $pagination) {
    ...LiveFeedItemFields
  }
  getPinnedLiveFeedItem(eventId: $eventId) {
    ...LiveFeedItemFields
  }
}
    ${LiveFeedItemFieldsFragmentDoc}`;

/**
 * __useGetEventLiveFeedQuery__
 *
 * To run a query within a React component, call `useGetEventLiveFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventLiveFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventLiveFeedQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetEventLiveFeedQuery(baseOptions: Apollo.QueryHookOptions<GetEventLiveFeedQuery, GetEventLiveFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventLiveFeedQuery, GetEventLiveFeedQueryVariables>(GetEventLiveFeedDocument, options);
      }
export function useGetEventLiveFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventLiveFeedQuery, GetEventLiveFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventLiveFeedQuery, GetEventLiveFeedQueryVariables>(GetEventLiveFeedDocument, options);
        }
export type GetEventLiveFeedQueryHookResult = ReturnType<typeof useGetEventLiveFeedQuery>;
export type GetEventLiveFeedLazyQueryHookResult = ReturnType<typeof useGetEventLiveFeedLazyQuery>;
export type GetEventLiveFeedQueryResult = Apollo.QueryResult<GetEventLiveFeedQuery, GetEventLiveFeedQueryVariables>;
export const VoteLiveFeedPollDocument = gql`
    mutation VoteLiveFeedPoll($itemId: ID!, $optionId: ID!) {
  voteLiveFeedPoll(itemId: $itemId, optionId: $optionId) {
    success
  }
}
    `;
export type VoteLiveFeedPollMutationFn = Apollo.MutationFunction<VoteLiveFeedPollMutation, VoteLiveFeedPollMutationVariables>;

/**
 * __useVoteLiveFeedPollMutation__
 *
 * To run a mutation, you first call `useVoteLiveFeedPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteLiveFeedPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteLiveFeedPollMutation, { data, loading, error }] = useVoteLiveFeedPollMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      optionId: // value for 'optionId'
 *   },
 * });
 */
export function useVoteLiveFeedPollMutation(baseOptions?: Apollo.MutationHookOptions<VoteLiveFeedPollMutation, VoteLiveFeedPollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteLiveFeedPollMutation, VoteLiveFeedPollMutationVariables>(VoteLiveFeedPollDocument, options);
      }
export type VoteLiveFeedPollMutationHookResult = ReturnType<typeof useVoteLiveFeedPollMutation>;
export type VoteLiveFeedPollMutationResult = Apollo.MutationResult<VoteLiveFeedPollMutation>;
export type VoteLiveFeedPollMutationOptions = Apollo.BaseMutationOptions<VoteLiveFeedPollMutation, VoteLiveFeedPollMutationVariables>;
export const GetLiveFeedItemDocument = gql`
    query GetLiveFeedItem($itemId: ID!) {
  getLiveFeedItem(itemId: $itemId) {
    ...LiveFeedItemFields
  }
}
    ${LiveFeedItemFieldsFragmentDoc}`;

/**
 * __useGetLiveFeedItemQuery__
 *
 * To run a query within a React component, call `useGetLiveFeedItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveFeedItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveFeedItemQuery({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useGetLiveFeedItemQuery(baseOptions: Apollo.QueryHookOptions<GetLiveFeedItemQuery, GetLiveFeedItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveFeedItemQuery, GetLiveFeedItemQueryVariables>(GetLiveFeedItemDocument, options);
      }
export function useGetLiveFeedItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveFeedItemQuery, GetLiveFeedItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveFeedItemQuery, GetLiveFeedItemQueryVariables>(GetLiveFeedItemDocument, options);
        }
export type GetLiveFeedItemQueryHookResult = ReturnType<typeof useGetLiveFeedItemQuery>;
export type GetLiveFeedItemLazyQueryHookResult = ReturnType<typeof useGetLiveFeedItemLazyQuery>;
export type GetLiveFeedItemQueryResult = Apollo.QueryResult<GetLiveFeedItemQuery, GetLiveFeedItemQueryVariables>;
export const SubscribeLiveFeedGiveawayDocument = gql`
    mutation SubscribeLiveFeedGiveaway($itemId: ID!) {
  subscribeLiveFeedGiveaway(itemId: $itemId) {
    success
    errorCode
  }
}
    `;
export type SubscribeLiveFeedGiveawayMutationFn = Apollo.MutationFunction<SubscribeLiveFeedGiveawayMutation, SubscribeLiveFeedGiveawayMutationVariables>;

/**
 * __useSubscribeLiveFeedGiveawayMutation__
 *
 * To run a mutation, you first call `useSubscribeLiveFeedGiveawayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeLiveFeedGiveawayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeLiveFeedGiveawayMutation, { data, loading, error }] = useSubscribeLiveFeedGiveawayMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useSubscribeLiveFeedGiveawayMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeLiveFeedGiveawayMutation, SubscribeLiveFeedGiveawayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeLiveFeedGiveawayMutation, SubscribeLiveFeedGiveawayMutationVariables>(SubscribeLiveFeedGiveawayDocument, options);
      }
export type SubscribeLiveFeedGiveawayMutationHookResult = ReturnType<typeof useSubscribeLiveFeedGiveawayMutation>;
export type SubscribeLiveFeedGiveawayMutationResult = Apollo.MutationResult<SubscribeLiveFeedGiveawayMutation>;
export type SubscribeLiveFeedGiveawayMutationOptions = Apollo.BaseMutationOptions<SubscribeLiveFeedGiveawayMutation, SubscribeLiveFeedGiveawayMutationVariables>;
export const SearchOrganizersDocument = gql`
    query SearchOrganizers($text: String!) {
  searchOrganizers(text: $text) {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;

/**
 * __useSearchOrganizersQuery__
 *
 * To run a query within a React component, call `useSearchOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrganizersQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchOrganizersQuery(baseOptions: Apollo.QueryHookOptions<SearchOrganizersQuery, SearchOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOrganizersQuery, SearchOrganizersQueryVariables>(SearchOrganizersDocument, options);
      }
export function useSearchOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOrganizersQuery, SearchOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOrganizersQuery, SearchOrganizersQueryVariables>(SearchOrganizersDocument, options);
        }
export type SearchOrganizersQueryHookResult = ReturnType<typeof useSearchOrganizersQuery>;
export type SearchOrganizersLazyQueryHookResult = ReturnType<typeof useSearchOrganizersLazyQuery>;
export type SearchOrganizersQueryResult = Apollo.QueryResult<SearchOrganizersQuery, SearchOrganizersQueryVariables>;
export const CreateOrganizerDocument = gql`
    mutation CreateOrganizer($name: String!, $description: String, $type: OrganizerType, $image: AssetInput!) {
  createOrganizer(
    name: $name
    description: $description
    type: $type
    image: $image
  ) {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;
export type CreateOrganizerMutationFn = Apollo.MutationFunction<CreateOrganizerMutation, CreateOrganizerMutationVariables>;

/**
 * __useCreateOrganizerMutation__
 *
 * To run a mutation, you first call `useCreateOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizerMutation, { data, loading, error }] = useCreateOrganizerMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizerMutation, CreateOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizerMutation, CreateOrganizerMutationVariables>(CreateOrganizerDocument, options);
      }
export type CreateOrganizerMutationHookResult = ReturnType<typeof useCreateOrganizerMutation>;
export type CreateOrganizerMutationResult = Apollo.MutationResult<CreateOrganizerMutation>;
export type CreateOrganizerMutationOptions = Apollo.BaseMutationOptions<CreateOrganizerMutation, CreateOrganizerMutationVariables>;
export const FollowOrganizerDocument = gql`
    mutation FollowOrganizer($id: ID!) {
  followOrganizer(id: $id) {
    success
  }
}
    `;
export type FollowOrganizerMutationFn = Apollo.MutationFunction<FollowOrganizerMutation, FollowOrganizerMutationVariables>;

/**
 * __useFollowOrganizerMutation__
 *
 * To run a mutation, you first call `useFollowOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followOrganizerMutation, { data, loading, error }] = useFollowOrganizerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFollowOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<FollowOrganizerMutation, FollowOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowOrganizerMutation, FollowOrganizerMutationVariables>(FollowOrganizerDocument, options);
      }
export type FollowOrganizerMutationHookResult = ReturnType<typeof useFollowOrganizerMutation>;
export type FollowOrganizerMutationResult = Apollo.MutationResult<FollowOrganizerMutation>;
export type FollowOrganizerMutationOptions = Apollo.BaseMutationOptions<FollowOrganizerMutation, FollowOrganizerMutationVariables>;
export const UnfollowOrganizerDocument = gql`
    mutation UnfollowOrganizer($id: ID!) {
  unfollowOrganizer(id: $id) {
    success
  }
}
    `;
export type UnfollowOrganizerMutationFn = Apollo.MutationFunction<UnfollowOrganizerMutation, UnfollowOrganizerMutationVariables>;

/**
 * __useUnfollowOrganizerMutation__
 *
 * To run a mutation, you first call `useUnfollowOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowOrganizerMutation, { data, loading, error }] = useUnfollowOrganizerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnfollowOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowOrganizerMutation, UnfollowOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowOrganizerMutation, UnfollowOrganizerMutationVariables>(UnfollowOrganizerDocument, options);
      }
export type UnfollowOrganizerMutationHookResult = ReturnType<typeof useUnfollowOrganizerMutation>;
export type UnfollowOrganizerMutationResult = Apollo.MutationResult<UnfollowOrganizerMutation>;
export type UnfollowOrganizerMutationOptions = Apollo.BaseMutationOptions<UnfollowOrganizerMutation, UnfollowOrganizerMutationVariables>;
export const GetOrganizersLandingDocument = gql`
    query GetOrganizersLanding {
  getOrganizersLanding {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;

/**
 * __useGetOrganizersLandingQuery__
 *
 * To run a query within a React component, call `useGetOrganizersLandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizersLandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizersLandingQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizersLandingQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizersLandingQuery, GetOrganizersLandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizersLandingQuery, GetOrganizersLandingQueryVariables>(GetOrganizersLandingDocument, options);
      }
export function useGetOrganizersLandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizersLandingQuery, GetOrganizersLandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizersLandingQuery, GetOrganizersLandingQueryVariables>(GetOrganizersLandingDocument, options);
        }
export type GetOrganizersLandingQueryHookResult = ReturnType<typeof useGetOrganizersLandingQuery>;
export type GetOrganizersLandingLazyQueryHookResult = ReturnType<typeof useGetOrganizersLandingLazyQuery>;
export type GetOrganizersLandingQueryResult = Apollo.QueryResult<GetOrganizersLandingQuery, GetOrganizersLandingQueryVariables>;
export const GetMyOrganizersDocument = gql`
    query GetMyOrganizers {
  getMyOrganizers {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;

/**
 * __useGetMyOrganizersQuery__
 *
 * To run a query within a React component, call `useGetMyOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyOrganizersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyOrganizersQuery(baseOptions?: Apollo.QueryHookOptions<GetMyOrganizersQuery, GetMyOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyOrganizersQuery, GetMyOrganizersQueryVariables>(GetMyOrganizersDocument, options);
      }
export function useGetMyOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyOrganizersQuery, GetMyOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyOrganizersQuery, GetMyOrganizersQueryVariables>(GetMyOrganizersDocument, options);
        }
export type GetMyOrganizersQueryHookResult = ReturnType<typeof useGetMyOrganizersQuery>;
export type GetMyOrganizersLazyQueryHookResult = ReturnType<typeof useGetMyOrganizersLazyQuery>;
export type GetMyOrganizersQueryResult = Apollo.QueryResult<GetMyOrganizersQuery, GetMyOrganizersQueryVariables>;
export const GetSuggestedOrganizersDocument = gql`
    query GetSuggestedOrganizers {
  getSuggestedOrganizers {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;

/**
 * __useGetSuggestedOrganizersQuery__
 *
 * To run a query within a React component, call `useGetSuggestedOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSuggestedOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSuggestedOrganizersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSuggestedOrganizersQuery(baseOptions?: Apollo.QueryHookOptions<GetSuggestedOrganizersQuery, GetSuggestedOrganizersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSuggestedOrganizersQuery, GetSuggestedOrganizersQueryVariables>(GetSuggestedOrganizersDocument, options);
      }
export function useGetSuggestedOrganizersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSuggestedOrganizersQuery, GetSuggestedOrganizersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSuggestedOrganizersQuery, GetSuggestedOrganizersQueryVariables>(GetSuggestedOrganizersDocument, options);
        }
export type GetSuggestedOrganizersQueryHookResult = ReturnType<typeof useGetSuggestedOrganizersQuery>;
export type GetSuggestedOrganizersLazyQueryHookResult = ReturnType<typeof useGetSuggestedOrganizersLazyQuery>;
export type GetSuggestedOrganizersQueryResult = Apollo.QueryResult<GetSuggestedOrganizersQuery, GetSuggestedOrganizersQueryVariables>;
export const EditOrganizerImageDocument = gql`
    mutation EditOrganizerImage($id: ID!, $image: AssetInput!) {
  editOrganizerImage(id: $id, image: $image) {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;
export type EditOrganizerImageMutationFn = Apollo.MutationFunction<EditOrganizerImageMutation, EditOrganizerImageMutationVariables>;

/**
 * __useEditOrganizerImageMutation__
 *
 * To run a mutation, you first call `useEditOrganizerImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrganizerImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrganizerImageMutation, { data, loading, error }] = useEditOrganizerImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useEditOrganizerImageMutation(baseOptions?: Apollo.MutationHookOptions<EditOrganizerImageMutation, EditOrganizerImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrganizerImageMutation, EditOrganizerImageMutationVariables>(EditOrganizerImageDocument, options);
      }
export type EditOrganizerImageMutationHookResult = ReturnType<typeof useEditOrganizerImageMutation>;
export type EditOrganizerImageMutationResult = Apollo.MutationResult<EditOrganizerImageMutation>;
export type EditOrganizerImageMutationOptions = Apollo.BaseMutationOptions<EditOrganizerImageMutation, EditOrganizerImageMutationVariables>;
export const EditOrganizerDocument = gql`
    mutation EditOrganizer($id: ID!, $values: EditOrganizerInputValues!, $remove: EditOrganizerRemoveFields!) {
  editOrganizer(id: $id, values: $values, remove: $remove) {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;
export type EditOrganizerMutationFn = Apollo.MutationFunction<EditOrganizerMutation, EditOrganizerMutationVariables>;

/**
 * __useEditOrganizerMutation__
 *
 * To run a mutation, you first call `useEditOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrganizerMutation, { data, loading, error }] = useEditOrganizerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      values: // value for 'values'
 *      remove: // value for 'remove'
 *   },
 * });
 */
export function useEditOrganizerMutation(baseOptions?: Apollo.MutationHookOptions<EditOrganizerMutation, EditOrganizerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrganizerMutation, EditOrganizerMutationVariables>(EditOrganizerDocument, options);
      }
export type EditOrganizerMutationHookResult = ReturnType<typeof useEditOrganizerMutation>;
export type EditOrganizerMutationResult = Apollo.MutationResult<EditOrganizerMutation>;
export type EditOrganizerMutationOptions = Apollo.BaseMutationOptions<EditOrganizerMutation, EditOrganizerMutationVariables>;
export const MakeUserOrganizerManagerDocument = gql`
    mutation MakeUserOrganizerManager($userId: ID!, $organizerId: ID!, $role: OrganizerUserRole!) {
  makeUserOrganizerManager(
    userId: $userId
    organizerId: $organizerId
    role: $role
  ) {
    role
    userId
    user {
      username
      profilePicture {
        url
        blurhash
      }
    }
  }
}
    `;
export type MakeUserOrganizerManagerMutationFn = Apollo.MutationFunction<MakeUserOrganizerManagerMutation, MakeUserOrganizerManagerMutationVariables>;

/**
 * __useMakeUserOrganizerManagerMutation__
 *
 * To run a mutation, you first call `useMakeUserOrganizerManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeUserOrganizerManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeUserOrganizerManagerMutation, { data, loading, error }] = useMakeUserOrganizerManagerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      organizerId: // value for 'organizerId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useMakeUserOrganizerManagerMutation(baseOptions?: Apollo.MutationHookOptions<MakeUserOrganizerManagerMutation, MakeUserOrganizerManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeUserOrganizerManagerMutation, MakeUserOrganizerManagerMutationVariables>(MakeUserOrganizerManagerDocument, options);
      }
export type MakeUserOrganizerManagerMutationHookResult = ReturnType<typeof useMakeUserOrganizerManagerMutation>;
export type MakeUserOrganizerManagerMutationResult = Apollo.MutationResult<MakeUserOrganizerManagerMutation>;
export type MakeUserOrganizerManagerMutationOptions = Apollo.BaseMutationOptions<MakeUserOrganizerManagerMutation, MakeUserOrganizerManagerMutationVariables>;
export const GetOrganizerManagersDocument = gql`
    query GetOrganizerManagers($organizerId: ID!) {
  getOrganizerManagers(organizerId: $organizerId) {
    userId
    user {
      id
      username
      profilePicture {
        url
        blurhash
      }
    }
    role
  }
}
    `;

/**
 * __useGetOrganizerManagersQuery__
 *
 * To run a query within a React component, call `useGetOrganizerManagersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizerManagersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizerManagersQuery({
 *   variables: {
 *      organizerId: // value for 'organizerId'
 *   },
 * });
 */
export function useGetOrganizerManagersQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizerManagersQuery, GetOrganizerManagersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizerManagersQuery, GetOrganizerManagersQueryVariables>(GetOrganizerManagersDocument, options);
      }
export function useGetOrganizerManagersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizerManagersQuery, GetOrganizerManagersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizerManagersQuery, GetOrganizerManagersQueryVariables>(GetOrganizerManagersDocument, options);
        }
export type GetOrganizerManagersQueryHookResult = ReturnType<typeof useGetOrganizerManagersQuery>;
export type GetOrganizerManagersLazyQueryHookResult = ReturnType<typeof useGetOrganizerManagersLazyQuery>;
export type GetOrganizerManagersQueryResult = Apollo.QueryResult<GetOrganizerManagersQuery, GetOrganizerManagersQueryVariables>;
export const RemoveUserOrganizerManagerDocument = gql`
    mutation RemoveUserOrganizerManager($userId: ID!, $organizerId: ID!) {
  removeUserOrganizerManager(userId: $userId, organizerId: $organizerId) {
    success
  }
}
    `;
export type RemoveUserOrganizerManagerMutationFn = Apollo.MutationFunction<RemoveUserOrganizerManagerMutation, RemoveUserOrganizerManagerMutationVariables>;

/**
 * __useRemoveUserOrganizerManagerMutation__
 *
 * To run a mutation, you first call `useRemoveUserOrganizerManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserOrganizerManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserOrganizerManagerMutation, { data, loading, error }] = useRemoveUserOrganizerManagerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      organizerId: // value for 'organizerId'
 *   },
 * });
 */
export function useRemoveUserOrganizerManagerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserOrganizerManagerMutation, RemoveUserOrganizerManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserOrganizerManagerMutation, RemoveUserOrganizerManagerMutationVariables>(RemoveUserOrganizerManagerDocument, options);
      }
export type RemoveUserOrganizerManagerMutationHookResult = ReturnType<typeof useRemoveUserOrganizerManagerMutation>;
export type RemoveUserOrganizerManagerMutationResult = Apollo.MutationResult<RemoveUserOrganizerManagerMutation>;
export type RemoveUserOrganizerManagerMutationOptions = Apollo.BaseMutationOptions<RemoveUserOrganizerManagerMutation, RemoveUserOrganizerManagerMutationVariables>;
export const GetEventsByOrganizerDocument = gql`
    query GetEventsByOrganizer($organizer: ID!, $pagination: CursorPaginationOptions) {
  getEventsByOrganizer(organizer: $organizer, pagination: $pagination) {
    ...EventFields
    myRoles
    released
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetEventsByOrganizerQuery__
 *
 * To run a query within a React component, call `useGetEventsByOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsByOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsByOrganizerQuery({
 *   variables: {
 *      organizer: // value for 'organizer'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetEventsByOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetEventsByOrganizerQuery, GetEventsByOrganizerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventsByOrganizerQuery, GetEventsByOrganizerQueryVariables>(GetEventsByOrganizerDocument, options);
      }
export function useGetEventsByOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventsByOrganizerQuery, GetEventsByOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventsByOrganizerQuery, GetEventsByOrganizerQueryVariables>(GetEventsByOrganizerDocument, options);
        }
export type GetEventsByOrganizerQueryHookResult = ReturnType<typeof useGetEventsByOrganizerQuery>;
export type GetEventsByOrganizerLazyQueryHookResult = ReturnType<typeof useGetEventsByOrganizerLazyQuery>;
export type GetEventsByOrganizerQueryResult = Apollo.QueryResult<GetEventsByOrganizerQuery, GetEventsByOrganizerQueryVariables>;
export const GetUpcomingEventsByOrganizerDocument = gql`
    query GetUpcomingEventsByOrganizer($organizer: ID!, $pagination: CursorPaginationOptions) {
  getUpcomingEventsByOrganizer(organizer: $organizer, pagination: $pagination) {
    ...EventFields
    myRoles
    released
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetUpcomingEventsByOrganizerQuery__
 *
 * To run a query within a React component, call `useGetUpcomingEventsByOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingEventsByOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingEventsByOrganizerQuery({
 *   variables: {
 *      organizer: // value for 'organizer'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetUpcomingEventsByOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetUpcomingEventsByOrganizerQuery, GetUpcomingEventsByOrganizerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingEventsByOrganizerQuery, GetUpcomingEventsByOrganizerQueryVariables>(GetUpcomingEventsByOrganizerDocument, options);
      }
export function useGetUpcomingEventsByOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingEventsByOrganizerQuery, GetUpcomingEventsByOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingEventsByOrganizerQuery, GetUpcomingEventsByOrganizerQueryVariables>(GetUpcomingEventsByOrganizerDocument, options);
        }
export type GetUpcomingEventsByOrganizerQueryHookResult = ReturnType<typeof useGetUpcomingEventsByOrganizerQuery>;
export type GetUpcomingEventsByOrganizerLazyQueryHookResult = ReturnType<typeof useGetUpcomingEventsByOrganizerLazyQuery>;
export type GetUpcomingEventsByOrganizerQueryResult = Apollo.QueryResult<GetUpcomingEventsByOrganizerQuery, GetUpcomingEventsByOrganizerQueryVariables>;
export const GetPastEventsByOrganizerDocument = gql`
    query GetPastEventsByOrganizer($organizer: ID!, $pagination: CursorPaginationOptions) {
  getPastEventsByOrganizer(organizer: $organizer, pagination: $pagination) {
    ...EventFields
    myRoles
    released
  }
}
    ${EventFieldsFragmentDoc}`;

/**
 * __useGetPastEventsByOrganizerQuery__
 *
 * To run a query within a React component, call `useGetPastEventsByOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastEventsByOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastEventsByOrganizerQuery({
 *   variables: {
 *      organizer: // value for 'organizer'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPastEventsByOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetPastEventsByOrganizerQuery, GetPastEventsByOrganizerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPastEventsByOrganizerQuery, GetPastEventsByOrganizerQueryVariables>(GetPastEventsByOrganizerDocument, options);
      }
export function useGetPastEventsByOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPastEventsByOrganizerQuery, GetPastEventsByOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPastEventsByOrganizerQuery, GetPastEventsByOrganizerQueryVariables>(GetPastEventsByOrganizerDocument, options);
        }
export type GetPastEventsByOrganizerQueryHookResult = ReturnType<typeof useGetPastEventsByOrganizerQuery>;
export type GetPastEventsByOrganizerLazyQueryHookResult = ReturnType<typeof useGetPastEventsByOrganizerLazyQuery>;
export type GetPastEventsByOrganizerQueryResult = Apollo.QueryResult<GetPastEventsByOrganizerQuery, GetPastEventsByOrganizerQueryVariables>;
export const GetOrganizerByIdDocument = gql`
    query GetOrganizerById($id: ID!) {
  getOrganizerById(id: $id) {
    ...OrganizerFields
  }
}
    ${OrganizerFieldsFragmentDoc}`;

/**
 * __useGetOrganizerByIdQuery__
 *
 * To run a query within a React component, call `useGetOrganizerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizerByIdQuery, GetOrganizerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizerByIdQuery, GetOrganizerByIdQueryVariables>(GetOrganizerByIdDocument, options);
      }
export function useGetOrganizerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizerByIdQuery, GetOrganizerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizerByIdQuery, GetOrganizerByIdQueryVariables>(GetOrganizerByIdDocument, options);
        }
export type GetOrganizerByIdQueryHookResult = ReturnType<typeof useGetOrganizerByIdQuery>;
export type GetOrganizerByIdLazyQueryHookResult = ReturnType<typeof useGetOrganizerByIdLazyQuery>;
export type GetOrganizerByIdQueryResult = Apollo.QueryResult<GetOrganizerByIdQuery, GetOrganizerByIdQueryVariables>;
export const GetOrganizerLandingDocument = gql`
    query GetOrganizerLanding($organizerId: ID!, $pagination: CursorPaginationOptions) {
  getUpcomingEventsByOrganizer(organizer: $organizerId, pagination: $pagination) {
    ...EventFields
  }
  getPastEventsByOrganizer(organizer: $organizerId, pagination: $pagination) {
    ...EventFields
  }
  getOrganizerById(id: $organizerId) {
    ...OrganizerFields
  }
}
    ${EventFieldsFragmentDoc}
${OrganizerFieldsFragmentDoc}`;

/**
 * __useGetOrganizerLandingQuery__
 *
 * To run a query within a React component, call `useGetOrganizerLandingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizerLandingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizerLandingQuery({
 *   variables: {
 *      organizerId: // value for 'organizerId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetOrganizerLandingQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizerLandingQuery, GetOrganizerLandingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizerLandingQuery, GetOrganizerLandingQueryVariables>(GetOrganizerLandingDocument, options);
      }
export function useGetOrganizerLandingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizerLandingQuery, GetOrganizerLandingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizerLandingQuery, GetOrganizerLandingQueryVariables>(GetOrganizerLandingDocument, options);
        }
export type GetOrganizerLandingQueryHookResult = ReturnType<typeof useGetOrganizerLandingQuery>;
export type GetOrganizerLandingLazyQueryHookResult = ReturnType<typeof useGetOrganizerLandingLazyQuery>;
export type GetOrganizerLandingQueryResult = Apollo.QueryResult<GetOrganizerLandingQuery, GetOrganizerLandingQueryVariables>;
export const GetPrizesDocument = gql`
    query GetPrizes {
  getPrizes {
    isActive
    price
    title
    code
  }
}
    `;

/**
 * __useGetPrizesQuery__
 *
 * To run a query within a React component, call `useGetPrizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPrizesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPrizesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPrizesQuery(baseOptions?: Apollo.QueryHookOptions<GetPrizesQuery, GetPrizesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPrizesQuery, GetPrizesQueryVariables>(GetPrizesDocument, options);
      }
export function useGetPrizesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPrizesQuery, GetPrizesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPrizesQuery, GetPrizesQueryVariables>(GetPrizesDocument, options);
        }
export type GetPrizesQueryHookResult = ReturnType<typeof useGetPrizesQuery>;
export type GetPrizesLazyQueryHookResult = ReturnType<typeof useGetPrizesLazyQuery>;
export type GetPrizesQueryResult = Apollo.QueryResult<GetPrizesQuery, GetPrizesQueryVariables>;
export const InitRegionsDocument = gql`
    mutation InitRegions($lat: Float!, $lng: Float!) {
  initRegions(lat: $lat, lng: $lng) {
    currentRegion {
      ...RegionFields
    }
    pingId
    regions {
      identifier
      radius
      point {
        coordinates
      }
    }
  }
}
    ${RegionFieldsFragmentDoc}`;
export type InitRegionsMutationFn = Apollo.MutationFunction<InitRegionsMutation, InitRegionsMutationVariables>;

/**
 * __useInitRegionsMutation__
 *
 * To run a mutation, you first call `useInitRegionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitRegionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initRegionsMutation, { data, loading, error }] = useInitRegionsMutation({
 *   variables: {
 *      lat: // value for 'lat'
 *      lng: // value for 'lng'
 *   },
 * });
 */
export function useInitRegionsMutation(baseOptions?: Apollo.MutationHookOptions<InitRegionsMutation, InitRegionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitRegionsMutation, InitRegionsMutationVariables>(InitRegionsDocument, options);
      }
export type InitRegionsMutationHookResult = ReturnType<typeof useInitRegionsMutation>;
export type InitRegionsMutationResult = Apollo.MutationResult<InitRegionsMutation>;
export type InitRegionsMutationOptions = Apollo.BaseMutationOptions<InitRegionsMutation, InitRegionsMutationVariables>;
export const GetReviewsByOrganizerDocument = gql`
    query GetReviewsByOrganizer($organizerId: ID!, $pagination: PaginationOptions) {
  getReviewsByOrganizer(organizerId: $organizerId, pagination: $pagination) {
    ...ReviewFields
  }
}
    ${ReviewFieldsFragmentDoc}`;

/**
 * __useGetReviewsByOrganizerQuery__
 *
 * To run a query within a React component, call `useGetReviewsByOrganizerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewsByOrganizerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewsByOrganizerQuery({
 *   variables: {
 *      organizerId: // value for 'organizerId'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetReviewsByOrganizerQuery(baseOptions: Apollo.QueryHookOptions<GetReviewsByOrganizerQuery, GetReviewsByOrganizerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReviewsByOrganizerQuery, GetReviewsByOrganizerQueryVariables>(GetReviewsByOrganizerDocument, options);
      }
export function useGetReviewsByOrganizerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReviewsByOrganizerQuery, GetReviewsByOrganizerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReviewsByOrganizerQuery, GetReviewsByOrganizerQueryVariables>(GetReviewsByOrganizerDocument, options);
        }
export type GetReviewsByOrganizerQueryHookResult = ReturnType<typeof useGetReviewsByOrganizerQuery>;
export type GetReviewsByOrganizerLazyQueryHookResult = ReturnType<typeof useGetReviewsByOrganizerLazyQuery>;
export type GetReviewsByOrganizerQueryResult = Apollo.QueryResult<GetReviewsByOrganizerQuery, GetReviewsByOrganizerQueryVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($rating: Int!, $event: ID!, $comment: String) {
  createReview(rating: $rating, event: $event, comment: $comment) {
    review {
      ...ReviewFields
    }
    errorCode
  }
}
    ${ReviewFieldsFragmentDoc}`;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      rating: // value for 'rating'
 *      event: // value for 'event'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const RemoveReviewDocument = gql`
    mutation RemoveReview($id: ID!) {
  removeReview(id: $id) {
    success
  }
}
    `;
export type RemoveReviewMutationFn = Apollo.MutationFunction<RemoveReviewMutation, RemoveReviewMutationVariables>;

/**
 * __useRemoveReviewMutation__
 *
 * To run a mutation, you first call `useRemoveReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReviewMutation, { data, loading, error }] = useRemoveReviewMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveReviewMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReviewMutation, RemoveReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReviewMutation, RemoveReviewMutationVariables>(RemoveReviewDocument, options);
      }
export type RemoveReviewMutationHookResult = ReturnType<typeof useRemoveReviewMutation>;
export type RemoveReviewMutationResult = Apollo.MutationResult<RemoveReviewMutation>;
export type RemoveReviewMutationOptions = Apollo.BaseMutationOptions<RemoveReviewMutation, RemoveReviewMutationVariables>;
export const SearchSchoolsDocument = gql`
    query SearchSchools($name: String!) {
  searchSchools(name: $name) {
    id
    name
    prov
    add
    type_description
  }
}
    `;

/**
 * __useSearchSchoolsQuery__
 *
 * To run a query within a React component, call `useSearchSchoolsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSchoolsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSchoolsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSearchSchoolsQuery(baseOptions: Apollo.QueryHookOptions<SearchSchoolsQuery, SearchSchoolsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSchoolsQuery, SearchSchoolsQueryVariables>(SearchSchoolsDocument, options);
      }
export function useSearchSchoolsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSchoolsQuery, SearchSchoolsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSchoolsQuery, SearchSchoolsQueryVariables>(SearchSchoolsDocument, options);
        }
export type SearchSchoolsQueryHookResult = ReturnType<typeof useSearchSchoolsQuery>;
export type SearchSchoolsLazyQueryHookResult = ReturnType<typeof useSearchSchoolsLazyQuery>;
export type SearchSchoolsQueryResult = Apollo.QueryResult<SearchSchoolsQuery, SearchSchoolsQueryVariables>;
export const GetSchoolByIdDocument = gql`
    query getSchoolById($id: ID!) {
  getSchoolById(id: $id) {
    id
    add
    name
    prov
    lastSpotModeDate
    admins {
      id
      profilePicture {
        url
      }
      username
      links {
        instagramName
      }
    }
  }
}
    `;

/**
 * __useGetSchoolByIdQuery__
 *
 * To run a query within a React component, call `useGetSchoolByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSchoolByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>(GetSchoolByIdDocument, options);
      }
export function useGetSchoolByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>(GetSchoolByIdDocument, options);
        }
export type GetSchoolByIdQueryHookResult = ReturnType<typeof useGetSchoolByIdQuery>;
export type GetSchoolByIdLazyQueryHookResult = ReturnType<typeof useGetSchoolByIdLazyQuery>;
export type GetSchoolByIdQueryResult = Apollo.QueryResult<GetSchoolByIdQuery, GetSchoolByIdQueryVariables>;
export const LeaveSchoolDocument = gql`
    mutation LeaveSchool {
  leaveSchool {
    success
  }
}
    `;
export type LeaveSchoolMutationFn = Apollo.MutationFunction<LeaveSchoolMutation, LeaveSchoolMutationVariables>;

/**
 * __useLeaveSchoolMutation__
 *
 * To run a mutation, you first call `useLeaveSchoolMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveSchoolMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveSchoolMutation, { data, loading, error }] = useLeaveSchoolMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveSchoolMutation(baseOptions?: Apollo.MutationHookOptions<LeaveSchoolMutation, LeaveSchoolMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveSchoolMutation, LeaveSchoolMutationVariables>(LeaveSchoolDocument, options);
      }
export type LeaveSchoolMutationHookResult = ReturnType<typeof useLeaveSchoolMutation>;
export type LeaveSchoolMutationResult = Apollo.MutationResult<LeaveSchoolMutation>;
export type LeaveSchoolMutationOptions = Apollo.BaseMutationOptions<LeaveSchoolMutation, LeaveSchoolMutationVariables>;
export const StartSchoolSpotModeDocument = gql`
    mutation StartSchoolSpotMode {
  startSchoolSpotMode {
    success
  }
}
    `;
export type StartSchoolSpotModeMutationFn = Apollo.MutationFunction<StartSchoolSpotModeMutation, StartSchoolSpotModeMutationVariables>;

/**
 * __useStartSchoolSpotModeMutation__
 *
 * To run a mutation, you first call `useStartSchoolSpotModeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartSchoolSpotModeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startSchoolSpotModeMutation, { data, loading, error }] = useStartSchoolSpotModeMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartSchoolSpotModeMutation(baseOptions?: Apollo.MutationHookOptions<StartSchoolSpotModeMutation, StartSchoolSpotModeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartSchoolSpotModeMutation, StartSchoolSpotModeMutationVariables>(StartSchoolSpotModeDocument, options);
      }
export type StartSchoolSpotModeMutationHookResult = ReturnType<typeof useStartSchoolSpotModeMutation>;
export type StartSchoolSpotModeMutationResult = Apollo.MutationResult<StartSchoolSpotModeMutation>;
export type StartSchoolSpotModeMutationOptions = Apollo.BaseMutationOptions<StartSchoolSpotModeMutation, StartSchoolSpotModeMutationVariables>;
export const WhoamiDocument = gql`
    query Whoami {
  whoami {
    ban {
      banned
      reason
    }
    stats {
      spottedCount
      sentInteractionsCount
      recivedInteractionsCount
      acceptedInteractionsCount
      friendsCount
    }
    coins {
      count
    }
    school {
      id
      isAdmin
    }
    languageCode
    hasAdminArea
    firstName
    lastName
    currentEventID
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useWhoamiQuery__
 *
 * To run a query within a React component, call `useWhoamiQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoamiQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoamiQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoamiQuery(baseOptions?: Apollo.QueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
      }
export function useWhoamiLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoamiQuery, WhoamiQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoamiQuery, WhoamiQueryVariables>(WhoamiDocument, options);
        }
export type WhoamiQueryHookResult = ReturnType<typeof useWhoamiQuery>;
export type WhoamiLazyQueryHookResult = ReturnType<typeof useWhoamiLazyQuery>;
export type WhoamiQueryResult = Apollo.QueryResult<WhoamiQuery, WhoamiQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($username: String, $profileImage: AssetInput, $birthday: Date, $gender: Gender, $favDrink: String, $instagramName: String, $schoolID: ID, $firstName: String, $lastName: String) {
  updateUserProfile(
    username: $username
    profileImage: $profileImage
    birthday: $birthday
    gender: $gender
    favDrink: $favDrink
    instagramName: $instagramName
    schoolID: $schoolID
    firstName: $firstName
    lastName: $lastName
  ) {
    ban {
      banned
      reason
    }
    stats {
      spottedCount
      sentInteractionsCount
      recivedInteractionsCount
      acceptedInteractionsCount
      friendsCount
    }
    coins {
      count
    }
    school {
      id
      isAdmin
    }
    languageCode
    hasAdminArea
    firstName
    lastName
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      profileImage: // value for 'profileImage'
 *      birthday: // value for 'birthday'
 *      gender: // value for 'gender'
 *      favDrink: // value for 'favDrink'
 *      instagramName: // value for 'instagramName'
 *      schoolID: // value for 'schoolID'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const SetPushNotificationTokenDocument = gql`
    mutation SetPushNotificationToken($token: String!) {
  setPushNotificationToken(token: $token) {
    success
  }
}
    `;
export type SetPushNotificationTokenMutationFn = Apollo.MutationFunction<SetPushNotificationTokenMutation, SetPushNotificationTokenMutationVariables>;

/**
 * __useSetPushNotificationTokenMutation__
 *
 * To run a mutation, you first call `useSetPushNotificationTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPushNotificationTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPushNotificationTokenMutation, { data, loading, error }] = useSetPushNotificationTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useSetPushNotificationTokenMutation(baseOptions?: Apollo.MutationHookOptions<SetPushNotificationTokenMutation, SetPushNotificationTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPushNotificationTokenMutation, SetPushNotificationTokenMutationVariables>(SetPushNotificationTokenDocument, options);
      }
export type SetPushNotificationTokenMutationHookResult = ReturnType<typeof useSetPushNotificationTokenMutation>;
export type SetPushNotificationTokenMutationResult = Apollo.MutationResult<SetPushNotificationTokenMutation>;
export type SetPushNotificationTokenMutationOptions = Apollo.BaseMutationOptions<SetPushNotificationTokenMutation, SetPushNotificationTokenMutationVariables>;
export const SetLanguageCodeDocument = gql`
    mutation SetLanguageCode($code: String!) {
  setLanguageCode(code: $code) {
    success
  }
}
    `;
export type SetLanguageCodeMutationFn = Apollo.MutationFunction<SetLanguageCodeMutation, SetLanguageCodeMutationVariables>;

/**
 * __useSetLanguageCodeMutation__
 *
 * To run a mutation, you first call `useSetLanguageCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetLanguageCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setLanguageCodeMutation, { data, loading, error }] = useSetLanguageCodeMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useSetLanguageCodeMutation(baseOptions?: Apollo.MutationHookOptions<SetLanguageCodeMutation, SetLanguageCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetLanguageCodeMutation, SetLanguageCodeMutationVariables>(SetLanguageCodeDocument, options);
      }
export type SetLanguageCodeMutationHookResult = ReturnType<typeof useSetLanguageCodeMutation>;
export type SetLanguageCodeMutationResult = Apollo.MutationResult<SetLanguageCodeMutation>;
export type SetLanguageCodeMutationOptions = Apollo.BaseMutationOptions<SetLanguageCodeMutation, SetLanguageCodeMutationVariables>;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($email: String!) {
  changeEmail(email: $email) {
    success
    recipient
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, options);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordWithTokenDocument = gql`
    mutation ChangePasswordWithToken($token: String!, $newPassword: String!) {
  changePasswordWithToken(token: $token, newPassword: $newPassword) {
    success
  }
}
    `;
export type ChangePasswordWithTokenMutationFn = Apollo.MutationFunction<ChangePasswordWithTokenMutation, ChangePasswordWithTokenMutationVariables>;

/**
 * __useChangePasswordWithTokenMutation__
 *
 * To run a mutation, you first call `useChangePasswordWithTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordWithTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordWithTokenMutation, { data, loading, error }] = useChangePasswordWithTokenMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordWithTokenMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordWithTokenMutation, ChangePasswordWithTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordWithTokenMutation, ChangePasswordWithTokenMutationVariables>(ChangePasswordWithTokenDocument, options);
      }
export type ChangePasswordWithTokenMutationHookResult = ReturnType<typeof useChangePasswordWithTokenMutation>;
export type ChangePasswordWithTokenMutationResult = Apollo.MutationResult<ChangePasswordWithTokenMutation>;
export type ChangePasswordWithTokenMutationOptions = Apollo.BaseMutationOptions<ChangePasswordWithTokenMutation, ChangePasswordWithTokenMutationVariables>;
export const EditPasswordDocument = gql`
    mutation EditPassword($oldPassword: String!, $newPassword: String!) {
  editPassword(oldPassword: $oldPassword, newPassword: $newPassword) {
    success
  }
}
    `;
export type EditPasswordMutationFn = Apollo.MutationFunction<EditPasswordMutation, EditPasswordMutationVariables>;

/**
 * __useEditPasswordMutation__
 *
 * To run a mutation, you first call `useEditPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPasswordMutation, { data, loading, error }] = useEditPasswordMutation({
 *   variables: {
 *      oldPassword: // value for 'oldPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useEditPasswordMutation(baseOptions?: Apollo.MutationHookOptions<EditPasswordMutation, EditPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPasswordMutation, EditPasswordMutationVariables>(EditPasswordDocument, options);
      }
export type EditPasswordMutationHookResult = ReturnType<typeof useEditPasswordMutation>;
export type EditPasswordMutationResult = Apollo.MutationResult<EditPasswordMutation>;
export type EditPasswordMutationOptions = Apollo.BaseMutationOptions<EditPasswordMutation, EditPasswordMutationVariables>;
export const BanUserDocument = gql`
    mutation BanUser($userId: ID!, $reason: String) {
  banUser(userId: $userId, reason: $reason) {
    success
  }
}
    `;
export type BanUserMutationFn = Apollo.MutationFunction<BanUserMutation, BanUserMutationVariables>;

/**
 * __useBanUserMutation__
 *
 * To run a mutation, you first call `useBanUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banUserMutation, { data, loading, error }] = useBanUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useBanUserMutation(baseOptions?: Apollo.MutationHookOptions<BanUserMutation, BanUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanUserMutation, BanUserMutationVariables>(BanUserDocument, options);
      }
export type BanUserMutationHookResult = ReturnType<typeof useBanUserMutation>;
export type BanUserMutationResult = Apollo.MutationResult<BanUserMutation>;
export type BanUserMutationOptions = Apollo.BaseMutationOptions<BanUserMutation, BanUserMutationVariables>;
export const GetUsersAdminDocument = gql`
    query GetUsersAdmin($pagination: CursorPaginationOptions, $onlyLimit: Boolean) {
  getUsersAdmin(pagination: $pagination, onlyLimit: $onlyLimit) {
    ...UserFields
    ban {
      banned
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUsersAdminQuery__
 *
 * To run a query within a React component, call `useGetUsersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersAdminQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      onlyLimit: // value for 'onlyLimit'
 *   },
 * });
 */
export function useGetUsersAdminQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersAdminQuery, GetUsersAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersAdminQuery, GetUsersAdminQueryVariables>(GetUsersAdminDocument, options);
      }
export function useGetUsersAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersAdminQuery, GetUsersAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersAdminQuery, GetUsersAdminQueryVariables>(GetUsersAdminDocument, options);
        }
export type GetUsersAdminQueryHookResult = ReturnType<typeof useGetUsersAdminQuery>;
export type GetUsersAdminLazyQueryHookResult = ReturnType<typeof useGetUsersAdminLazyQuery>;
export type GetUsersAdminQueryResult = Apollo.QueryResult<GetUsersAdminQuery, GetUsersAdminQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  getUserById(id: $id) {
    ...UserFields
    spotInfo {
      areFriends
      createdAt
      event {
        id
        title
        image {
          url
          blurhash
        }
      }
    }
    hasRequestedFriendship
    eventsAttendedCount
    stats {
      spottedCount
      friendsCount
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const ReportUserDocument = gql`
    mutation ReportUser($userId: ID!, $reason: String!) {
  reportUser(userId: $userId, reason: $reason) {
    success
  }
}
    `;
export type ReportUserMutationFn = Apollo.MutationFunction<ReportUserMutation, ReportUserMutationVariables>;

/**
 * __useReportUserMutation__
 *
 * To run a mutation, you first call `useReportUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportUserMutation, { data, loading, error }] = useReportUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReportUserMutation(baseOptions?: Apollo.MutationHookOptions<ReportUserMutation, ReportUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportUserMutation, ReportUserMutationVariables>(ReportUserDocument, options);
      }
export type ReportUserMutationHookResult = ReturnType<typeof useReportUserMutation>;
export type ReportUserMutationResult = Apollo.MutationResult<ReportUserMutation>;
export type ReportUserMutationOptions = Apollo.BaseMutationOptions<ReportUserMutation, ReportUserMutationVariables>;
export const GetReportedUsersDocument = gql`
    query GetReportedUsers($pagination: CursorPaginationOptions) {
  getReportedUsers(pagination: $pagination) {
    id
    username
    profilePicture {
      url
      blurhash
    }
    gender
    ban {
      banned
    }
  }
}
    `;

/**
 * __useGetReportedUsersQuery__
 *
 * To run a query within a React component, call `useGetReportedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReportedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReportedUsersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetReportedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetReportedUsersQuery, GetReportedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReportedUsersQuery, GetReportedUsersQueryVariables>(GetReportedUsersDocument, options);
      }
export function useGetReportedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReportedUsersQuery, GetReportedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReportedUsersQuery, GetReportedUsersQueryVariables>(GetReportedUsersDocument, options);
        }
export type GetReportedUsersQueryHookResult = ReturnType<typeof useGetReportedUsersQuery>;
export type GetReportedUsersLazyQueryHookResult = ReturnType<typeof useGetReportedUsersLazyQuery>;
export type GetReportedUsersQueryResult = Apollo.QueryResult<GetReportedUsersQuery, GetReportedUsersQueryVariables>;
export const RemoveUserReportsDocument = gql`
    mutation RemoveUserReports($userId: ID!) {
  removeUserReports(userId: $userId) {
    success
  }
}
    `;
export type RemoveUserReportsMutationFn = Apollo.MutationFunction<RemoveUserReportsMutation, RemoveUserReportsMutationVariables>;

/**
 * __useRemoveUserReportsMutation__
 *
 * To run a mutation, you first call `useRemoveUserReportsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserReportsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserReportsMutation, { data, loading, error }] = useRemoveUserReportsMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserReportsMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserReportsMutation, RemoveUserReportsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserReportsMutation, RemoveUserReportsMutationVariables>(RemoveUserReportsDocument, options);
      }
export type RemoveUserReportsMutationHookResult = ReturnType<typeof useRemoveUserReportsMutation>;
export type RemoveUserReportsMutationResult = Apollo.MutationResult<RemoveUserReportsMutation>;
export type RemoveUserReportsMutationOptions = Apollo.BaseMutationOptions<RemoveUserReportsMutation, RemoveUserReportsMutationVariables>;
export const GetNearbyUserByIdDocument = gql`
    query GetNearbyUserById($userId: ID!) {
  getNearbyUserById(userId: $userId) {
    user {
      ...UserFields
    }
    blocked
    offline
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetNearbyUserByIdQuery__
 *
 * To run a query within a React component, call `useGetNearbyUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNearbyUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNearbyUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetNearbyUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetNearbyUserByIdQuery, GetNearbyUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNearbyUserByIdQuery, GetNearbyUserByIdQueryVariables>(GetNearbyUserByIdDocument, options);
      }
export function useGetNearbyUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNearbyUserByIdQuery, GetNearbyUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNearbyUserByIdQuery, GetNearbyUserByIdQueryVariables>(GetNearbyUserByIdDocument, options);
        }
export type GetNearbyUserByIdQueryHookResult = ReturnType<typeof useGetNearbyUserByIdQuery>;
export type GetNearbyUserByIdLazyQueryHookResult = ReturnType<typeof useGetNearbyUserByIdLazyQuery>;
export type GetNearbyUserByIdQueryResult = Apollo.QueryResult<GetNearbyUserByIdQuery, GetNearbyUserByIdQueryVariables>;
export const SpotUserDocument = gql`
    mutation SpotUser($userId: ID!) {
  spotUser(userId: $userId) {
    success
    new
    sharedUsers {
      userId
      new
    }
  }
}
    `;
export type SpotUserMutationFn = Apollo.MutationFunction<SpotUserMutation, SpotUserMutationVariables>;

/**
 * __useSpotUserMutation__
 *
 * To run a mutation, you first call `useSpotUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSpotUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [spotUserMutation, { data, loading, error }] = useSpotUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSpotUserMutation(baseOptions?: Apollo.MutationHookOptions<SpotUserMutation, SpotUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SpotUserMutation, SpotUserMutationVariables>(SpotUserDocument, options);
      }
export type SpotUserMutationHookResult = ReturnType<typeof useSpotUserMutation>;
export type SpotUserMutationResult = Apollo.MutationResult<SpotUserMutation>;
export type SpotUserMutationOptions = Apollo.BaseMutationOptions<SpotUserMutation, SpotUserMutationVariables>;
export const MarkUserAsEventParticipantDocument = gql`
    mutation MarkUserAsEventParticipant($joinCode: ID!) {
  markUserAsEventParticipant(joinCode: $joinCode) {
    success
  }
}
    `;
export type MarkUserAsEventParticipantMutationFn = Apollo.MutationFunction<MarkUserAsEventParticipantMutation, MarkUserAsEventParticipantMutationVariables>;

/**
 * __useMarkUserAsEventParticipantMutation__
 *
 * To run a mutation, you first call `useMarkUserAsEventParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkUserAsEventParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markUserAsEventParticipantMutation, { data, loading, error }] = useMarkUserAsEventParticipantMutation({
 *   variables: {
 *      joinCode: // value for 'joinCode'
 *   },
 * });
 */
export function useMarkUserAsEventParticipantMutation(baseOptions?: Apollo.MutationHookOptions<MarkUserAsEventParticipantMutation, MarkUserAsEventParticipantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkUserAsEventParticipantMutation, MarkUserAsEventParticipantMutationVariables>(MarkUserAsEventParticipantDocument, options);
      }
export type MarkUserAsEventParticipantMutationHookResult = ReturnType<typeof useMarkUserAsEventParticipantMutation>;
export type MarkUserAsEventParticipantMutationResult = Apollo.MutationResult<MarkUserAsEventParticipantMutation>;
export type MarkUserAsEventParticipantMutationOptions = Apollo.BaseMutationOptions<MarkUserAsEventParticipantMutation, MarkUserAsEventParticipantMutationVariables>;
export const GetSpottedUsersDocument = gql`
    query GetSpottedUsers($pagination: CursorPaginationOptions) {
  getSpottedUsers(pagination: $pagination) {
    items {
      user {
        username
        id
        profilePicture {
          url
          blurhash
        }
      }
      createdAt
      id
      areFriends
    }
    cursor
    endReached
  }
}
    `;

/**
 * __useGetSpottedUsersQuery__
 *
 * To run a query within a React component, call `useGetSpottedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpottedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpottedUsersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetSpottedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetSpottedUsersQuery, GetSpottedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpottedUsersQuery, GetSpottedUsersQueryVariables>(GetSpottedUsersDocument, options);
      }
export function useGetSpottedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpottedUsersQuery, GetSpottedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpottedUsersQuery, GetSpottedUsersQueryVariables>(GetSpottedUsersDocument, options);
        }
export type GetSpottedUsersQueryHookResult = ReturnType<typeof useGetSpottedUsersQuery>;
export type GetSpottedUsersLazyQueryHookResult = ReturnType<typeof useGetSpottedUsersLazyQuery>;
export type GetSpottedUsersQueryResult = Apollo.QueryResult<GetSpottedUsersQuery, GetSpottedUsersQueryVariables>;
export const SearchSpottedUsersDocument = gql`
    query SearchSpottedUsers($searchText: String!) {
  searchSpottedUsers(searchText: $searchText) {
    user {
      username
      id
      profilePicture {
        url
        blurhash
      }
    }
    createdAt
    id
    areFriends
  }
}
    `;

/**
 * __useSearchSpottedUsersQuery__
 *
 * To run a query within a React component, call `useSearchSpottedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchSpottedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchSpottedUsersQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSearchSpottedUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchSpottedUsersQuery, SearchSpottedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchSpottedUsersQuery, SearchSpottedUsersQueryVariables>(SearchSpottedUsersDocument, options);
      }
export function useSearchSpottedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchSpottedUsersQuery, SearchSpottedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchSpottedUsersQuery, SearchSpottedUsersQueryVariables>(SearchSpottedUsersDocument, options);
        }
export type SearchSpottedUsersQueryHookResult = ReturnType<typeof useSearchSpottedUsersQuery>;
export type SearchSpottedUsersLazyQueryHookResult = ReturnType<typeof useSearchSpottedUsersLazyQuery>;
export type SearchSpottedUsersQueryResult = Apollo.QueryResult<SearchSpottedUsersQuery, SearchSpottedUsersQueryVariables>;
export const AddTextStatusDocument = gql`
    mutation AddTextStatus($text: String) {
  addTextStatus(text: $text) {
    text
    createdAt
  }
}
    `;
export type AddTextStatusMutationFn = Apollo.MutationFunction<AddTextStatusMutation, AddTextStatusMutationVariables>;

/**
 * __useAddTextStatusMutation__
 *
 * To run a mutation, you first call `useAddTextStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTextStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTextStatusMutation, { data, loading, error }] = useAddTextStatusMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddTextStatusMutation(baseOptions?: Apollo.MutationHookOptions<AddTextStatusMutation, AddTextStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTextStatusMutation, AddTextStatusMutationVariables>(AddTextStatusDocument, options);
      }
export type AddTextStatusMutationHookResult = ReturnType<typeof useAddTextStatusMutation>;
export type AddTextStatusMutationResult = Apollo.MutationResult<AddTextStatusMutation>;
export type AddTextStatusMutationOptions = Apollo.BaseMutationOptions<AddTextStatusMutation, AddTextStatusMutationVariables>;
export const NearbyStartupDocument = gql`
    mutation NearbyStartup {
  nearbyStartup {
    pingID
    spotCode
    success
  }
}
    `;
export type NearbyStartupMutationFn = Apollo.MutationFunction<NearbyStartupMutation, NearbyStartupMutationVariables>;

/**
 * __useNearbyStartupMutation__
 *
 * To run a mutation, you first call `useNearbyStartupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNearbyStartupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [nearbyStartupMutation, { data, loading, error }] = useNearbyStartupMutation({
 *   variables: {
 *   },
 * });
 */
export function useNearbyStartupMutation(baseOptions?: Apollo.MutationHookOptions<NearbyStartupMutation, NearbyStartupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NearbyStartupMutation, NearbyStartupMutationVariables>(NearbyStartupDocument, options);
      }
export type NearbyStartupMutationHookResult = ReturnType<typeof useNearbyStartupMutation>;
export type NearbyStartupMutationResult = Apollo.MutationResult<NearbyStartupMutation>;
export type NearbyStartupMutationOptions = Apollo.BaseMutationOptions<NearbyStartupMutation, NearbyStartupMutationVariables>;
export const GetFriendsDocument = gql`
    query GetFriends($pagination: CursorPaginationOptions) {
  getFriends(pagination: $pagination) {
    items {
      username
      id
      profilePicture {
        url
        blurhash
      }
    }
    cursor
    endReached
  }
}
    `;

/**
 * __useGetFriendsQuery__
 *
 * To run a query within a React component, call `useGetFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
      }
export function useGetFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, options);
        }
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<typeof useGetFriendsLazyQuery>;
export type GetFriendsQueryResult = Apollo.QueryResult<GetFriendsQuery, GetFriendsQueryVariables>;
export const AskFriendshipDocument = gql`
    mutation AskFriendship($targetId: ID!) {
  askFriendship(targetId: $targetId) {
    success
  }
}
    `;
export type AskFriendshipMutationFn = Apollo.MutationFunction<AskFriendshipMutation, AskFriendshipMutationVariables>;

/**
 * __useAskFriendshipMutation__
 *
 * To run a mutation, you first call `useAskFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAskFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [askFriendshipMutation, { data, loading, error }] = useAskFriendshipMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useAskFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<AskFriendshipMutation, AskFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AskFriendshipMutation, AskFriendshipMutationVariables>(AskFriendshipDocument, options);
      }
export type AskFriendshipMutationHookResult = ReturnType<typeof useAskFriendshipMutation>;
export type AskFriendshipMutationResult = Apollo.MutationResult<AskFriendshipMutation>;
export type AskFriendshipMutationOptions = Apollo.BaseMutationOptions<AskFriendshipMutation, AskFriendshipMutationVariables>;
export const AcceptFriendshipDocument = gql`
    mutation AcceptFriendship($targetId: ID!) {
  acceptFriendship(targetId: $targetId) {
    success
  }
}
    `;
export type AcceptFriendshipMutationFn = Apollo.MutationFunction<AcceptFriendshipMutation, AcceptFriendshipMutationVariables>;

/**
 * __useAcceptFriendshipMutation__
 *
 * To run a mutation, you first call `useAcceptFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendshipMutation, { data, loading, error }] = useAcceptFriendshipMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useAcceptFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendshipMutation, AcceptFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendshipMutation, AcceptFriendshipMutationVariables>(AcceptFriendshipDocument, options);
      }
export type AcceptFriendshipMutationHookResult = ReturnType<typeof useAcceptFriendshipMutation>;
export type AcceptFriendshipMutationResult = Apollo.MutationResult<AcceptFriendshipMutation>;
export type AcceptFriendshipMutationOptions = Apollo.BaseMutationOptions<AcceptFriendshipMutation, AcceptFriendshipMutationVariables>;
export const RejectFriendshipDocument = gql`
    mutation RejectFriendship($targetId: ID!) {
  rejectFriendship(targetId: $targetId) {
    success
  }
}
    `;
export type RejectFriendshipMutationFn = Apollo.MutationFunction<RejectFriendshipMutation, RejectFriendshipMutationVariables>;

/**
 * __useRejectFriendshipMutation__
 *
 * To run a mutation, you first call `useRejectFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectFriendshipMutation, { data, loading, error }] = useRejectFriendshipMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useRejectFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<RejectFriendshipMutation, RejectFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectFriendshipMutation, RejectFriendshipMutationVariables>(RejectFriendshipDocument, options);
      }
export type RejectFriendshipMutationHookResult = ReturnType<typeof useRejectFriendshipMutation>;
export type RejectFriendshipMutationResult = Apollo.MutationResult<RejectFriendshipMutation>;
export type RejectFriendshipMutationOptions = Apollo.BaseMutationOptions<RejectFriendshipMutation, RejectFriendshipMutationVariables>;
export const RemoveFriendshipDocument = gql`
    mutation RemoveFriendship($targetId: ID!) {
  removeFriendship(targetId: $targetId) {
    success
  }
}
    `;
export type RemoveFriendshipMutationFn = Apollo.MutationFunction<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>;

/**
 * __useRemoveFriendshipMutation__
 *
 * To run a mutation, you first call `useRemoveFriendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendshipMutation, { data, loading, error }] = useRemoveFriendshipMutation({
 *   variables: {
 *      targetId: // value for 'targetId'
 *   },
 * });
 */
export function useRemoveFriendshipMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>(RemoveFriendshipDocument, options);
      }
export type RemoveFriendshipMutationHookResult = ReturnType<typeof useRemoveFriendshipMutation>;
export type RemoveFriendshipMutationResult = Apollo.MutationResult<RemoveFriendshipMutation>;
export type RemoveFriendshipMutationOptions = Apollo.BaseMutationOptions<RemoveFriendshipMutation, RemoveFriendshipMutationVariables>;
export const GetFriendshipRequestsDocument = gql`
    query GetFriendshipRequests {
  getFriendshipRequests {
    username
    id
    profilePicture {
      url
      blurhash
    }
  }
}
    `;

/**
 * __useGetFriendshipRequestsQuery__
 *
 * To run a query within a React component, call `useGetFriendshipRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendshipRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendshipRequestsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendshipRequestsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendshipRequestsQuery, GetFriendshipRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendshipRequestsQuery, GetFriendshipRequestsQueryVariables>(GetFriendshipRequestsDocument, options);
      }
export function useGetFriendshipRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendshipRequestsQuery, GetFriendshipRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendshipRequestsQuery, GetFriendshipRequestsQueryVariables>(GetFriendshipRequestsDocument, options);
        }
export type GetFriendshipRequestsQueryHookResult = ReturnType<typeof useGetFriendshipRequestsQuery>;
export type GetFriendshipRequestsLazyQueryHookResult = ReturnType<typeof useGetFriendshipRequestsLazyQuery>;
export type GetFriendshipRequestsQueryResult = Apollo.QueryResult<GetFriendshipRequestsQuery, GetFriendshipRequestsQueryVariables>;
export const GetFriendshipRequestsSentDocument = gql`
    query GetFriendshipRequestsSent {
  getFriendshipRequestsSent
}
    `;

/**
 * __useGetFriendshipRequestsSentQuery__
 *
 * To run a query within a React component, call `useGetFriendshipRequestsSentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendshipRequestsSentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendshipRequestsSentQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFriendshipRequestsSentQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendshipRequestsSentQuery, GetFriendshipRequestsSentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFriendshipRequestsSentQuery, GetFriendshipRequestsSentQueryVariables>(GetFriendshipRequestsSentDocument, options);
      }
export function useGetFriendshipRequestsSentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFriendshipRequestsSentQuery, GetFriendshipRequestsSentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFriendshipRequestsSentQuery, GetFriendshipRequestsSentQueryVariables>(GetFriendshipRequestsSentDocument, options);
        }
export type GetFriendshipRequestsSentQueryHookResult = ReturnType<typeof useGetFriendshipRequestsSentQuery>;
export type GetFriendshipRequestsSentLazyQueryHookResult = ReturnType<typeof useGetFriendshipRequestsSentLazyQuery>;
export type GetFriendshipRequestsSentQueryResult = Apollo.QueryResult<GetFriendshipRequestsSentQuery, GetFriendshipRequestsSentQueryVariables>;
export const SearchUserByPhoneNumberDocument = gql`
    query SearchUserByPhoneNumber($phoneNumber: String!) {
  searchUserByPhoneNumber(phoneNumber: $phoneNumber) {
    username
    id
    profilePicture {
      url
      blurhash
    }
    firstName
    lastName
  }
}
    `;

/**
 * __useSearchUserByPhoneNumberQuery__
 *
 * To run a query within a React component, call `useSearchUserByPhoneNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserByPhoneNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserByPhoneNumberQuery({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useSearchUserByPhoneNumberQuery(baseOptions: Apollo.QueryHookOptions<SearchUserByPhoneNumberQuery, SearchUserByPhoneNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserByPhoneNumberQuery, SearchUserByPhoneNumberQueryVariables>(SearchUserByPhoneNumberDocument, options);
      }
export function useSearchUserByPhoneNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserByPhoneNumberQuery, SearchUserByPhoneNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserByPhoneNumberQuery, SearchUserByPhoneNumberQueryVariables>(SearchUserByPhoneNumberDocument, options);
        }
export type SearchUserByPhoneNumberQueryHookResult = ReturnType<typeof useSearchUserByPhoneNumberQuery>;
export type SearchUserByPhoneNumberLazyQueryHookResult = ReturnType<typeof useSearchUserByPhoneNumberLazyQuery>;
export type SearchUserByPhoneNumberQueryResult = Apollo.QueryResult<SearchUserByPhoneNumberQuery, SearchUserByPhoneNumberQueryVariables>;
export const GetAdminAreaInfoDocument = gql`
    query GetAdminAreaInfo {
  getAdminAreaInfo {
    isAppAdmin
  }
}
    `;

/**
 * __useGetAdminAreaInfoQuery__
 *
 * To run a query within a React component, call `useGetAdminAreaInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminAreaInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminAreaInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminAreaInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetAdminAreaInfoQuery, GetAdminAreaInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAdminAreaInfoQuery, GetAdminAreaInfoQueryVariables>(GetAdminAreaInfoDocument, options);
      }
export function useGetAdminAreaInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAdminAreaInfoQuery, GetAdminAreaInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAdminAreaInfoQuery, GetAdminAreaInfoQueryVariables>(GetAdminAreaInfoDocument, options);
        }
export type GetAdminAreaInfoQueryHookResult = ReturnType<typeof useGetAdminAreaInfoQuery>;
export type GetAdminAreaInfoLazyQueryHookResult = ReturnType<typeof useGetAdminAreaInfoLazyQuery>;
export type GetAdminAreaInfoQueryResult = Apollo.QueryResult<GetAdminAreaInfoQuery, GetAdminAreaInfoQueryVariables>;
export const SearchUserByTextOrPhoneNumberDocument = gql`
    query SearchUserByTextOrPhoneNumber($text: String!) {
  searchUserByTextOrPhoneNumber(text: $text) {
    username
    id
    profilePicture {
      url
      blurhash
    }
  }
}
    `;

/**
 * __useSearchUserByTextOrPhoneNumberQuery__
 *
 * To run a query within a React component, call `useSearchUserByTextOrPhoneNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUserByTextOrPhoneNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUserByTextOrPhoneNumberQuery({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useSearchUserByTextOrPhoneNumberQuery(baseOptions: Apollo.QueryHookOptions<SearchUserByTextOrPhoneNumberQuery, SearchUserByTextOrPhoneNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserByTextOrPhoneNumberQuery, SearchUserByTextOrPhoneNumberQueryVariables>(SearchUserByTextOrPhoneNumberDocument, options);
      }
export function useSearchUserByTextOrPhoneNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserByTextOrPhoneNumberQuery, SearchUserByTextOrPhoneNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserByTextOrPhoneNumberQuery, SearchUserByTextOrPhoneNumberQueryVariables>(SearchUserByTextOrPhoneNumberDocument, options);
        }
export type SearchUserByTextOrPhoneNumberQueryHookResult = ReturnType<typeof useSearchUserByTextOrPhoneNumberQuery>;
export type SearchUserByTextOrPhoneNumberLazyQueryHookResult = ReturnType<typeof useSearchUserByTextOrPhoneNumberLazyQuery>;
export type SearchUserByTextOrPhoneNumberQueryResult = Apollo.QueryResult<SearchUserByTextOrPhoneNumberQuery, SearchUserByTextOrPhoneNumberQueryVariables>;
export const GetMyTicketsDocument = gql`
    query GetMyTickets($pagination: CursorPaginationOptions) {
  getMyTickets(pagination: $pagination) {
    ...TicketFields
  }
}
    ${TicketFieldsFragmentDoc}`;

/**
 * __useGetMyTicketsQuery__
 *
 * To run a query within a React component, call `useGetMyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketsQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetMyTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketsQuery, GetMyTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketsQuery, GetMyTicketsQueryVariables>(GetMyTicketsDocument, options);
      }
export function useGetMyTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketsQuery, GetMyTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketsQuery, GetMyTicketsQueryVariables>(GetMyTicketsDocument, options);
        }
export type GetMyTicketsQueryHookResult = ReturnType<typeof useGetMyTicketsQuery>;
export type GetMyTicketsLazyQueryHookResult = ReturnType<typeof useGetMyTicketsLazyQuery>;
export type GetMyTicketsQueryResult = Apollo.QueryResult<GetMyTicketsQuery, GetMyTicketsQueryVariables>;