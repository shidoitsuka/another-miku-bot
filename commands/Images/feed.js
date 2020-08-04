const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  const words = [
    `${message.author.username} is feeding **${args[0]}**!`,
    `${message.author.username} : Here, you can have it!`
  ];
  // VARIABLES
  // prettier-ignore
  const wordAnswer = words.random(), answers = await neko.sfw.feed(), idkI = "https://tinyurl.com/MikuIDK", idkD = `**${message.author.username}** trying to feed themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  // prettier-ignore
  !args[0] ? ((description = idkD), (image = idkI)) : ((description = wordAnswer), (image = answers.url));

  // BEGIN
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Feed", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**").then(m => m.edit({ embed }));
};

exports.conf = {
  aliases: [],
  cooldown: 6,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "feed",
  category: "Images",
  description: "Feed your senpai!",
  usage: "feed <mention-user> or <name>",
  param: ""
};
