import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di Creazione di una recensione
 */
export const CreateReviewValidationSchema = Yup.object().shape({
  rating: Yup.number().min(1).max(5).required(),
  // Descrizione
  comment: Yup.string()
    .max(
      validationConfig.review.comment.length.max,
      "Il commento è troppo lunga"
    )
    .optional(),
});
