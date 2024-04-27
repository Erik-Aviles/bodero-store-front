export function normalizeQuery(term) {
  const withoutAccents = term.normalize("NFD").replace(/[\u0300-\u036f]/gi, "");
  return withoutAccents.replace(/[-\/.]/g, "");
}
