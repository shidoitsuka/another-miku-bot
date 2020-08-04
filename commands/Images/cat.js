const Discord = require("discord.js");
const nekoclient = require("nekos.life");
const neko = new nekoclient();

exports.run = async (bot, message, args) => {
  // prettier-ignore
  const filter = (reaction, user) => reaction.emoji.name === "🔄" && user.id === message.author.id;
  const reply = await message.channel.send("**Getting Data...**");
  const image = await neko.sfw.meow();
  // prettier-ignore
  const embed = new Discord.MessageEmbed()
    .setAuthor("Miku -- Meow")
    .setColor(0x1a9ca8)
    .setDescription(`[Click here to download](${image.url})`)
    .setImage(image.url)
    .setFooter(`nekos.life | react with 🔄 within 10 seconds to generate new image.`);
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
        neko.sfw.meow().then(newImage => {
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
  aliases: ["meow", "neko"],
  cooldown: 5,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS", "ADD_REACTIONS"]
};

exports.help = {
  name: "cat",
  category: "Images",
  description: "Print out random cat images ♥",
  usage: "cat",
  param: ""
};
