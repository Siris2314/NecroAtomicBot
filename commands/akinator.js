const {Aki} = require('aki-api')
const{list, verify} = require("../functions.js")
const Discord = require('discord.js')
const regions = ["person", "object", "animal"]
module.exports = {
    name:'akinator',
    description: 'Akinator Genie',
    async execute(message,args, client){

        if(!message.channel.permissionsFor(client.user).has("EMBED_LINKS")) return message.channel.send(`Need [EMBED LINK] Perms`)
        if(!args[0]) return message.channel.send(`Please provide the category!\nEither \`${list(regions, "or")}\``)

        let inputAki = args[0].toLowerCase();
        let region;
        if(inputAki === "person".toLocaleLowerCase()) region = "en";
        if(inputAki === "object".toLocaleLowerCase()) region = "en_objects";
        if(inputAki === "animal".toLocaleLowerCase()) region = "en_animals"

        if(!regions.includes(inputAki)) return message.channel.send("Please provide a valid category")

        message.channel.send("Please wait......").then((m) => m.delete({timeout:4000}));

        try{
            const aki = new Aki(region);
            let ans = null;
            let win = false;
            let timeGuessed = 0;
            let guessResetNum = 0;
            let wentBack = false;
            let forceGuess = false;
            const guessBlacklist = [];
            while(timeGuessed < 3){
                if(guessResetNum > 0) guessResetNum--;
                if(ans === null){
                    await aki.start();
                } else if(wentBack){
                    wentBack = false;
                } else {
                    try{
                        await aki.step(ans)
                    } catch(err){
                        console.log(err);
                        await aki.step(ans)
                    }
                }
                if(!aki.answers || aki.currentStep >= 79) forceGuess = true;
                const answers = aki.answers.map((answer) => answer.toLowerCase())
                answers.push("end");

                if(aki.currentStep > 0) answers.push("back");
                const embed = new Discord.MessageEmbed()
                 .setAuthor(`Question Number ${aki.currentStep + 1} `, client.user.avatarURL())
                 .setDescription([
                     `${aki.question}`,
                     `Available Answers:`,
                     `**${aki.answers.join(" | ")}${aki.currentStep > 0 ? ` | Back` : "" } | End **`
                 ])
                 .setColor("RANDOM")
                 await message.channel.send(embed);
                 const filter = (res) => res.author.id === message.author.id && answers.includes(res.content.toLowerCase())
                 const messages = await message.channel.awaitMessages(filter, {
                     max:1,
                     time:30000
                 });
                 if(!messages.size){
                     await message.channel.send("Time up!")
                     win = true;
                     break;
                 }
                 const choice = messages.first().content.toLowerCase()
                 if(choice.toLowerCase() == "end".toLocaleLowerCase()){
                     forceGuess = true;
                 } else if(choice.toLowerCase() === "back".toLocaleLowerCase()){
                     wentBack = true;
                     await aki.back();
                     continue;
                 } else {
                     ans = answers.indexOf(choice)
                 }
                 if((aki.progress >= 90 && !guessResetNum) || forceGuess){
                     timeGuessed++;
                     guessResetNum += 10;
                     await aki.win();
                     const guess = aki.answers.filter((g) => !guessBlacklist.includes(g.id))[0]
                     if(!guess){
                         await message.channel.send("I cannot think anyone")
                         win = true;
                         break;
                     }
                     guessBlacklist.push(guess.id);
                     const embed = new Discord.MessageEmbed()
                       .setColor("RANDOM")
                       .setTitle(`I'm ${Math.round(guess.proba * 100)}% sure its`)
                       .setDescription(`${guess.name}${guess.description ? `\nProfession - ${guess.description}` : ""}\nRanking: ${guess.ranking} \nType yes/no to confirm or deny`)
                       .setImage(guess.absolute_picture_path || null)
                       await message.channel.send(embed);
                       const verification = await verify(message.channel, message.author)
                       if(verification === 0){
                           win = "time";
                           break;
                       } else if(verification){
                           win = false;
                           break;
                       } else {
                           const exmessage = timeGuessed >= 3 || forceGuess ? "I give up!" : "I can keep going";
                           const embed = new Discord.MessageEmbed()
                            .setDescription([`Is that so? ${exmessage}`])
                            .setColor("RANDOM")
                           await message.channel.send(embed);
                           if(timeGuessed >= 3 || forceGuess){
                               win = true;
                               break;
                           }
                       }

                 }


            }
            if(win === "time") return message.channel.send("I guess your silence means I have won")
            if(win){
                const embed = new Discord.MessageEmbed()
                 .setDescription("You have defeated me this time")
                 .setColor("RANDOM")
                return message.channel.send(embed)
            } else{
                return message.channel.send("Guessed it right once again")
            }


        } catch(err){
            console.log(err)
            return message.channel.send(`Error found ${err.message}`)

        }





        

    }
}