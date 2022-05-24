const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('coinflip')
		.setDescription('Flip a Coin'),

	async execute(interaction) // Funktion des Comands
	{
		try {
			const zahl = getRandomArbitrary(2)
			//console.log(`${zahl}`)
			switch(zahl)
			{
				case 1:  ausgabe = "Zahl"
					break;
				case 2:  ausgabe = "Kopf"
					break;
				default: console.log("Fehler beim generiren der Zufals zahl")
			}
				
			  return interaction.reply({ content: `Deine Münze ist auf ${ausgabe} gelandet!`,});
		} catch (error) {
			console.error('Error while performing coinflip'); 
		}


	},
};
try {
	function getRandomArbitrary( max) 
	{
	return Math.floor(Math.random() * max);
	}
} catch (error) {
	console.error('Error while performing Random Calculation In coinflip');
}
