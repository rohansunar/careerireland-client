import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats status text from underscore format to proper capitalized format
 * @param {string} status - Status string with underscores (e.g., "Under_Review")
 * @return {string} Formatted status string (e.g., "Under Review")
 */
export function formatStatusText(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
