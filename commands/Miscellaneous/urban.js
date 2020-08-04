const Discord = require("discord.js");
const urban = require("relevant-urban");

exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setThumbnail("https://tinyurl.com/y95f3ztk")
    .setColor(0x795548)
    .setFooter("urban | click title for more info.");
  let dictionary;
  const pending = await message.channel.send(":mag:**Searching...**");
  if (!args[0]) {
    dictionary = await urban.random();
    embed
      .setAuthor("Urban Dictionary", "", dictionary.urbanURL)
      .addField("Word  :", dictionary.word, true)
      .addField("Author  :", dictionary.author, true)
      .addField("Definition  :", dictionary.definition, false);
    pending.delete();
    message.channel.send({ embed });
  }
  if (args[0]) {
    try {
      dictionary = await urban(args.join(" "));
      embed
        .setAuthor("Miku -- Urban Dictionary", "", dictionary.urbanURL)
        .addField("Word  :", dictionary.word, true)
        .addField("Author  :", dictionary.author, true)
        .addField("Definition  :", dictionary.definition, false);
      pending.delete();
      message.channel.send({ embed });
    } catch (err) {
      pending.edit(`❌ | Couldn\'t find **${args.join(" ")}**.`);
    }
  }
};
exports.conf = {
  aliases: ["define"],
  cooldown: 3,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "urban",
  category: "Miscellaneous",
  description: "Define Your World.",
  usage: "urban [search-query]",
  param: ""
};
