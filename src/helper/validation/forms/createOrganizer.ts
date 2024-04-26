import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di Creazione di un Organizzatore
 */
export const CreateOrganizerValidationSchema = Yup.object().shape({
  // Nome
  name: Yup.string()
    .min(validationConfig.organizer.name.length.min, "Il nome è troppo corto")
    .max(validationConfig.organizer.name.length.max, "Il nome è troppo lungo")
    .required("Il nome è obbligatorio"),
  // Descrizione
  description: Yup.string()
    .max(
      validationConfig.organizer.description.length.max,
      "La descrizione è troppo lunga"
    )
    .optional(),
  // Immagine
  media: Yup.mixed().required("L'immagine è obbligatoria"),
});
