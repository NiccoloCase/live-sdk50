import * as Yup from "yup";
import { validationConfig } from "../../../config";

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date();

/**
 * Schema di validazione del form di Creazione di un evento
 */
export const CreateEventValidationSchema = Yup.object().shape({
  // Titolo
  title: Yup.string()
    .min(validationConfig.event.title.length.min, "Il nome è troppo corto")
    .max(validationConfig.event.title.length.max, "Il nome è troppo lungo")
    .required("Il nome è obbligatorio"),
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
    .required("La descrizione è obbligatoria"),
  // Posizione
  location: Yup.object().required("La posizione è obbligatoria"),
  // Prezzo
  priceText: Yup.string()
    .max(validationConfig.event.priceText.length.max)
    .optional(),
  // Immagine
  media: Yup.mixed().required("L'immagine è obbligatoria"),
  // Data
  date: Yup.date()
    .min(today, "La data non può essere nel passato")
    .required("La data è obbligatoria"),
  // End date
  endDate: Yup.date().min(
    Yup.ref("date"),
    "La data di fine non può essere prima della data di inizio"
  ),
  // Età
  minAge: Yup.number()
    .integer()
    .min(0, "Età non valida")
    .max(99, "Età non valida")
    .optional(),

  // Data di rilascio
  // Deve essere almeno prima della data di inizio
  // E deve essere almeno il giorno dopo di oggi
  releaseDate: Yup.date()
    .min(tomorrow, "La data di rilascio deve essere almeno domani")
    .max(
      Yup.ref("date"),
      "La data di rilascio non può essere dopo la data di inizio evento"
    )
    .optional(),
});
