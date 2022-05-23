const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play a. song')
		.addStringOption(option => option.setName('url').setDescription('add a song youtube link')),

	async execute(interaction)
	{
<<<<<<< Updated upstream
		const url = interaction.options.getInteger('url');

		

		interaction.reply({ content: `Successfully pruned \`${url}\` messages.`, ephemeral: true });
		return true;
=======
		const url = interaction.options.getString('url');
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel)
		  return interaction.reply(
			"You need to be in a voice channel to play music!"
		  );
		interaction.reply('playing '+url)
		return (url, interaction);
>>>>>>> Stashed changes
	},
};