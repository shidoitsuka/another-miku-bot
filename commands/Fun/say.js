exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send(":no_mouth:");
  else {
    if (args[0] == "-d") {
      message.delete().then(args.shift());
      message.channel.send(args.join(" "));
    } else {
      message.channel.send(args.join(" "))
    }
  }
};

exports.conf = {
  aliases: ["echo"],
  cooldown: 2,
  guildOnly: false
};

exports.help = {
  name: "say",
  category: "Fun",
  description: "Too shy to say it? I\'ll do it for you!",
  usage: "say [parameter] <text>",
  param: "-d  :  delete",
  aliases: "echo"
};