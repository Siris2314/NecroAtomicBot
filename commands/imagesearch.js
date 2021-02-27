
var Scraper = require('images-scraper');


const google = new Scraper({

  puppeteer: {
    headless: true
  }
})


module.exports = {
  name:'images',
  description:'Sends images from google',

  async execute(message, args,client){
    const image_query = args.join(' ');
    if(!image_query){
      return message.channel.send('Please enter an image name')
  }

  const image_results = await google.scrape(image_query, 1);
  message.channel.send(image_results[0].url);
}

const img = require('images-scraper')

const google = new img({
    puppeteer : {
        headless : true,
    }
})

module.exports = {
    name : 'googleimages',
    description:'Searches Images on Google',
    async execute(message, args,client){
        const query = args.join(" ")
        if(!query) return message.channel.send('Please enter a search query')

        const results = await google.scrape(query, 1)
        message.channel.send(results[0].url);
    }

}
