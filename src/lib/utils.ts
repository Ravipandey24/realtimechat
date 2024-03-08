import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cookieExpiryDate(days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  return date;
}

export function parseDateToTime(timestamp: number) {
  // hh:mm am/pm
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes().toFixed().padStart(2, "0");
  return `${hours}:${minutes}`;
}