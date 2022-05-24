const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('würfel')
		.setDescription('Würfelt einen Würfel')
        .addIntegerOption(option => option.setName('anzahl').setDescription('anzahl der würfe').setRequired(true))
        .addIntegerOption(option => option.setName('seitenzahl').setDescription('Seitenzahl des würfels').setRequired(true)),

	async execute(interaction) // Funktion des Comands
	{
        var ergebnis = []
        const anzahl  = interaction.options.getInteger('anzahl');
        const seitenzahl = interaction.options.getInteger('seitenzahl');
        //console.log(anzahl)
        //console.log(seitenzahl)
        for (let index = 0; index < anzahl; index++)
            {
            ergebnis[index] = getRandomArbitrary(1, seitenzahl);
            }
        //console.log(ergebnis);
        
        try {
            let ausgabe = ergebnis.join(', ');  
            return interaction.reply({ content: `Du hast : \`${ausgabe}\` gewürfelt.`,});
        } catch (error) 
         {
         console.log('Error while joining array')   
         }
        
		
	},
};

function getRandomArbitrary(min, max) 
    {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
    }