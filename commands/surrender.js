const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('surrenders (musik)'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://youtu.be/K04aZ90Vo4A'
	
			if(song === null){
				music.resume({ interaction: interaction });
				interaction.reply('Resume Playing');
			}
			try{
				music.play({
					interaction: interaction,
					channel: channel,
					song: song
					});
				interaction.reply(`${await(interaction.user.username)} surrendered`);
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