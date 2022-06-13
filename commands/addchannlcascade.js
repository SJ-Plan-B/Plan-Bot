const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log;
const { cascadingChannels_DB_host, cascadingChannels_DB_port, cascadingChannels_DB_user, cascadingChannels_DB_password, cascadingChannels_DB_database } =require('../data/db.json')
var mysql = require('mysql');

var con = mysql.createConnection({
    host: cascadingChannels_DB_host, 
    port: cascadingChannels_DB_port,
    user: cascadingChannels_DB_user, 
    password: cascadingChannels_DB_password,
    database: cascadingChannels_DB_database,
});

module.exports = 
{
	data: new SlashCommandBuilder() // Comand REG
		.setName('addchannlcascade')
		.setDescription('add channl to cascade'),

	async execute(interaction) // Funktion des Comands
	{
		try{
			try {
				con.connect(function(err) {
					if (err) throw err;
					console.log("Connected!");
					var sql = "INSERT INTO channels (name, id) VALUES ('General', '863102864342908941')";
					con.query(sql, function (err, result) {
					  if (err) throw err;
					  console.log("Table created");
					});
				  });
			} catch (error) {
				logger.warn('Error while performing the database Conection in addchannlcascade'); 
				logger.error(error)
			}
			

		}catch(error){
			logger.warn('Error while performing addchannlcascade'); 
			logger.error(error)
		}
	},
};

