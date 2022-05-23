const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('coinflip')
		.setDescription('wirf eine Münze'),

	async execute(interaction) // Funktion des Comands
	{
		const zahl = getRandomArbitrary(1,2)
		
		switch(zahl){
			case 1: ausgabe = "Zahl"
				break
			case 2: ausgabe = "Kopf"
				break 
			default: console.log("Fehler beim generiren der Zufals zahl")
		}
			

		  return interaction.reply({ content: `Deine Münze ist auf ${ausgabe} gelandet!`,});
	},
};

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }