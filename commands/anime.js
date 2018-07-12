const Discord = require('discord.js');
const Anime = require('anime-scraper').Anime;

exports.run = async (bot, message, args) => {
  try {
    // START PENDINGS
    const pending = message.channel.send("**Getting Data...**");
    const reply = await pending;

    // RESULTS
    const result = await Anime.search(args.join(" "))
      .then(results => {
        let page = 1;
        let res = results[page - 1].toAnime();
        res.then(f => {
          const embed = new Discord.RichEmbed()
            .setAuthor("Miku -- Anime")
            .setColor(0x1a9ca8)
            .addField("Name:", f.name, true)
            .addField("Summary:", f.summary, true)
            .addField("Total Episodes:", f.episodes.length, true)
            .setFooter(`anime search | page ${page} of ${results.length} | 60 second(s) timeout.`);
          reply.edit({
            embed
          }).then(async m => {
            await m.react("◀");
            await m.react("▶");
            // FILTERS
            const backwardsFilter = (reaction, user) => reaction.emoji.name === `◀` && user.id === message.author.id;
            const forwardsFilter = (reaction, user) => reaction.emoji.name === `▶` && user.id === message.author.id;
            const backwards = m.createReactionCollector(backwardsFilter, {
              time: 60000
            });
            const forwards = m.createReactionCollector(forwardsFilter, {
              time: 60000
            });
            // START BACKWARD
            backwards.on('collect', r => {
              if (page === 1) return;
              let res = results[page].toAnime();
              page--;
              res.then(f => {
                const embed = new Discord.RichEmbed()
                  .setAuthor("Miku -- Anime")
                  .setColor(0x1a9ca8)
                  .addField("Name:", f.name, true)
                  .addField("Summary:", f.summary, true)
                  .addField("Total Episodes:", f.episodes.length, true)
                  .setFooter(`anime search | page ${page} of ${results.length} | 60 second(s) timeout.`);
                reply.edit({
                  embed
                })
              })
            }); // END BACKWARD
            // START FORWARD
            forwards.on('collect', r => {
              if (page === results.length) return;
              let res = results[page].toAnime();
              page++;
              res.then(f => {
                const embed = new Discord.RichEmbed()
                  .setAuthor("Miku -- Anime")
                  .setColor(0x1a9ca8)
                  .addField("Name:", f.name, true)
                  .addField("Summary:", f.summary, true)
                  .addField("Total Episodes:", f.episodes.length, true)
                  .setFooter(`anime search | page ${page} of ${results.length} | 60 second(s) timeout.`);
                reply.edit({
                  embed
                })
              })
            }); // END FORWARD
            // START END
            forwards.on('end', r => {
              embed.setFooter("timed out.");
              reply.edit({
                embed
              })
            }); // END END
          });
        });

      });
  } catch (e) {
    message.channel.send(`❌ | **${args.join(" ")}** not found.`);
  }
};

exports.conf = {
  aliases: [],
  cooldown: 3
};

exports.help = {
  name: "anime",
  category: "Fun",
  description: "Anime info",
  usage: "anime <anime-name>",
  param: "",
  aliases: ""
};