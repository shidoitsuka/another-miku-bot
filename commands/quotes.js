const Discord = require('discord.js');
var answers = [
    "https://image.ibb.co/bJHKdn/Capture.png",
    "\`ur mom\`\n\`-Aere\`"
];
var theAnswer = answers[Math.floor(Math.random() * answers.length)];
exports.run = function(bot, message, args) {
    if (theAnswer == "https://image.ibb.co/bJHKdn/Capture.png") {
        const embed = new Discord.RichEmbed()
            .setAuthor("Miku -- Quotes", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
            .setColor(0x1a9ca8)
            .setImage("https://image.ibb.co/bJHKdn/Capture.png")
            .setFooter("© 12042#5754", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
        message.channel.send({embed});
    } else {
        message.channel.send(theAnswer);
    }
    delete require.cache[require.resolve('./quotes.js')];
};

exports.conf = {
    aliases: [
        "quote",
        "qotd"
    ]
};

exports.help = {
    name: "quotes",
    category: "fun",
    description: "Print out great quotes!",
    usage: "quotes"
};
