export function getContactHref(value: string) {
  if (value.includes("@")) {
    return `mailto:${value}`;
  }

  if (value.startsWith("+")) {
    return `tel:${value}`;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.includes(".")) {
    return `https://${value}`;
  }

  return null;
}

export function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}
