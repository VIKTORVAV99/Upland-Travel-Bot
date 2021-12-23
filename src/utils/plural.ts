/**
 * Returns the plural of a string if the number is above 1 or equal 0.
 * @param number Number that is used to determine the singular/plural form.
 * @param singular The singular form of the wanted string.
 * @param plural The plural form of the wanted string.
 * @returns
 */
export function plural(number: number, singular: string, plural: string): string {
  return number === 1 ? singular : plural;
}
