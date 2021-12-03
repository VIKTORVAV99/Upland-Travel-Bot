import { readdirSync } from 'fs';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import config from './config.json';

const commands = [];
const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  import(`./commands/${file}`).then((command) => {
    commands.push(command.data.toJSON());
  });
}

const rest = new REST({ version: '9' }).setToken(config.token);

rest
  .put(Routes.applicationCommands(config.clientId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
