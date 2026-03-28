/**
 * Merges class names into a single string, filtering out falsy values
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}