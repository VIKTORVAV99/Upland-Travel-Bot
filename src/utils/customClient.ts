import { Client, Collection } from 'discord.js';

export class CustomClient extends Client {
  commands?: Collection<unknown, any> = new Collection();
}
