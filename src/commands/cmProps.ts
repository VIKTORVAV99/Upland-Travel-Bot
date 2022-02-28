import fetch from 'node-fetch';
import { hyperlink, SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbedOptions } from 'discord.js';
import { cities } from '../data/cities.js';

/**
 * ==== Logic code ====
 */

type CmMilesPropAPI = {
  query_time: number;
  props: Record<string, unknown>;
};

let props: {
  id: string;
  city: string;
  address: string;
}[] = [];
let fetchedAt: Date = new Date();
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
    props = Object.keys(APIData.props)
      .map(
        (key) =>
          APIData.props[key] as {
            id: string;
            city: string;
            address: string;
          }
      )
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
// ToDo: Clean up and make the code more dynamic.
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

/** The main function that executes the command. */
export async function execute(interaction: CommandInteraction) {
  const city = interaction.options.getString('city');
  const responseArray1: string[] = [];
  const responseArray2: string[] = [];
  let embedResponse: MessageEmbedOptions = {};
  apiError && fetchProperties();
  if (!apiError) {
    let numOfProperties = 0;
    props.forEach((data) => {
      if (data.city === city) {
        const property = hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`);

        if (responseArray1.join('\n').length + property.length <= 1024) {
          responseArray1.push(property);
        } else if (responseArray2.join('\n').length + property.length <= 1024) {
          responseArray2.push(property);
        }
        numOfProperties++;
      }
    });

    let responseFields = [];
    if (numOfProperties === 0) {
      embedResponse = {
        color: 0xfbdd11,
        title: `cryptomonKey properties`,
        description: `There are no cryptomonKeys properties in ${city}`,
        footer: {
          text: `Updated at: ${fetchedAt.toUTCString()}\nSpecial thanks to cryptomonKeys and Green for the data.`,
        },
      };
    } else {
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

      embedResponse = {
        color: 0xfbdd11,
        title: `cryptomonKey properties`,
        description: `The cryptomonKeys properties in ${city}`,
        fields: responseFields,
        footer: {
          text: `Updated at: ${fetchedAt.toUTCString()}\nSpecial thanks to cryptomonKeys and Green for the data.`,
        },
      };
    }
  } else if (apiError) {
    embedResponse = {
      title: 'Error',
      description: 'There was a error fetching the data.',
      footer: { text: `Updated at: ${fetchedAt.toUTCString()}` },
    };
  }
  await interaction.reply({ embeds: [embedResponse] });
}

export const helpDescription =
  'Shows the addresses for monKey Miles properties in the selected city.\nOptions:\n - `city` - The selected city';
