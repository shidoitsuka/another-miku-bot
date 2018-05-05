// TODO: fix bugs & ask permission from the image author
const number = Math.floor((Math.random() * 40) + 1);
const images = `https://ohlookitsderpy.space/images/miku/image(${number}).jpg`;
const Discord = require('discord.js');
exports.run = function(bot, message, args) {
    const embed = new Discord.RichEmbed()
    .setAuthor("Miku - Images", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png")
    .setColor(0x1a9ca8)
    .setImage(images)
    .setFooter("© 12042#5754 | Images from ohlookitsderpy.space", "https://cdn.discordapp.com/avatars/381018297019269121/6eecdd6f48c7e75239f77a58584f93dd.png");
    message.channel.send({embed});
    message.channel.send(images);
    // unirest.get(`https://contextualwebsearch-websearch-v1.p.mashape.com/api/Search/ImageSearchAPI?q=Donald+Trump&count=1&autoCorrect=false`)
    // .header("X-Mashape-Key", "ZANaJQTbYTmshm6Qbkk0BgVm1wdDp1O52wHjsnQSzlGbMkZJaF")
    // .header("X-Mashape-Host", "contextualwebsearch-websearch-v1.p.mashape.com")
    // .end(function (result) {
    //   console.log(result.status, result.headers, result.body);
    // });
    delete require.cache[require.resolve('./miku.js')];
};
