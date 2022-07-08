const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('resume song'),

	async execute(interaction)
	{
		try{
			var queue = [] ;

			try{
				queue = await(music.getQueue({ interaction: interaction }));	
			}catch(error){
				logger.error('Error while get music.getQueue in resume')
			}

			var songs = Object.keys(queue).length ;
			
			if(songs >= 1){
				music.resume({ interaction: interaction });
				interaction.reply('resume music');
			}else{
				if(songs < 1){ 
					interaction.reply('no song in queue');
				}else{
					logger.info(`${await(interaction.user.username)} destroyed the matrix while performing resume`)	
				}	
			}
		}catch(error){
				logger.error('Error while performing resume');
		}
	}
};