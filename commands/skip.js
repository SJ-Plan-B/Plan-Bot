const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip a song'),
	async execute(interaction)
	{
		try{
			var queue = [] ;
			
			try{
				queue = await(music.getQueue({ interaction: interaction })) ;	
			}catch (error){
				console.warn('while get music.getQueue in RemoveFromQueue in skip')
				console.error(error)
			}

			var songs = Object.keys(queue).length ;
	
			if(songs >= 1){
				music.skip({ interaction: interaction });
				return interaction.reply('music skipped');
			}else{
				if(songs < 1){ 
					interaction.reply('not enough songs in queue');
				}else{
					console.info( `${await(interaction.user.username)} destroyed the matrix while performing skip` )	
				}
			}
		}catch(error){
				console.warn('while performing skip'); 
				console.error(error)
		}
	},
};