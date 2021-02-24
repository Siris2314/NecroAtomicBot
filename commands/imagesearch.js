const img = require('images-scraper')

const google = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

module.exports = {
    name : 'imagesgoogle',
    description:'Searches Images on Google',
    async execute(message, args,client){
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}
