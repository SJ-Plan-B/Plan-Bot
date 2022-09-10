const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d4')
		.setDescription('Rolls a 4-sided dice.'),

	async execute(interaction) // Funktion des Comands
	{
        try{
			const rolle = getRandomArbitrary(1, 4)

			interaction.reply({ content: `You have rolled a: ${rolle}.`,});
		}catch(error){
			logger.error('Error while performing D4.'); 
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
	logger.warn('Error while performing random calculation in D4.');
}
