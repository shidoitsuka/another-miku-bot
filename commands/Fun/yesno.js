exports.run = (bot, message, args) => {
  const sayings = ["Probably", "I'm sure It's a", "It's a", "Should be", "Are you joking? It's", "I told you It's"].random();
  const answers = ["Yes", "No"].random();
  if (!args[0]) return message.channel.send("I don't know! UωU");
  message.channel.send(`${sayings} **${answers}**!`);
};

exports.conf = {
  aliases: [],
  cooldown: 1.5,
  guildOnly: false
};

exports.help = {
  name: "yesno",
  category: "Fun",
  description: "Is it a yes or a no?",
  usage: "yesno <question>",
  param: "",
  aliases: ""
};