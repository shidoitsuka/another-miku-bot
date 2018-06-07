const Discord = require('discord.js');
const urban = require('relevant-urban');

exports.run = async (bot, message, args) => {
  let dictionary;
  const pending = await message.channel.send(":mag:**Searching...**");
  if (!args[0]) {
    dictionary = await urban.random();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Urban Dictionary", "", dictionary.urbanURL)
      .setThumbnail("https://tinyurl.com/y95f3ztk")
      .setColor(0x795548)
      .addField("Word  :", dictionary.word, true)
      .addField("Author  :", dictionary.author, true)
      .addField("Definition  :", dictionary.definition, false)
      .setFooter("urban | click title for more info.");
    pending.edit({
      embed
    });
  }
  if (args[0]) {
    try {
      dictionary = await urban(args.join(" "));
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Urban Dictionary", "", dictionary.urbanURL)
        .setThumbnail("https://tinyurl.com/y95f3ztk")
        .setColor(0x795548)
        .addField("Word  :", dictionary.word, true)
        .addField("Author  :", dictionary.author, true)
        .addField("Definition  :", dictionary.definition, false)
        .setFooter("urban | click title for more info.");
      pending.edit({
        embed
      });
    } catch (err) {
      pending.edit(`❌ | Couldn\'t find **${args.join(" ")}**.`);
    }
  }
};
exports.conf = {
  aliases: ["define"]
};

exports.help = {
  name: "urban",
  category: "Fun",
  description: "Define Your World.",
  usage: "urban \`<search query>\`",
  param: "",
  aliases: "define"
};