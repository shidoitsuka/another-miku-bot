exports.run = (bot, message, args) => {
  message.delete();
  message.channel.send("( ͡° ͜ʖ ͡°)");
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false
};

exports.help = {
  name: "lennyd",
  category: "Fun",
  description: "( ͡° ͜ʖ ͡°) u-ugh!",
  usage: "lennyd",
  param: "",
  aliases: ""
};
