
module.exports = {

    generalconfig(input){
    
        let filecontence = {
            "clientId": input.clientid,
            "guildId": input.guildid,
            "token" : input.token,
            "console_log_lvl" : input.console_log_lvl
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

    },

    commandconfig(input){

        let filecontence = {
            "Standart_Volumen": input.Standart_Volumen,

            "command_cat_song_link": input.command_cat_song_link,
            "command_cat_picture_link": input.command_cat_picture_link,
        
            "command_surrender_song_link": input.command_surrender_song_link,
            "command_surrender_picture_link": input.command_surrender_picture_link,
        
            "command_gans_song_link": input.command_gans_song_link,
            "command_gans_picture_link": input.command_gans_picture_link,
        
            "command_fuchs_song_link": input.command_fuchs_song_link,
            "command_fuchs_picture_link": input.command_fuchs_picture_link,
        
            "command_geisterbahn_song_link": input.command_geisterbahn_song_link,
            "command_geisterbahn_picture_link": input.command_geisterbahn_picture_link,
        
            "command_coconut_song_link": input.command_coconut_song_link,
            "command_coconut_picture_link": input.command_coconut_picture_link,
        
            "command_burger_song_link": input.command_burger_song_link,
            "command_burger_picture_link": input.command_burger_picture_link,
        
            "rollereact_title" : input.rollereact_title,
            "rollereact_collor" : input.rollereact_collor,
            "rollereact_text" : input.rollereact_text
    
        };

        return JSON.stringify(filecontence);

    },

    loggerconfig(input){

    },
}