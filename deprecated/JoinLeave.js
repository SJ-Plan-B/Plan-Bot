const logger = require('../util/logger').log
const client = require('../index')
const { Collection } = require('discord.js');
const voiceCollection = new Collection()


module.exports = {
	name: "voiceStateUpdate",
async	execute(oldstate, newstate,) {
        try {
        

        var newUserChannel = newstate.channelId //new channel
        var oldUserChannel = oldstate.channelId //old channel

        if(oldUserChannel === null && newUserChannel !== null) {

            // User Joins a voice channel
     


        } else if(oldUserChannel !== null && newUserChannel === null){

            // User leaves a voice channel


        } else if(oldUserChannel !== null && newUserChannel !== null){

            // User leaves a voice channel

        }else{
            logger.warn('Cannot identify join/leave Event')
        }

		} catch (error) {
			logger.warn('Error while performing interactionCreate')
			console.log(error)
		}
	},
};
