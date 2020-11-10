const Discord = require('discord.js')

module.exports = {


  name: "binary",
  description: "Binary Coverter",


  execute(message,args){

  if(!args[0]){
    return message.channel.send("Unknown parameter");
  }

  let choice = ["encode", "decode"];

  if(!choice.includes(args[0].toLowerCase())){
    return message.channel.send("Unknown Parameter");
  }

  let text = args.slice(1).join(" ");


  if(!text){
    return message.channel.send("Input Text Pls");
  }

  if(text.length > 1024){
    return message.channel.send("Too Much, Let's Relax There")
  }

  function encode(char){
    return char.split("").map(str => {
      const convert = str.charCodeAt(0).toString(2);
      return convert.padStart(8, "0");

    }).join(" ")
  };

  function decode(char){
    return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str,2 ))).join("");
  };

  if(args[0].toLowerCase() == "encode"){
    return message.channel.send(encode(text))
  }else if(args[0].toLowerCase() == "decode"){

    return message.channel.send(decode(text))

  }


 }
}
