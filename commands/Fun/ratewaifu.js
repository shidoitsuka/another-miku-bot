const rates = [
  "1/10 :poop:",
  "2/10 :dizzy_face:",
  "3/10 :astonished:",
  "4/10 :grimacing:",
  "5/10 :ok_hand:",
  "6/10 :upside_down:",
  "7/10 :relieved:",
  "8/10 :blush:",
  "9/10 :heart_eyes:",
  "10/10 :clap:"
];
const config = require("../../config.json");

exports.run = (bot, message, args) => {
  if (!args[0]) {
    message.channel.send("I can't rate *nobody* :confused:");
  }
  // if they rate owner
  if (message.content.includes(config.ownerID)) {
    message.channel.send(`I'd rate <@${config.ownerID}> a 11/10! :heart:`);
  }
  // if they rate miku
  if (message.content.includes(config.botID)) {
    message.channel.send(
      "I'd rate myself a 11/10. Just like him! :revolving_hearts:"
    );
  } else if (args[0]) {
    const waifus = rates.random();
    if (
      message.content.includes(config.ownerID) ||
      message.content.includes(config.botID)
    )
      return;
    if (args[0] == message.author.id || args[0] == "me") {
      message.channel.send(`Sure, lemme give you a ${waifus}.`);
    } else {
      message.channel.send(
        `Sure **${message.author.username}**. I'll give${message.content.substr(
          10
        )} a ${waifus}`
      );
    }
  }
  delete require.cache[require.resolve("./ratewaifu.js")];
};

exports.conf = {
  aliases: [],
  cooldown: 2,
  guildOnly: true
};

exports.help = {
  name: "ratewaifu",
  category: "Fun",
  description: "I believe i have been programmed to rate you accurately.",
  usage: "ratewaifu <mention-user> or <name>",
  param: "",
  aliases: ""
};
