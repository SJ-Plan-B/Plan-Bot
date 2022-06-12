const logger = require('../util/logger').log
module.exports = {
	name: 'disconnect',
	execute(client) {
		logger.info("Disconnect!");
    },
};
