exports.run = (bot, message) => {
  const args = message.content.slice("q".length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(bot.commands);
};

exports.conf = {
  aliases: [],
  cooldown: 0.5,
  guildOnly: true
};

exports.help = {
  name: "test",
  category: "",
  description: "",
  usage: "",
  param: "",
  aliases: ""
};