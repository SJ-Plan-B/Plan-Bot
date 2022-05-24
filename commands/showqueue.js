const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('showqueue')
		.setDescription('shows the queue'),

	async execute(interaction)
	{
        try {
            console.log(await(music.getQueue({ interaction: interaction })));
            return	interaction.reply('Queue hast been pasted into console');
		} catch (error) {
			console.error('Error while performing showqueue')
		}
       
	},
};