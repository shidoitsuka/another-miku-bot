exports.run = (bot, message, args) => {
  message.channel.send("( ͡° ͜ʖ ͡°)");
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false
};

exports.help = {
  name: "lenny",
  category: "Fun",
  description: "( ͡° ͜ʖ ͡°) u-ugh!",
  usage: "lenny",
  param: "",
  aliases: ""
};