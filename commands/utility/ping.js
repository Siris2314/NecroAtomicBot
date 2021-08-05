
const { MessageEmbed,MessageAttachment } = require('discord.js');
const { CanvasRenderService } = require('chartjs-node-canvas');
const pingChart = require('../../schemas/pingschema');


module.exports = {

    name:'ping',
    description:"Returns Ping Graph",
    
    async execute(message, args,client) {
        client = message.client;
        const canvas = new CanvasRenderService(1920, 1080, (chart) => {
          chart.defaults.global.defaultFontFamily = "Roboto";
          chart.defaults.color = "#000";
        });

          canvas.registerFont(
            './assets/Roboto-Black.ttf',
            {
              family: "Roboto"
            }
          );
      
        let msg = await message.channel.send(`:white_check_mark: __***PONG***__`);
        const currentMsgPing = Date.now()-msg.createdTimestamp;
        const displayResult = await pingChart.find({}).sort({time:1}).limit(60);
        const displayTime = displayResult.map(r=>new Date(r.time).toLocaleString());
        const displayPing = displayResult.map(r=>r.ping);
        const displayMsgPing = displayResult.map(r=>r.msgPing);

        // console.log(displayPing);
        // console.log(displayMsgPing);
        const image = await canvas.renderToBuffer(
          {
            type: "line",
            data: {
              labels: displayTime,
              datasets: [
                {
                  label: "API Latency",
                  data: displayPing,
                  backgroundColor: ['rgb(255, 0, 0)'],
                  borderColor: ['rgb(255, 0, 0)'],
                  borderWidth: 5,
                  pointRadius: 0,
                  tension: 0.1
                },
                   {
                  label: "Message Latency",
                  data: displayMsgPing,
                  backgroundColor: ['rgb(30,144,255)'],
                  borderColor: ['rgb(30,144,255)'],
                  borderWidth: 5,
                  pointRadius: 0,
                  tension: 0.1
                }
              ]
            },
            plugins: [
              {
                id: "white_background_color",
                beforeDraw: (chart) => {
                  const ctx = chart.canvas.getContext("2d");
                  ctx.save();
                  ctx.globalCompositeOperation = "destination-over";
                  ctx.fillStyle = "white";
                  ctx.fillRect(0, 0, chart.width, chart.height);
                  ctx.restore();
                }
              }
            ],
            options: {
              plugins: {
                title: {
                  display: true,
                  text: `Current Latency: Api-${Math.round(client.ws.ping)}ms | Message-${currentMsgPing}ms`,
                  font: { size: 40 }
                },
                legend: {
                  position: "bottom",
                  labels: { boxHeight: 3, font: { size: 20 } }
                }
              },
              scales: { yAxes: { ticks: { precision: 0 } } }
            }
          },
          "image/png"
        );


          msg.edit(`:white_check_mark: __***PONG***__ *|* *See down below!*`)
          return msg.channel.send(new MessageAttachment(image, "ping.png"))
}
}
