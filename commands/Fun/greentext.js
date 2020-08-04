exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send("woo!", { code: "css" });
  if (args[0] == "-d") {
    message.delete().then(args.shift());
    return message.channel.send(args.join(" "), { code: "css" });
  }
  message.channel.send(args.join(" "), { code: "css" });
};

exports.conf = {
  aliases: ["gtext"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "greentext",
  category: "Fun",
  description: "Generate a green colored text.",
  usage: "greentext <text>",
  param: "-d  :  delete"
};
