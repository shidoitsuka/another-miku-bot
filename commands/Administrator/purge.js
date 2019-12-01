exports.run = (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Please specify amount of message to be deleted!"
    );
  if (isNaN(args[0]))
    return message.channel.send(
      "Please specify amount of message to be deleted!"
    );
  if (args[0] > 100) return message.channel.send("Less than 100, please!");
  if (args[0] < 1) return message.channel.send("More than 1, please!");

  message.channel.messages
    .fetch({ limit: Number(args[0]) + 1 })
    .then(m => {
      message.channel.bulkDelete(m);
    })
    .then(message.channel.send("Cleaned!"));
};

exports.conf = {
  aliases: ["clear"],
  cooldown: 1,
  guildOnly: true,
  userPerm: ["MANAGE_MESSAGES"],
  botPerm: ["MANAGE_MESSAGES"]
};

exports.help = {
  name: "purge",
  category: "Administrator",
  description: "Purge message",
  usage: "purge <ammount of messages to be deleted>",
  param: ""
};
