import {
  EventPackage,
  EventPackagePaymentType,
  EventPackageType,
} from "../../generated/graphql";

export const getPackageTypeText = (type: EventPackageType): string => {
  switch (type) {
    case EventPackageType.Ticket:
      return "Biglietto";
    case EventPackageType.List:
      return "Lista";
    case EventPackageType.Table:
      return "Tavolo";
    case EventPackageType.Invitation:
      return "Invito";
  }

  return "";
};

export const getPackagePaymentTypeText = (
  type: EventPackagePaymentType
): string => {
  switch (type) {
    case EventPackagePaymentType.OnSite:
      return "Pagamento in loco";
    case EventPackagePaymentType.Online:
      return "Pagamento Online";
    case EventPackagePaymentType.Invitation:
      return "Invito";
  }

  return "";
};

/**
 * Se quello che sta acquistando è una prenotazione
 * - Se il pagamento è in cassa è sempre una prenotazione
 * - Se il pagamento è online, è una prenotazione se  il costo è 0
 * @param package
 * @param paymentType
 */
export const isPackageReservation = (
  eventPackage: EventPackage,
  paymentType?: EventPackagePaymentType
): boolean => {
  if (paymentType === EventPackagePaymentType.OnSite) return true;
  if (
    paymentType === EventPackagePaymentType.Online &&
    eventPackage.userPrice === 0
  )
    return true;
  return false;
};
