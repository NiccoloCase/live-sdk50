export function abbreviateText(text: string, length: number = 60) {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length - 3) + "...";
  }
}

export function capitalizeInitials(str: string) {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (char: string) => char.toUpperCase());
}
