const Discord = require('discord.js');
const bot = new Discord.Client();

exports.run = (bot, message, args) => {
  try { // BEGIN TRY
    // BEGIN if no arguments a.k.a show all commands
    if (!args[0]) {
      if (message.channel.nsfw) {
        const embed = new Discord.RichEmbed()
          .setAuthor("Miku -- Help", "https://tinyurl.com/MikuLogo")
          .setColor(0x0776b7)
          .addField("Description:", "`<this-is-required>` `[this-is-optional]`\nYou cannot use aliases to get advanced help about command. Instead, use the command name itself", true)
          .addField("NSFW:", "`nsfwanal` `nsfwcumslut` `nsfwneko` `nsfwnekogif` `nsfwoppai` `nsfwpussy` `nsfwrandom`")
          .setFooter("Use help <command name> for advanced help. (Including usage, aliases, etc.)")
          .setThumbnail("https://tinyurl.com/MikuHelp");
        message.channel.send({
          embed
        });
      } else {
        const embed = new Discord.RichEmbed()
          .setAuthor("Miku -- Help", "https://tinyurl.com/MikuLogo")
          .setColor(0x0776b7)
          .addField("Description:", "`<this-is-required>` `[this-is-optional]`\nYou cannot use aliases to get advanced help about command. Instead, use the command name itself", true)
          .addField("Administrator", "`purge`", true)
          .addField("Fun", "`8ball` `batslap` `bigtext` `bulge` `brain` `catnames` `changemymind` `chat` `cuddle` `dognames` `f` `flip` `goodboi`\
        `hug` `kiss` `lenny` `lennyd` `lewd` `match` `miku` `myheart` `omg` `owo` `pat` `poke` `ratewaifu` `say` `slap` `suggest`\
        `thonk` `tickle` `tts` `which` `yandere`", true)
          .addField("Miscellaneous", "`gfycat` `google` `indicator` `math` `quotes` `showcode` `urban`", true)
          .addField("Utility", "`about` `avatar` `canvas` `color` `help` `ping` `tag`", true)
          .setFooter("Use help <command name> for advanced help. (Including usage, aliases, etc.)")
          .setThumbnail("https://tinyurl.com/MikuHelp");
        message.channel.send({
          embed
        });
      }
    } // END if no arguments a.k.a show all commands
    else {
      let cmdName = require(`./${args[0]}.js`).help;
      let cdDura = require(`./${args[0]}.js`).conf.cooldown;
      message.channel.send(`\`\`\`\nCommand      : ${cmdName.name}\nCategory     : ${cmdName.category}\nDescription  : ${cmdName.description}\nUsage        : ${cmdName.usage}\nParameter(s) : ${cmdName.param}\nAliases      : ${cmdName.aliases}\nCooldown     : ${cdDura} second${cdDura == 1 ? "" : "(s)"}\n\`\`\``);
    }
  } // END TRY
  catch (err) { // BEGIN CATCH
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Error")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(`Cannot find  : \`${args.join(" ")}\``);
    message.channel.send({
      embed
    });
  } // END CATCH
};

exports.conf = {
  aliases: ["h", "halp"],
  cooldown: 3
};

exports.help = {
  name: "help",
  category: "Util.",
  description: "Displays all available commands.",
  usage: "help [param]",
  param: "",
  aliases: "h, halp"
};