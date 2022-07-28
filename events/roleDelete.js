const logger = require('../util/logger').log
const { EmbedBuilder, AuditLogEvent  } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, roleDeleteLogging, roleDeleteLoggingCollore} = require('../data/logger.json')

module.exports = {
	name: 'roleDelete',
	async execute(role) {
			try {
				
					let auditfetch = await role.guild.fetchAuditLogs({
						limit: 1,											//used to lock ad the audit log
						type: AuditLogEvent.RoleDelete,
					});

					let aditinfo = auditfetch.entries.first();
					let { executor, target, changes} = aditinfo;

                    let rolename = machkaput(changes)
							
					let botname = role.client.user.username;
					let boticon = role.client.user.displayAvatarURL();
				
					const Embed = new EmbedBuilder()
					.setColor(roleDeleteLoggingCollore)
					.setTitle('A role has bin Deleted')
					.setAuthor({ name: botname,
								iconURL: boticon,
								})
					.setDescription(`\`${executor.tag}\` with the id \`${executor.id}\`
									has deleated the role \`${rolename}\` with the id \`${target.id}\``)
					.setTimestamp()
					.setFooter({ text: 'Message By Logger of Plan Bot'});
					
					if (roleDeleteLogging === true) {
						let message = { content: ' ', embeds: [Embed]};
						sendMessage(logchannel, message)
						logger.info(`\"${executor.tag}\" with the id \"${executor.id}\" has deleated the role \"${rolename}\" with the id \"${target.id}\"`)
						}	

		} catch (error) {
			logger.warn('Error while performing guildBanAdd in logger')
			console.log(error)
		}
	},
};

function machkaput(obj){
        let myJSON = JSON.stringify(obj[0]);
        let myArray = myJSON.split(",")
            myArray = myArray[1]

        myArray = myArray.replace(/"old":"/g, '');
        myArray = myArray.replace(/"}/g, '');
        return myArray
}