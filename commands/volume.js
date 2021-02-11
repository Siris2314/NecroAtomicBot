// module.exports = {
//   name:'volume',
//   description: 'sets volume of music',
//
//   async execute(message, args, client){
//
//     if(!message.member.voice.channel){
//       return message.channel.send('Must be in a vc to use this command')
//     }
//
//
//     const cmd = args[1].shift(' ');
//
//     let queue = await client.distube.getQueue(message);
//
//    if(queue){
//     client.distube.setVolume(message, cmd)
//
//     message.channel.send(`Volume changed to ${cmd}`)
//   } else if(!queue){
//     return message.channel.send("No Music Is Playing")
//
//   }
//   }
// }
