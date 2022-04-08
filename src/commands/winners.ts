import fetch from 'node-fetch'; //TODO: #95 Remove node-fetch once fetch is included in node.
import { inlineCode, SlashCommandBuilder } from '@discordjs/builders';
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

  const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);
  const todayString = today.toISOString().slice(0, -14);
  const yesterdayString = yesterday.toISOString().slice(0, -14);

  try {
    APIData = await fetch(`https://miles.api.cmstats.net/drops?after=${yesterdayString}`)
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
    const data = APIData?.data
      .map((data) => {
        return {
          date: new Date(data.issue_time).toISOString().slice(0, -14),
          formattedTime: inlineCode(new Date(data.issue_time).toISOString().slice(-13, -8)),
          type: inlineCode((data.type.charAt(0).toUpperCase() + data.type.slice(1)).padEnd(8)),
          winners: data.winners.map((winner) => inlineCode(winner)),
        };
      })
      .reduce((group, winners) => {
        const category = winners.date;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        group[category] = group[category] ?? [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        group[category].push(winners);
        return group;
      }, {});

    title = 'The last winners';

    fields = [
      {
        name: 'Today:',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        value: `${data[todayString]
          .map((value: { formattedTime: string; type: string; winners: string[] }) => [
            `${value.formattedTime} - ${value.type} - ${value.winners.join(' and ')}`,
          ])
          .join('\n')}`,
      },
      {
        name: 'Yesterday:',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        value: `${data[yesterdayString]
          .map((value: { formattedTime: string; type: string; winners: string[] }) => [
            `${value.formattedTime} - ${value.type} - ${value.winners.join(' and ')}`,
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
