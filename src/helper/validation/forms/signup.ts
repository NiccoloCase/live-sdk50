import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di registrazione
 */
export const SignupValidationSchema = Yup.object().shape({
  // Privacy policy
  checkbox: Yup.boolean().isTrue(),

  // USERNAME
  username: Yup.string()
    .min(validationConfig.user.username.length.min, "L'username è troppo corto")
    .max(validationConfig.user.username.length.max, "L'username è troppo lungo")
    .required("Questo campo è richiesto"),

  // // EMAIL
  // email: Yup.string()
  // .email("Email non valida")
  // .max(validationConfig.user.email.length.max, "L'email è troppo lunga")
  // .required("Questo campo è richiesto"),
});
