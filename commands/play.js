const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a. song')
		.addStringOption(option => option.setName('url').setDescription('add a song youtube link')),

	async execute(interaction)
	{
		const url = interaction.options.getInteger('url');

		

		interaction.reply({ content: `Successfully pruned \`${url}\` messages.`, ephemeral: true });
		return true;
	},
};