import { Client, Collection } from 'discord.js';
import { Command } from '../interfaces/command';

export class CustomClient extends Client {
  commands?: Collection<string, Command> = new Collection();
}
