const { SlashCommandBuilder } = require('@discordjs/builders');
const music = require('@koenie06/discord.js-music');

module.exports = 
{
	data: new SlashCommandBuilder()
		.setName('showqueue')
		.setDescription('shows the queue'),

	async execute(interaction)
	{
	
		var queue = []
		var result = []
		queue = await(music.getQueue({ interaction: interaction }));
		for (let index = 0; index < Object.keys(queue).length; index++) {
			const myJSON = JSON.stringify(queue[index]);
			const myArray = myJSON.split(",")
			const slicerdicer = myArray[0];
			result[index] = slicerdicer.slice(17);
			console.log(result)
		}
		interaction.reply('\`' + result.join(`\n`) + '\`');
	},
};

/*
var getObjectAsync = async function(bucket,key) {
	try {
	  const data = await s3
		.getObject({ Bucket: bucket, Key: key })
		.promise();
		var contents = data.Body.toString('utf-8');
		return contents;
	} catch (err) {
	  console.log(err);
	}
  }
  var getObject = async function(bucket,key) {
	  const contents = await getObjectAsync(bucket,key);
	  console.log(contents.length);
	  return contents;
  }
  getObject(bucket,key);
  */