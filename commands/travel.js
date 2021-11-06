const { SlashCommandBuilder } = require('@discordjs/builders');
const { travelToFrom } = require('../travel-logic');
const cities = [
  ['Staten Island', 'Staten Island'],
  ['Rutherford', 'Rutherford'],
  ['Manhattan', 'Manhattan'],
  ['Brooklyn', 'Brooklyn'],
  ['Nashville', 'Nashville'],
  ['New Orleans', 'New Orleans'],
  ['Cleveland', 'Cleveland'],
  ['Chicago', 'Chicago'],
  ['Kansas City', 'Kansas City'],
  ['San Francisco', ' San Francisco'],
  ['Oakland', 'Oakland'],
  ['Bakersfield', 'Bakersfield'],
  ['Santa Clara', 'Santa Clara'],
  ['Fresno', 'Fresno & Clovis'],
  ['Clovis', 'Fresno & Clovis'],
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName('travel')
    .setDescription('Gives you the cheapest route from point A to point B')
    .addStringOption((option) =>
      option
        .setName('from')
        .setDescription('Enter the destination you are traveling from.')
        .setRequired(true)
        .addChoices(cities.sort())
    )
    .addStringOption((option) =>
      option
        .setName('to')
        .setDescription('Enter the destination you are traveling to.')
        .setRequired(true)
        .addChoices(cities.sort())
    )
    .addStringOption((option) =>
      option
        .setName('method')
        .setDescription('The method used to find the route.')
        .addChoice('cheapest', 'cheapest')
        .addChoice('fastest', 'fastest')
    ),
  async execute(interaction) {
    const from = interaction.options.getString('from');
    const to = interaction.options.getString('to');
    let method = interaction.options.getString('method');

    const responseArray = [];

    responseArray.push(`Using method: ${(method ??= 'cheapest')}\n`);

    if (from != to) {
      const filteredPathArray = travelToFrom(from, to, method);

      let i = 1;
      let totalCost = 0;
      let totalTime = 0;
      filteredPathArray.forEach((Line) => {
        responseArray.push(`${i}. ${Line[0]} => (${Line[2].type}) => ${Line[1]}\n`);
        totalCost += Line[2].cost;
        totalTime += Line[2].time;
        i++;
      });
      responseArray.push(`   Total cost: ${totalCost} UPX\n   Total time: ${totalTime} minutes`);
      await interaction.reply(responseArray.join(''));
    } else {
      await interaction.reply('You are already at the destination!');
    }
  },
};
