const logger = require('../util/logger').log
const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
const { sendMessage } = require('../index.js');
const {logchannel, guildBanRemoveLogging, guildBanRemoveLoggingCollore, ban_icon} = require('../data/logger.json')

module.exports = {
	name: 'guildBanRemove',
	async execute(guild, user) {
			try {
			

					let auditfetch = await guild.guild.fetchAuditLogs({
						limit: 1,											//used to lock ad the audit log
						type: AuditLogEvent.MemberBanRemove,
					});

					let aditinfo = auditfetch.entries.first();
					let { executor, target } = aditinfo;

					var banreason = aditinfo.reason
					if(banreason === null){banreason = "No reason Given"}
			
					let botname = guild.client.user.username;
					let boticon = guild.client.user.displayAvatarURL();
				
					const exampleEmbed = new EmbedBuilder()
					.setColor(guildBanRemoveLoggingCollore)
					.setTitle('A user was unbanned')
					.setAuthor({ name: botname,
								iconURL: boticon,
								})
					.setDescription(`\`${target.tag}\` with the id \`${target.id}\`
									was unbanned from \`${executor.tag}\`
									with the id \`${executor.id}\`.`)
					.setThumbnail(ban_icon)
					.setTimestamp()
					.setFooter({ text: 'Message By Logger of Plan Bot'});
					
					if (guildBanRemoveLogging === true) {
						let message = { content: ' ', embeds: [exampleEmbed]};
						sendMessage(logchannel, message)
						logger.info(`\'${target.tag}\' with the id \'${target.id}\' was unbanned from \'${executor.tag}\' with the id \'${executor.id}\'.`)
						}

		} catch (error) {
			logger.warn('Error while performing guildBanRemove in logger')
			console.log(error)
		}
	},
};