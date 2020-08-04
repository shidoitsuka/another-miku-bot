const Discord = require("discord.js");
const usage = "mock <text>"
  .split("")
  .map(x => {
    const random = Math.round(Math.random());
    return (x = random ? x.toLowerCase() : x.toUpperCase());
  })
  .join("");
const parameters = "\n-id <messageID> : mock a message based on message ID.";

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed();
  // prettier-ignore
  if (!args[0]) return message.channel.send("what u want".split("")
        .map(x => {
          const random = Math.round(Math.random());
          return (x = random ? x.toLowerCase() : x.toUpperCase());
        }).join(""));
  embed
    .setAuthor("Miku -- Mock")
    .setColor("f2e160")
    .setImage("http://tinyurl.com/ybkjg49c")
    .setFooter(`-${message.author.tag}`);

  if (args[0] == "-id") {
    return;
    // prettier-ignore
    const toBeMocked = message.channel.fetchMessage(args[1])
      .then(m => {
        const content = m.content;
        const mocked = content
          .split("")
          .map(x => {
            const random = Math.round(Math.random());
            return (x = random ? x.toLowerCase() : x.toUpperCase());
          }).join("");
        embed.setDescription(mocked).setFooter(`ID : ${args[1]}`);
        message.channel.send({ embed });
      }).catch(e => message.channel.send("Failed to get the message."));
    return true;
  }

  // prettier-ignore
  const mocked = args.join(" ").split("")
    .map(x => {
      const random = Math.round(Math.random());
      return (x = random ? x.toLowerCase() : x.toUpperCase());
    }).join("");

  embed.setDescription(mocked);
  message.channel.send({ embed });
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "mock",
  category: "Fun",
  description: "Mock a text!",
  usage: usage,
  param: parameters
};
