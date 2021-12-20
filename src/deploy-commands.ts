import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Command } from './interfaces/command';

const commands: unknown[] = [];
const commandFiles = readdirSync('dist/commands').filter((file) => file.endsWith('.js'));

async function readCommandFiles() {
  for (const file of commandFiles) {
    commands.push(
      await import(`./commands/${file}`).then((command: Command) => {
        console.log(`Added command: ${command.data.name}`);
        return command.data.toJSON();
      })
    );
  }
}

async function deployCommands() {
  await readCommandFiles();
  const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN ?? '');
  console.log(`Registering ${commands.length} commands...`);
  rest
    .put(Routes.applicationCommands(process.env.CLIENT_ID ?? ''), { body: commands })
    .then(() => console.log(`Successfully registered ${commands.length} application commands.`))
    .catch(console.error);
}

deployCommands();
