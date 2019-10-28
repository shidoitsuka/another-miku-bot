const Discord = require("discord.js");
const dogname = require("dog-names");

exports.run = (bot, message, args) => {
  let name;
  if (!args[0]) name = dogname.allRandom();
  else if (args[0] == "-m") name = dogname.maleRandom();
  else if (args[0] == "-f") name = dogname.femaleRandom();
  else
    return message.channel
      .send("`Invalid argument(s).`")
      .then(r => r.delete(3000));
  const emoji = [
    "OwO",
    "( 0w0)-b",
    "😁",
    "😌",
    "😳",
    "🐶",
    "😆",
    "👌",
    "😙"
  ].random();
  const embed = new Discord.RichEmbed()
    .setAuthor(
      `Miku -- Dog Names ${
        !args[0] ? "" : args[0] == "-f" ? "(F)" : args[0] == "-m" ? "(M)" : ""
      }`
    )
    .setColor(0x1a9ca8)
    .setDescription(`If you were my dog, I\'d name you **${name}**!${emoji}`)
    .setFooter("dog-names (npm)");
  message.channel.send({ embed });
};

exports.conf = {
  aliases: ["dogname"],
  cooldown: 4,
  guildOnly: false
};

exports.help = {
  name: "dognames",
  category: "Fun",
  description: "What's your name if you were born as a dog!?",
  usage: "dognames [param]",
  param: "`-f  :  female\n-m  :  male",
  aliases: "dogname"
};
