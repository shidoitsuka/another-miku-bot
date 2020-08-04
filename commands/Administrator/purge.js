exports.run = (bot, message, args) => {
  // if user does not give any ammount, return
  // prettier-ignore
  if (!args[0]) return message.channel.send("Please specify amount of message to be deleted!");
  // if the amount is not a number, return
  // prettier-ignore
  if (isNaN(args[0])) return message.channel.send("Please specify amount of message to be deleted!");
  // if the amount is more than 100, return
  if (args[0] > 100) return message.channel.send("Less than 100, please!");
  // if the amount is 1, return
  if (args[0] < 1) return message.channel.send("More than 1, please!");

  // prettier-ignore
  message.channel.messages
  // fetch messages based on the amount that user gives
  .fetch({ limit: Number(args[0]) + 1 })
  // then delete it
  .then(m => message.channel.bulkDelete(m))
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
