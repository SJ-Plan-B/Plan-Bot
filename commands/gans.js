const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const logger = require('../util/logger').log;
const { command_gans_song_link, command_gans_picture_link } =require('../data/comand.json')
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('gans')
		.setDescription('The Holy Santa Barbara - Dance mit de Gänse.'),

	async execute(interaction)
	{
		try {

			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { ganscounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			const channel = interaction.member.voice.channel;
			const song = command_gans_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'ganscounter'
			let newcountervalue = ganscounter+1

			const GansEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Gans')
			.setDescription(`${await(interaction.user.username)} wird vom Fuchs gestolen.
			So oft wurde die Gans schon vom Fuchs gestohlen: \`${newcountervalue}\``)
			.setThumbnail(command_gans_picture_link)

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

			if(counted === true)interaction.editReply({ embeds: [GansEmbed] });

		} catch (error) {
			logger.error('Error while performing gans.')
		}
	},
};