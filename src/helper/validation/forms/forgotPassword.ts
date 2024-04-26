import * as Yup from "yup";
import { validationConfig } from "../../../config";

export const ForgotPasswordFormValidationSchema = Yup.object().shape({
  // NUOVA PASSWORD
  password: Yup.string()
    .min(
      validationConfig.user.password.length.min,
      "La password è troppo corta"
    )
    .max(
      validationConfig.user.password.length.max,
      "La password è troppo lunga"
    )
    .required("Questo campo è richiesto"),
});
