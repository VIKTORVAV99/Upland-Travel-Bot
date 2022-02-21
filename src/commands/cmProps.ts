import fetch from 'node-fetch';
import { hyperlink, SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction, MessageEmbedOptions } from 'discord.js';
import { cities } from '../data/cities.js';

// Logic code

type CmMilesPropAPI = {
  query_time: number;
  props: Record<string, unknown>;
};

const props: {
  id: string;
  city: string;
  address: string;
}[] = [];
let fetchedAt: Date;

await fetchProperties();

async function fetchProperties() {
  props.splice(0, props.length);
  const APIData = await fetch('https://miles.api.cmstats.net/props')
    .then((response) => response.json())
    .then((data) => {
      fetchedAt = new Date();
      return data as CmMilesPropAPI;
    });

  const rawPropList = Object.keys(APIData.props).map((key) => APIData.props[key]) as {
    id: string;
    city: string;
    address: string;
  }[];

  rawPropList.forEach((propData) => {
    props.push({ id: propData.id, address: propData.address, city: propData.city.split(',')[0] });
  });
}

setInterval(fetchProperties, 8.64e7);

// Command code

// ToDo: Clean up and make the code more dynamic.
export const data = new SlashCommandBuilder()
  .setName('cmprops')
  .setDescription('Shows the CryptomonKey properties in a city that can be used for monKey Miles')
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
  props.forEach((data) => {
    if (
      data.city === city &&
      responseArray1.join('\n').length +
        hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`).length <=
        1024
    ) {
      responseArray1.push(hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`));
    } else if (
      data.city === city &&
      responseArray2.join('\n').length +
        hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`).length <=
        1024
    ) {
      responseArray2.push(hyperlink(data.address, `https://play.upland.me/?prop_id=${data.id}`));
    }
  });

  let responseFields = [];
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

  const embedResponse: MessageEmbedOptions = {
    color: 0xfbdd11,
    title: `CryptomonKey properties`,
    description: `The CryptomonKeys properties in ${city}`,
    fields: responseFields,
    footer: {
      text: `Updated at: ${fetchedAt.toUTCString()}\nSpecial thanks to CryptomonKeys and Green for the data.`,
    },
  };
  console.log(embedResponse);
  await interaction.reply({ embeds: [embedResponse] });
}

export const helpDescription =
  'Shows the addresses for monKey Miles properties in the selected city.\nOptions:\n - `city` - The selected city';
