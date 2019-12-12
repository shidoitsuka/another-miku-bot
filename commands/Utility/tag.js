const Discord = require("discord.js");
const fs = require("fs");
const parameters = [
  "\n-add <tagKey> <tagContent>      : add a new tag.",
  "-remove <tagKey>                : remove a tag.",
  "-override <tagKey> <tagContent> : force edit existing tag."
].join("\n");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  // prettier-ignore
  let guildID = message.guild.id, availableTag, tagKey, tagContent;
  if (!args[0]) {
    // prettier-ignore
    if (Object.keys(bot.db.get("guildConf", `${message.guild.id}.tags`)).length == 0) return message.channel.send("❌ | This guild does not have any tags!");
    // prettier-ignore
    availableTag = Object.keys(bot.db.get("guildConf", `${message.guild.id}.tags`)).join(", ");
    embed
      .setAuthor("Available Tags")
      .setColor(0xf5ab35)
      .setDescription(`\`\`\`${availableTag}\`\`\``);
    return message.channel.send({ embed });
  }

  switch (args[0]) {
    case "-add":
      args.shift();
      tagKey = args[0];
      // prettier-ignore
      if (bot.db.has("guildConf", `${message.guild.id}.tags.${tagKey}`)) return message.channel.send(`❌ | **${tagKey}** already exist.\nUse \`-override\` instead.`);
      // prettier-ignore
      if (!tagKey) return message.channel.send("❌ | Please provide the tag's name.");
      args.shift();
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      tagContent = args.join(" ");
      bot.db.set("guildConf", tagContent, `${message.guild.id}.tags.${tagKey}`);
      return message.channel.send(`✅ | Added **${tagKey}**!`);
      break;
    case "-override":
    case "-over":
    case "-ov":
      args.shift();
      tagKey = args[0];
      // prettier-ignore
      if (!tagKey) return message.channel.send("❌ | Please provide the tag's name.");
      args.shift();
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      tagContent = args.join(" ");
      bot.db.set("guildConf", tagContent, `${message.guild.id}.tags.${tagKey}`);
      return message.channel.send(`✅ | Modified **${tagKey}**!`);
      break;
    case "-remove":
    case "-rm":
    case "-delete":
    case "-del":
      args.shift();
      tagKey = args[0];
      // prettier-ignore
      if (!args[0]) return message.channel.send("❌ | Please provide the tag's name.");
      // prettier-ignore
      if (!bot.db.has("guildConf", `${message.guild.id}.tags.${tagKey}`)) return message.channel.send(`❌ | **${tagKey}** not found!`);
      bot.db.deleteProp("guildConf", `${message.guild.id}.tags.${tagKey}`);
      return message.channel.send(`✅ | Removed **${tagKey}**!`);
      break;
    default:
  }

  tagKey = args[0];
  tagContent = bot.db.get("guildConf", `${message.guild.id}.tags.${tagKey}`);
  // prettier-ignore
  if (tagContent == undefined) return message.channel.send(`❌ | **${tagKey}** does not exists in this guild.`);
  message.channel.send(tagContent);
};

exports.conf = {
  aliases: ["tags"],
  cooldown: 1.5,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "tag",
  category: "Utility",
  description: "",
  usage: "tag <tag-name>",
  param: parameters
};
