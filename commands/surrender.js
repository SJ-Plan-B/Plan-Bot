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
			const song = 'https://www.youtube.com/watch?v=K04aZ90Vo4A'

			switch(true){
				case(channel === null):
					interaction.reply('You must be in a Voicechannel');
					break;
	
				case(song === null):
					interaction.reply('no song in Queue');
					break;
	
				default:
					try{
						music.play({ interaction: interaction, channel: channel, song: song});
						interaction.reply(`${await(interaction.user.username)} surrendered`);
						return song;
					}catch(error){
						console.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		} catch (error) {
			console.warn('Error while performing play')
			console.error(error)
		}
	},
};