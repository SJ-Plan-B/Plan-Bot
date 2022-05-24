const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('removefromqueue')
		.setDescription('Removes a given song from a queue')
        .addIntegerOption(option => option.setName('positon').setDescription('enter the position of the song to remove').setRequired(true)),
	async execute(interaction)
	{
        try {
            const number = interaction.options.getInteger('positon');
            
            music.removeQueue({
                interaction: interaction,
                number: number
            });
            return	interaction.reply('skipt the song with id:'+number);
		} catch (error) {
			console.error('Error while performing removefromqueue')
		}
	},
};