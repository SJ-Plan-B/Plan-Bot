const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('jump multiple songs')
        .addIntegerOption(option => option.setName('number').setDescription('number of songs')),
        
	async execute(interaction)
	{
		try {
			const number = interaction.options.getInteger('number');
			var queue = [] ;
			try {
				queue = await(music.getQueue({ interaction: interaction })) ;	
			} catch (error) {
				console.error('Error while get musich.getQueue')
			}

			var songs = Object.keys(queue).length ;
	
			if(number < songs && songs > 1){
				music.jump({interaction: interaction,number: number});
				interaction.reply('jump '+number+ ' songs');
			}else{
				if (songs < 2 || songs <= 1) { //DAS MUSS SO / DAS HABEN WIR IMMER SO GEMACHT
					interaction.reply('not enough song in queue' );
				} else {
					interaction.reply('max jumps: ' + (songs-1) );	
				}
				
			}
		
		} catch (error) {
			console.error('Error while performing jump'); 
		}

	},
};