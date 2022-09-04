const { SlashCommandBuilder } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const logger = require('../util/logger').log;
const { role_reaction_DB_host, role_reaction_DB_port, role_reaction_DB_user, role_reaction_DB_password, role_reaction_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: role_reaction_DB_host, 
    port: role_reaction_DB_port,
    user: role_reaction_DB_user, 
    password: role_reaction_DB_password,
    database: role_reaction_DB_database,
})
module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('removerolereaction')
		.setDescription('removes role from role reaction')
		.addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const role = interaction.options.getRole('role');
			//const roleObject = interaction.guild.roles.cache.get(roleid); // Gets the role object
			var name = role.name
			var id = role.id

				try {
					// Insert Voice into Database
					var sql = "DELETE FROM roles Where id = ?";
					var Inserts = [id]
					sql = mysql.format(sql, Inserts);
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.http(`Deleting role ${name} from database: ${role_reaction_DB_database}, table: roles`)
						if (result.affectedRows > 0) {
							interaction.reply(`Role \`${name}\` was removed from role reaction`);
						} else {
							interaction.reply(`Role \`${name}\` was not in role reaction`);
						}
	
					});

				} catch (error) {
				logger.error(`Error while performing the database: ${role_reaction_DB_database}, Conection in removerolereaction`); 
				}
				
				con.end(function(err) {
				logger.http(`a Connection to database: ${role_reaction_DB_database} has been terminated`)})

		}catch(error){
			logger.error('Error while performing removerolereaction'); 
		}
	},
};
