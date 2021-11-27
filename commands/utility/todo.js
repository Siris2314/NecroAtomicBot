const { Client, Message, MessageEmbed} = require("discord.js");
const schema = require("../../schemas/todo");

module.exports = {
  name: "todo",
  description:'Todo List',

  async execute(message, args, client){
    const arg0 = args[0];
    if (!arg0){
        const embed = new MessageEmbed()
           .setTitle('ToDo System')
           .setDescription('Welcome To My To Do System, a system made for your daily lazy needs, below is a small guide for this system')
           .addField('Adding Items to List','Usage: !necro todo add <item>')
           .addField('Removing Items from List','Usage: !necro todo remove <item>')
           .addField('Listing Your Items','Usage: !necro todo list')
           .addField('Removing All Items','Usage: !necro todo clear')
           .setColor('#CCCCFF')
           

        message.channel.send({embeds:[embed]})


    }

    const items = args.splice(1).join(" ").split(", ");
    if (!items) return message.channel.send("Item needs to be specified");

    const data = await schema.findOne({
      userID: message.author.id,
    });

    if (arg0 == "add") {
      if (!data) {
        const create = new schema({
          userID: message.author.id,
          todos: items,
        }).save();
        if (create) {
          return message.channel.send(
            "Your data has been successfully created"
          );
        } else {
          return message.channel.send(
            "An error has occurred when trying to save the data"
          );
        }
      } else {
        schema.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $push: {
              todos: items,
            },
          },
          {
            upsert: true,
          },
          function (err, success) {
            if (err) console.error(err);
            else return message.channel.send("Item has been added");
          }
        );
      }
    } else if (arg0 == "remove") {
      if (!data) return message.channel.send("You don't have data yet");
      if (!data.todos.length)
        return message.channel.send("Cannot remove an empty TODOs :/");
      schema.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $pullAll: {
            todos: items,
          },
        },
        function (err, success) {
          if (err) console.error(err);
          else return message.channel.send(`Item has been removed`);
        }
      );
    } else if (arg0 == "list") {
      if (!data) return message.channel.send("You don't have data yet");
      if (!data.todos.length)
        return message.channel.send("Cannot retrieve an empty todos :/");

      schema.findOne({ userID: message.author.id }, function (err, data) {
        if (err) console.error(err);
        const d = data.todos;
        message.channel.send(`**TODOs List:**`);
        d.forEach(function (item, index) {
          return message.channel.send(`\`\`\`\n${index+=1}. ${item}\n\`\`\``);
        });
      });
    }
    else if(arg0 == "clear"){
      if(!data) return message.channel.send("You don't have data yet")
      if (!data.todos.length)
        return message.channel.send("Cannot retrieve an empty todos :/");

        schema.findOneAndDelete({ userID: message.author.id }, function (err, data) {

             message.channel.send(`Your To-Do List has been erased`);

        });


    }
  },
};
