const answers = ["Yes", "No"];
const sayings = ["Probably", "I'm sure It's a", "It's a", "Should be", "Are you joking? It's", "I told you It's"];

exports.run = (bot, message, args) => {
  const answer = answers.random();
  const saying = sayings.random();
  if (!args[0]) return message.channel.send("I don't know! UωU");
  message.channel.send(`${saying} **${answer}**!`);
};

exports.conf = {
  aliases: [],
  cooldown: 1.5
};

exports.help = {
  name: "yesno",
  category: "Fun",
  description: "Is it a yes or a no?",
  usage: "yesno <question>",
  param: "",
  aliases: ""
};