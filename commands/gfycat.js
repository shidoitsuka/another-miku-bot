const Discord = require('discord.js');
const Gfycat = require('gfycat-sdk');
const config = require('../config.json');
var gfycat = new Gfycat({
  clientId: config.client_id,
  clientSecret: config.client_secret
});

// STARTS
exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(":mag: :question:");
  let options = {
    search_text: args.join(" "),
    count: 1,
    first: 1
  };
  const pending = await message.channel.send("**Getting Data...**");
  const reply = await pending;
  const result = gfycat.search(options).then(data => {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- gfycat")
      .setColor(0x1a9ca8)
      .setFooter("gfycat-sdk")
      .setImage(`${data.gfycats[0].gifUrl}`);
    reply.edit({
      embed
    })
  }).catch(e => reply.edit(`❌ | **Error :** Unable to find **${args.join(" ")}**.`));
};
exports.conf = {
  aliases: ["gfy", "gfys"],
  cooldown: 3
};

exports.help = {
  name: "gfycat",
  category: "Misc.",
  description: "Search GIF Images using gfycat API.",
  usage: "gfycat <search-query>",
  param: "",
  aliases: "gfy, gfys"
};