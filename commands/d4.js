const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('d4')
		.setDescription('Würfelt einen d4 Würfel'),

	async execute(interaction) // Funktion des Comands
	{
        try {
			const rolle = getRandomArbitrary(1, 4)
			return interaction.reply({ content: `du hast eine: ${rolle} Gewürfelt.`,});
		} catch (error) {
			console.error('Error while performing D4'); 
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
	console.error('Error while performing Random Calculation In D4');
}
