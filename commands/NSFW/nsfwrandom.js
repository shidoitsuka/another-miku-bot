const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("Please use **NSFW** Channel.").then(m => m.delete(3000));
  const pending = message.channel.send("**Getting Data...**");
  const reply = await pending;
  const image = await neko.getNSFWRandomHentaiGif();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Random")
    .setColor(0x1a9ca8)
    .setImage(image.url)
    .setFooter(`nekos.life`);
  const result = reply.edit({
    embed
  });
};

exports.conf = {
  aliases: ["random"],
  cooldown: 2
}

exports.help = {
  name: "nsfwrandom",
  category: "NSFW",
  description: "Print out random hentai Images.",
  usage: "nsfwrandom",
  param: "",
  aliases: "random"
}