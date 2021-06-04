const { Calculator } = require('weky')

module.exports = {
    name:'calculator',
    description:'Calculator with buttons',

    async execute(message,args,client){

        await Calculator(message)
    }


}