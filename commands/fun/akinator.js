const {Aki} = require('aki-api');

module.exports = {

    name: 'akinator',
    description: 'Plays Akinator Game',
    async execute(message, args, client){

        const region = 'en';
        const childMode = false;
        const proxy = undefined;

        const aki = new Aki({ region, childMode, proxy });
       
        await aki.start();
    
    // Send the first question
    await message.channel.send(aki.question);

    // Collect the user's answer
    const filter = (m) => m.author.id === message.author.id;
    const collector = message.channel.createMessageCollector(filter);
    
    let invalidAnswer = false;
    collector.on('collect', async (answer) => {
        let userAnswer = " "
        if(answer.content.toLowerCase() ===  'yes' || answer.content.toLowerCase() === 'no') {
            userAnswer = answer.content.toLowerCase()
        }
        else{
            //Do nothing
        }
        console.log(userAnswer)
        // const validAnswers = ['yes', 'no'];
        if(userAnswer.toLowerCase() == "yes"){
            var myAnswer = 0;
        } else if(userAnswer.toLowerCase() == "no"){
            var myAnswer = 1;
        } else {
            if(!invalidAnswer) {
                message.channel.send("please provide a valid answer (yes/no)")
                invalidAnswer = true;
              }
              return;
        }
        invalidAnswer = false;
        await aki.step(myAnswer);
        if(aki.progress >= 70 || aki.currentStep >= 78) {
            await aki.win();
            console.log('firstGuess:', aki.answers);
            console.log('guessCount:', aki.guessCount);
            collector.stop();
            return;
        }
        await message.channel.send(aki.question);
    });

    collector.on('end', collected => {
        console.log('The collector has ended', collected.size);
    });
    }


}


