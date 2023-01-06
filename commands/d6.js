const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d6')
		.setDescription('Rolls a 6-sided dice.'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const rolle = getRandomArbitrary(1, 6)
			interaction.reply({ content: `You have rolled a: ${rolle}.`,});
		}catch(error){
			logger.error('Error while performing D6.');
		}
	},
};

try {
	function getRandomArbitrary(min, max) 
	{
    return Math.floor(Math.random() * (max - min)) + min;
	}
}catch(error){
	logger.error('Error while performing random calculation in D6.');
}
