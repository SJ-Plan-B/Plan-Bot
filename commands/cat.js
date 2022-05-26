const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Happy Cat Purring'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=CY7t8ow2gOM'
			try{
				music.play({
					interaction: interaction,
					channel: channel,
					song: song
					});
				interaction.reply(`${await(interaction.user.username)} is a Purring cat`);
				return song;
			}catch(error){
				interaction.reply('Invalide Song Link');
			}
		} catch (error) {
			console.warn('Error while performing play')
			console.error(error)
		}
	},
};