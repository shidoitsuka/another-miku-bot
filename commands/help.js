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
          .addField("Description:", "`<this-is-required>` `[this-is-optional]`\nUse \`NSFW Channel\` to see available NSFW commands.", true)
          .addField("Administrator", "`purge` `setwelcome`", true)
          .addField("Fun", "`8ball` `anime` `batslap` `bigtext` `bulge` `brain` `catnames` `changemymind` `chat` `cuddle` `dognames` `f` `flip` `goodboi`\
  `hug` `kiss` `lenny` `lennyd` `lewd` `match` `miku` `myheart` `omg` `owo` `pat` `poke` `ratewaifu` `say` `slap` `suggest`\
  `thonk` `tickle` `tts` `which` `yandere` `yesno`", true)
          .addField("Miscellaneous", "`afk` `gfycat` `google` `indicator` `math` `quotes` `short` `showcode` `urban`", true)
          .addField("Utility", "`about` `avatar` `canvas` `color` `help` `ping` `tag`", true)
          .setFooter("Use help <command name> for advanced help. (Including usage, aliases, etc.)")
          .setThumbnail("https://tinyurl.com/MikuHelp");
        message.channel.send({
          embed
        });
      }
    } // END if no arguments a.k.a show all commands
    else {
      let cmd = args[0];
      let find;
      if (bot.commands.has(cmd)) find = bot.commands.get(cmd);
      else if (bot.aliases.has(cmd)) find = bot.commands.get(bot.aliases.get(cmd));
      let cmdName = find.help;
      let cdDura = find.conf.cooldown;
      message.channel.send(`==== ==== Advanced Help ==== ====\n\nCommand      :: ${cmdName.name}\nCategory     :: ${cmdName.category}\nDescription  :: ${cmdName.description}\nUsage        :: ${cmdName.usage}\nParameter(s) :: ${cmdName.param}\nAliases      :: ${cmdName.aliases}\nCooldown     :: ${cdDura} second${cdDura == 1 ? "" : "(s)"}\n\n=================================`, {
        code: 'asciidoc'
      });
    }
  } // END TRY
  catch (err) { // BEGIN CATCH
    const idk = [
      `I cannot find **${args[0]}** in me (UωU)`,
      `**${args[0]}** is not a command, nor aliases! (QωQ)`,
      `Please run _xhelp_ for available commands, **${message.author.username}** (OωO)`,
    ].random();
    const embed = new Discord.RichEmbed()
      .setAuthor("Not found!")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(idk);
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
  category: "Utility",
  description: "Displays all available commands.",
  usage: "help [param]",
  param: "",
  aliases: "h, halp"
};