import * as Yup from "yup";

export const PrSettingsFormValidationSchema = Yup.object().shape({
  name: Yup.string().required("E' obbligatorio inserire un nome"),
  phoneNumber: Yup.string()
    .phone("Numero di telefono non valido")
    .required("E' obbligatorio inserire un numero di telefono"),
});
