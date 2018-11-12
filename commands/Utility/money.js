exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send(":question:");
  if (!args.join("").match(/\d/g)) return message.channel.send("It seems like you didn\'t provide any number.");
  const theMoney = args.join("").match(/\d/g).join("");
  message.channel.send(theMoney.toMoney());
};

exports.help = {
  name: "money",
  category: "Miscellaneous",
  description: "Money formatter, such as 1000 -> 1,000",
  usage: "money <money>",
  param: "",
  aliases: ""
};

exports.conf = {
  aliases: [],
  cooldown: 1
};