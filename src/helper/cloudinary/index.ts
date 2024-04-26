import { ImageSource } from "../types";
import { API_URL } from "../APIs/myApi";
import { keys, validationConfig } from "../../config";
import { lookup } from "react-native-mime-types";
import * as ImageManipulator from "expo-image-manipulator";
import { v4 as uuid } from "uuid";
import { isEqual } from "lodash";
import { Blurhash } from "react-native-blurhash";
import { encode } from "blurhash";

export interface UploadImageResult {
  url: string;
  asset_id: string;
  public_id: string;
  aspectRatio?: number;
  blurhash?: string;
}

interface UploadOptions {
  width?: number;
  height?: number;
  remote?: boolean;
}

export enum UploadType {
  ProfilePicture = "profile-picture",
  OrganizerImage = "organizer-image",
  EventImage = "event-image",
}

// Conserva tutte le immagini già caricate (da l'apertura dell'app)
const IMAGES_ALREADY_UPLOADED: {
  key: string;
  result: UploadImageResult;
  options: UploadOptions;
  uploadType: UploadType;
}[] = [];

/**
 * Carica una risorsa (immagine, video, traccia audio) nei server di cloudinary
 * @param assetUri URI della risorsa
 * @param uploadType Tipo di risorsa da caricare
 */
export const uploadAsset = async () => {};

const getBlurhash = async (
  uri: string,
  uploadType: UploadType,
  width: number,
  height: number
) => {
  const blurhash = await Blurhash.encode(uri, 3, 4);

  return blurhash;
};

const resizeAsset = async (
  assetUri: string,
  width: number,
  height: number,
  type: UploadType
): Promise<string> => {
  let maxWidth;
  let maxHeight;
  let resize: { width?: number; height?: number } | null = null;
  let compression = 1;

  // PROFILE PICTURE
  if (type === UploadType.ProfilePicture) {
    maxWidth = validationConfig.media.profilePicture.width.max;
    maxHeight = validationConfig.media.profilePicture.height.max;
    compression = 0.8;
  }
  // ORGANIZER IMAGE
  else if (type === UploadType.OrganizerImage) {
    maxWidth = validationConfig.media.organizerImage.width.max;
    maxHeight = validationConfig.media.organizerImage.height.max;
    compression = 0.8;
  }
  // EVENT IMAGE
  else if (type === UploadType.EventImage) {
    maxWidth = validationConfig.media.eventImage.width.max;
    maxHeight = validationConfig.media.eventImage.height.max;
    compression = 0.8;
  }

  if (maxWidth && maxHeight) {
    if (width > maxWidth && height > maxHeight) {
      if (width > height) resize = { width: maxWidth };
      else resize = { height: maxHeight };
    } else if (width > maxWidth) resize = { width: maxWidth };
    else if (height > maxHeight) resize = { height: maxHeight };

    if (resize) {
      const res = await ImageManipulator.manipulateAsync(
        assetUri,
        [{ resize }],
        {
          compress: compression,
        }
      );
      return res.uri;
    }
    return assetUri;
  }

  return assetUri;
};

export const clearUploadedImagesCache = () => {
  IMAGES_ALREADY_UPLOADED.length = 0;
};
