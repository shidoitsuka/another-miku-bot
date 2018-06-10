exports.run = (bot, message, args) => {
  message.channel.send("Pong!").then(m => {
    m.edit(`:ping_pong: | Took me \`${m.createdTimestamp - message.createdTimestamp}ms\` to read & edit the message!`)
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