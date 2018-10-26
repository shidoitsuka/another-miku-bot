exports.run = (bot, message, args) => {
  if (!args[0]) return message.channel.send("Invalid Format!");
  let fileSize, speed, eta;
  const kilobyte = args[0].toLowerCase().indexOf("kb") != -1;
  const megabyte = args[0].toLowerCase().indexOf("mb") != -1;
  const gigabyte = args[0].toLowerCase().indexOf("gb") != -1;
  if (kilobyte) {
    fileSize = Number(args[0].substring(0, args[0].toLowerCase().indexOf("kb")));
    if (isNaN(fileSize)) return message.channel.send("Can\'t calculate that!");
    speed = Number(args[1]);
    eta = fileSize / speed;
  }
  if (megabyte) {
    fileSize = Number(args[0].substring(0, args[0].toLowerCase().indexOf("mb")));
    if (isNaN(fileSize)) return message.channel.send("Can\'t calculate that!");
    speed = Number(args[1]);
    eta = fileSize / speed;
  }
  if (gigabyte) {
    fileSize = Number(args[0].substring(0, args[0].toLowerCase().indexOf("gb")));
    if (isNaN(fileSize)) return message.channel.send("Can\'t calculate that!");
    speed = Number(args[1]);
    eta = fileSize / speed;
  }
  message.channel.send(`Around ${eta} second(s).`);
};

exports.conf = {
  aliases: [],
  cooldown: 2
};

exports.help = {
  name: "eta",
  category: "Util.",
  description: "Let me calculate your download time!",
  usage: "eta <file-size>[gb] or [mb] or [kb] <net-speed-in-kilobye-per-second>",
  param: "",
  aliases: ""
};