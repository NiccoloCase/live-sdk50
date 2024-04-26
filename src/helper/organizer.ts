import { OrganizerType } from "../generated/graphql";

export const getOrganizerTypeName = (type: OrganizerType) => {
  let tag = "";
  if (!type) return null;
  if (type === OrganizerType.Pub) tag = "Pub";
  else if (type === OrganizerType.CulturalOrganization)
    tag = "Organizzazione culturale";
  else if (type === OrganizerType.Disco) tag = "Discoteca";
  else if (type === OrganizerType.SportClub) tag = "Club sportivo";
  else if (type === OrganizerType.School) tag = "Scuola";
  else if (type === OrganizerType.Museum) tag = "Museo";
  else if (type === OrganizerType.DiscoEvent) tag = "Evento Discoteca";
  else if (type === OrganizerType.PrivateOrganizer)
    tag = "Organizzatore privato";

  return tag;
};
