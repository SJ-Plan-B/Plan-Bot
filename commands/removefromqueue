const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('removefromqueue')
		.setDescription('Removes a given song from a queue')
        .addIntegerOption(option => option.setName('positon').setDescription('enter the position of the song to remove').setRequired(true)),

	async execute(interaction)
	{
		try{
				const number = interaction.options.getInteger('positon');
				var queue = [] ;
				
				try{
					queue = await(music.getQueue({ interaction: interaction })) ;	
				}catch(error){
					logger.error('Error while get musich.getQueue in RemoveFromQueue');
				}
	
				var songs = Object.keys(queue).length ;
		
				if(number <= songs){
					music.removeQueue({
						interaction: interaction,
						number: number     });
					interaction.reply('skipt the song with id:'+number);
				}else{
					if(number >= songs){ 
						interaction.reply('not enough songs in queue' );
					}else{
						logger.info(`${await(interaction.user.username)} destroyed the matrix while performing removefromqueue`)	
					}
					
				}
			
		}catch(error){
				logger.error('Error while performing removefromqueue');
		}
	},
};