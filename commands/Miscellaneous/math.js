const Discord = require("discord.js");
const math = require("mathjs");
const answers = [
  "Should be ",
  "I guess it's ",
  "It should be ",
  "Hmmm... Probably "
];

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  const theAnswer = answers.random();
  var txt = message.content.slice(6);
  try {
    if (txt == "2+2" || txt == "2+ 2" || txt == "2 +2" || txt == "2 + 2") {
      embed
        .setAuthor("Miku", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription("Let him answer you:")
        .setImage("https://goo.gl/tVGvMX");
      message.channel.send({ embed });
    } else {
      var ans = math.evaluate(txt);
      embed
        .setAuthor("Miku -- Math", "https://tinyurl.com/MikuCalc")
        .setColor(0x1a9ca8)
        .setDescription(`${theAnswer}\`${ans}\``);
      message.channel.send({ embed });
    }
  } catch (err) {
    // prettier-ignore
    embed
      .setAuthor("Miku -- Error")
      .setThumbnail("https://tinyurl.com/MikuError")
      .setColor(0xf44336)
      .setDescription(`Something went wrong!\n**Error**  : \n${err.name} ${err.message}`);
    message.channel.send({ embed });
  }
};

exports.conf = {
  aliases: ["mafs", "maffs", "maff"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "math",
  category: "Miscellaneous",
  description: "Let me do complex math for you!",
  usage: "math <expression>",
  param: ""
};
