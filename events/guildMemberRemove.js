const {Message, MessageEmbed} = require('discord.js');
const { sendMessage } = require('../index.js')
const logger = require('../util/logger').log
const { message_leave_1, message_leave_2, message_leave_header, message_leave_chanel, message_leave_embed_collor } =require('../data/event.json')
const {logchannel, guildMemberRemoveLogging, guildMemberRemoveLoggingCollore } = require('../data/logger.json')

module.exports = {
	name: "guildMemberRemove",
	async execute(member) {

					const auditfetch = await member.guild.fetchAuditLogs({
						limit: 1,
						type: 'MEMBER_KICK',
					});
					let aditinfo = auditfetch.entries.first();
					let { executor, target } = aditinfo;
				
			if (target.id === member.id && aditinfo.createdAt > member.joinedAt) {

					try {

							var kickreason = aditinfo.reason
							if(kickreason === null){kickreason = "No reason Given"}
					
							let botname = member.client.user.username;
							let boticon = member.client.user.displayAvatarURL();
						
							const exampleEmbed = new MessageEmbed()
							.setColor(guildMemberRemoveLoggingCollore)
							.setTitle('A user was kicked from the server')
							.setAuthor({ name: botname,
										iconURL: boticon,
										})
							.setDescription(`\`${target.tag}\` with the id \`${target.id}\`
											was kicked from \`${executor.tag}\` with the id \`${executor.id}\`.
											the kick reason given is:
											\`${kickreason}\``)
							.setThumbnail(boticon)
							.setTimestamp()
							.setFooter({ text: 'Message By Logger of Plan Bot'});
							
							if (guildMemberRemoveLogging === true) {
								let message = { content: ' ', embeds: [exampleEmbed]};
								sendMessage(logchannel, message)
								logger.info(`${target.tag} with the id ${target.id} was kicked from ${executor.tag} with the id ${executor.id}.	the kick reason given is: ${kickreason}`)
								}
					
					} catch (error) {
						logger.error('Error while performing the kick message in guildMemberRemove')
						console.log(error)
					}
				}

				try{
							var nickname = getname(member)
							const newMemberEmbed = new MessageEmbed()
							.setColor(message_leave_embed_collor)
							.setTitle(message_leave_header)
							.setAuthor({
									name: nickname,
									iconURL: member.user.displayAvatarURL(),
							})
							.setDescription(message_leave_1+nickname+' '+message_leave_2)
							.setTimestamp();
						
							member.guild.channels.cache.get(message_leave_chanel).send({
								embeds: [newMemberEmbed] 
							})

				}catch (error) {
						logger.error('Error while performing the leave message in guildMemberRemove')
							   }	

			
	}
}

try {
	function getname(member){
		let memberarry = []
		memberarry = member.user;
			const myJSON = JSON.stringify(memberarry);
			const myArray = myJSON.split(",")
			const slicerdicer = myArray[4];
			let slicerdicerplus = slicerdicer.slice(11);
			let result = slicerdicerplus.replace(/["]/g, '')
			return result;	
	}	
} catch (error) {
	logger.error('Error while performing getname in guildMemberRemove')
}