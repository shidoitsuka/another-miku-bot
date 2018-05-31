const Discord = require('discord.js');
const config = require('../config.json');
const bot = new Discord.Client();

exports.run = (bot, message, args) => {
  try { // BEGIN TRY
    // BEGIN if no arguments a.k.a show all commands
    if (!args[0]) {
      message.channel.send("This command is under maintenance.");
    } // END if no arguments a.k.a show all commands
    else { // BEGIND individual commands
      let cmdName = require(`./${args[0]}.js`).help;
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Help")
        .setColor(0x0776b7)
        .setDescription(`**Command**  : ${cmdName.name}\n**Category**  : ${cmdName.category}\n**Description**  : ${cmdName.description}\n**Usage**  : ${cmdName.usage}\n**Parameters**  : ${cmdName.param}\n**Aliases**  : ${cmdName.aliases}`)
        .setThumbnail("https://tinyurl.com/MikuHelp");
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
      .setDescription(`Something went wrong!\n**Error**  : \nTry using \`command name\` instead of aliases.`);
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
  usage: "help \`<command>\`",
  param: "\`<command>\` is optional.",
  aliases: "h, halp"
};