import { CommandInteraction } from 'discord.js';
import { CustomClient } from './customClient';

export class CustomCommandInteraction extends CommandInteraction {
  client!: CustomClient;
}
