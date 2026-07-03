import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function normalizeWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  return digits;
}

export function getWhatsAppUrl(value: string, message?: string) {
  const phone = normalizeWhatsApp(value);
  const text = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${phone}${text}`;
}

export function getYouTubeEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
    }

    const videoId = parsed.searchParams.get("v");

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (parsed.pathname.includes("/embed/")) {
      return url;
    }
  } catch {
    return "";
  }

  return "";
}
