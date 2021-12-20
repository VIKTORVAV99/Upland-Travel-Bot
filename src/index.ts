#!/usr/bin/env node
import 'dotenv/config';
import { readdirSync } from 'fs';
// Require the necessary discord.js classes
import { Client, Collection, Intents } from 'discord.js';
// Types
import type { CustomClient } from './utils/customClient';
import type { Command } from './interfaces/command';
import type { Event } from './interfaces/event';

// Create a new client instance
const client: CustomClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// Puts the files in the commands directory that ends with .js in a commandFiles array
const commandFiles = readdirSync('dist/commands').filter((file) => file.endsWith('.js'));

// Loop over files in the commandFiles array
for (const file of commandFiles) {
  import(`./commands/${file}`)
    .then((command: Command) => {
      client.commands?.set(command.data.name, command);
    })
    .catch((error) => {
      console.log(error);
    });
}

// Puts the files in the events directory that ends with .js in a eventGiles array
const eventFiles = readdirSync('dist/events').filter((file) => file.endsWith('.js'));

// Loop over files in the eventFiles array
for (const file of eventFiles) {
  import(`./events/${file}`)
    .then((event: Event) => {
      event.once
        ? client.once(event.name, (client: Client) => event.execute(client))
        : client.on(event.name, (client: Client) => event.execute(client));
    })
    .catch((error) => {
      console.log(error);
    });
}

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
