const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('coinflip')
		.setDescription('Flip a coin!'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const zahl = getRandomArbitrary()
			let ausgabe;
			switch(zahl)
			{
				case 0: ausgabe = "Zahl"
					break;
				case 1: ausgabe = "Kopf"
					break;
				default: console.info("Fehler beim Generieren der Zufallszahl.")
			}
				
			  interaction.reply({ content: `Deine Münze ist auf ${ausgabe} gelandet!`,});
		} catch (error) {
			logger.warn('Error while performing coinflip.'); 
			logger.error(error)
		}
	},
};
try {
	function getRandomArbitrary() 
	{
	return Math.round(Math.random());
	}
} catch (error) {
	logger.error('Error while performing Random Calculation In coinflip');
}
