const {
  Canvas
} = require('canvas-constructor');
const {
  resolve,
  join
} = require('path');
const {
  Attachment
} = require('discord.js');
const {
  get
} = require('snekfetch');
const fsn = require('fs-nextra');
const imageUrlRegex = /\?size=2048$/g;

// Canvas.registerFont(resolve(join(__dirname, "./assets/whatever.ttf")), "Discord");
exports.run = async (bot, message, args) => {
  const joined = args.join(" ");
  if (!args[0]) return message.channel.send(`${message.author.username}-san, tell them **what\'s on your mind** and let them changes your mind UwU`);
  if (joined.length > 31) return message.channel.send("Less than **30 character(s)**, please UwU");
  async function cmm() {
    const {
      body: avatar
    } = await get(message.author.avatarURL.replace(imageUrlRegex, "?size=128"));
    const {
      body: img
    } = await get('https://image.ibb.co/ij4TaJ/changemmind.png');
    return new Canvas(500, 500)
      .addImage(img, 0, 0, 500, 500)
      .save()
      .addRoundImage(avatar, 90, 5, 104, 104, 50)
      .restore()
      .setColor('#151515')
      .setTextFont('25px impact')
      .setTextAlign('center')
      .addText(joined, 265, 360)
      .toBufferAsync();
  };

  // STARTS HERE
  let now = Date.now();
  message.channel.startTyping()
  message.channel.send("**Rendering...**")
    .then(m => {
      m.edit(`\`${Date.now() - now}ms\``);
      m.delete(3000);
    });
  await message.channel.send(new Attachment(await cmm(), `cmm-${message.author.id}.jpg`))
    .then(message.channel.stopTyping());
};

exports.conf = {
  aliases: ["cmm"],
  cooldown: 5
};

exports.help = {
  name: "changemymind",
  category: "Fun",
  description: "Let your friends change your mind!",
  usage: "changemymind <text>",
  param: "",
  aliases: "cmm"
};