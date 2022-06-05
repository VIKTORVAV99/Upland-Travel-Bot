import type { APIApplicationCommandOptionChoice } from 'discord-api-types/v10';

export const cities: APIApplicationCommandOptionChoice<string>[] = [
  { name: 'Staten Island', value: 'Staten Island' },
  { name: 'Rutherford', value: 'Rutherford' },
  { name: 'Manhattan', value: 'Manhattan' },
  { name: 'Brooklyn', value: 'Brooklyn' },
  { name: 'Nashville', value: 'Nashville' },
  { name: 'New Orleans', value: 'New Orleans' },
  { name: 'Cleveland', value: 'Cleveland' },
  { name: 'Chicago', value: 'Chicago' },
  { name: 'Kansas City', value: 'Kansas City' },
  { name: 'San Francisco', value: 'San Francisco' },
  { name: 'Oakland', value: 'Oakland' },
  { name: 'Bakersfield', value: 'Bakersfield' },
  { name: 'Santa Clara', value: 'Santa Clara' },
  { name: 'Fresno', value: 'Fresno' },
  { name: 'Bronx', value: 'Bronx' },
  { name: 'Los Angeles', value: 'Los Angeles' },
  { name: 'Detroit', value: 'Detroit' },
  { name: 'Queens', value: 'Queens' },
  { name: 'Las Vegas', value: 'Las Vegas' },
];
