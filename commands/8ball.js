const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
const answers = ["Try again later (〜￣▽￣)〜",
  "I-i don't know (UwU)",
  // positives
  "Yessu!",
  "Of course! OwO)-b",
  "Seems like a yes \`(OwO)\`",
  "Errr yes, probably?",
  // negatives
  "No",
  "Nyuu, Baka! >w<",
  "Don't count on it ƪ(˘⌣˘)ʃ",
  "I haven't been programmed to know that yet (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
];

exports.run = async (bot, message, args) => {
  const ebans = answers.random();
  if (!args[0]) {
    message.channel.send(":question::question::question::question::question:");
  }
  if (args[0] == "-i") {
    const eightball = await neko.getSFW8Ball();
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Magic 8ball", "", `${eightball.url}`)
      .setColor(0x1a9ca8)
      .setDescription(eightball.response)
      .setImage(`${eightball.url}`)
      .setFooter("Image by nekos.life");
    message.channel.send("**Thinking...**")
      .then(m => m.edit({
        embed
      }));
  } else {
    message.channel.send(ebans);
  }
  // delete cache
  delete require.cache[require.resolve('./8ball.js')];
};

exports.conf = {
  aliases: ["8b"]
};

exports.help = {
  name: "8ball",
  category: "Fun",
  description: "The power of the \`Magic 8ball!\`.",
  usage: "8ball \`<question>\`",
  param: "-i  :  use nekos.life API",
  aliases: "8b"
};