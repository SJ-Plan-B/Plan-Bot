const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('fuchs')
		.setDescription('HBz x IIVEN x Bekkaa - Fuchs du hast die Gans gestohlen'),

	async execute(interaction)
	{
		try {
			const channel = interaction.member.voice.channel;
			const song = 'https://www.youtube.com/watch?v=QwZRRsh6khA'

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
						interaction.reply(`${await(interaction.user.username)} hat die Gans gestohlen`);
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