const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log;

module.exports = 
{
	
	data: new SlashCommandBuilder() // Comand REG
		.setName('3d20')
		.setDescription('Rolls 3 20-sided dice.'),

	async execute( interaction ) // Funktion des Comands
	{
		
		try{
			interaction.reply({content: `You have rolled: ${getRandomArbitrary(1, 20)} ${getRandomArbitrary(1, 20)} ${getRandomArbitrary(1, 20)}.`});
		}catch(error){
			logger.error('Error while performing 3D20.'); 
		} 
	},
};

	try {
		function getRandomArbitrary(min, max)
		{
		return Math.floor(Math.random() * ( max - min )) + min;
		}
	}catch(error){
		logger.error('Error while performing random calculation in 3D20.');
	}
