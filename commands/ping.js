exports.run = function(bot, message, args) {
  message.channel.send("Pong!").then(m => {
    m.edit(`:ping_pong: that was \`${m.createdTimestamp - message.createdTimestamp}ms\``)
  });
}

exports.conf = {
  aliases: ["p"]
};

exports.help = {
  name: "ping",
  category: "Misc.",
  description: "Pong!",
  usage: "ping"
};