const Discord = require("discord.js");
const dogname = require("dog-names");
const texts = require("../../modules/texts.js");

exports.run = (bot, message, args) => {
  let name;
  if (!args[0]) name = dogname.allRandom();
  else if (args[0] == "-m") name = dogname.maleRandom();
  else if (args[0] == "-f") name = dogname.femaleRandom();
  // prettier-ignore
  else return message.channel.send("`Invalid argument(s).`").then(r => r.delete(3000));
  // prettier-ignore
  const embed = new Discord.MessageEmbed()
    .setAuthor(`Miku -- Dog Names ${!args[0] ? "" : args[0] == "-f" ? "(F)" : args[0] == "-m" ? "(M)" : ""}`)
    .setColor(0x1a9ca8)
    .setDescription(`If you were my dog, I\'d name you **${name}**!${texts.CatDogNameEmojis()}`)
    .setFooter("dog-names");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["dogname"],
  cooldown: 4,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "dognames",
  category: "Fun",
  description: "What is your name if you were born as a dog?",
  usage: "dognames [param]",
  param: "`-f  :  female\n-m  :  male"
};
