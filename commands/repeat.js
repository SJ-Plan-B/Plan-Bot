const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription('repeat song')
        .addBooleanOption(option => option.setName('onoff').setDescription('repeat a song')),

	async execute(interaction)
	{
		try{
			const OnOrOff = interaction.options.getBoolean('onoff');
			var queue = [] ;

			try{
				queue = await(music.getQueue({ interaction: interaction }));	
			}catch(error){
				console.warn('Error while get music.getQueue in reapeat')
				console.error(error)
			}

			var songs = Object.keys(queue).length ;
			
			if(songs >= 1){
				music.repeat({
					interaction: interaction,
					value: OnOrOff
				});
				return interaction.reply('repeat music '+OnOrOff);
			}else{
				if(songs < 1){ 
					interaction.reply('no song in queue');
				}else{
					console.info(`${await(interaction.user.username)} destroyed the matrix while performing reapeat`)	
				}
				
			}
		}catch(error){
				console.warn('Error while performing reapeat');
				console.error(error)
		}
	},
};