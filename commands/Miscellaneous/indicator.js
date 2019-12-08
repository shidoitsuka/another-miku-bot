exports.run = (bot, message, args) => {
  // if args[0] length is not 1, return
  if (args[0].length != 1) return message.channel.send("Error.");
  // prettier-ignore
  else message.channel.send(`https://emojipedia.org/regional-indicator-symbol-letter-${args[0]}`);
};

exports.conf = {
  aliases: ["indi"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "indicator",
  category: "Miscellaneous",
  description: "I\'ll give you link for text-indicator that you\'re looking for.",
  usage: "indicator <letter>",
  param: ""
};
