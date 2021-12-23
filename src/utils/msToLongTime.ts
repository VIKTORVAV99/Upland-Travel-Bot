export function convertMs(milliseconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const tot_sec = Math.floor(milliseconds / 1000);
  const tot_min = Math.floor(tot_sec / 60);
  const tot_hour = Math.floor(tot_min / 60);
  const days = Math.floor(tot_hour / 24);

  const hours = tot_hour % 24;
  const minutes = tot_min % 60;
  const seconds = tot_sec % 60;
  return { days, hours, minutes, seconds };
}
