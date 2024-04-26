import * as Yup from "yup";
import "yup-phone";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form dello stato
 */
export const SetStateFormValidation = Yup.object().shape({
  text: Yup.string().max(
    validationConfig.user.textStatus.length.max,
    `Massimo ${validationConfig.user.textStatus.length.max} caratteri`
  ),
});

/**
 * Schema di validazione del form dello stato
 */
export const SetInstagramNameFormValidation = Yup.object().shape({
  instagramName: Yup.string()
    .matches(/^[a-zA-Z0-9._]{1,30}$/, "Instagram non è valido")
    .optional(),
});
