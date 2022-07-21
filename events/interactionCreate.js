const logger = require('../util/logger').log
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: role_reaction_DB_host, 
    port: role_reaction_DB_port,
    user: role_reaction_DB_user, 
    password: role_reaction_DB_password,
    database: role_reaction_DB_database,
})

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		try {
			if (interaction.isButton()){
				
				if((interaction.customId).startsWith("roles_") == true && interaction.message.author.id === interaction.applicationId) {
					
					let roleId = splitObjIntoArrayOfString(await(getroleID((interaction.customId).split("_")[1])));

					if (interaction.member.roles.cache.has(roleId[0])=== false) {
						interaction.member.roles.add(roleId[0])	
						interaction.reply({content: `Role ${interaction.customId} was addded`, ephemeral: true});
						logger.verbose(`der user : ${interaction.user.username}, mit der id ${interaction.user.id}, hat sich die rolle ${interaction.customId} gegeben`)
					} else {
						interaction.member.roles.remove(roleId[0])	
						interaction.reply({content: `Role ${interaction.customId} was removed`, ephemeral: true});
						logger.verbose(`der user : ${interaction.user.username}, mit der id ${interaction.user.id}, hat sich die rolle ${interaction.customId} entfernt`)
					}

				} else {
					
				}

				
			}else{
				logger.verbose(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
			}

			
		} catch (error) {
			logger.error('Error while performing interactionCreate')
			console.log(error)
		}
	
	},
};

function getroleID(rollid){
	try {
		var sql = "SELECT id FROM roles Where name = ?";
		var Inserts = [rollid]
		sql = mysql.format(sql, Inserts);
		return new Promise((resolve, reject) => {
		  con.query(sql, (err, result) => {
			  return err ? reject(err) : resolve(result);
			}
		  );
		}
	  );
	} catch (error) {
	logger.error(`Error while performing 'SELECT' in the database: ${role_reaction_DB_database}, in Event JoinLeave`); 
	}
}
function splitObjIntoArrayOfString(obj){
	try {
		let myJSON = JSON.stringify(obj);
		let myArray = myJSON.split(",")
	  
		for (let index = 0; index < Object.keys(myArray).length; index++) {
			myArray[index] = myArray[index].replace(/{"id":"/, '')
			myArray[index] = myArray[index].replace(/"}/g, '')
		}
	  
		myArray[0] = myArray[0].replace('[', '')
		myArray[(Object.keys(myArray).length-1)] = myArray[(Object.keys(myArray).length-1)].replace(']', '')
		return myArray;
	} catch (error) {
		logger.error('Error while performing splitObjIntoArrayOfString in interactionCreate')
	}
  }	

