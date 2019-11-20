const fs = require("fs");
const parameters = [
  "\n-prefix     : set guild's custom prefix. (use \"default\" to use miku's default prefix)",
  '-welcome    : set guild\'s greeting channel. (use "off" to turn off the feature)'
].join("\n");

exports.run = (bot, message, args) => {
  // DB_FILES
  let DB = readFile("./assets/guildDB");
  // VARIABLES
  let channelID = message.channel.id,
    guildID = message.guild.id,
    greetingChannel,
    starChannel;

  DB[guildID].greetingChannel == ""
    ? (greetingChannel = "not specified")
    : (greetingChannel = bot.channels.get(DB[guildID].greetingChannel).name);
  DB[guildID].star.starChannel == ""
    ? (starChannel = "not specified")
    : (starChannel = bot.channels.get(DB[guildID].star.starChannel).name);

  if (!args[0])
    return message.channel.send(
      `prefix          :: ${DB[guildID].prefix}
welcome-channel :: ${greetingChannel}
star            :: ${starChannel}`,
      { code: "asciidoc" }
    );

  // SWITCH
  switch (args[0]) {
    case "-greet":
    case "-greeting":
    case "-welcome":
      if (!args[1])
        return message.channel.send("Please mention a channel for me!");
      if (args[1].toLowerCase() == "off") {
        DB[guildID].greetingChannel = "";
        writeFile("./assets/guildDB", DB);
        message.channel.send("Turned off greeting!");
      } else {
        if (!message.mentions.channels.first())
          return message.channel.send("Please mention a channel for me!");
        DB[guildID].greetingChannel = message.mentions.channels.first().id;
        writeFile("./assets/guildDB", DB);
        message.channel.send("Aight, I've set the greeting channel!");
      }
      break;
    case "-p":
    case "-pref":
    case "-prefix":
      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send("You don't have permission to run this!");
      if (args[1].toLowerCase() == "default") {
        DB[guildID].prefix = "q";
        writeFile("./assets/guildDB", DB);
        message.channel.send("Reseted to default prefix!");
      } else {
        if (!args[1] || args[1].length > 1)
          return message.channel.send(
            "Please input one length of custom prefix."
          );
        DB[guildID].prefix = args[1];
        writeFile("./assets/guildDB", DB);
        message.channel.send(
          `Changed my prefix in this guild to \`${args[1]}\``
        );
      }
      break;
    case "-star":
      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send("You don't have permission to run this!");
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
  guildOnly: true
};

exports.help = {
  name: "set",
  category: "Administrator",
  description: "Guild configuration",
  usage: "set -<param>",
  param: parameters,
  aliases: ""
};
