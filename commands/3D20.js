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
			const rolle1 = getRandomArbitrary(1, 20)
			const rolle2 = getRandomArbitrary(1, 20)
			const rolle3 = getRandomArbitrary(1, 20)
			interaction.reply({content: `You have rolled: ${rolle1} ${rolle2} ${rolle3}.`});
		}catch(error){
			logger.error('Error while performing 3D20.'); 
		} 
	},
};

	try {
		function getRandomArbitrary(min, max)
		{
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * ( max - min )) + min;
		}
	}catch(error){
		logger.error('Error while performing random calculation in 3D20.');
	}
