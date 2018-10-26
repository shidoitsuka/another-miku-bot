const fs = require('fs');
// if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send("You don't have permission to run this!");
const parameters = [
  "\n-prefix     : set guild\'s custom prefix. (use \"default\" to use miku\'s default prefix)",
  "-welcome    : set guild\'s greeting channel. (use \"off\" to turn off the feature)",
].join("\n");

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send("Invalid Parameters!");
  // DB_FILES
  let welcomes = JSON.parse(fs.readFileSync('./assets/welcome.json', 'utf8'));
  let prefixes = JSON.parse(fs.readFileSync('./assets/prefixes.json', 'utf8'));
  // VARIABLES
  let channelID = message.channel.id,
    guildID = message.guild.id;

  // SWITCH
  switch (args[0]) {
    case "-welcome":
      if (args[1].toLowerCase() == "off") {
        delete welcomes[guildID];
        fs.writeFile('./assets/welcome.json', JSON.stringify(welcomes), (err) => {
          if (err) console.log(err);
        });
        message.channel.send("Turned off greeting!");
      } else {
        if (message.mentions.channels.first()) welcomes[guildID] = message.mentions.channels.first().id;
        if (!message.mentions.channels.first()) welcomes[guildID] = channelID;
        fs.writeFile('./assets/welcome.json', JSON.stringify(welcomes), (err) => {
          if (err) console.log(err);
        });
        message.channel.send("Aight, I've set the greeting channel!");
      }
      break;
    case "-prefix":
      if (args[1].toLowerCase() == "default" || args[1] == "x") {
        delete prefixes[guildID];
        fs.writeFile('./assets/prefixes.json', JSON.stringify(prefixes), (err) => {
          if (err) console.log(err);
        });
        return message.channel.send("Reseted to default prefix!");
      }
      if (!args[1] || args[1].length > 1) return message.channel.send("Please input one length of custom prefix.");
      else {
        prefixes[guildID] = args[1];
        fs.writeFile('./assets/prefixes.json', JSON.stringify(prefixes), (err) => {
          if (err) console.log(err);
        });
        message.channel.send(`Changed my prefix in this guild to \`${args[1]}\``);
      }
      break;
      // DEFAULT VALUE
    default:
      message.channel.send("Invalid Parameters!");
  }
};

exports.conf = {
  aliases: [],
  cooldown: 1
};

exports.help = {
  name: "set",
  category: "Administrator",
  description: "Configure your server.",
  usage: "set -<param>",
  param: parameters,
  aliases: ""
};