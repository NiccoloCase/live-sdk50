import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di modifica del profilo
 */
export const EditProfileValidationSchema = Yup.object().shape({
  // USERNAME
  username: Yup.string()
    .min(validationConfig.user.username.length.min, "L'username è troppo corto")
    .max(validationConfig.user.username.length.max, "L'username è troppo lungo")
    .optional(),

  // INSTAGRAM
  instagramName: Yup.string()
    .matches(/^[a-zA-Z0-9._]{1,30}$/, "Instagram non è valido")
    .optional(),
});
