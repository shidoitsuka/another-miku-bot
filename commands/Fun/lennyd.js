exports.run = (bot, message, args) => {
  message.delete();
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
  name: "lennyd",
  category: "Fun",
  description: "( ͡° ͜ʖ ͡°) then delete.",
  usage: "lennyd",
  param: ""
};
