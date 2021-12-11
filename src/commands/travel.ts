import { SlashCommandBuilder } from '@discordjs/builders';
import { travelToFrom } from '../travel-logic.js';
import { cities } from '../data/cities.js';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('travel')
  .setDescription('Gives you the best route from point A to point B based on the selected method.')
  .addStringOption((option) =>
    option
      .setName('from')
      .setDescription('Enter the destination you are traveling from.')
      .setRequired(true)
      .addChoices(cities.sort())
  )
  .addStringOption((option) =>
    option
      .setName('to')
      .setDescription('Enter the destination you are traveling to.')
      .setRequired(true)
      .addChoices(cities.sort())
  )
  .addStringOption((option) =>
    option
      .setName('method')
      .setDescription('The method used to find the route.')
      .addChoice('cheapest', 'cheapest')
      .addChoice('fastest', 'fastest')
      .addChoice('simplest', 'simplest')
  );
export async function execute(interaction: CommandInteraction) {
  const from = interaction.options.getString('from') ?? '';
  const to = interaction.options.getString('to') ?? '';
  const method = interaction.options.getString('method');

  if (from != to) {
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
