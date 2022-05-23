const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('beep')
		.setDescription('Beep!'),

	async execute(interaction) // Funktion des Comands
	{
		return interaction.reply('Boop!');
	},
};