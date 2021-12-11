import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbedOptions } from 'discord.js';

export const data = new SlashCommandBuilder().setName('ping').setDescription('Check the latency of the bot');
export async function execute(interaction: CommandInteraction) {
  const embedResponse: MessageEmbedOptions = {
    title: 'Pong!',
    fields: [
      { name: 'Bot latency', value: `${Date.now() - interaction.createdTimestamp} ms`, inline: true },
      { name: 'API latency', value: `${interaction.client.ws.ping} ms`, inline: true },
    ],
  };
  await interaction.reply({ embeds: [embedResponse] });
}
export const helpDescription = 'Command to test the latency of the bot and the Discord API.';
