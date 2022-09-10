const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('roll')
		.setDescription('Roll a Dice')
        .addIntegerOption(option => option.setName('anzahl').setDescription('Amount of rolls:').setRequired(true))
        .addIntegerOption(option => option.setName('seitenzahl').setDescription('Sides of dice:').setRequired(true)),

	async execute(interaction) // Funktion des Comands
	{
        try{
            var ergebnis = []
            const anzahl  = interaction.options.getInteger('anzahl');
            const seitenzahl = interaction.options.getInteger('seitenzahl');

            for(let index = 0; index < anzahl; index++)
                {
                    ergebnis[index] = getRandomArbitrary(1, seitenzahl);
                }
            try{
                    let ausgabe = ergebnis.join(', ');  
                    interaction.reply({ content: `You have rolled : \`${ausgabe}\`.`,});
            }catch(error) 
                {
                    logger.error('Error while joining array in roll.')
                }
            
		}catch(error){
			
		}	
	},
};

try {
	function getRandomArbitrary(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }		
} catch (error) {
    console.error('Error while performing random calculation in roll.')
}
