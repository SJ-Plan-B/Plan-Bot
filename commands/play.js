const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song')
		.addStringOption(option => option.setName('song').setDescription('add a song youtube link')),

	async execute(interaction)
	{
		const channel = interaction.member.voice.channel;
		const song = interaction.options.getString('song');
		if (song === null){music.resume({ interaction: interaction });
				  		   interaction.reply('Resume Playing');
				 		  }
		try {
			music.play({
				interaction: interaction,
				channel: channel,
				song: song
				});
			interaction.reply('playing '+ song);
			return song;
		} catch (error) {
			console.error('Error while performing play')
			interaction.reply('Invalide Song Link');
		}
		
	},
};