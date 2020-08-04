exports.run = async (bot, message, args) => {
  const filter = m => message.author.id === m.author.id;
  await message.channel.send("Nama :");
  message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
		.then((responNama) => {
      let nama, region;
      nama = responNama.first().content;
			message.channel.send(`Halo ${nama}, kita lanjut ya!\nRegion anda?`);
      message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] }).then((responRegion) => {
        region = responRegion.first().content;
        message.channel.send(`${nama} dari ${region}, terima kasih sudah berpartisipasi!`);
      }).catch((e) => {
			  message.channel.send(e + '\nTimed out. Ulang ya!');
		  });
		})
		.catch((e) => {
			message.channel.send(e + 'Timed out. Ulang ya!');
		});
};

exports.conf = {
  aliases: ["t"],
  cooldown: 1,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "test",
  category: "Owner",
  description: "!",
  usage: "",
  param: ""
};
