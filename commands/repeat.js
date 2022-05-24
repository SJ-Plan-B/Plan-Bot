const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('repeat song')
        .addBooleanOption(option => option.setName('onoff').setDescription('repeat a song')),
	async execute(interaction)
	{
        try {
            const OnOrOff = interaction.options.getBoolean('onoff');

            music.repeat({
                interaction: interaction,
                value: OnOrOff
            });
            interaction.reply('repeat music '+OnOrOff);
		} catch (error) {
			console.error('Error while performing repeat')
		}
	},
};