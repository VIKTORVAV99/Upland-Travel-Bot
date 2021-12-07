import type { Client } from 'discord.js';

export const name = 'ready';
export const once = true;
export function execute(client: Client) {
  console.log(`Ready!\nLogged in as ${client.user?.tag}`);
}
