const Jimp = require('jimp');
const diff = require('color-diff');
const twemoji = require('twemoji');


emojiRgb = [
            {R: 255, G: 255, B: 255, E: ":white_large_square:"},    // white
            {R: 0, G: 0, B: 0, E: ":black_large_square:"},          // black
            {R: 255, G: 0, B: 0, E: ":red_circle:"},                // red
            {R: 0, G: 255, B: 0, E: ":green_heart:"},               // green
            {R: 0, G: 0, B: 255, E: ":blue_heart:"},                // blue
            {R: 253, G: 203, B: 88, E: ":yellow_heart:"},           // yellow
            {R: 154, G: 78, B: 28, E: ":briefcase:"},               // brown
            {R: 102, G: 117, B: 127, E: ":new_moon:"},              // gray
            {R: 146, G: 102, B: 204, E: ":star_of_david:"},         // purple
            {R: 89, G: 142, B: 60, E: ":green_apple:"},             // pepe green
            {R: 92, G: 172, B: 235, E: ":blue_circle:"}             // tears blue
           
        ];

module.exports = {
    name: "emojipic",
    description: "Create a picture of an emoji",

    async execute(message, args, client) {


        if(args.length < 1){
            message.channel.send(":warning: Need one argument. A custom emoji or image url.");
            return;
        }
      
        var emojiName = args[0].split(":")[1];  
    
       const emoji = client.emojis.resolve(emojiName);
        var url = "";
        if(!emoji){
            
            if(args[0].endsWith(".png") || args[0].endsWith(".jpg")){
                url = args[0];
            }else{
              
                var text = twemoji.parse(args[0]);
                if(!text.startsWith("<img")){
                    message.channel.send("Error. Only works with custom emojis from this guild / default emojis / png or jpg urls.");
                    return;
                }
                var pos = text.indexOf("src");
                text = text.substring(pos + 5);
                text = text.substring(0, text.length - 3);
                url = text;
            }
        }
       
        if(url == ""){
            url = emoji.url;
            message.channel.send(url);
        }else{
            message.channel.send("Generating..");
        }
        var palette = [];
        for(var i = 0; i < emojiRgb.length; i++){
            var obj = {
                R: emojiRgb[i].R,
                G: emojiRgb[i].G,
                B: emojiRgb[i].B,
            }
            palette.push(obj);
        }
        var transColors = [];
        var imgName = "images/emoji.png";
        Jimp.read(url, (err, img) => {
            if(err){
                message.channel.send("Error. Could not read image.");
                return;
            }
            img
                .resize(30, 30)
                .write(imgName, () => {
                   
                    Jimp.read(imgName, (err, img) => {
                        if(err) throw err;
                        for(var i = 0; i < 30; i++){
                            for(var j = 0; j < 30; j++){
                                var hex = img.getPixelColor(j, i);
                                var rgb = Jimp.intToRGBA(hex);
                                var color = {
                                    R: rgb.r,
                                    G: rgb.g,
                                    B: rgb.b
                                };
                                transColors.push(diff.closest(color, palette));
                            }
                        }
                       
                        var results = [];
                        for(var i = 0; i < transColors.length; i++){
                            var e2 = Object.values(transColors[i]);
                            for(var j = 0; j < emojiRgb.length; j++){
                                var e1 = Object.values(emojiRgb[j]).slice(0, -1);
                                var e3 = false;
                                if(e1[0] == e2[0] && e1[1] == e2[1] && e1[2] == e2[2]) e3 = true;
                                if(e3){
                                    results.push(emojiRgb[j].E);
                                    break;
                                }
                            }
                        }
                      
                        for(var mul = 0; mul < 10; mul++){
                            var string1 = "";
                            var string2 = "";
                            var string3 = "";
                            var base = 90 * mul;
                            for(var i = 0; i < 30; i++){
                                string1 += results[i + base];
                                string2 += results[i + 30 + base];
                                string3 += results[i + 60 + base];
                            }
                            message.channel.send(string1 + "\n" + string2 + "\n" + string3);
                        }
                    });
                });
        });
        }
    }