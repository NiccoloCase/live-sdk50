import { decode, encode } from "blurhash";
import { validationConfig } from "../../config";

const WIDTH = 30;
const ASPECT_RATIO = validationConfig.media.profilePicture.aspectRatio;
const HEIGHT = Math.floor(WIDTH / ASPECT_RATIO);

export function convertBlurhashToGreyscale(blurhash: string) {
  // Decodifica la stringa Blurhash
  const pixels = decode(blurhash, WIDTH, HEIGHT);

  // Converte direttamente in scala di grigi
  for (let i = 0; i < pixels.length; i += 4) {
    const grayValue = Math.round(
      (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3
    );

    pixels[i] = grayValue;
    pixels[i + 1] = grayValue;
    pixels[i + 2] = grayValue;
    pixels[i + 3] = 255; // Imposta l'opacità a 255
  }

  // Genera un nuovo blurhash in scala di grigi
  const newHeight = Math.floor(WIDTH / ASPECT_RATIO);
  return encode(pixels, WIDTH, newHeight, 4, 3);
}
