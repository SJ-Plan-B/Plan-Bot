const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');
const logger = require('../util/logger').log;

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('jump')
		.setDescription('jump multiple songs')
		.setDMPermission(false)
        .addIntegerOption(option => option.setName('number').setDescription('number of songs')),
        
	async execute(interaction)
	{
		try{
			const number = interaction.options.getInteger('number');
			var queue = [] ;

			try{
				queue = await(music.getQueue({ interaction: interaction })) ;	
			}catch(error){
				logger.warn('Error while get musich.getQueue in jump');
				logger.error(error)
			}

			var songs = Object.keys(queue).length;
	
			if(number < songs && songs > 1){
				music.jump({interaction: interaction,number: number});
				interaction.reply('jump ' +number+ ' songs');
			}else{
				if(songs < 2){
					interaction.reply( 'not enough songs in queue' );
				}else{
					interaction.reply( 'max jumps: ' + (songs-1) );	
				}
				
			}
		
		} catch (error) {
			logger.warn('Error while performing jump');
			logger.error(error)
		}
	},
};