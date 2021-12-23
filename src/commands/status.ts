import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbedOptions } from 'discord.js';
import { convertMs } from '../utils/msToLongTime.js';
import { plural } from '../utils/plural.js';

export const data = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Gives the status information about the bot.');

/** The main function that executes the command. */
export async function execute(interaction: CommandInteraction) {
  const amountOfServers: string = interaction.client.guilds.cache.size.toString();
  const uptime = convertMs(interaction.client.uptime ?? 0);
  const readyAt: string = interaction.client.readyAt?.toUTCString() ?? 'Error';
  const createdAt: string = interaction.createdAt.toUTCString();
  const embedResponse: MessageEmbedOptions = {
    title: 'Bot Status',
    description: 'Basic status information about the bot.',
    fields: [
      {
        name: 'Servers',
        value: `The bot is in ${amountOfServers} ${plural(
          interaction.client.guilds.cache.size,
          'server',
          'servers'
        )}.`,
      },
      {
        name: 'Uptime',
        value: `${uptime.days.toString()} ${plural(
          uptime.days,
          'day',
          'days'
        )}, ${uptime.hours.toString()} ${plural(
          uptime.hours,
          'hour',
          'hours'
        )}, ${uptime.minutes.toString()} ${plural(
          uptime.minutes,
          'minute',
          'minutes'
        )} and ${uptime.seconds.toString()} ${plural(uptime.seconds, 'second', 'seconds')}.`,
        inline: true,
      },
      { name: 'Ready at', value: `${readyAt}`, inline: true },
    ],
    footer: { text: `Requested: ${createdAt}` },
  };
  await interaction.reply({ embeds: [embedResponse] });
}
export const helpDescription = 'Shows you status information about the bot';
