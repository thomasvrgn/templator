export default {

    name: 'reload',
    description: 'Permet de reload une commande en utilisant : t!reload <nom de la commande>',

    run: class {

        constructor (options = {}) {

            if (options.args) this.args = options.args

        }

        command () {

            message.delete()
 
            if(message.author.id != "648619791107620887") return message.channel.send("<:croix:707931190707093548> Vous n'avez pas la permissions.")
         
            if(!args[0]) return message.channel.send("<:croix:707931190707093548> Merci de précisez le nom de la commande à reload.")
         
            let commandName = args[0].toLowerCase();
         
            try {
                delete require.cache[require.resolve(`./${commandName}.js`)]
                bot.commands.delete(commandName)
                const pull = require(`./${commandName}.js`)
                bot.commands.set(commandName, pull)
         
                message.channel.send(`<:tick:707938043746844794> **La commande \`${args[0]}\` à bien été reload.**`).then(m => m.delete(5000))
            }catch(e) {
                return message.channel.send(`<:croix:707931190707093548> Je ne peux pas reload : \`${args[0].toUpperCase()}\``).then(m => m.delete(5000))
            }
        

        }

    }

}


