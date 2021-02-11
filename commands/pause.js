// module.exports = {
//   name:'pause',
//   description: 'pauses music',
//
//   async execute(message, args, client){
//
//     if(!message.member.voice.channel){
//       return message.channel.send('Must be in a vc to use this command')
//     }
//
//     let queue = await client.distube.getQueue(message);
//
//    if(queue){
//     client.distube.stop(message)
//
//     message.channel.send('Music has stopped playing')
//   } else if(!queue){
//     return message.channel.send("No Music Is Playing")
//
//   }
//   }
// }
