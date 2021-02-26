// const Jumble = require("jumble-words");
// const jumble = new Jumble();
//
// module.exports = {
//   name:'jumble',
//   description:'creates a jumble word game',
//
//   async execute(message,args,client){
//
//     const word = jumble.generate();
//     const filter = m => m.author.id == message.author.id;
//
//     await message.channel.send(`Your word is **${word[0].jumble}**`)
//
//     message.channel.awaitMessages(filter ,{
//       max:1,
//       error:['time'],
//       time:15000
//     })
//     .then(collected => {
//         const m = collected.first()
//         if (m.content.toLowerCase() !== word[0].word.toLowerCase()) return message.channel.send(`❌ | Invalid word! Correct word was **${word[0].word}**!`);
//         return message.channel.send(`✅ | Correct guess! The word was **${word[0].word}**.`);
//       })
//     .catch(() => {
//         message.channel.send(`❌ | You did not answer in time. The correct word was **${word[0].word}**!`);
//       })
//   }
}
