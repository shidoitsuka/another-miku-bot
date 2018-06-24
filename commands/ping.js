exports.run = (bot, message, args) => {
  message.channel.send("**Pinging...**").then(m => {
    let time = m.createdTimestamp - message.createdTimestamp;
    const answers = [
      `Well done **${message.author.username}**-kun. You just wasted \`${time}ms\` of my time!`,
      `_angry pinging noises_ \`${time}ms\``,
      `B-b-baka! It\'s \`${time}ms\`.\nHappy now?!`,
      `You\'ve made me \`${time}\` older by just asking.`,
      `:ping_pong: | \`${time}ms\` to read & edit this message!`
    ].random();
    m.edit(answers);
  });
}

exports.conf = {
  aliases: ["p"],
  cooldown: 1
};

exports.help = {
  name: "ping",
  category: "Util.",
  description: "Pong!",
  usage: "ping",
  param: "",
  aliases: "p"
};