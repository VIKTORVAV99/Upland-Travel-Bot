import fetch from 'node-fetch'; //TODO: #95 Remove node-fetch once fetch is included in node.
import { SlashCommandBuilder } from '@discordjs/builders';
import { Formatters } from 'discord.js';
import type { CommandInteraction, EmbedFieldData, MessageEmbedOptions } from 'discord.js';
interface CmAPIWinners {
  query_time: number;
  count: number;
  data: {
    issue_time: string;
    type: string;
    winners: string[];
    trx_id: string;
    state: string;
  }[];
}

export const data = new SlashCommandBuilder()
  .setName('winners')
  .setDescription('The last 10 winners in monkeyMiles');

/** The main function that executes the command. */
export async function execute(interaction: CommandInteraction) {
  let APIData: CmAPIWinners = Object(null);
  /** Boolean to check if there was a API error. */
  let apiError = false;
  try {
    APIData = await fetch('https://miles.api.cmstats.net/drops?limit=10')
      .then((response) => response.json())
      .then((data) => {
        /** The date properties where fetched from the API. */
        return data as CmAPIWinners;
      });
  } catch {
    apiError = true;
  }

  let title = '';
  let description = '';
  let fields: EmbedFieldData[] = [];

  if (apiError) {
    title = 'Error';
    description = 'There was a error when parsing the API data.';
  } else {
    const data = APIData?.data.map((data) => {
      const date = new Date(data.issue_time);
      const formattedDate = new Intl.DateTimeFormat('sv-SE', {
        dateStyle: 'short',
        timeStyle: 'short',
      }).format(date);
      return { time: formattedDate, type: data.type, winners: data.winners };
    });

    title = 'Last 10 winners';
    fields = [
      {
        name: 'Winners:',
        value: `${data
          .map((value) => [
            `${Formatters.inlineCode(value.time)} - ${value.type} - ${value.winners.join(', ')}`,
          ])
          .join('\n')}`,
      },
    ];
  }
  let embedResponse: MessageEmbedOptions = {};
  const embed = (embedResponse = { title: title, description: description, timestamp: new Date() });
  if (fields?.length > 0) {
    embedResponse = { ...embed, fields: fields };
  }
  await interaction.reply({ embeds: [embedResponse] });
}
export const helpDescription = 'Command to test the latency of the bot and the Discord API.';
