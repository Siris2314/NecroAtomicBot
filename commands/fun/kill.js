module.exports = {
    name:'kill',
    description:'Kill another user(is for fun)',

    async execute(message, args, client){

    if (!args[0]) return message.channel.send(`Wow, that was great..But who do I kill?`)
    let userr = message.mentions.users.first() || message.author;
    if (!userr) return message.channel.send(`Wow, that was great..But who do I kill?`)
    let user = userr.username;
    const answers = [
      `${message.author.username} sat on ${user}, as the other sadly *suffocated*`,
      `${user} dies from dancing too hard`,
      `${user} died from a heart attack`,
      `${user} died from not eating much ass`,
      `..Noo, ${message.author.username} killed them right away, ${user} seems really nice.. why them`,
      `${user} went to fight ${message.author.username}, but got **knocked** out on first round  `,
      `${user} tripped and sadly died`,
      `${user} was begging for forgiveness, but ${message.author.username} killed them right away`,
      `${user} died from aids`,
      `${message.author.username} couldn't handle ${user}'s stupidity, so they shot them`,
      `${user} died while climbing the wall of China`,
      `${user} died while *robbing* a bank`,
      `${user} died while studying history`,
      `${message.author.username} sat on ${user} killing thrm`,
      `${message.author.username} slapped ${user}.. rip`,
      `${user} is just too weak to handle this`,
      `Necro sat on ${user}, the other sadly *suffocated*`,
      `Necro slapped  ${user}.. rip }`,
      `${message.author.username} crushes ${user} with a microwave`,
      `${user} starved to death`,
      `Sorry ${message.author.username}, ${user} seems really innocent`,
      `${user} seems too nice, I can't `,
      `${user} got hit by a car `,
    ]
    if (userr.id === message.author.id) return message.channel.send(`Are you Ok?`)
    message.channel.send(`${answers[Math.floor(Math.random() * answers.length)]}`)

    }
}