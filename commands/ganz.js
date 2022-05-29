const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('ganz')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=_LGXSnHtq8Q'
			
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
						interaction.reply(`${await(interaction.user.username)} wird vom fuchs gestolen`);
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