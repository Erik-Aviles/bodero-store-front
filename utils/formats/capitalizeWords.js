export function capitalizeWords(sentence) {
  if (!sentence) return "";
  return sentence?.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
