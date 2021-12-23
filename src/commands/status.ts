import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbedOptions } from 'discord.js';
import { convertMs } from '../utils/msToLongTime.js';
import { plural } from '../utils/plural.js';

export const data = new SlashCommandBuilder()
  .setName('status')
  .setDescription('Gives the status information about the bot.');
export async function execute(interaction: CommandInteraction) {
  const uptime = convertMs(interaction.client.uptime ?? 0);
  const readyAt = interaction.client.readyAt;
  const embedResponse: MessageEmbedOptions = {
    title: 'Bot Status',
    description: 'Basic status information about the bot.',
    fields: [
      {
        name: 'Servers',
        value: `The bot is in ${interaction.client.guilds.cache.size} ${plural(
          interaction.client.guilds.cache.size,
          'server'
        )}.`,
      },
      {
        name: 'Uptime',
        value: `${uptime.days} ${plural(uptime.days, 'day')}, ${uptime.hours} ${plural(
          uptime.hours,
          'hour'
        )}, ${uptime.minutes} ${plural(uptime.minutes, 'minute')} and ${uptime.seconds} ${plural(
          uptime.seconds,
          'second'
        )}.`,
        inline: true,
      },
      { name: 'Ready at', value: `${readyAt?.toUTCString()}`, inline: true },
    ],
    footer: { text: `Requested: ${interaction.createdAt.toUTCString()}` },
  };
  await interaction.reply({ embeds: [embedResponse] });
}
export const helpDescription = 'Shows you status information about the bot';
