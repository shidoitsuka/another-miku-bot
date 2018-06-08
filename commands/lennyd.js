exports.run = (bot, message, args) => {
  message.delete();
  message.channel.send("( ͡° ͜ʖ ͡°)");
};

exports.conf = {
  aliases: [],
  cooldown: 5
};

exports.help = {
  name: "lennyd",
  category: "Fun",
  description: "\`( ͡° ͜ʖ ͡°) u-ugh!\`\n*d stands for delete*",
  usage: "lennyd",
  param: "",
  aliases: ""
};