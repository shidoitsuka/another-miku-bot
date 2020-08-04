const Discord = require("discord.js");
const Gfycat = require("gfycat-sdk");
const { gfycatid, gfycatapi } = require("../../config.js").config;
const gfycat = new Gfycat({
  clientId: process.env.gfycatid,
  clientSecret: process.env.gfycatapi
});

// STARTS
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(":mag: :question:");
  // prettier-ignore
  let options = { search_text: args.join(" "), count: 1, first: 1 };
  const pending = await message.channel.send("**Getting Data...**");
  const reply = await pending;
  // prettier-ignore
  const result = gfycat.search(options)
    .then(data => {
      const embed = new Discord.MessageEmbed()
        .setAuthor("Miku -- gfycat")
        .setColor(0x1a9ca8)
        .setFooter("gfycat-sdk")
        .setImage(`${data.gfycats[0].gifUrl}`);
      reply.edit({ embed });
    })
    // prettier-ignore
    .catch(e => reply.edit(`❌ | **Error :** Unable to find **${args.join(" ")}**.`));
};

exports.conf = {
  aliases: ["gfy", "gfys"],
  cooldown: 3,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "gfycat",
  category: "Miscellaneous",
  description: "Search GIF Images using gfycat API.",
  usage: "gfycat <search-query>",
  param: ""
};
