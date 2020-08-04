const sayings = [
  "Say that you want me every day\nThat you want me every way\nThat you need me",
  "You love me.",
  "I dont mind having s** with your dead body",
  "I love you so much, don't make me kill you",
  "Choose me and live, or choose her and die",
  "I'm the only one you need",
  "Your future belongs to me",
  "I'm crazy?!\nWhat's crazy is that this world refuses to let me be with you!!!",
  "Every bloody bit of your soul\nIs mine.",
  "Let me cut your hands so i can hold it forever",
  "IF I CANNOT HAVE YOU, THEN NO ONE CAN!"
];

exports.run = (bot, message, args) => {
  const answer = sayings.random();
  message.channel.send(answer);
};

exports.conf = {
  aliases: [],
  cooldown: 1.5,
  guildOnly: false,
  userPerm: [""],
  botPerm: [""]
};

exports.help = {
  name: "yandere",
  category: "Fun",
  description: "This is how yandere person prove their love!",
  usage: "yandere",
  param: ""
};
