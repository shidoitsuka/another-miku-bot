const request = require("request");
const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send(":question:");
  // prettier-ignore
  if (!args[0].toLowerCase().startsWith("http://") && !args[0].toLowerCase().startsWith("https://")) return message.channel.send("Either **http://** nor **https://** are not found.\n_(case sensitive)_").then(m => m.delete(3000));
  // prettier-ignore
  request({ uri: `http://tinyurl.com/api-create.php?url=${args[0]}` },
    (error, response, body) => {
      const embed = new Discord.MessageEmbed()
        .setAuthor("Miku -- Shorten")
        .setColor(0xaed581)
        .addField("URL:", args[0], true)
        .addField("Short Link:", `${body}`, true)
        .setFooter("Powered by tinyurl.com");
      message.channel.send({ embed });
    }
  );
};

exports.conf = {
  aliases: ["shorten", "shrink"],
  cooldown: 5,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "short",
  category: "Utility",
  description:
    "Give me your super-long-URL and I'll give you the short version of that.",
  usage: "short <url>",
  param: ""
};
