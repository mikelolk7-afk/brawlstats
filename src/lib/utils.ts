import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { TAG_CHARS } from "./constants"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TAG_REGEX = new RegExp(`^#?[${TAG_CHARS}]{3,12}$`);

export function formatTag(tag: string): string {
  const cleaned = tag.toUpperCase().replace(/^#/, '');
  return `#${cleaned}`;
}

export function validateTag(tag: string): boolean {
  return TAG_REGEX.test(tag.toUpperCase());
}

export function encodeTag(tag: string): string {
  return tag.replace(/^#/, '');
}

export function decodeTag(encoded: string): string {
  return `#${encoded}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function timeRemaining(endTime: string): string {
  const diff = new Date(endTime).getTime() - Date.now();
  if (diff <= 0) return 'Ended';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
