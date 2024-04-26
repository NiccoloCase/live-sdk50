import * as Yup from "yup";
import { validationConfig } from "../../../config";

/**
 * Schema di validazione del form di Creazione di un Pacchetto di Ticketing
 * MAIN FORM
 */
export const CreatePackageMainFormValidationSchema = Yup.object().shape({
  // Currency
  currency: Yup.string()
    .max(validationConfig.eventPackage.currency.length.max, "Valuta non valida")
    .required("La valuta è obbligatoria"),

  // Price
  userPrice: Yup.string()
    .test("is-valid-price", "Prezzo non valido", (value) => {
      //z

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0
      if (number < 0) return false;

      return true;
    })
    .required("Il prezzo è obbligatorio"),

  // MinAge
  minAge: Yup.string()
    .optional()
    .test("is-valid-age", "Età non valida", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0 e minore di 100
      if (number <= 0 || number >= 100) return false;

      return true;
    }),

  // Drinks
  drinks: Yup.string()
    .optional()
    .test("is-valid-drinks", "Numero di consumazioni non valido", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0 e minore di 100
      if (number < 0 || number >= 100) return false;

      return true;
    }),

  // Metodi di pagamento
  // Deve essere un array con almeno un elemento
  paymentTypes: Yup.array().min(
    1,
    "Devi selezionare almeno un metodo di pagamento"
  ),

  // Numero massimo di biglietti
  maxTickets: Yup.string()
    .optional()
    .nullable()
    .test("is-valid-maxTickets", "Numero di biglietti non valido", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0
      if (number <= 0) return false;

      return true;
    }),
});

/**
 * Schema di validazione del form di Creazione di un Pacchetto di Ticketing
 * NAME FORM
 */
export const CreatePackageNameFormValidationSchema = Yup.object().shape({
  // Nome
  name: Yup.string()
    .min(
      validationConfig.eventPackage.name.length.min,
      "Il nome è troppo corto"
    )
    .max(
      validationConfig.eventPackage.name.length.max,
      "Il nome è troppo lungo"
    )
    .required("Il nome è obbligatorio"),
});

/**
 * Schema di edit di un package
 */
export const EditPackageFormValidationSchema = Yup.object().shape({
  // MinAge
  minAge: Yup.string()
    .optional()
    .test("is-valid-age", "Età non valida", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0 e minore di 100
      if (number <= 0 || number >= 100) return false;

      return true;
    }),

  // Drinks
  drinks: Yup.string()
    .optional()
    .test("is-valid-drinks", "Numero di consumazioni non valido", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0 e minore di 100
      if (number < 0 || number >= 100) return false;

      return true;
    }),

  // Metodi di pagamento
  // Deve essere un array con almeno un elemento
  paymentTypes: Yup.array().min(
    1,
    "Devi selezionare almeno un metodo di pagamento"
  ),

  // Nome
  name: Yup.string()
    .min(
      validationConfig.eventPackage.name.length.min,
      "Il nome è troppo corto"
    )
    .max(
      validationConfig.eventPackage.name.length.max,
      "Il nome è troppo lungo"
    )
    .required("Il nome è obbligatorio"),

  // Numero massimo di biglietti
  maxTickets: Yup.string()
    .optional()
    .nullable()
    .test("is-valid-maxTickets", "Numero di biglietti non valido", (value) => {
      // Essendo opzionale, se non è presente ritorna true
      if (!value) return true;

      // Controlla che la stringa sia un numero
      const number = Number(value);
      if (isNaN(number)) return false;

      // Controlla che il numero sia maggiore di 0
      if (number <= 0) return false;

      return true;
    }),
});
