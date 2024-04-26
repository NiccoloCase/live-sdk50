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
  if (!originalUrl || originalUrl === "" || originalUrl === " ")
    return originalUrl!;

  if (options.noOptimization) return originalUrl;

  // Se l'immagine non è di  cloudinary non fare nulla
  if (!originalUrl.includes("res.cloudinary.com")) return originalUrl;

  // Estrae il cloud name
  const cloudName = originalUrl.match(/res.cloudinary.com\/([^\/]+)/)?.[1];
  // Se il cloud name non è quello di default non fare nulla
  if (cloudName !== keys.cloudinary.CLOUD_NAME) return originalUrl;

  // Rimuove l'estensione .jpg o .png
  const withoutExtension = originalUrl.replace(/\.(jpg|png|jpeg)/, "");
  // Estrae il public id
  const publicId1 = withoutExtension.split("/").pop();

  // Estrae il nome della cartella
  const folderAndPublicId = originalUrl
    .match(/upload\/(?:v\d+\/)?([^\.]+)/)?.[1]
    .split("/");

  if (!folderAndPublicId || folderAndPublicId.length < 2) return originalUrl;
  const folderName = folderAndPublicId[0];

  // questa soluzione risolve il possibile problema di avere un public id che contiene un punto
  const publicId = folderName + "/" + publicId1;
  if (!publicId) return originalUrl;

  const myImage = cld.image(publicId);

  if (myImage) {
    if (options.width && options.height)
      myImage.resize(
        Resize.scale()
          .width(formatSize(options.width))
          .height(formatSize(options.height))
      );
    else if (options.height)
      myImage.resize(Resize.scale().height(formatSize(options.height)));
    else if (options.width)
      myImage.resize(Resize.scale().width(formatSize(options.width)));
    else {
      // TRSFORMAZIONE DI DEFAULT
      myImage.resize(Resize.scale().width(800));
    }

    if (options.grayscale) {
      myImage.effect(Effect.grayscale());
    }

    const newUrl = myImage.toURL();

    if (newUrl) return newUrl;
  }

  return originalUrl;
};
