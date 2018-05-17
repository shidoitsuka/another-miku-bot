exports.run = function(bot, message, args) {
  message.channel.send("Pong!").then(m => {
    m.edit(`:ping_pong: took \`${m.createdTimestamp - message.createdTimestamp}ms\` for me to edit the message.`)
  });
}

exports.conf = {
  aliases: ["p"]
};

exports.help = {
  name: "ping",
  category: "Misc.",
  description: "Pong!",
  usage: "ping",
  param: "",
  aliases: "p"
};