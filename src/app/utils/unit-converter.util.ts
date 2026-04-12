export const PIXELS_PER_CM = 37.795;

/**
 * Converts physical centimeters to absolute CSS screen pixels (based on 96 DPI baseline).
 */
export function cmToPx(cm: number): number {
  return cm * PIXELS_PER_CM;
}
