const Discord = require("discord.js");

exports.run = (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#36393e")
    .setDescription("**Pinging...**");
  message.channel.send({ embed }).then(m => {
    let time = m.createdTimestamp - message.createdTimestamp;
    const answers = [
      `:ping_pong: | Well done **${message.author.username}**-kun. You just wasted \`${time}ms\` of my time!`,
      `:ping_pong: | _angry pinging noises_ \`${time}ms\``,
      `:ping_pong: | B-b-baka! It\'s \`${time}ms\`.\nHappy now?!`,
      `:ping_pong: | You\'ve made me \`${time}ms\` older by just asking.`,
      `:ping_pong: | \`${time}ms\` to read & edit this message!`
    ].random();
    embed.setDescription(answers);
    m.edit({ embed });
  });
};

exports.conf = {
  aliases: ["p"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "ping",
  category: "Utility",
  description: "Pong!",
  usage: "ping",
  param: ""
};
