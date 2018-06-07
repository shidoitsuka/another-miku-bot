exports.run = (bot, message, args) => {
  message.channel.send("Pong!").then(m => {
    m.edit(`:ping_pong: \`${m.createdTimestamp - message.createdTimestamp}ms\``)
  });
}

exports.conf = {
  aliases: ["p"]
};

exports.help = {
  name: "ping",
  category: "Util.",
  description: "Pong!",
  usage: "ping",
  param: "",
  aliases: "p"
};