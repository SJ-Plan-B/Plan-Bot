const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip a song')
		.setDMPermission(false),
		
	async execute(interaction)
	{
		try{
			var queue = [] ;
			
			try{
				queue = await(music.getQueue({ interaction: interaction })) ;	
			}catch (error){
				logger.warn('while get music.getQueue in RemoveFromQueue in skip')
			}

			var songs = Object.keys(queue).length ;
	
			if(songs >= 1){
				music.skip({ interaction: interaction });
				return interaction.reply('music skipped');
			}else{
				if(songs < 1){ 
					interaction.reply('not enough songs in queue');
				}else{
					logger.info( `${await(interaction.user.username)} destroyed the matrix while performing skip` )	
				}
			}
		}catch(error){
				logger.warn('while performing skip'); 
				logger.error(error)
		}
	},
};