const Discord = require('discord.js');
const config = require('../config.json');
const bot = new Discord.Client();

exports.run = (bot, message, args) => {
  try { // BEGIN TRY
    // BEGIN if no arguments a.k.a show all commands
    if (!args[0]) {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Help", "https://tinyurl.com/MikuLogo")
        .setColor(0x0776b7)
        .addField("Administrator", "`purge`", true)
        .addField("Fun", "`8ball` `bigtext` `catnames` `chat` `cuddle` `dognames` `f` `flip` `goodboi`\
 `hug` `kiss` `lenny` `lennyd` `lewd` `miku` `myheart` `omg` `owo` `pat` `poke` `ratewaifu` `say` `slap`\
 `thonk` `tickle` `tts` `which` `yandere`", true)
        .addField("Miscellaneous", "`gfycat` `google` `indicator` `math` `quotes` `showcode` `urban`", true)
        .addField("Utility", "`about` `avatar` `ping`", true)
        .setFooter("Use help <command name> for advanced help. (Including usage, aliases, etc.)")
        .setThumbnail("https://tinyurl.com/MikuHelp");
      message.channel.send({
        embed
      });
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
  category: "Util.",
  description: "Displays all available commands.",
  usage: "help \`<command>\`",
  param: "\`<command>\` is optional.",
  aliases: "h, halp"
};