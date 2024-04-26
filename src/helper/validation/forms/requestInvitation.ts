import * as Yup from "yup";
import "yup-phone";
import { validationConfig } from "../../../config";

/**
 * DEPRECATED: This snippet is deprecated. Please use the new snippet instead.
 * Schema di validazione del form per richiedere la partecipazione a un evento
 */
export const RequestInvitationFormValidation = Yup.object().shape({
  firstName: Yup.string()
    // regex con accenti
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/, "Nome non valido")
    .required("Questo campo è richiesto"),
  lastName: Yup.string()
    .matches(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s']+$/, "Cognome non valido")
    .required("Questo campo è richiesto"),
  birthday: Yup.date().required("Questo campo è richiesto"),
  gender: Yup.string().required("Questo campo è richiesto"),
});
