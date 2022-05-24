const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('change volume')
        .addIntegerOption(option => option.setName('volume').setDescription('enter volume')),

	async execute(interaction)
	{
        try {
            const volume = interaction.options.getInteger('volume');
            
            music.volume({
                interaction: interaction,
                volume: volume
            });
		    interaction.reply('volume set to '+volume);
        } catch (error) {
            console.error('Error while performing volume')
        }
        
	},
};