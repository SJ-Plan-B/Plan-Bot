const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d6')
		.setDescription('Würfelt einen D6 Würfel'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const rolle = getRandomArbitrary(1, 6)
			return interaction.reply({ content: `du hast eine: ${rolle} Gewürfelt.`,});
		}catch(error){
			console.warn('Error while performing D6');
			console.error(error)
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
}catch(error){
	console.warn('Error while performing Random Calculation In D6');
	console.error(error)
}
