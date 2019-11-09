const fs = require("fs");
const parameters = [
  "\n-prefix     : set guild's custom prefix. (use \"default\" to use miku's default prefix)",
  '-welcome    : set guild\'s greeting channel. (use "off" to turn off the feature)'
].join("\n");

exports.run = (bot, message, args) => {
  // DB_FILES
  let welcomes = JSON.parse(fs.readFileSync("./assets/welcome.json", "utf8"));
  let prefixes = JSON.parse(fs.readFileSync("./assets/prefixes.json", "utf8"));
  let star = JSON.parse(fs.readFileSync("./assets/g.json", "utf8"));
  // VARIABLES
  let channelID = message.channel.id,
    guildID = message.guild.id,
    welcomeChannel;

  if (guildID in welcomes)
    welcomeChannel = bot.channels.get(welcomes[guildID]).name;
  else welcomeChannel = "not specified";

  if (!args[0])
    return message.channel.send(
      `prefix          :: ${prefixes[guildID]}
welcome-channel :: #${welcomeChannel} (${
        welcomes[guildID] == undefined ? "" : welcomes[guildID]
      })`,
      { code: "asciidoc" }
    );

  // SWITCH
  switch (args[0]) {
    case "-greet":
    case "-greeting":
    case "-welcome":
      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send("You don't have permission to run this!");
      if (!args[1])
        return message.channel.send("Please mention a channel for me!");
      if (args[1].toLowerCase() == "off") {
        delete welcomes[guildID];
        // writeFile("./assets/welcome.json", welcomes);
        fs.writeFile("./assets/welcome.json", JSON.stringify(welcomes), err => {
          if (err) console.error(err);
        });
        message.channel.send("Turned off greeting!");
      } else {
        if (!message.mentions.channels.first())
          return message.channel.send("Please mention a channel for me!");
        welcomes[guildID] = message.mentions.channels.first().id;
        // writeFile("./assets/welcome.json", welcomes);
        fs.writeFile("./assets/welcome.json", JSON.stringify(welcomes), err => {
          if (err) console.error(err);
        });
        message.channel.send("Aight, I've set the greeting channel!");
      }
      break;
    case "-p":
    case "-pref":
    case "-prefix":
      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send("You don't have permission to run this!");
      if (!args[1] || args[1].length > 1)
        return message.channel.send(
          "Please input one length of custom prefix."
        );
      if (args[1].toLowerCase() == "default" || args[1] == "x") {
        delete prefixes[guildID];
        fs.writeFile(
          "./assets/prefixes.json",
          JSON.stringify(prefixes),
          err => {
            if (err) console.error(err);
          }
        );
        return message.channel.send("Reseted to default prefix!");
      } else {
        prefixes[guildID] = args[1];
        fs.writeFile(
          "./assets/prefixes.json",
          JSON.stringify(prefixes),
          err => {
            if (err) console.error(err);
          }
        );
        message.channel.send(
          `Changed my prefix in this guild to \`${args[1]}\``
        );
      }
      break;
    case "-star":
      if (!message.member.permissions.has("MANAGE_GUILD"))
        return message.channel.send("You don't have permission to run this!");
      if (args[1] == "off") {
        delete star[guildID];
        fs.writeFile("./assets/g.json", JSON.stringify(star), err => {
          if (err) console.error(err);
        });
        return message.channel.send("Turned off star system!");
      }
      const channel = message.mentions.channels.first();
      if (!channel) return message.channel.send("No channel selected!");
      star[guildID] = channel.id;
      fs.writeFile("./assets/g.json", JSON.stringify(star), err => {
        if (err) console.error(err);
      });
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
  description: "Configure your server.",
  usage: "set -<param>",
  param: parameters,
  aliases: ""
};
