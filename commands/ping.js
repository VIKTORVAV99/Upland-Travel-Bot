const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Check the latency of the bot'),
  async execute(interaction) {
    const embedResponse = {
      title: 'Pong!',
      fields: [
        { name: 'Bot latency', value: `${Date.now() - interaction.createdTimestamp} ms`, inline: true },
        { name: 'API latency', value: `${interaction.client.ws.ping} ms`, inline: true },
      ],
    };
    await interaction.reply({ embeds: [embedResponse] });
  },
};
