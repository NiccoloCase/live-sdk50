import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di Edit di un Organizzatore
 */
export const EditOrganizerValidationSchema = Yup.object().shape(
  {
    // Descrizione
    description: Yup.string()
      .optional()
      .max(
        validationConfig.organizer.description.length.max,
        "La descrizione è troppo lunga"
      ),
    // numero di telefono
    phoneNumber: Yup.string().when("phoneNumber", {
      is: (value: any) => value?.length > 0,
      then: Yup.string().phone(
        undefined,
        false,
        "Il numero di telefono non è valido"
      ),
      otherwise: Yup.string(),
    }),
    // sito web
    website: Yup.string().url("L'url non è valido").optional(),
    // instagram
    instagramUsername: Yup.string()
      .optional()
      .matches(/^[a-zA-Z0-9._]{1,30}$/, "Instagram non è valido"),
  },
  [["phoneNumber", "phoneNumber"]]
);
