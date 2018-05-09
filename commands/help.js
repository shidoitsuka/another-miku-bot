const Discord = require('discord.js');
const config = require('../config.json');
const bot = new Discord.Client();
exports.run = function(bot, message, args) {
  /**
   * To separate command and arguments
   * <config>example help
   * output=
   * command : example
   * argument : help
   **/
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var command = args.shift().toLowerCase();
  try { // BEGIN TRY
    // BEGIN if no arguments a.k.a show all commands
    if (!args[0]) {
      message.channel.send("Command list is not yet available.");
    } // END if no arguments a.k.a show all commands
    else { // BEGIND individual commands
      let cmdName = require(`./${args[0]}.js`).help;
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Help")
        .setColor(0x0776b7)
        .setDescription(`**Command**  : ${cmdName.name}\n**Category**  : ${cmdName.category}\n**Description**  : ${cmdName.description}\n**Usage**  : ${cmdName.usage}`)
        .setThumbnail("https://tinyurl.com/MikuHelp")
        .setFooter("© 12042#5754", "https://tinyurl.com/MikuLogo");
      message.channel.send({
        embed
      });
    } // END individual commands
  } // END TRY
  catch (err) { // BEGIN CATCH
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Error")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(`Something went wrong!\n**Error**  : \n${err.name} ${err.message}`)
      .setFooter("© 12042#5754");
    message.channel.send({
      embed
    });
  } // END CATCH
};

exports.conf = {
  aliases: ["h", "halp"]
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all available commands.",
  usage: "help \`<command>\`"
};