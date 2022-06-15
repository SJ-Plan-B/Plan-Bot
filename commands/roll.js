const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('roll')
		.setDescription('roll a Dice')
        .addIntegerOption(option => option.setName('anzahl').setDescription('anzahl der würfe').setRequired(true))
        .addIntegerOption(option => option.setName('seitenzahl').setDescription('Seitenzahl des würfels').setRequired(true)),

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
                    return interaction.reply({ content: `Du hast : \`${ausgabe}\` gewürfelt.`,});
            }catch(error) 
                {
                    logger.error('Error while joining array in roll Command')
                }
            
		}catch(error){
			logger.error('Error while performing roll Command')
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
    console.error('Error while performing Random Calculation in roll Command')
}
