const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../util/logger').log;
//mysql v.5.5
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'host', 
    port: 'port',
    user:'user', 
    password: 'password',
    database:  'database',
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

