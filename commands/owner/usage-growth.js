const Chart = require('@clashperk/quickchart');
require('dotenv').config()

const ownerid = process.env.ownerid;



const months = [
	'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
const { Permissions, MessageAttachment } = require('discord.js');

const { botGrowth, commandUsage } = require('../../schemas/commandusage');


module.exports = {
	name: 'usage-growth',
	description: 'Gives info about the bot',
    async execute(message,args,client) {


        if(!message.member.id === ownerid) return message.channel.send('Owner Only Command')
	
	
		const [min, max] = [15, 90];
		const limit = Math.max(Math.min(Number(args[0]) || 15, max), min);
		const collection = await commandUsage.find({ timestamp: { $gte: new Date(Date.now() - ((limit + 1) * 24 * 60 * 60 * 1000)) } })
			.sort({ timestamp: 1 });

		const buffer = await this.graph(collection.slice(-limit).map(usage => ({ date: new Date(usage.timestamp), value: usage })));

		const file = new MessageAttachment(buffer, 'usage-growth.png');
		return message.channel.send({ files: [file] });
	},

	graph(collection = []) {
		const total = collection.reduce((pre, curr) => Number(pre) + Number(curr.value.uses), 0);
		const body = {
			backgroundColor: 'white',
			width: 500,
			height: 300,
			devicePixelRatio: 2.0,
			format: 'png',
			chart: {
				type: 'bar',
				data: {
					labels: [...collection.map(d => `${months[d.date.getMonth()]} ${d.date.getDate()}`)],
					datasets: [
						{
							type: 'bar',
							label: 'Addition',
							backgroundColor: '#36a2eb80',
							borderColor: '#36a2eb',
							data: [...collection.map(d => d.value.uses)]
						}
					]
				},
				options: {
					responsive: false,
					legend: {
						position: 'top',
						display: true,
						labels: {
							fontSize: 10,
							padding: 4
						}
					},
					title: {
						display: true,
						fontSize: 10,
						padding: 2,
						text: [`Total ${total} | Usage Growth (${collection.length}D)`]
					}
				}
			}
		};

		return Chart.render(body.width, body.height, body.backgroundColor, body.devicePixelRatio, body.chart);
	}
};

