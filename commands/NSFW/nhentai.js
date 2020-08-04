const request = require("request");
const cheerio = require("cheerio");
const Discord = require("discord.js");

const nhentai = html => {
  const $ = cheerio.load(html);
  const pic = $(".thumb-container");
  const pages = pic.length;
  if (pages == 0) return false;
  const title = $("#info h1")[0].children[0].data.trim();
  const parody = $("a.tag")[0].children[0].data.trim();
  let src = [];
  for (let i = 0; i < pages; i++) {
    src.push(
      pic[i].children[0].next.children[0].next.attribs["data-src"]
        .replace("t.", "i.")
        .replace("t.", ".")
    );
  }
  return { title, parody, pages, images: src };
};

exports.run = async (bot, message, args) => {
  let embed = new Discord.MessageEmbed();
  const filter = (reaction, user) => {
    return (
      ["⬅️", "⏹️", "➡️"].includes(reaction.emoji.name) &&
      user.id === message.author.id
    );
  };
  const reply = await message.channel.send("**Fetching...**");
  request(`https://nhentai.net/g/${args[0]}/`, (err, response, html) => {
    const data = nhentai(html);
    if (!data) return reply.edit("**Not Found!**");
    const title = data.title;
    const parody = data.parody;
    const pages = data.pages;
    const image = data.images;
    let i = 0;
    embed
      .setAuthor("Found! | react within 3 minutes to continue reading")
      .setColor(0xaed581)
      .addField("__**Parody**__", `${parody}`, false)
      .addField("__**Title**__", `${title}`, false)
      .setDescription(`[Click Here](https://nhentai.net/g/${args[0]}/) to visit`)
      .setImage(`${image[i]}`)
      .setFooter(`Page ${i + 1} of ${pages}`);
    reply.delete();
    message.channel.send({ embed }).then(m => {
      const collector = m.createReactionCollector(filter);
      m.react("⬅️");
      m.react("⏹️");
      m.react("➡️");
      let stopper = setTimeout(() => {
        collector.stop();
      }, 180000);
      collector.on("collect", r => {
        clearTimeout(stopper);
        switch (r.emoji.name) {
          case "⬅️":
            if (i == 0) return r.users.remove(message.author.id);
            i--;
            embed.setImage(image[i]).setFooter(`Page ${i + 1} of ${pages}`);
            m.edit({ embed });
            r.users.remove(message.author.id);
            stopper = setTimeout(() => {
              collector.stop();
            }, 180000);
            break;
          case "⏹️":
            collector.stop();
            break;
          case "➡️":
            if (i + 1 == pages) return r.users.remove(message.author.id);
            i++;
            embed.setImage(image[i]).setFooter(`Page ${i + 1} of ${pages}`);
            m.edit({ embed });
            r.users.remove(message.author.id);
            stopper = setTimeout(() => {
              collector.stop();
            }, 180000);
            break;
        }
      });
      collector.on("end", _ => {
        m.reactions.removeAll();
      });
    });
  });
};

exports.conf = {
  aliases: ["t"],
  cooldown: 60,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS", "ADD_REACTIONS"]
};

exports.help = {
  name: "nhentai",
  category: "NSFW",
  description: "Read nhentai through me",
  usage: "nhentai <nuclear code>",
  param: ""
};
