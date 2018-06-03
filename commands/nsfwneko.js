const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("Please use **NSFW** Channel.").then(m => m.delete(3000));
  const pending = message.channel.send("**Getting Data...**");
  const reply = await pending;
  const image = await neko.getNSFWNeko();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Neko")
    .setColor(0x1a9ca8)
    .setImage(image.url)
    .setFooter(`nekos.life`);
  const result = reply.edit({
    embed
  });
};

exports.conf = {
  aliases: ["nneko"]
}

exports.help = {
  name: "nsfwneko",
  category: "NSFW",
  description: "Print out neko hentai Images.",
  usage: "nsfwneko",
  param: "",
  aliases: "nneko"
}