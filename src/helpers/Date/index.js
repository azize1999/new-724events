export const MONTHS = {
  1: "janvier",
  2: "février",
  3: "mars",
  4: "avril",
  5: "mai",
  6: "juin",
  7: "juillet",
  8: "août",
  9: "septembre",
  10: "octobre",
  11: "novembre",
  12: "décembre",
};
// ajouter +1 pour que 0 (janvier) corresponde à la clé 1 dans l’objet MONTHS.
export const getMonth = (date) => MONTHS[date.getMonth()+1]; 
