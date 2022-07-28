const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d20')
		.setDescription('Würfelt einen D20 Würfel'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const rolle = getRandomArbitrary(1, 20)
			interaction.reply({ content: `you have rolled a: ${rolle}.`,});
		}catch(error){
			logger.error('Error while performing D20');
		}
	},
};

try {
	function getRandomArbitrary(min, max) 
	{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
	}
	} catch (error) {
		logger.error('Error while performing Random Calculation In D20');
	}
