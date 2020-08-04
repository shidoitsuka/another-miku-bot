const Discord = require("discord.js");
const request = require("request");
const { imgbbapi } = require("../../config.js").config;
const BASE = "https://trace.moe/api/search?";

exports.run = async (bot, message, args, prefix) => {
  // prettier-ignore
  if (!message.attachments.size) return message.channel.send("Please upload an anime scene!");
  const getAnime = (content, num) => {
    let length = JSON.parse(content).docs.length;
    let result = JSON.parse(content).docs[num];
    let thumbToken = result.tokenthumb;
    let anilistID = result.anilist_id;
    // prettier-ignore
    let thumbnail = request({ uri: `https://trace.moe/thumbnail.php?anilist_id=${anilistID}&file=${encodeURIComponent(result.filename)}&t=${result.at}&token=${thumbToken}` },
      (er, re, bo) => bo).uri.href;
    let titleEN = result.title_english;
    let titleJP = result.title_native;
    let aliases = result.synonyms.join(", ");
    let episodes = result.episode;
    let release = result.season;
    let posibility = result.similarity.toFixed(2) + "/1.0";
    // prettier-ignore
    let from = `${Math.floor(result.from / 60)}:${Math.floor(result.from % 60)}`;
    let to = `${Math.floor(result.to / 60)}:${Math.floor(result.to % 60)}`;
    // prettier-ignore
    return { length, aliases, titleEN, titleJP, episodes, from, to, release, thumbnail, posibility };
  };
  const url = message.attachments.map(u => u.url);
  let embed = new Discord.MessageEmbed();
  const reply = await message.channel.send("**Searching...**");
  // prettier-ignore
  request({ uri: `https://api.imgbb.com/1/upload?key=${imgbbapi}&image=${url}` },
    (e, r, b) => {
      const res = JSON.parse(b);
      const image = res.data.image.url;
      request({ uri: `${BASE}url=${image}` }, (err, resp, body) => {
        const filter = (reaction, user) => (["⬅️", "⏹️", "➡️"].includes(reaction.emoji.name) && user.id === message.author.id);
        let i = 0;
        let content;
        content = getAnime(body, i);
        max = content.length;
        embed
          .setAuthor("Found!", "", content.thumbnail)
          .setColor(0xaed581)
          .addField("__**Title (EN)**__", `${content.titleEN}`, true)
          .addField("__**Title (JP)**__", `${content.titleJP}`, true);
        content.aliases.length == 0 ? "" : embed.addField("__**Aliases**__", `${content.aliases}`, true);
        embed
          .addField("__**Scene From (min)**__", `${content.from}`, true)
          .addField("__**Scene To (min)**__", `${content.to}`, true)
          .addField("__**Released**__", `${content.release}`, true)
          .setImage(`${content.thumbnail}`)
          .setFooter(`Posibility : ${content.posibility} | page ${i + 1} of ${max} | Total Episodes : ${!content.episodes ? "0" : content.episodes}`);
        reply.delete();
        message.channel.send({ embed }).then(m => {
          const collector = m.createReactionCollector(filter);
          m.react("⬅️");
          m.react("⏹️");
          m.react("➡️");
          let stopper = setTimeout(() => {
            collector.stop();
          }, 10000);
          collector.on("collect", r => {
            clearTimeout(stopper);
            switch (r.emoji.name) {
              case "⬅️":
                if (i == 0) return r.users.remove(message.author.id);
                i--;
                content = getAnime(body, i);
                embed = new Discord.MessageEmbed()
                  .setAuthor("Found!", "", content.thumbnail)
                  .setColor(0xaed581)
                  .addField("__**Title (EN)**__", `${content.titleEN}`, true)
                  .addField("__**Title (JP)**__", `${content.titleJP}`, true);
                content.aliases.length == 0 ? "" : embed.addField("__**Aliases**__", `${content.aliases}`, true);
                embed
                  .addField("__**Scene From (min)**__", `${content.from}`, true)
                  .addField("__**Scene To (min)**__", `${content.to}`, true)
                  .addField("__**Released**__", `${content.release}`, true)
                  .setImage(`${content.thumbnail}`)
                  .setFooter(`Posibility : ${content.posibility} | page ${i + 1} of ${max} | Total Episodes : ${!content.episodes ? "0" : content.episodes}`);
                m.edit({ embed });
                r.users.remove(message.author.id);
                stopper = setTimeout(() => {
                  collector.stop();
                }, 10000);
                break;
              case "⏹️":
                collector.stop();
                break;
              case "➡️":
                if (i + 1 == max) return r.users.remove(message.author.id);
                i++;
                content = getAnime(body, i);
                embed = new Discord.MessageEmbed()
                  .setAuthor("Found!", "", content.thumbnail)
                  .setColor(0xaed581)
                  .addField("__**Title (EN)**__", `${content.titleEN}`, true)
                  .addField("__**Title (JP)**__", `${content.titleJP}`, true);
                content.aliases.length == 0 ? "" : embed.addField("__**Aliases**__", `${content.aliases}`, true);
                embed
                  .addField("__**Scene From (min)**__", `${content.from}`, true)
                  .addField("__**Scene To (min)**__", `${content.to}`, true)
                  .addField("__**Released**__", `${content.release}`, true)
                  .setImage(`${content.thumbnail}`)
                  .setFooter(`Posibility : ${content.posibility} | page ${i + 1} of ${max} | Total Episodes : ${!content.episodes ? "0" : content.episodes}`);
                m.edit({ embed });
                r.users.remove(message.author.id);
                stopper = setTimeout(() => {
                  collector.stop();
                }, 10000);
                break;
            }
          });
          collector.on("end", _ => {
            m.reactions.removeAll();
          });
        });
      });
    }
  );
};
exports.conf = {
  aliases: ["what"],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "anisearch",
  category: "Miscellaneous",
  description: "Search anime name based on scene",
  usage: "anisearch *you need to provide an image",
  param: ""
};
