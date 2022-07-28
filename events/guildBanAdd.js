const logger = require('../util/logger').log
const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, guildBanAddLogging, guildBanAddLoggingCollore, ban_icon} = require('../data/logger.json')

module.exports = {
	name: 'guildBanAdd',
	async execute(guild, user) {
			try {
				
					let auditfetch = await guild.guild.fetchAuditLogs({
						limit: 1,											//used to lock ad the audit log
						type: AuditLogEvent.MemberBanAdd,
					});

					let aditinfo = auditfetch.entries.first();
					let { executor, target } = aditinfo;

					var banreason = aditinfo.reason
					if(banreason === null){banreason = "No reason Given"}
			
					let botname = guild.client.user.username;
					let boticon = guild.client.user.displayAvatarURL();
				
					const Embed = new EmbedBuilder()
					.setColor(guildBanAddLoggingCollore)
					.setTitle('A user was banned')
					.setAuthor({ name: botname,
								iconURL: boticon,
								})
					.setDescription(`\`${target.tag}\` with the id \`${target.id}\`
									was banned from \`${executor.tag}\` with the id \`${executor.id}\`.
									was banned with the reason 
									\`${banreason}\``)
					.setThumbnail(ban_icon)
					.setTimestamp()
					.setFooter({ text: 'Message By Logger of Plan Bot'});
					
					if (guildBanAddLogging === true) {
						let message = { content: ' ', embeds: [Embed]};
						sendMessage(logchannel, message)
						logger.info(`\'${target.tag}\' with the id \'${target.id}\' was banned from \'${executor.tag}\' with the id \'${executor.id}\' was banned with the reason  \'${banreason}\'`)
						}		

		} catch (error) {
			logger.warn('Error while performing guildBanAdd in logger')
			console.log(error)
		}
	},
};