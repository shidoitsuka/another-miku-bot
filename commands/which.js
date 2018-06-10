exports.run = (bot, message, args) => {
  if (!args[1] || same(args)) return message.channel.send(":question:");
  const splitted = args.join(" ").split(' or ');
  const values = splitted.join(" ").trim().split(" ");
  if (!args.join(" ").includes("or") || same(values) || args[0] == 'or') return message.channel.send(":question:");
  // const answers = values.blank().random().trim();
  const answers = splitted.random();
  const words = [
    "I\'d choose",
    "I think I\'ll choose",
    "I\'ll pick",
    "Not really sure, but...",
    "Shuuuud be",
    "I think it\'s"
  ].random();
  message.channel.send(`${words} **${answers.trim()}**${[".","!"].random()} ${["UwU", "OwO", "( 0w0)-b"].random()}`).catch(err => message.channel.send("❌ | Tell something."));
};

exports.conf = {
  aliases: ["pick", "choose", "thisthat"],
  cooldown: 3
};

exports.help = {
  name: "which",
  category: "Fun",
  description: "Let me choose which one!",
  usage: "which \`<x>\` or \`<y>\` or ....\`[n]\`",
  param: "",
  aliases: "pick, choose, thisthat"
};