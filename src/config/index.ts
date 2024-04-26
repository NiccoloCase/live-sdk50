export const keys = {
  SERVER_MAJOR_VERSION: 4,
  APP_NAME: "SpotLive",
  cloudinary: {
    API_KEY: "",
    CLOUD_NAME: "",
  },
  SERVER_URL: "https://api.spotlive.it", //"http://192.168.1.6:5112",
  GOOGLE_MAPS_API_KEY: "",
  EXPO_PROJECT_ID: "",
  STRIPE: {
    production: {
      PUBLISHABLE_KEY: "",
    },
    development: {
      PUBLISHABLE_KEY: "",
    },
  },
};

export const validationConfig = {
  // UTENTE
  user: {
    email: { length: { max: 320 } },
    username: {
      length: { min: 3, max: 15 },
      regex: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,}$/,
    },
    password: { length: { min: 3, max: 30 } },
    textStatus: { length: { max: 120 } },
  },
  // MEDIA
  media: {
    profilePicture: {
      aspectRatio: 3 / 4,
      width: { max: 2100 },
      height: { max: 2800 },
    },
    eventImage: {
      aspectRatio: 1,
      width: { max: 1440 },
      height: { max: 1440 },
    },
    organizerImage: {
      aspectRatio: 1,
      width: { max: 600 },
      height: { max: 600 },
    },
  },
  // EVENTO
  event: {
    title: { length: { min: 1, max: 100 } },
    description: { length: { min: 1, max: 500 } },
    locationText: { length: { max: 100 } },
    priceText: { length: { max: 100 } },
  },
  // ORGANIZZATORE
  organizer: {
    name: { length: { min: 3, max: 100 } },
    description: { length: { max: 500 } },
  },
  // RECENSIONE
  review: {
    comment: { length: { max: 500 } },
  },
  // PACCHETTO EVENTO
  eventPackage: {
    name: { length: { min: 3, max: 100 } },
    description: { length: { max: 500 } },
    currency: { length: { max: 3 } },
    userPrice: { min: 0 },
  },
};

export const INTERACTION_EXPIRATION_TIME = 60; // 1 minuto

export const PING_INTERVAL = 20 * 1000; // 20 secondi
