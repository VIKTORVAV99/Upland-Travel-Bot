export function plural(object: number, string: string): string {
  return object > 1 || object < 1 ? string + 's' : string;
}
