const { SlashCommandBuilder } = require('@discordjs/builders');
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
					console.error('Error while get musich.getQueue in RemoveFromQueue')
				}
	
				var songs = Object.keys(queue).length ;
		
				if(number <= songs){
					music.removeQueue({
						interaction: interaction,
						number: number     });
					return	interaction.reply('skipt the song with id:'+number);
				}else{
					if(number >= songs){ 
						interaction.reply('not enough songs in queue' );
					}else{
						console.info(`${await(interaction.user.username)} destroyed the matrix while performing removefromqueue`)	
					}
					
				}
			
		}catch(error){
				console.warn('Error while performing removefromqueue'); 
				console.error(error)
		}
	},
};