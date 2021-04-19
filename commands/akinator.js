// const {Aki} = require('aki-api')
// const{list, verify} = require("../functions.js")
// const Discord = require('discord.js')
// const regions = ["person", "object", "animal"]
// module.exports = {
//     name:'akinator',
//     description: 'Akinator Genie',
//     async execute(message,args, client){

//         if(!message.channel.permissionsFOr(client.user).has("EMBED_LINKS")) return message.channel.send(`Need [EMBED LINK] Perms`)
//         if(!args[0]) return message.channel.send(`Please provide the category!\nEither \`${list(regions, "or")}\``)

//         let inputAki = args[0].toLowerCase();
//         let region;
//         if((inputAki === "person").toLocaleLowerCase()) region = "en";
//         if((inputAki === "object").toLocaleLowerCase()) region = "en_objects";
//         if((inputAki === "animal").toLocaleLowerCase()) region = "en_animals"

//         if(!regions.includes(inputAki)) return message.channel.send("Please provide a valid category")

//         message.channel.send("Please wait......").then((m) => m.delete({timeout:4000}));

//         try{
//             const aki = new Aki(region);
//             let ans = null;
//             let win = false;
//             let timeGuessed = 0;
//             let guessResetNum = 0;
//             let wentBack = false;
//             let forceGuess = false;
//             const guessBlacklist = [];
//             while(timeGuessed < 3){
//                 if(guessResetNum > 0) guessResetNum--;
//                 if(ans === null){
//                     await aki.start();
//                 } else if(wentBack){
//                     wentBack = false;
//                 } else {
//                     try{
//                         await aki.step(ans)
//                     } catch(err){
//                         console.log(err);
//                         await aki.step(ans)
//                     }
//                 }
//                 if(!aki.answers || aki.currentStep >= 79) forceGuess = true;
//                 const answers = aki.answers.map((answer) => answer.toLowerCase())
//                 answers.push("end");

//                 if(aki.currentStep > 0) answers.push("back");
//                 const embed = Discord.MessageEmbed()
//                  .setAuthor(`Question Number: `)


//             }


//         } catch(err){

//         }





        

//     }
// }