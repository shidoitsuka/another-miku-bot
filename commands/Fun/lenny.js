exports.run = (bot, message, args) => {
  message.channel.send("( ͡° ͜ʖ ͡°)");
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "lenny",
  category: "Fun",
  description: "( ͡° ͜ʖ ͡°)",
  usage: "lenny",
  param: ""
};
