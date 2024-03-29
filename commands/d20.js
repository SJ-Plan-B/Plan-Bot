const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d20')
		.setDescription('Rolls a 20-sided dice.'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const rolle = getRandomArbitrary(1, 20)
			interaction.reply({ content: `You have rolled a: ${rolle}.`,});
		}catch(error){
			logger.error('Error while performing D20.');
		}
	},
};

try {
	function getRandomArbitrary(min, max) 
	{
    return Math.floor(Math.random() * (max - min)) + min;
	}
	} catch (error) {
		logger.error('Error while performing random calculation in D20.');
	}
