exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(`**${message.author.username}**-kun, pick something please UwU`);
  if (!args[0].toLowerCase().includes(["rock", "r", "paper", "p", "scissor", "s"])) return message.channel.send(`**${message.author.username}**-kun, I don\'t understand UwU`);
  const mikuchoose = ["rock", "paper", "scissor"].random();
  const tie = [
    `H-how could you... It\'s a tie!`,
    `It\'s a tie!?\nThis isn\'t right! I should\'ve be able to win easily!`,
    `It\'s a tie **${message.author.username}**-san ^w^`
  ].random();
  const win = [
    `Ez win!`,
    `I won!\n_I expected that, by the way:)_`,
    `I won!\nWell it\'s no surprise, I suppose.`,
    `**${message.author.username}**-kun, why so easy?`,
    `Did a bot just beat you?`
  ].random();
  const lose = [
    `Happy now?\n_I gave you that win;)_`,
    `Well, I lost.\nNow... should I be more serious?`,
    `Oh well, I lose ;c`,
    `**${message.author.username}**-san... how... could... you...`,
    `Nyuuu... D:\nThis ain\'t right!!!`
  ].random();
  message.channel.send(`I picked **${mikuchoose}**`).then(m => m.delete(7000));
  if (mikuchoose == "rock") {
    if (args[0].toLowerCase() == "rock" || args[0].toLowerCase() == "r") message.channel.send(tie);
    if (args[0].toLowerCase() == "scissor" || args[0].toLowerCase() == "s") message.channel.send(win);
    if (args[0].toLowerCase() == "paper" || args[0].toLowerCase() == "p") message.channel.send(lose);
  }
  if (mikuchoose == "paper") {
    if (args[0].toLowerCase() == "paper" || args[0].toLowerCase() == "p") message.channel.send(tie);
    if (args[0].toLowerCase() == "rock" || args[0].toLowerCase() == "r") message.channel.send(win);
    if (args[0].toLowerCase() == "scissor" || args[0].toLowerCase() == "s") message.channel.send(lose);
  }
  if (mikuchoose == "scissor") {
    if (args[0].toLowerCase() == "scissor" || args[0].toLowerCase() == "s") message.channel.send(tie);
    if (args[0].toLowerCase() == "rock" || args[0].toLowerCase() == "r") message.channel.send(lose);
    if (args[0].toLowerCase() == "paper" || args[0].toLowerCase() == "p") message.channel.send(win);
  }
};

exports.conf = {
  aliases: [],
  cooldown: 3
};

exports.help = {
  name: "rps",
  category: "Fun",
  description: "Play rock paper scissor with me!",
  usage: "rps <rock | paper | scissor>",
  param: "",
  aliases: ""
};