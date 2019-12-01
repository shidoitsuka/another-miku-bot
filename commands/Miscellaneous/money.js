exports.run = (bot, message, args) => {
  const theMoney = args.join("").match(/\d/g).join("");
  message.channel.send(theMoney.toMoney());
};

exports.conf = {
  aliases: [],
  cooldown: 0.5,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "money",
  category: "Miscellaneous",
  description: "Money formatter.",
  usage: "money [parameter] <amount>",
  param: "-d  :  delete"
};
