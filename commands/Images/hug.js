const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

// START-MAIN
exports.run = async (bot, message, args) => {
  const words = [
    `${message.author.username} is hugging **${args[0]}** >////<`,
    `Look at ${message.author.username} and **${args[0]}**! O////O`,
    `How cute, ${message.author.username} is hugging **${args[0]}**!`
  ];
  // VARIABLES
  const wordAnswer = words.random(),
    answers = await neko.sfw.hug(),
    idkI = "https://tinyurl.com/MikuIDK",
    idkD = `**${message.author.username}** trying to hug themselves,\nI wonder how...`;
  let description, image;

  // STATEMENT
  !args[0]
    ? ((description = idkD), (image = idkI))
    : ((description = wordAnswer), (image = answers.url));

  // BEGIN
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Hug", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  message.channel.send("**Loading Image...**").then(m => m.edit({ embed }));
}; // END-MAIN

exports.conf = {
  aliases: [],
  cooldown: 6,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "hug",
  category: "Images",
  description: "Hug someone!",
  usage: "hug <mention-user> or <name>",
  param: ""
};
