const Discord = require('discord.js');
const fs = require('fs');
const parameters = [
  "\n-add <tagKey> <tagContent>      : add a new tag.",
  "-remove <tagKey>                : remove a tag.",
  "-override <tagKey> <tagContent> : force edit existing tag.",
].join("\n");

exports.run = (bot, message, args) => {
  let tagFile = JSON.parse(fs.readFileSync("./assets/tag.json", "utf8"));
  if (!args[0]) {
    try {
      const tagKeysInGuild = Object.keys(tagFile[message.guild.id]);
      if (tagKeysInGuild.length == 0) throw Error();
      const embed = new Discord.RichEmbed().setAuthor("Available Tags").setColor(0xf5ab35)
        .setDescription(`\`\`\`${tagKeysInGuild}\`\`\``);
      return message.channel.send({
        embed
      });
    } catch (e) {
      return message.channel.send("❌ | This guild does not have any tags!");
    }
  }
  switch (args[0]) {
    case "-add":
      args.shift(); // -add no longer args[0]
      const tagKey = args[0]; // args[1] is args[0]
      try {
        if (tagKey in tagFile[message.guild.id]) return message.channel.send(`❌ | **${tagKey}** already exist.\nUse \`-override\` instead.`);
      } catch (e) {}
      if (!tagKey) return message.channel.send("❌ | Please provide the tag\'s name.");
      args.shift(); // tagKey does not exist anymore
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      const tagContent = args.join(" ");
      if (!tagFile[message.guild.id]) {
        tagFile[message.guild.id] = {
          [tagKey]: tagContent
        };
      } else {
        tagFile[message.guild.id][tagKey] = tagContent;
      }
      fs.writeFileSync('./assets/tag.json', JSON.stringify(tagFile), (err) => {
        if (err) console.log(err);
      });
      return message.channel.send(`✅ | Added **${tagKey}**!`);
      break;
    case "-override":
      args.shift();
      const tagKeyO = args[0];
      if (!tagKeyO) return message.channel.send("❌ | Please provide the tag\'s name.");
      args.shift();
      if (!args[0]) return message.channel.send("❌ | Invalid tag content.");
      const tagContentO = args.join(" ");
      if (!tagFile[message.guild.id]) {
        tagFile[message.guild.id] = {
          [tagKeyO]: tagContentO
        };
      } else {
        tagFile[message.guild.id][tagKeyO] = tagContentO;
      }
      fs.writeFileSync('./assets/tag.json', JSON.stringify(tagFile), (err) => {
        if (err) console.log(err);
      });
      return message.channel.send(`✅ | Modified **${tagKeyO}**!`);
      break;
    case "-remove":
      args.shift();
      const tagKeyR = args[0];
      const byPass = tagKeyR in tagFile[message.guild.id];
      try {
        if (!byPass) throw Error();
        delete tagFile[message.guild.id][tagKeyR];
        fs.writeFileSync('./assets/tag.json', JSON.stringify(tagFile), (err) => {
          if (err) console.log(err);
        });
        return message.channel.send(`✅ | Removed **${tagKeyR}**!`);
      } catch (e) {
        return message.channel.send(`❌ | **${tagKeyR}** not found!`);
      }
      break;
  } // switch
  const tagKeyS = args[0];
  try {
    if (args[0] in tagFile[message.guild.id] == false) throw Error();
    return message.channel.send(tagFile[message.guild.id][tagKeyS]);
  } catch (e) {
    return message.channel.send(`❌ | **${tagKeyS}** does not exists.`);
  }
};

exports.conf = {
  aliases: ["tags"],
  cooldown: 1.5
};

exports.help = {
  name: "tag",
  category: "Utility",
  description: "",
  usage: "tag <tag-name>",
  param: parameters,
  aliases: "tags"
};