const logger = require('../util/logger').log
const { MessageEmbed, Permissions } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, roleUpdateLogging, roleUpdateLoggingCollore} = require('../data/logger.json')

module.exports = {
	name: 'roleUpdate',
	async execute(oldRole, newRole) {
			try {
				
                if (!oldRole.partial && !newRole.partial) {
                    let auditfetch = await oldRole.guild.fetchAuditLogs({
						limit: 1,											//used to lock ad the audit log
						type: 'ROLE_UPDATE',
					});
             
					let aditinfo = auditfetch.entries.first();
					let { executor, target } = aditinfo;

                    if (oldRole.rawPosition === newRole.rawPosition && (oldRole.permissions !== newRole.permissions || oldRole.name !== newRole.name) ) {

                    let oldperm = oldRole.permissions.toArray();
                    let newperm = newRole.permissions.toArray();
                    let permdiv

                    if (oldperm === [] && newperm === []) {
                        permdiv = "there are no changes to the permissons";
                        console.log("if 1")
                    } else {
                        permdiv = slicerdicerpluxl(permvergleich(newperm, oldperm));
                        console.log("if 2")
                    }
                   
                    let compnewperm = slicerdicerpluxl(newperm);

                    let newrolename = newRole.name;
                    let oldrolename = oldRole.name;
                    let nameconstruct
                    if (newrolename === oldrolename) {
                        nameconstruct = oldrolename
                    } else {
                        nameconstruct = oldrolename.concat("=>", newrolename)
                    }
                
		
					let botname = oldRole.client.user.username;
					let boticon = oldRole.client.user.displayAvatarURL();
				
					const Embed = new MessageEmbed()
					.setColor(roleUpdateLoggingCollore)
					.setTitle('A role has bin Updated')
					.setAuthor({ name: botname,
								iconURL: boticon,
								})
					.setDescription(`\`${executor.tag}\` with the id \`${executor.id}\`
									has edited the role \`${nameconstruct}\` with the id \`${target.id}\`,
									the following permissons changed:
                                    \` ${permdiv} \`
                                    all new permissons of the role are:
									\`${compnewperm}\``)
					.setTimestamp()
					.setFooter({ text: 'Message By Logger of Plan Bot'});
					
					if (roleUpdateLogging === true) {
						let message = { content: ' ', embeds: [Embed]};
						sendMessage(logchannel, message)
						logger.info(`\"${executor.tag}\" with the id \"${executor.id}\" has edited the role \"${nameconstruct}\" with the id \"${target.id}\"`)
						}
                    }else{                       
                      // A channel was move might be logged in future
                    }
                } else {
                    logger.debug("test")
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

function permvergleich(a1, a2){

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}

