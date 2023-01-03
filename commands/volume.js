const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player')
const logger = require('../util/logger').log

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Change music volume-')
        .addIntegerOption(option => option.setName('volume').setDescription('Enter a volume in %').setRequired(true)),

	async execute(interaction)
	{
        try{
            const { client } = require('../index');
            const vol  = interaction.options.getInteger('volume');
        
            const queue = useQueue(interaction.guild.id);

			await interaction.deferReply();

            if (!queue || !queue.node.isPlaying()) return void interaction.editReply({ content: 'No music is being played!' });

            if (!vol) return void interaction.editReply({ content: `Current volume is **${client.player.volume}**%!` });

            if (vol < 0 || vol > 100) return void interaction.editReply({ content: 'Volume range must be 0-100%' });
            
            const success = queue.node.setVolume(vol);
            return void interaction.editReply({
                content: success ? `Volume set to **${vol}%**!` : 'Something went wrong!'
            });
            
        }catch(error){
            logger.error('Error while performing volume.')
            console.log(error)
        }
        
	},
};