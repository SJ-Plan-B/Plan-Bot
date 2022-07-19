const logger = require('../util/logger').log
const { MessageEmbed } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, bot_nickname, bot_icon, messageDeleteLogging, messageDeleteLoggingCollore} = require('../data/logger.json')

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        try{
            if(message.partial){
                let auditfetch = await message.guild.fetchAuditLogs({
                    limit: 1,											//used to lock ad the audit log
                    type: 'MESSAGE_DELETE',
                });
                let aditinfo = auditfetch.entries.first();

                let authorname = aditinfo.target.username;
                let authordiscriminator = aditinfo.target.discriminator;
                let authorid = aditinfo.target.id;
    
                let username  = aditinfo.executor.username;
                let userdiscriminator  = aditinfo.executor.discriminator;
                let userid  = aditinfo.executor.id;
    
                let channelname = aditinfo.extra.channel.name
                let channelid = aditinfo.extra.channel.id

                const Embed = new MessageEmbed()
                .setColor(messageDeleteLoggingCollore)
                .setTitle('A Message was Deleted')
                .setAuthor({ name: bot_nickname,
                            iconURL: bot_icon,
                            })
                .setDescription(`\`${authorname}#${authordiscriminator}\` with the id \`${authorid}\`
                                has Deleted a messagefrom the user 
                                \`${username}#${userdiscriminator}\` with the id \`${userid}\`
                                in the channel \`${channelname}\` with the id \`${channelid}\` `)
                .setThumbnail(bot_icon)
                .setTimestamp()
                .setFooter({ text: 'Message By Logger of Plan Bot'});

                if (messageDeleteLogging === true){
                    let message = { content: ' ', embeds: [Embed]};
                    sendMessage(logchannel, message)
                }

            }else{
            
                let auditfetch = await message.guild.fetchAuditLogs({
                    limit: 1,											//used to lock ad the audit log
                    type: 'MESSAGE_DELETE',
                });
                
                let aditinfo = auditfetch.entries.first();

                let channelevent = await message.guild.channels.cache.get(message.channelId); // abfrage des channel obj an der discord api

                let authorname = message.author.authorname;
                let authordiscriminator = message.author.discriminator;
                let authorid = message.author.id;

                let username  = aditinfo.executor.username;
                let userdiscriminator  = aditinfo.executor.discriminator;
                let userid  = aditinfo.executor.id;

                let channelname = channelevent.name
                let channelid = channelevent.id
                
                let messagecontent = message.content;
                
                const Embed = new MessageEmbed()
                .setColor(messageDeleteLoggingCollore)
                .setTitle('A Message was Deleted')
                .setAuthor({ name: bot_nickname,
                            iconURL: bot_icon,
                            })
                .setDescription(`\`${username}#${userdiscriminator}\` with the id \`${userid}\`
                                has Deleted the message
                                \`${messagecontent}\`
                                from the user \`${authorname}#${authordiscriminator}\` with the id \`${authorid}\`
                                in the channel \`${channelname}\` with the id \`${channelid}\` `)
                .setThumbnail(bot_icon)
                .setTimestamp()
                .setFooter({ text: 'Message By Logger of Plan Bot'});
                
                if (messageDeleteLogging === true) {
                    let message = { content: ' ', embeds: [Embed]};
                    sendMessage(logchannel, message)
                    logger.info(`${authorname}#${authordiscriminator} with the id ${authorid} has Deleted the message ${messagecontent} from the user ${username}#${userdiscriminator} with the id ${userid} in the channel ${channelname} with the id ${channelid} `)
                    }
                }
        }catch(error){
            logger.error('Error while performing messageDelete in logger');
            console.log(error)
        }
    }
}