import chroma from "chroma-js";

/** Colore primario */

// 7b4397
// FF7538
//A020F0
// 9000B3

export const primary = "#7b4397";

/** Colore secondario */
export const secondary = "#dc2430";

/** Colori di sfondo */
export const backgroundDark = "#030303";
export const backgroundLight = "#121212";
export const backgroundPrimary = chroma(primary).alpha(0.2).hex();
export const backgroundLightBright = chroma(backgroundLight)
  .brighten(0.2)
  .hex();

/** Grigio scuro */
export const darkGrey = "#404040";

/** Grigio */
export const mediumGrey = "#abb7b7";

/** Grigio chiaro */
export const lightGrey = "#EDD5DD";

/** Verde */
export const successGreen = "#4BB543";

/** Rosso */
export const red = "#d64541";
export const errorRed = "#cc0000";

/** Bianco fumo */
export const whiteSmoke = "#F5F5F5";
