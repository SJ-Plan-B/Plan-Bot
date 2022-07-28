const { SlashCommandBuilder } = require('discord.js');
const logger = require('../util/logger').log
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('repeat song')
        .addBooleanOption(option => option.setName('onoff').setDescription('repeat a song').setRequired(true)),

	async execute(interaction)
	{
		try{
			const OnOrOff = interaction.options.getBoolean('onoff');
			var queue = [] ;

			try{
				queue = await(music.getQueue({ interaction: interaction }));	
			}catch(error){
				logger.error('Error while get music.getQueue in reapeat')
			}

			var songs = Object.keys(queue).length ;
			
			if(songs >= 1){
				music.repeat({
					interaction: interaction,
					value: OnOrOff
				});
				interaction.reply('repeat music '+OnOrOff);
			}else{
				if(songs < 1){ 
					interaction.reply('no song in queue');
				}else{
					logger.info(`${await(interaction.user.username)} destroyed the matrix while performing reapeat`)	
				}
				
			}
		}catch(error){
				logger.error('Error while performing reapeat');
		}
	},
};