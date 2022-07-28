const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop a song'),
		
	async execute(interaction)
	{
		try{
			var queue = [] ;
			
			try{
				queue = await(music.getQueue({ interaction: interaction })) ;	
			}catch (error){
				logger.warn('while get music.getQueue in RemoveFromQueue in stop')
			}

			var songs = Object.keys(queue).length ;
	
			if(songs >= 1){
				music.stop({ interaction: interaction });
				return interaction.reply('music stopped');
			}else{
				if(songs < 1){ 
					interaction.reply('not enough songs in queue');
				}else{
					logger.info( `${await(interaction.user.username)} destroyed the matrix while performing stop` )	
				}
			}
		}catch(error){
				logger.error('Error while performing volume'); 
		}
	},
};