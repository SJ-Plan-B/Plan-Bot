const logger = require('../util/logger').log
const { MessageEmbed } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, channelCreateLogging, channelCreateLoggingCollore} = require('../data/logger.json')

module.exports = {
	name: 'channelCreate',
	async execute(channel) { 
		try {
			let auditfetch = await channel.guild.fetchAuditLogs({
				limit: 1,
				type: 'CHANNEL_CREATE',
			});
			let aditinfo = auditfetch.entries.first();

            let channelname = channel.name;
			let channelid = channel.id;

			let username  = aditinfo.executor.username;
			let userdiscriminator  = aditinfo.executor.discriminator;
			let userid  = aditinfo.executor.id;
	
			let botname = channel.client.user.username;
			let boticon = channel.client.user.displayAvatarURL();
		
			const exampleEmbed = new MessageEmbed()
			.setColor(channelCreateLoggingCollore)
			.setTitle('A Channel was Created')
			.setAuthor({ name: botname,
						iconURL: boticon,
						})
			.setDescription(`\`${username}#${userdiscriminator}\`\n with the id \`${userid}\`\n has Created the channel \`${channelname}\`\n with the id \`${channelid}\` `)
			.setThumbnail(boticon)
			.setTimestamp()
			.setFooter({ text: 'Message By Logger of Plan Bot'});
			
			if (channelCreateLogging === true) {
				let message = { content: ' ', embeds: [exampleEmbed]};
				sendMessage(logchannel, message)
				logger.info(`${username}#${userdiscriminator} with the id ${userid} has Created the channel ${channelname} with the id ${channelid}` )
			}
				

		} catch (error) {
			logger.warn('Error while performing channelCreate in logger')
		}
		
		
	},
};