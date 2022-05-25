const { SlashCommandBuilder } = require('@discordjs/builders');
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
				console.warn('Error while get music.getQueue in resume')
				console.error(error)
			}

			var songs = Object.keys(queue).length ;
			
			if(songs >= 1){
				music.resume({ interaction: interaction });
				interaction.reply('resume music');
			}else{
				if(songs < 1){ 
					interaction.reply('no song in queue');
				}else{
					console.info(`${await(interaction.user.username)} destroyed the matrix while performing resume`)	
				}	
			}
		}catch(error){
				console.warn('Error while performing resume');
				console.error(error)
		}
	}
};