const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('beep')
		.setDescription('Beep!'),

	async execute(interaction) // Funktion des Comands
	{
		try {
			return interaction.reply('Boop!');
		} catch (error) {
			console.error('Error while performing Beep!');
		}
		
	},
};