exports.run = (bot, message, args) => {
  // prettier-ignore
  if (message.author.id != "332424370272337923") return message.channel.send(":question:");
  process.exit(1);
};

exports.conf = {
  aliases: [],
  cooldown: 0.1,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "reboot",
  category: "Owner",
  description: "**OWNER ONLY**",
  usage: "",
  param: ""
};
