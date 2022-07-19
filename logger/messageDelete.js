const logger = require('../util/logger').log
const { MessageEmbed } = require('discord.js');
const { sendMessage } = require('../index.js')
const {logchannel, channelDeleteLogging, channelDeleteLoggingCollore} = require('../data/logger.json')

module.exports = {
    name: 'messageDelete',
    async execute(message) {
        try{
            let auditfetch = await message.guild.fetchAuditLogs({
                limit: 1,
                type: 'MESSAGE_DELETE'
            })
            console.log(message)
            console.log(auditfetch)
        }catch(){
            logger.error('Error while performing channelCreate in logger');
            console.log()
        }

    }
}