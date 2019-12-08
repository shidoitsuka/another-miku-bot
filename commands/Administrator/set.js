const fs = require("fs");
const parameters = [
  "\n-prefix     : set guild's custom prefix. (use \"default\" to use miku's default prefix)",
  '-welcome    : set guild\'s greeting channel. (use "off" to turn off the feature)'
].join("\n");

exports.run = (bot, message, args) => {
  // DB_FILES
  let DB = readFile("./assets/guildDB");

  // VARIABLES
  // prettier-ignore
  let channelID = message.channel.id, guildID = message.guild.id, greetingChannel, starChannel;
  // prettier-ignore
  DB[guildID].greetingChannel == "" ? (greetingChannel = "not specified") : (greetingChannel = bot.channels.get(DB[guildID].greetingChannel).name);
  // prettier-ignore
  DB[guildID].star.starChannel == "" ? (starChannel = "not specified") : (starChannel = bot.channels.get(DB[guildID].star.starChannel).name);

  // prettier-ignore
  if (!args[0]) return message.channel.send(`prefix          :: ${DB[guildID].prefix}
welcome-channel :: ${greetingChannel}
star            :: ${starChannel}`,
      { code: "asciidoc" }
    );

  // SWITCH
  switch (args[0]) {
    // welcome
    case "-greet":
    case "-greeting":
    case "-welcome":
      // if no channel is mentioned
      // prettier-ignore
      if (!args[1]) return message.channel.send("Please mention a channel for me!");
      // parameter to turn off greeting system
      if (args[1].toLowerCase() == "off") {
        DB[guildID].greetingChannel = "";
        writeFile("./assets/guildDB", DB);
        message.channel.send("Turned off greeting!");
      } else {
        // prettier-ignore
        if (!message.mentions.channels.first()) return message.channel.send("Please mention a channel for me!");
        DB[guildID].greetingChannel = message.mentions.channels.first().id;
        writeFile("./assets/guildDB", DB);
        message.channel.send("Aight, I've set the greeting channel!");
      }
      break;
    // prefix
    case "-p":
    case "-pref":
    case "-prefix":
      // parameter to use default prefix
      if (args[1].toLowerCase() == "default") {
        DB[guildID].prefix = "q";
        writeFile("./assets/guildDB", DB);
        message.channel.send("Reseted to default prefix!");
      } else {
        // prettier-ignore
        if (!args[1] || args[1].length > 1) return message.channel.send("Please input one length of custom prefix.");
        DB[guildID].prefix = args[1];
        writeFile("./assets/guildDB", DB);
        // prettier-ignore
        message.channel.send(`Changed my prefix in this guild to \`${args[1]}\``);
      }
      break;
    // starboard
    case "-star":
      // parameter to turn off starboard system
      if (args[1] == "off") {
        DB[guildID].star.starChannel = "";
        writeFile("./assets/guildDB", DB);
        return message.channel.send("Turned off star system!");
      }
      const channel = message.mentions.channels.first();
      if (!channel) return message.channel.send("No channel selected!");
      DB[guildID].star.starChannel = channel.id;
      writeFile("./assets/guildDB", DB);
      message.channel.send(`I\'ve set \`#${channel.name}\` as star channel!`);
      break;
    // DEFAULT VALUE
    default:
      message.channel.send("Invalid Parameter(s)!");
  }
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: true,
  userPerm: ["MANAGE_GUILD"],
  botPerm: [""]
};

exports.help = {
  name: "set",
  category: "Administrator",
  description: "Guild configuration",
  usage: "set -<param>",
  param: parameters
};
