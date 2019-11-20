const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  embed.setAuthor("Miku");
  embed.setColor(0x1a9ca8);
  embed.setImage("https://preview.ibb.co/ha8SzS/ohfuck.jpg");
  if (!message.mentions.users.size)
    embed.setDescription(
      `Seems like **${message.author.username}** is thinking too much.`
    );
  else
    embed.setDescription(
      `Seems like **${
        message.mentions.users.first().username
      }** is thinking too much.`
    );
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["think", "thnk"],
  cooldown: 2,
  guildOnly: false
};

exports.help = {
  name: "thonk",
  category: "Fun",
  description: "DID YOU JUST THONKING ABOUT SOMETHING!?",
  usage: "thonk",
  param: "",
  aliases: "think, thnk"
};
