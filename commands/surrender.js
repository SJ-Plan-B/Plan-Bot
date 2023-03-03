const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js');
const logger = require('../util/logger').log
const { command_surrender_song_link, command_surrender_picture_link } =require('../data/comand.json')

module.exports = 
{ 
	data: new SlashCommandBuilder()
		.setName('surrender')
		.setDescription('Surrender (musik)'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { surrendercounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_surrender_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'surrendercounter'
			let newcountervalue = surrendercounter+1

			const surrenderEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Surrender')
			.setDescription(`${await(interaction.user.username)} hat aufgegeben.
							Es wurde bereits ${newcountervalue} aufgegeben.`)
			.setThumbnail(command_surrender_picture_link)

			const voiceEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Error')
			.setDescription(`${await(interaction.user.username)} You are required to be in a voice channel.`)
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

			const { client } = require('../index');

			if (!channel) return interaction.reply({ embeds: [voiceEmbed] }); 

			await interaction.deferReply();	
			
			try {
				await client.player.play(channel, song, {
										nodeOptions: {
										metadata: {
										channel: interaction.channel,
										client: interaction.guild.members.me,
										requestedBy: interaction.user,
										},
										selfDeaf: true,
										volume: Standart_Volumen,
										leaveOnEmpty: true,
										leaveOnEmptyCooldown: 300000,
										leaveOnEnd: true,
										leaveOnEndCooldown: 300000,
										},
										});
				} catch (error) {
					return interaction.editReply(`Something went wrong: ${error}`);
				}
			
 
			let output = Number((newcountervalue))
			let counted = cfs.writetojsonvariabl(jsonvariable, output, jsonfile, jsonsubfolder)

			if(counted === true)interaction.editReply({ embeds: [surrenderEmbed] });
					
		} catch (error) {
			logger.error('Error while performing surrender.')
		}
	},
};