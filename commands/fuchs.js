const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { Standart_Volumen } = require ('../data/comand.json');
const fs = require('fs');
const path = require('path');
const cfs = require('../util/customfunctions.js')
const logger = require('../util/logger').log;
const { command_fuchs_song_link, command_fuchs_picture_link } =require('../data/comand.json')

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('fuchs')
		.setDescription('HBz x IIVEN x Bekkaa - Fuchs du hast die Gans gestohlen.'),

	async execute(interaction)
	{
		try {
			var datei = path.join(__dirname, '..', 'data', 'counter.json')
			var { fuchscounter } = JSON.parse(fs.readFileSync(datei, 'utf8'))
			let channel = interaction.member.voice.channel;
			let song = command_fuchs_song_link
			let jsonfile = 'counter.json'
			let jsonsubfolder = 'data'
			let jsonvariable = 'fuchscounter'
			let newcountervalue = fuchscounter+1

			const FuchsEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Fuchs')
			.setDescription(`${await(interaction.user.username)} hat die Gans gestohlen.
							Der Fuchs hat schon zum \`${newcountervalue}\`. Mal die Gans gestohlen.`)
			.setThumbnail(command_fuchs_picture_link)

			const voiceEmbed = new EmbedBuilder()
			.setColor('#e30926')
			.setTitle('Error')
			.setDescription(`${await(interaction.user.username)} You are required to be in a voice channel.`)
			.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Generic_error_message.png/250px-Generic_error_message.png')

			const { client } = require('../index');

			if (!channel) return interaction.editReply({ embeds: [voiceEmbed] }); 

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

			if(counted === true)interaction.editReply({ embeds: [FuchsEmbed] });

		} catch (error) {
			logger.error('Error while performing fuchs.')
		}
	},
};