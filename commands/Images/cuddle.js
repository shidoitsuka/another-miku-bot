const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  // Words to be answered
  // prettier-ignore
  const words = [`❤❤❤`, `${message.author.username} is cuddling **${args[0]}**!`, `There, there! ❤`];
  // VARIABLES
  // prettier-ignore
  const wordAnswer = words.random(), answers = await neko.sfw.cuddle(), idkI = "https://tinyurl.com/MikuIDK", idkD = `**${message.author.username}** trying to cuddle themselves,\nAre you that lonely...?`;
  let description, image;

  // STATEMENT
  // prettier-ignore
  !args[0] ? ((description = idkD), (image = idkI)) : ((description = wordAnswer), (image = answers.url));

  // BEGIN
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Cuddle", "", `${image}`)
    .setColor(0x1a9ca8)
    .setDescription(description)
    .setImage(`${image}`)
    .setFooter(`${!args[0] ? "" : "Image by nekos.life"}`);
  // prettier-ignore
  message.channel.send("**Loading Image...**")
    .then(m => m.edit({ embed }))
    .catch(err => console.log(err.stack));
}; // END

exports.conf = {
  aliases: [],
  cooldown: 6,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "cuddle",
  category: "Images",
  description: "Cuddle someone!",
  usage: "cuddle <mention-user> or <name>",
  param: ""
};
