const Discord = require("discord.js");
const fs = require("fs");
const parameters = [
  "\n-add <tagKey> <tagContent>      : add a new tag.",
  "-remove <tagKey>                : remove a tag.",
  "-override <tagKey> <tagContent> : force edit existing tag."
].join("\n");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  let DB = readFile("./assets/guildDB");
  let guildID = message.guild.id,
    availableTag,
    tagKey,
    tagContent;
  if (!args[0]) {
    if (Object.keys(DB[guildID].tag).length == 0)
      return message.channel.send("❌ | This guild does not have any tags!");
    availableTag = Object.keys(DB[guildID].tag).join(", ");
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
      if (tagKey in DB[guildID].tag)
        return message.channel.send(
          `❌ | **${tagKey}** already exist.\nUse \`-override\` instead.`
        );
      if (!tagKey)
        return message.channel.send("❌ | Please provide the tag's name.");
      args.shift();
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      tagContent = args.join(" ");
      DB[guildID].tag[tagKey] = tagContent;
      writeFile("./assets/guildDB", DB);
      return message.channel.send(`✅ | Added **${tagKey}**!`);
      break;
    case "-override":
    case "-over":
    case "-ov":
      args.shift();
      tagKey = args[0];
      if (!tagKey)
        return message.channel.send("❌ | Please provide the tag's name.");
      args.shift();
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      tagContent = args.join(" ");
      DB[guildID].tag[tagKey] = tagContent;
      writeFile("./assets/guildDB", DB);
      return message.channel.send(`✅ | Modified **${tagKey}**!`);
      break;
    case "-remove":
    case "-rm":
    case "-delete":
    case "-del":
      args.shift();
      tagKey = args[0];
      if (!args[0])
        return message.channel.send("❌ | Please provide the tag's name.");
      if (!(tagKey in DB[guildID].tag))
        return message.channel.send(`❌ | **${tagKey}** not found!`);
      delete DB[guildID].tag[tagKey];
      writeFile("./assets/guildDB", DB);
      return message.channel.send(`✅ | Removed **${tagKey}**!`);
      break;
    default:
  }

  tagKey = args[0];
  try {
    if (!(args[0] in DB[guildID].tag)) throw Error();
    return message.channel.send(DB[guildID].tag[tagKey]);
  } catch (e) {
    return message.channel.send(
      `❌ | **${tagKey}** does not exists in this guild.`
    );
  }
};

exports.conf = {
  aliases: ["tags"],
  cooldown: 1.5,
  guildOnly: true
};

exports.help = {
  name: "tag",
  category: "Utility",
  description: "",
  usage: "tag <tag-name>",
  param: parameters,
  aliases: "tags"
};
