import Config from '../config'

export default {
    name: 'message',

    run: class {

        constructor () {}

        async event (client, message) {

            if (message.author.bot) return
            if (!message.content) return

            const destructured      = message.content.split(' '),
                  command           = destructured.shift()

            if (!command.startsWith(Config.prefix)) return

            const command_no_prefix = command.slice(Config.prefix.length, command.length).toLowerCase(),
                  bot_cmd           = client.commands.get(command_no_prefix)

            if (!bot_cmd) return

            const cmd = new bot_cmd.run(client, message, destructured.slice(0))

            cmd.command()
            

        } 

    }
}