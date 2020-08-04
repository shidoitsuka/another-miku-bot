const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");

exports.run = (bot, message, args, prefix) => {
  const embed = new Discord.MessageEmbed();
  // variables
  const subFolders = fs
    .readdirSync("./commands/")
    .filter(folders => folders != "Owner" && folders != "NSFW");
  let commands = {};
  try {
    // prettier-ignore
    embed.setAuthor("Miku -- Help", "http://tinyurl.com/ybabktzo")
    .setColor(0x0776b7)
    .setFooter(`Use ${prefix}help <command name> for advanced help. (Including usage, aliases, etc.)`);
    // all commands
    if (!args[0]) {
      if (message.channel.nsfw) {
        // prettier-ignore
        const nsfw = fs.readdirSync("./commands/NSFW").map(files => files.replace(".js", ""));
        embed.addField("__**NSFW**__", nsfw.join(", "), true);
        message.channel.send({ embed });
      } else {
        subFolders.forEach(folders => {
          commands[folders] = [];
          // prettier-ignore
          fs.readdirSync(`./commands/${folders}/`).filter(files => files.endsWith(".js")).map(files => files.replace(".js", "")).map(files => commands[folders].push(files) );
        });
        for (var i = 0; i < Object.keys(commands).length; i++) {
          // prettier-ignore
          embed.addField(`__**${Object.keys(commands)[i]}**__`, commands[Object.keys(commands)[i]].join(", "), false);
        }
        // prettier-ignore
        embed.setDescription(`Usage: \`${prefix}command\`\nDescription: \`<this-is-required>\` \`[this-is-optional]\`\nPlease use NSFW channel to see available NSFW command(s).`);
        message.channel.send({ embed });
      }
    } else {
      // advanced help
      let cmd = args[0];
      let find;
      if (bot.commands.has(cmd)) find = bot.commands.get(cmd);
      // prettier-ignore
      else if (bot.aliases.has(cmd)) find = bot.commands.get(bot.aliases.get(cmd));
      let cmdName = find.help;
      let cmdConf = find.conf;
      // prettier-ignore
      message.channel.send(`==== ==== Advanced Help ==== ====\n\nCommand      :: ${cmdName.name}\nCategory     :: ${cmdName.category}\nDescription  :: ${cmdName.description}\nUsage        :: ${cmdName.usage}\nParameter(s) :: ${cmdName.param}\nAliases      :: ${cmdConf.aliases.length == 0 ? "" : cmdConf.aliases.join(", ")}\nCooldown     :: ${cmdConf.cooldown} second${cmdConf.cooldown == 1 ? "" : "(s)"}\nguildOnly    :: ${cmdConf.guildOnly}\n\n=================================`,
        { code: "asciidoc" });
    }
  } catch (e) {
    // END TRY
    const idk = [
      `I cannot find **${args[0]}** in me (UωU)`,
      `**${args[0]}** is not a command, nor aliases! (QωQ)`,
      `Please run __${prefix}help__ for available commands, **${message.author.username}** (OωO)`
    ].random();
    const embed = new Discord.MessageEmbed()
      .setAuthor("Not found!")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(idk);
    message.channel.send({ embed });
  } // END CATCH
};

exports.conf = {
  aliases: ["h", "halp"],
  cooldown: 0.1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "help",
  category: "Utility",
  description: "Displays all available commands.",
  usage: "help [param]",
  param: ""
};
