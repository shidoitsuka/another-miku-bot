const Discord = require('discord.js');
const GoogleImages = require('google-images');
const client = new GoogleImages(process.env.GID, process.env.GAPI);

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(":question:");
  const random = Math.floor((Math.random() * 11));
  const pageNo = Math.floor((Math.random() * 11));
  const pending = await message.channel.send("**Searching...**");
  const reply = await pending;
  const result = client.search(args.join(" "), {
    page: pageNo
  }).then(images => {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Google Image Search")
      .setColor(0x1a9ca8)
      .setImage(images[random].url)
      .setFooter(`page: ${pageNo} | google-images | ${random == 0 ? random+=1 : random == 1 ? random+"st" : random == 2 ? random+"nd" : random == 3 ? random+"rd" : random+"th"} Image.`);
    reply.edit({
      embed
    });
  }).catch(e => reply.edit(`❌ | Something went wrong. Please try again.`));
}
exports.conf = {
  aliases: ["gs"],
  cooldown: 3
}

exports.help = {
  name: "google",
  category: "Misc.",
  description: "Google image search",
  usage: "google <search-query>",
  param: "",
  aliases: "gs"
}