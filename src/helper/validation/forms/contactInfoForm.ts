import * as Yup from "yup";
import "yup-phone";

export const ContactInfoFormValidationSchema = Yup.object().shape({

  instagram: Yup.string().when("types", {
    is: (val:string[]) => val.includes("insta"),
    then: Yup.string().matches(/^[a-zA-Z0-9_.]*$/, "Nome utente Instagram non valido"),
    otherwise: Yup.string().nullable().optional()
  }),

  wsNumber: Yup.string().when("types", {
    is: (val:string[]) => val.includes("ws"),
    then: Yup.string().phone(undefined, true, "Numero di telefono non valido"),
    otherwise: Yup.string().nullable().optional()
  }),


  phoneNumber: Yup.string().when("types", {
    is: (val:string[]) => val.includes("phone"),
    then: Yup.string().phone(undefined, true, "Numero di telefono non valido"),
    otherwise: Yup.string().nullable().optional()
  }),

  name: Yup.string()
    .min(3, "Nome non valido")
    .max(100, "Nome troppo lungo")
    .required("Questo campo è richiesto")
});
