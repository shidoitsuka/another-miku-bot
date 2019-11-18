const { Canvas } = require("canvas-constructor");
const { resolve, join } = require("path");
const { MessageAttachment } = require("discord.js");

// Canvas.registerFont(resolve(join(__dirname, "./assets/whatever.ttf")), "Discord");
exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      `W-wakaranai **${message.author.username}**-san UwU\nI don\'t know that kind of color QwQ`
    );
  async function color() {
    return new Canvas(200, 50)
      .setColor(`#${args[0]}`)
      .addRect(0, 0, 200, 50)
      .toBufferAsync();
  }

  // STARTS HERE
  let now = Date.now();
  message.channel.startTyping();
  message.channel.send("**Rendering...**").then(m => {
    m.edit(`\`${Date.now() - now}ms\``);
    m.delete(3000);
  });
  await message.channel
    .send(new MessageAttachment(await color(), `color-${message.author.id}.jpg`))
    .then(message.channel.stopTyping());
};

exports.conf = {
  aliases: [],
  cooldown: 3,
  guildOnly: false
};

exports.help = {
  name: "color",
  category: "Utility",
  description: "Give me the color code, I'll give you the exact color.",
  usage: "color <HEX-COLORCODE>",
  param: "",
  aliases: ""
};
