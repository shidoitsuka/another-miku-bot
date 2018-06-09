exports.run = (bot, message, args) => {
  if (!args[1] || same(args)) return message.channel.send(":question:");
  const splitted = args.join(" ").split("  with  ");
  const values = splitted.join(" ").trim().split(" with ");
  if (!args.join(" ").includes("with") || same(values) || args[0] == 'with' || values[2]) return message.channel.send(":question:");
  const rates = [
    `1/10 :poop:`, `2/10 :dizzy_face:`, `3/10 :astonished:`, `4/10 :grimacing:`,
    `5/10 :ok_hand:`,
    `6/10 :upside_down:`, `7/10 :relieved:`, `8/10 :blush:`, `9/10 :heart:`, `10/10 :heart_eyes:`
  ].random();
  message.channel.send(`I\'ll give **${values[0].toLowerCase() == "me" ? "you" : values[0]}** and **${values[1].toLowerCase() == "you" ? "me" : values[1]}** a ${rates}`);
};

exports.conf = {
  aliases: ["cocok"],
  cooldown: 3
};

exports.help = {
  name: "match",
  category: "Fun",
  description: "Are you going to be a great couple together?",
  usage: "match \`<x>\` with \`<y>\`",
  param: "",
  aliases: "cocok"
};