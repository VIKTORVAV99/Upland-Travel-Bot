#!/usr/bin/env node
import { readdirSync } from 'fs';
// Require the necessary discord.js classes
import { Client, Collection, Intents } from 'discord.js';
import config from './config.json';
import { CustomClient } from './utils/customClient';

// Create a new client instance
const client: CustomClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// Puts the files in the commands directory that ends with .js in a commandFiles array
const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Loop over files in the commandFiles array
for (const file of commandFiles) {
  import(`./commands/${file}`).then((command) => {
    client.commands?.set(command.data.name, command);
  });
}

// Puts the files in the events directory that ends with .js in a eventGiles array
const eventFiles = readdirSync('./events').filter((file) => file.endsWith('.js'));

// Loop over files in the eventFiles array
for (const file of eventFiles) {
  import(`./events/${file}`).then((event) => {
    event.once
      ? client.once(event.name, (args) => event.execute(args))
      : client.on(event.name, (args) => event.execute(args));
  });
}

// Login to Discord with your client's token
client.login(config.token);
