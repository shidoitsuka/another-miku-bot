const util = require('util');
const {
  resolve,
  join
} = require('path');
const {
  Attachment
} = require('discord.js');
const forbidden = ["TOKEN", "process", "require", "fs"];

exports.run = async (bot, message, args) => {
  if (!args[0]) return message.channel.send(":question:");
  const code = args.join(" ");
  if (forbidden.some(word =>
      message.content.toLowerCase().includes(word))) {
    return message.channel.send(`**${message.author.username}**, Something went wrong!`);
  }
  if (args[0] != "new") return message.channel.send("**Invalid Input**.");
  if (typeof code !== 'string') code = util.inspect(code, {
    depth: 0
  });
  try {
    const coded = eval(`const { Canvas } = require('canvas-constructor');
    const { resolve, join } = require('path');
    const { Attachment } = require('discord.js');
      async function canvas() {
        return ${code}
      }`);
    message.channel.startTyping();
    await message.channel.send(new Attachment(await canvas(), `canvas-${message.author.id}.jpg`))
      .then(message.channel.stopTyping());
  } catch (e) {
    message.channel.send(e, {
      code: 'js'
    });
    message.channel.stopTyping();
  }
};

exports.conf = {
  aliases: [],
  cooldown: 3,
  guildOnly: false
};

exports.help = {
  name: "canvas",
  category: "Util.",
  description: "Try your canvas-constructor here!",
  usage: "canvas new Canvas(width, height).chain().(...)().toBuffer();",
  param: "",
  aliases: ""
};