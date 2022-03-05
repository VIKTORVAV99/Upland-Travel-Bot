import fetch from 'node-fetch'; //TODO: #95 Remove node-fetch once fetch is included in node.
import { hyperlink, SlashCommandBuilder } from '@discordjs/builders';
import { cities } from '../data/cities.js';
import type { CommandInteraction, MessageEmbedOptions } from 'discord.js';

/**
 * ==== Logic code ====
 */

type CmMilesPropAPI = {
  query_time: number;
  props: Record<string, unknown>;
};

type Property = {
  id: string;
  city: string;
  address: string;
};

let props: Property[] = [];

/** The date properties where fetched from the API. */
let fetchedAt: Date = new Date();
/** Boolean to check if there was a API error. */
let apiError = false;

/**
 * Get properties from the monKey Miles API and format them.
 */
async function fetchProperties() {
  props.splice(0, props.length);
  const APIData = await fetch('https://miles.api.cmstats.net/props')
    .then((response) => response.json())
    .then((data) => {
      fetchedAt = new Date();
      return data as CmMilesPropAPI;
    });
  try {
    //TODO: #94 Add Array.groupBy() later when it is stable.
    props = Object.keys(APIData.props)
      .map((key) => APIData.props[key] as Property)
      .map((propData) => {
        return {
          id: propData.id,
          address: propData.address,
          city: propData.city.split(',')[0],
        };
      });
    apiError = false;
  } catch {
    apiError = true;
    console.warn('There was a problem converting the API response to the property object structure!');
  }
}

await fetchProperties();
setInterval(fetchProperties, 8.62e7);

//
// ==== Command code ====
//
export const data = new SlashCommandBuilder()
  .setName('cmprops')
  .setDescription('Shows the cryptomonKey properties in a city that can be used for monKey Miles')
  .addStringOption((option) =>
    option
      .setName('city')
      .setDescription('The city you want the CM properties for.')
      .setRequired(true)
      .addChoices(cities.sort())
  );

/**
 * The main function that executes the command.
 * @param interaction
 */
export async function execute(interaction: CommandInteraction) {
  /** The requested city. */
  const city: string = interaction.options.getString('city') ?? '';
  const responseArray1: string[] = [];
  const responseArray2: string[] = [];
  let embedResponse: MessageEmbedOptions = {};
  /** Boolean to check if the requested city has cryptomonKey properties. */
  let hasProperties = false;
  /** Title for the embed. */
  let title = '';
  /** Description for the embed. */
  let description = '';
  /** The text to include in the footer. */
  let footerText = '';
  /** The fields to include in the embed. */
  let responseFields: { name: string; value: string }[] = [];

  apiError && fetchProperties();
  if (!apiError) {
    props.forEach((data) => {
      if (data.city === city) {
        const property = hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`);

        //TODO: #96 Make the responseArray generation dynamic
        if (responseArray1.join('\n').length + property.length <= 1024) {
          responseArray1.push(property);
        } else if (responseArray2.join('\n').length + property.length <= 1024) {
          responseArray2.push(property);
        }
        hasProperties = true;
      }
    });
  }
  if (!hasProperties && !apiError) {
    title = `cryptomonKey properties`;
    description = `There are no cryptomonKeys properties in ${city}`;
    footerText = `Updated at: ${fetchedAt.toUTCString()}\nSpecial thanks to cryptomonKeys and Green for the data.`;
  } else if (hasProperties) {
    if (responseArray2.length > 0) {
      responseFields = [
        {
          name: 'Properties:',
          value: responseArray1.join('\n'),
        },
        {
          name: 'More properties:',
          value: responseArray2.join('\n'),
        },
      ];
    } else {
      responseFields = [
        {
          name: 'Properties:',
          value: responseArray1.join('\n'),
        },
      ];
    }
    title = `cryptomonKey properties`;
    description = `The cryptomonKeys properties in ${city}`;
    footerText = `Updated at: ${fetchedAt.toUTCString()}\nSpecial thanks to cryptomonKeys and Green for the data.`;
  } else if (apiError) {
    title = 'Error';
    description = 'There was a error fetching the data.';
    footerText = `Updated at: ${fetchedAt.toUTCString()}`;
  }

  const embed = (embedResponse = {
    color: 0xfbdd11,
    title: title,
    description: description,
    footer: { text: footerText },
  });

  if (responseFields !== []) {
    embedResponse = { fields: responseFields, ...embed };
  }

  await interaction.reply({ embeds: [embedResponse] });
}

/** Description for the /help command. */
export const helpDescription =
  'Shows the addresses for monKey Miles properties in the selected city.\nOptions:\n - `city` - The selected city';
