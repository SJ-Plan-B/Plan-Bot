const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('3d6')
		.setDescription('Würfelt 3 D6 Würfel'),

	async execute(interaction) // Funktion des Comands
	{
        const rolle1 = getRandomArbitrary(1, 6)
		const rolle2 = getRandomArbitrary(1, 6)
		const rolle3 = getRandomArbitrary(1, 6)
		return interaction.reply({ content: `du hast eine: ${rolle1} ${rolle2} ${rolle3} Gewürfelt.`,});
	},
};

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }