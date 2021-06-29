let canvas = require('canvas');

module.exports = {
    name:'year',
    description:'Displays Year So Far',

    async execute(message,args,client){
        let date = message.createdAt;
        let cy = date.getUTCFullYear();
        let notLeap = cy % 4; 
        function getProgress(d){
            let full = 31536000;
            let total = 0;
            if (!notLeap){
                full += 86400;
                if (d.getUTCMonth() >= 2) total += 86400;
            }
            let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30];
            total += monthDays.slice(0, d.getUTCMonth()).reduce((a, b) => a + b, 0) * 86400;
            total += (d.getUTCDate()-1) * 86400;
            total += d.getUTCHours() * 3600;
            total += d.getUTCMinutes() * 60;
            total += d.getUTCSeconds();
            return total * 100 / full;

            
            
        }
        function round(n, k){
            let factor = 10**k;
            return Math.round(n*factor)/factor;
        }
        let cv = canvas.createCanvas(400, 40);
        let ctx = cv.getContext('2d');
        ctx.fillStyle = '#000000'; ctx.fillRect(0, 0, 400, 40); 
        ctx.fillStyle = '#747f8d'; ctx.fillRect(5, 5, 390, 30); 
        ctx.fillStyle = '#43b581'; ctx.fillRect(5, 5, (Math.floor(390/100 * getProgress(date))), 30); 
        message.channel.send(`**${cy}** is **${round(getProgress(date), 13)}%** complete.`, {files:[ {attachment: cv.toBuffer(), name: 'yearprogress.jpg'} ]});
    }
}