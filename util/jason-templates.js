
module.exports = {

    generalconfig(input){
    
        let filecontence = {
            "clientId": input.clientid,
            "guildId": input.guildid,
            "token" : input.token
        }

        return JSON.stringify(filecontence);

    },

    dbconfig(input){

        let filecontence = {
            "cascadingChannels_DB_host": input.cascadingChannels_DB_host,
            "cascadingChannels_DB_port": input.cascadingChannels_DB_port,
            "cascadingChannels_DB_user": input.cascadingChannels_DB_user,
            "cascadingChannels_DB_password": input.cascadingChannels_DB_password,
            "cascadingChannels_DB_database": input.cascadingChannels_DB_database,
        
            "role_reaction_DB_host": input.role_reaction_DB_host,
            "role_reaction_DB_port": input.role_reaction_DB_port,
            "role_reaction_DB_user": input.role_reaction_DB_user,
            "role_reaction_DB_password": input.role_reaction_DB_password,
            "role_reaction_DB_database": input.role_reaction_DB_database
        }

        return JSON.stringify(filecontence);

    },

    eventconfig(input){
                
        let filecontence = {
            "log_messages_in_consol" : input.log_messages_in_consol,
        
            "message_welcome_chanel" : input.message_welcome_chanel,
            "message_welcome_embed_collor" : input.message_welcome_embed_collor,
            "message_welcome_header" : input.message_welcome_header,
            "message_welcome" : input.message_welcome,
        
            "message_leave_chanel" : input.message_leave_chanel,

            "message_leave_embed_collor" : input.message_leave_embed_collor,
            "message_leave_header" : input.message_leave_header,
            "message_leave_1" : input.message_leave_1,
            "message_leave_2" : input.message_leave_2,
        
            "enable_defalt_roll" : input.enable_defalt_roll,
            "default_roll_id" : input.default_roll_id
        }

        return JSON.stringify(filecontence);
    },

    commandconfig(input){

        let filecontence = {
            "Standart_Volumen": input.Standart_Volumen,
       
            "rollereact_title" : input.rollereact_title,
            "rollereact_collor" : input.rollereact_collor,
            "rollereact_text" : input.rollereact_text
    
        };

        return JSON.stringify(filecontence);

    },

    loggerconfig(input){

        let filecontence = {
            "logchannel" : input.logchannel,
            "bot_icon" : input.bot_icon,
            "bot_nickname" : input.bot_nickname,

            "ban_icon" : input.ban_icon,

            "guildBanRemoveLogging" : input.guildBanRemoveLogging,
            "guildBanRemoveLoggingCollore" : input.guildBanRemoveLoggingCollore,

            "guildBanAddLogging" : input.guildBanAddLogging,
            "guildBanAddLoggingCollore" : input.guildBanAddLoggingCollore,

            "guildMemberRemoveLogging" : input.guildMemberRemoveLogging,
            "guildMemberRemoveLoggingCollore" : input.guildMemberRemoveLoggingCollore,

            "roleCreateLogging" : input.roleCreateLogging,
            "roleCreateLoggingCollore" : input.roleCreateLoggingCollore,

            "roleDeleteLogging" : input.roleDeleteLogging,
            "roleDeleteLoggingCollore" : input.roleDeleteLoggingCollore,

            "roleUpdateLogging" : input.roleUpdateLogging,
            "roleUpdateLoggingCollore" : input.roleUpdateLoggingCollore,

            "channelCreateLogging" : input.channelCreateLogging,
            "channelCreateLoggingCollore" : input.channelCreateLoggingCollore,

            "channelDeleteLogging" : input.channelDeleteLogging,
            "channelDeleteLoggingCollore" : input.channelDeleteLoggingCollore,

            "messageDeleteLogging" : input.messageDeleteLogging,
            "messageDeleteLoggingCollore" : input.messageDeleteLoggingCollore
        }

        return JSON.stringify(filecontence);
        
    },
}