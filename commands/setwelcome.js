const fs = require('fs');
let databaseFile = JSON.parse(fs.readFileSync('./assets/welcome.json', 'utf8'));

exports.run = async (bot, message, args) => {
  let channelID, guildID = message.guild.id;
  // if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You don't have permission to run this!");
  if (!args[0]) {
    channelID = message.channel.id;
    databaseFile[guildID] = channelID
    fs.writeFile('./assets/welcome.json', JSON.stringify(databaseFile), (err) => {
      if (err) console.log(err);
    });
  }
  message.channel.send("Aight, I've set the greeting channel!");
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "setwelcome",
  category: "Administrator",
  description: "Set a welcome channel.",
  usage: "setwelcome #[channel-name]",
  param: "",
  aliases: ""
};