const img = require('images-scraper')


module.exports = {
    name : 'imagesgoogle',
    description:'Searches Images on Google',
    async execute(message, args,client){

        const google = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }
}
