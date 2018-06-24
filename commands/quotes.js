const Discord = require('discord.js');
const quotes = require("./quotes.json"); // the quotes
const pics = [
  // DitF
  "https://worldwithouthorizons.com/wp-content/uploads/11-2.jpg",
  "https://i.ytimg.com/vi/dBMKAJIKgFc/maxresdefault.jpg",
  "https://formeinfullbloom.files.wordpress.com/2018/02/hiroandoni2.png",
];

exports.run = (bot, message, args) => {
  const randomPic = pics.random();
  const theAnswer = quotes.random[Math.floor(Math.random() * quotes.random.length)];
  // AERE "https://image.ibb.co/h9OkpS/image.png", *//* "https://i.gyazo.com/thumb/1200/a90c0ad9a932317e08aa9dd34f884faf-png.jpg",
  // if (theAnswer == "https://image.ibb.co/h9OkpS/image.png" || theAnswer == "https://i.gyazo.com/thumb/1200/a90c0ad9a932317e08aa9dd34f884faf-png.jpg") {
  //   const embed = new Discord.RichEmbed()
  //     .setAuthor("Miku -- Quotes")
  //     .setColor(0x795548)
  //     .setImage("https://image.ibb.co/bJHKdn/Capture.png")
  //     .setFooter("© 12042#5754 | Amnesiac#9834", "https://tinyurl.com/MikuLogo");
  //   message.channel.send({
  //     embed
  //   }).then(delete require.cache[require.resolve('./quotes.js')]);
  // }

  // TRUE LOVE
  if (theAnswer == "truelove") {
    const embed = new Discord.RichEmbed()
      .setAuthor("Miku -- Quotes")
      .setColor(0xffebee)
      .setDescription("This is what we call.... \`#TRUELOVE!\` ( 0w0)-b")
      .setImage(`${randomPic}`)
      .setFooter("© 12042#5754 & Lenali/Aidelena#4769");
    message.channel.send({
      embed
    }).then(delete require.cache[require.resolve('./quotes.js')]);
  }

  // NORMAL WITHOUT PARAM
  else {
    const quotesMotiv = quotes.motivate[Math.floor(Math.random() * quotes.motivate.length)];
    if (args[0] == "-m") {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Quotes")
        .setColor(0x795548)
        .setDescription(quotesMotiv)
        .setFooter("© 12042#5754 & Lenali/Aidelena#4769");
      message.channel.send({
        embed
      }).then(delete require.cache[require.resolve('./quotes.js')]);
    } else {
      const embed = new Discord.RichEmbed()
        .setAuthor("Miku -- Quotes")
        .setColor(0x795548)
        .setDescription(theAnswer)
        .setFooter("© 12042#5754 & Lenali/Aidelena#4769");
      message.channel.send({
        embed
      }).then(delete require.cache[require.resolve('./quotes.js')]);
    }
  }
  //
  // // NORMAL QUOTES
  // if (args[0] == "-m") {
  //   const quotesMotiv = quotes.motivate[Math.floor(Math.random() * quotes.motivate.length)];
  //   message.channel.send(quotesMotiv).then(delete require.cache[require.resolve('./quotes.js')]);
  // }
};

exports.conf = {
  aliases: ["quote", "qotd"],
  cooldown: 3
};

exports.help = {
  name: "quotes",
  category: "Misc.",
  description: "Print out great quotes!",
  usage: "quotes [param]",
  param: "\-m  :  motivation",
  aliases: "quote, qotd"
};