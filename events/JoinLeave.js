const logger = require('../util/logger').log
module.exports = {
	name: 'voiceStateUpdate',
	execute(oldMember, newMember) {
		try {
		
        var newUserChannel = newMember.channelId //new channel
        var oldUserChannel = oldMember.channelId //old channel

        if(oldUserChannel === null && newUserChannel !== null) {

            // User Joins a voice channel
            if (newUserChannel == '985613132619735052') {
                newUserChannel.clone(undefined, true, false, 'Needed a clone')
                .then(clone => console.log(`Cloned ${channel.name} to make a channel called ${clone.name}`))
                .catch(console.error);
            } else {
                
            }

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

