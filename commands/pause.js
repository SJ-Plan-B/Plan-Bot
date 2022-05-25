const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('pause a song'),
        
	async execute(interaction)
	{
		try{
			var queue = [] ;

			try{
				queue = await(music.getQueue({interaction: interaction})) ;	
			}catch(error){
				console.error(`while get music.getQueue in RemoveFromQueue in skip`)
			}

			var songs = Object.keys(queue).length ;
	
			if(songs >= 1){
				music.pause({interaction: interaction});
				return interaction.reply('song paused');
			}else{
				if(songs < 1){ 
					interaction.reply('not enough songs in queue');
				}else{
					console.info(`${await(interaction.user.username)} destroyed the matrix while performing pause`)	
				}
			}
		}catch(error){
			console.warn('Error while performing pause')
			console.error(error)
		}
	}
}