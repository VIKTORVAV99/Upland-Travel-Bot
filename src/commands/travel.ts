import { travelToFrom } from '../travel-logic.js';
import { cities } from '../data/cities.js';
import {
  APIApplicationCommandOptionChoice,
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

const methods: APIApplicationCommandOptionChoice<string>[] = [
  { name: 'Cheapest', value: 'cheapest' },
  { name: 'Fastest', value: 'fastest' },
  { name: 'Simplest', value: 'simplest' },
];

export const data = new SlashCommandBuilder()
  .setName('travel')
  .setDescription('Gives you the best route from point A to point B based on the selected method.')
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setName('from')
      .setDescription('Enter the destination you are traveling from.')
      .setRequired(true)
      .addChoices(...cities)
  )
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setName('to')
      .setDescription('Enter the destination you are traveling to.')
      .setRequired(true)
      .addChoices(...cities)
  )
  .addStringOption((option: SlashCommandStringOption) =>
    option
      .setName('method')
      .setDescription('The method used to find the route.')
      .addChoices(...methods)
  );

/** The main function that executes the command. */
export async function execute(interaction: CommandInteraction) {
  const from = interaction.options.getString('from', true);
  const to = interaction.options.getString('to', true);
  const method = interaction.options.getString('method');

  if (from !== to) {
    await interaction.reply({ embeds: [travelToFrom(from, to, method)] });
  } else {
    await interaction.reply('You are already at the destination!');
  }
}
export const helpDescription =
  'Command to get the best route to travel in Upland based on the selected method.' +
  '\nOptions:' +
  '\n- `from` - The city you are traveling from.' +
  '\n- `to` - The city you are traveling to.' +
  '\n- `method` - The method to calculate the best route, takes the options: `simplest`, `fastest` and `cheapest`. Default is `simplest`.';
