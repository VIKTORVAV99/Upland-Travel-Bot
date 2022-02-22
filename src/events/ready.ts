import type { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import type { Command } from '../interfaces/command';

export const name = 'ready';
export const once = true;
/**
 * Code to be executed when the bot reaches a ready status.
 * @param client
 */
export async function execute(client: Client) {
  // Automatic deployment of commands
  async function registererCommands() {
    const commands: unknown[] = [];
    const commandFiles = readdirSync('dist/commands').filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      commands.push(
        await import(`../commands/${file}`).then((command: Command) => {
          console.log(`Added command: ${command.data.name}`);
          return command.data.toJSON();
        })
      );
    }

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN ?? '');
    console.log(`Registering ${commands.length} commands...`);
    await rest
      .put(Routes.applicationCommands(process.env.CLIENT_ID ?? ''), { body: commands })
      .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
      .catch(console.error);
  }
  const botUsername = client.user?.tag ?? 'ERROR!';
  const ready = `Ready!\nLogged in as ${botUsername}`;
  await registererCommands().then(() => console.log(ready));
}
