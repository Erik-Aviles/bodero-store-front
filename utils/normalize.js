export function normalizeQuery(term) {
  let lower = term.toLocaleLowerCase();
  return lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
