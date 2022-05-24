const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('3d20')
		.setDescription('Würfelt 3 D20 Würfel'),

	async execute(interaction) // Funktion des Comands
	{
        const rolle1 = getRandomArbitrary(1, 20)
		const rolle2 = getRandomArbitrary(1, 20)
		const rolle3 = getRandomArbitrary(1, 20)
		return interaction.reply({ content: `du hast eine: ${rolle1} ${rolle2} ${rolle3} Gewürfelt.`,});
	},
};

function getRandomArbitrary(min, max)
	{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
	}