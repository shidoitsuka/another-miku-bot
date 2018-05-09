const rates = [
  "1/10 :poop:", "2/10 :dizzy_face:", "3/10 :astonished:", "4/10 :grimacing:",
  "5/10 :ok_hand:",
  "6/10 :upside_down:", "7/10 :relieved:", "8/10 :blush:", "9/10 :heart_eyes:", "10/10 :clap:"
];
const waifus = rates[Math.floor(Math.random() * rates.length)];
const config = require('../config.json');
exports.run = function(bot, message, args) {
  var args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  var cmd = args.shift().toLowerCase();
  var msg = message.content.slice();
  if (args[0] == "") {
    message.channel.send("I can't rate *nobody* :confused:.");
  }
  if (message.content.includes(config.ownerID)) {
    message.channel.send("I'd rate " + `<@${config.ownerID}>` + " a 11/10! :heart:");
  }
  if (message.content.includes(config.botID)) {
    message.channel.send("I'd rate myself a 11/10. Just like him! :revolving_hearts:");
  }
  if (message.content.includes("fortnite")) {
    message.channel.send("I smell tresh.").then(m => {
      m.edit("Sorry i don\'t rate a garbage, but i\'d say it\'s \`-1/100\`.")
    });
  } else if (!args[0] == "") {
    if (message.content.includes(config.ownerID) || message.content.includes(config.botID) || message.content.includes("fortnite")) return;
    if (message.content.includes(message.author.id)) {
      message.channel.send(`Sure, lemme give you a ${waifus}.`);
    } else {
      message.channel.send(`Sure ${message.author.username}. I'll give${message.content.substr(10)} a ${waifus}`);
    }
  }
  delete require.cache[require.resolve('./ratewaifu.js')];
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "ratewaifu",
  category: "Fun",
  description: "I believe i have been programmed to rate you accurately.",
  usage: "ratewaifu \`<mention user>\` or \`<name>\`"
};