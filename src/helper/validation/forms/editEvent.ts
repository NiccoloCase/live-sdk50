import * as Yup from "yup";
import { validationConfig } from "../../../config";

const today = new Date();
today.setHours(0, 0, 0, 0);

/**
 * Schema di validazione del form di modifica di un evento
 */
export const EditEventValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(validationConfig.event.title.length.min, "Il nome è troppo corto")
    .max(validationConfig.event.title.length.max, "Il nome è troppo lungo")
    .optional(),
  // Descrizione
  description: Yup.string()
    .min(
      validationConfig.event.description.length.min,
      "La descrizione è troppo corta"
    )
    .max(
      validationConfig.event.description.length.max,
      "La descrizione è troppo lunga"
    )
    .optional(),
  // Immagine
  asset: Yup.mixed().optional(),
});
