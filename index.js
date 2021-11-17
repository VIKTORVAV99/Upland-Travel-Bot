#!/usr/bin/env node
const fs = require('fs');
// Require the necessary discord.js classes
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

// Puts the files in the commands directory that ends with .js in a commandFiles array
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

// Loop over files in the commandFiles array
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Puts the files in the events directory that ends with .js in a eventGiles array
const eventFiles = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));

// Loop over files in the eventFiles array
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  event.once
    ? client.once(event.name, (...args) => event.execute(...args))
    : client.on(event.name, (...args) => event.execute(...args));
}

// Login to Discord with your client's token
client.login(token);
