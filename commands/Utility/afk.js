const reasons = [
  "cuz y not",
  "nothing. yes.\nn o t h i n g.",
  "they choose not to tell",
  "none",
  "cuz they're lifeless"
];

exports.run = async (bot, message, args) => {
  let data = readFile("./assets/afk");
  let reason = args.join(" ");
  if (!reason) reason = reasons.random();
  if (Object.keys(data).includes(message.author.id))
    return message.channel.send("You are in AFK mode already!");
  data[message.author.id] = reason;
  message.channel.send("You are in AFK mode now!");
  writeFile("./assets/afk", data);
};

exports.conf = {
  aliases: [],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: ["EMBED_LINKS"]
};

exports.help = {
  name: "afk",
  category: "Utility",
  description: "Run this so that I can tell them you're not around.",
  usage: "afk [why-you-afk]",
  param: ""
};
