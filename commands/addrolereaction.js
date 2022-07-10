const { SlashCommandBuilder } = require('@discordjs/builders');
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
		.setName('addrolereaction')
		.setDescription('add role to rolereaction')
		.addRoleOption(option => option.setName('role').setDescription('Select a role').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) // Funktion des Comands
	{
		try{
			const role = interaction.options.getRole('role');
			//const channelObject = interaction.guild.channels.cache.get(channelid); // Gets the channel object
			var name = role.name
			var id = role.id

				try {
					// Insert Voice into Database
					var sql = "INSERT INTO  roles (name, id) SELECT * FROM ( SELECT ? AS roleName, ?) AS dataQuery ON DUPLICATE KEY UPDATE name=roleName";
					var Inserts = [name, id]
					sql = mysql.format(sql, Inserts);
					con.query(sql, function (err, result) {
						if (err) throw err;
						logger.http(`Inserted ${name} into database: ${role_reaction_DB_database}, table: roles`)
						interaction.reply(`Role \`${name}\` was added to role reaction`);
					});

				} catch (error) {
				logger.error(`Error while performing the database: ${role_reaction_DB_database}, Conection in addrolereaction`); 
				}	

		}catch(error){
			logger.error('Error while performing addrolereaction'); 
		}
	},
};

