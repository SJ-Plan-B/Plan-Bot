const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('beep')
		.setDescription('Beep!'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			return interaction.reply('Boop!');
		}catch (error){
			console.warn('Error while performing Beep!');
			console.error(error)
		}
	},
};