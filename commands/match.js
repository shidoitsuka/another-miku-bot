exports.run = (bot, message, args) => {
  if (!args[1] || same(args)) return message.channel.send(":question:");
  const splitted = args.join(" ").split("  with  ");
  const values = splitted.join(" ").trim().split(" with ");
  if (!args.join(" ").includes("with") || same(values) || args[0] == 'with' || values[2]) return message.channel.send(":question:");
  const or = [" out of ", "/"].random();
  const rates = [
    `1${or}10 :poop:`, `2${or}10 :dizzy_face:`, `3${or}10 :astonished:`, `4${or}10 :grimacing:`,
    `5${or}10 :ok_hand:`,
    `6${or}10 :upside_down:`, `7${or}10 :relieved:`, `8${or}10 :blush:`, `9${or}10 :heart:`, `10${or}10 :heart_eyes:`
  ].random();
  const firstP = values[0].toLowerCase() == "me" ? "you" : values[0];
  const secondP = values[1].toLowerCase() == "you" ? "me" : values[1];
  const answers = [
    `**${message.author.username}**, this is my thought but... **${firstP}** and **${secondP}** match rate is ${rates}`,
    `I\'m not really sure but, someone whispered to me that **${firstP}** and **${secondP}** match rate is ${rates}`,
    `**${message.author.username}**, since you\'re asking me, I\'d say ${rates} for **${firstP}** and **${secondP}**`,
    `You better believe me, It\'s ${rates}`
  ].random();
  message.channel.send(answers);
};

exports.conf = {
  aliases: ["cocok"],
  cooldown: 3
};

exports.help = {
  name: "match",
  category: "Fun",
  description: "Are you going to be a great couple together?\nOnly two names are allowed.",
  usage: "match \`<x>\` with \`<y>\`",
  param: "",
  aliases: "cocok"
};