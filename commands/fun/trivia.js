// const {Trivia} = require('weky')


// module.exports = {
//     name:'trivia',
//     description:'Plays trivia game',


//     async execute(message,args,client){

//         const difficulty = args.join(" ");


//         if(!difficulty){
//             client.embed(message,{
//                 title:'Difficulty not provided',
//                 description:`${message.author.username} please provide a difficulty, either Easy, Medium, or Hard`,
//                 timestamp: Date.now(),
//                 thumbnail: {
//                     url: message.author.displayAvatarURL({dynamic:true})
//                 },
//                 color:"RANDOM"
//             })
//         }
//         // else if(difficulty.toLowerCase() !== "easy" || difficulty.toLowerCase() !== "medium" || difficulty.toLowerCase() !== "hard"){
//         //     client.embed(message,{
//         //         title:'Invalid Difficulty Provided',
//         //         description:`${message.author.username} please provide a valid difficulty, either Easy, Medium, or Hard`,
//         //         timestamp: Date.now(),
//         //         thumbnail: {
//         //             url: message.author.displayAvatarURL({dynamic:true})
//         //         },
//         //         color:"RANDOM"
//         //     })
//         // }
//         else {
//             await Trivia({
//                     message: message,
//                     embed: { color: "RANDOM", timestamp: true },
//                     difficulty: difficulty,
//                     thinkMessage: 'Please wait....',
//                     winMessage:
//                         'You answered **{{answer}}**....which is correct. You gave the correct answer in **{{time}}**.',
//                     loseMessage: 'Incorrect! The correct answer was **{{answer}}**.',
//                     emojis: {
//                         one: '1️⃣',
//                         two: '2️⃣',
//                         three: '3️⃣',
//                         four: '4️⃣',
//                     },
//                     othersMessage: 'Only <@{{author}}> can use the buttons!',
//                     returnWinner: false,
//             });
//       } 
//     }
// }
