const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const {parentPort, workerData} = require("worker_threads");

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a song')
		.addStringOption(option => option.setName('song').setDescription('add a song youtube link').setRequired(true)),

	async execute(interaction)
	{
		try{
			const channel = interaction.member.voice.channel;
			const song = interaction.options.getString('song');

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
						interaction.reply('playing '+ song);
						return song;
					}catch(error){
						console.info('Error while performing play')
						interaction.reply('Invalide Song Link');
					}}
		}catch(error){
			console.warn('Error while performing ping');
			console.error(error)
		}
	}
};