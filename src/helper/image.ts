import { Cloudinary } from "@cloudinary/url-gen";
import { Effect, Resize } from "@cloudinary/url-gen/actions";
import { keys } from "../config";

const cld = new Cloudinary({
  cloud: {
    cloudName: keys.cloudinary.CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

const formatSize = (size: number) => {
  return parseInt(size.toFixed(0));
};

export const getOptimizedImageUrl = (
  originalUrl: string | undefined | null,
  options: {
    width?: number;
    height?: number;
    grayscale?: boolean;
    noOptimization?: boolean;
  } = {}
) => {
  return originalUrl;
};
