import { CustomCommandInteraction } from "../utils/customCommandInteraction";

export const name = 'interactionCreate';
export async function execute(interaction:CustomCommandInteraction) {
  if (!interaction.isCommand()) {
    return;
  }

  const command = interaction.client.commands?.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: ' There was an error while executing this command!',
      ephemeral: true,
    });
  }
}
