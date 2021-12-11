import { readdirSync } from 'fs';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, EmbedField, MessageEmbedOptions } from 'discord.js';
import { Command } from '../interfaces/command';

const commandFiles = readdirSync('dist/commands').filter((file) => file.endsWith('.js'));

const commandHelpArray: Array<EmbedField> = [];

try {
  for (const file of commandFiles) {
    if (file === 'help.js') {
      commandHelpArray.push({ name: '/help', value: 'Shows this message.', inline: false });
    } else {
      const command: Command = await import(`./${file}`);
      commandHelpArray.push({ name: `/${command.data.name}`, value: command.helpDescription, inline: false });
    }
  }
} catch (error) {
  console.log(error);
}

async function getCommandHelpArray() {
  return commandHelpArray;
}

export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Get help about the bots commands.');

export async function execute(interaction: CommandInteraction) {
  const embedResponse: MessageEmbedOptions = {
    title: 'Help',
    description: 'Information about the different commands.',
    fields: await getCommandHelpArray(),
  };

  await interaction.reply({ embeds: [embedResponse], ephemeral: true });
}
