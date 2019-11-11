const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  if (!message.channel.nsfw)
    return message.channel
      .send("**NSFW Channel Only.**")
      .then(m => m.delete(3000));
  const filter = (reaction, user) =>
    reaction.emoji.name === "🔄" && user.id === message.author.id;
  const reply = await message.channel.send("**Getting Data...**");
  const image = await neko.nsfw.eroFeet();
  const embed = new Discord.MessageEmbed()
    .setColor(0x1a9ca8)
    .setDescription(`[Click here to download](${image.url})`)
    .setImage(image.url)
    .setFooter(
      `nekos.life | react with 🔄 within 10 seconds to generate new image.`
    );
  reply.delete();
  message.channel.send({ embed }).then(m => {
    const collector = m.createReactionCollector(filter);
    m.react("🔄").then(r => {
      let stopper = setTimeout(() => {
        collector.stop();
      }, 10000);
      collector.on("collect", _ => {
        clearTimeout(stopper);
        r.users.remove(message.author.id);
        embed.setDescription("**Getting Data...**");
        embed.setImage("");
        m.edit({ embed });
        neko.nsfw.eroFeet().then(newImage => {
          embed.setDescription(`[Click here to download](${newImage.url})`);
          embed.setImage(newImage.url);
          m.edit({ embed });
          stopper = setTimeout(() => {
            collector.stop();
          }, 10000);
        });
      });
      collector.on("end", _ => {
        m.reactions.removeAll();
        embed.setFooter("nekos.life | timed out!");
        m.edit({ embed });
      });
    });
  });
};


exports.conf = {
  aliases: [],
  cooldown: 5,
  guildOnly: true
};

exports.help = {
  name: "erofeet",
  category: "NSFW",
  description: "Print out erotic feet images.",
  usage: "erofeet",
  param: "",
  aliases: ""
};
