const logger = require('../util/logger').log
const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, roleCreateLogging, roleCreateLoggingCollore} = require('../data/logger.json')

module.exports = {
	name: 'roleCreate',
	async execute(role) {
			try {
				
					let auditfetch = await role.guild.fetchAuditLogs({
						limit: 1,											//used to lock ad the audit log
						type: AuditLogEvent.RoleCreate,
					});

					let aditinfo = auditfetch.entries.first();
					let { executor, target } = aditinfo;
				
					let permissions = slicerdicerpluxl(role.permissions.toArray())
							
					let botname = role.client.user.username;
					let boticon = role.client.user.displayAvatarURL();
				
					const Embed = new EmbedBuilder()
					.setColor(roleCreateLoggingCollore)
					.setTitle('A role has bin Created')
					.setAuthor({ name: botname,
								iconURL: boticon,
								})
					.setDescription(`\`${executor.tag}\` with the id \`${executor.id}\`
									has created the role \`${target.name}\` with the id \`${target.id}\`,
									with the colore \`${target.color}\` and the permissons:
									\`${permissions}\``)
					.setTimestamp()
					.setFooter({ text: 'Message By Logger of Plan Bot'});
					
					if (roleCreateLogging === true) {
						let message = { content: ' ', embeds: [Embed]};
						sendMessage(logchannel, message)
						logger.info(`\"${executor.tag}\" with the id \"${executor.id}\" has created the role \"${target.name}\" with the id \"${target.id}\"`)
						}	

		} catch (error) {
			logger.warn('Error while performing guildBanAdd in logger')
			console.log(error)
		}
	}
};

function slicerdicerpluxl(permissions){

		let myJSON = JSON.stringify(permissions);
		let myArray = myJSON.split(",")

		for (let index = 0; index < Object.keys(myArray).length; index++) {
			myArray[index] = myArray[index].replace(/"/g, '');
		}

		myArray[0] = myArray[0].replace('[', '')
		myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')

		for (let index = 1; index <Object.keys(permissions).length; index++) {
			if ((index+1)%2 === 0 && index !== 0) {
				myArray[0]= myArray[0].concat(myArray[index], ", ", "\n")
			} else {
				myArray[0]=myArray[0].concat(myArray[index], ", ")
			}
			
			
		}

		return myArray[0]
}