import * as Yup from "yup";
import "yup-phone";

/**
 * Schema di validazione del form del numero di telefono
 */
export const PhoneFormValidationSchema = Yup.object().shape({
  phoneNumber: Yup.string().required("Questo campo è richiesto").phone(),
});
