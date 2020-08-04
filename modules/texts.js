const texts = {
  AFKWelcome: message => {
    return [
      `Welcome Back **${message.author.username}**!`,
      `Hi again! I\'ve turned off your AFK mode, **${message.author.username}**`,
      `Okaerinasai, **${message.author.username}**! (UωU)`,
      `I-I-It\'s not like I\'m happy because you\'re back, b-b-baka **${message.author.username}**!`,
      `I-It\'s not like I wanted to greet you because you just came back, baka!`
    ].random();
  },
  AFKMentioned: () => {
    return [
      "They said: ",
      "If I remember it correctly, they said: ",
      "They told me to say: "
    ].random();
  },
  MikuMentionedEmojis: () => {
    // prettier-ignore
    return ["(#^ω^#)", "(✿ꈍ。 ꈍ✿)", "(灬ºωº灬)♡", "(UωU)", "(OωO)", "(O///ω///O)", "(U///ω///U)"].random();
  },
  MikuMentionedTexts: (bot, message) => {
    // prettier-ignore
    return [`M-my prefix is \`${bot.db.get("guildConf", message.guild.id + ".prefix")}\``, "Miku desu!", "Hi!"].random();
  },
  CooldownTexts: message => {
    return [
      `O//w//O I-I-I\'m Getting Dizzy!\n_(cooling down)_`,
      `Can you like.... **wait** for few seconds? UwU`,
      `**${message.author.username}**-kun, **please wait** UwU`,
      `I-I-It\'ts not like I\'m on **cooldown** or something, b-b-baka! >///<`,
      `Cooling down UwU`,
      `Just a 'lil bit more, **${message.author.username}**`
    ].random();
  },
  EightballTexts: () => {
    return [
      "Try again later (〜￣▽￣)〜",
      "I-i don't know (UwU)",
      // positives
      "Yessu!",
      "Of course! OwO)-b",
      "Seems like a yes `(OwO)`",
      "Errr yes, probably?",
      // negatives
      "No",
      "Nyuu, Baka! >w<",
      "Don't count on it ƪ(˘⌣˘)ʃ",
      "I haven't been programmed to know that yet (⌯˃̶᷄ ﹏ ˂̶᷄⌯)ﾟ"
    ].random();
  },
  CatDogNameEmojis: () => {
    return [
      "OwO",
      "( 0w0)-b",
      "😁",
      "😌",
      "😳",
      "🐱",
      "😆",
      "👌",
      "😙"
    ].random();
  }
};
module.exports = texts;
