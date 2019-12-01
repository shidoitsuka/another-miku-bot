const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

const answers = [
  "Try again later (〜￣▽￣)〜",
  "I-i don't know (UwU)",
  // positives
  "Yessu!",
  "Of course! OwO)-b",
  "Seems like a yes `(OwO)`",
  "Errr yes, probably?",
  // negatives
  "No",
  "Nyuu, Baka! >w<",
  "Don't count on it ƪ(˘⌣˘)ʃ",
  "I haven't been programmed to know that yet (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
];

exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      ":question::question::question::question::question:"
    );
  const ebans = answers.random();
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Magic 8ball", "", `${eightball.url}`)
    .setColor(0x1a9ca8);
  if (args[0] == "-i") {
    const eightball = await neko.sfw["8Ball"]();
    embed
      .setDescription(eightball.response)
      .setImage(`${eightball.url}`)
      .setFooter("Image by nekos.life");
    message.channel.send({ embed });
  } else {
    embed.setDescription(ebans);
    message.channel.send({ embed });
  }
};

exports.conf = {
  aliases: ["8b"],
  cooldown: 3,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "Ask magic 8ball!",
  usage: "8ball [param] <question>",
  param: "-i  :  use nekos.life API"
};
