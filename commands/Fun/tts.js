exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send(":no_mouth:");
  if (args[0] == "-d") {
    message.delete().then(args.shift());
    message.channel
      .send(args.join(" "), { tts: true })
      .then(response => response.delete(100));
  } else {
    message.channel.send(args.join(" "), { tts: true });
  }
};

exports.conf = {
  aliases: ["speak"],
  cooldown: 3,
  guildOnly: true,
  userPerm: [""],
  botPerm: ["SEND_TTS_MESSAGES"]
};

exports.help = {
  name: "tts",
  category: "Fun",
  description: "Too shy to say it? I'll do it for you, with voice! (OwO)",
  usage: "tts [parameter] <text>",
  param: "-d  :  delete"
};
