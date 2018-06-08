const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw) return message.channel.send("Please use **NSFW** Channel.").then(m => m.delete(3000));
  const pending = message.channel.send("**Getting Data...**");
  const reply = await pending;
  const image = await neko.getNSFWCumsluts();
  const embed = new Discord.RichEmbed()
    .setAuthor("Miku -- Cumslut")
    .setColor(0x1a9ca8)
    .setImage(image.url)
    .setFooter(`nekos.life`);
  const result = reply.edit({
    embed
  });
};

exports.conf = {
  aliases: ["cum"],
  cooldown: 5
}

exports.help = {
  name: "nsfwcumslut",
  category: "NSFW",
  description: "Print out cumslut hentai Images.",
  usage: "nsfwcumslut",
  param: "",
  aliases: "cum"
}