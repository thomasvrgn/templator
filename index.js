/*//////////////////////////////
      - {Templator 3000} -
/////////////////////////////*/

import Discord from 'discord.js'
import FS      from 'fs'
import ENV     from 'dotenv'
import PATH    from 'path'

const CONFIG          = ENV.config().parsed,
      client          = new Discord.Client()
      client.commands = new Discord.Collection()

FS.exists(PATH.resolve(PATH.join(__dirname, 'commands')), stats => {
    
    if (!stats) throw new Error ('Command folder does not exist!')

    FS.readdir(PATH.resolve(PATH.join(__dirname, 'commands')), (error, content) => {
        if (error) throw error
        if (content.length < 1) throw new Error ('There are no commands in the folder!')

        for (const file in content) {

            import(PATH.resolve(PATH.join(__dirname, 'commands', content[file]))).then(values => {
                const COMMAND   = values.default,
                      EXEC      = new COMMAND.run()

                let   name      = COMMAND.name,
                      desc      = COMMAND.description,
                      category  = COMMAND.category

                if (!name) name = content[file].split('.')[0]
                if (!desc) desc = 'Some description'  
                if (!EXEC) throw new Error ('Command', name, 'does not have runnable code!')

                client.commands.set(name, COMMAND, category)
            })

        }
    })

})

FS.exists(PATH.resolve(PATH.join(__dirname, 'events')), stats => {
    
    if (!stats) throw new Error ('Command folder does not exist!')

    FS.readdir(PATH.resolve(PATH.join(__dirname, 'events')), (error, content) => {
        if (error) throw error
        if (content.length < 1) throw new Error ('There are no commands in the folder!')

        for (const file in content) {

            import(PATH.resolve(PATH.join(__dirname, 'events', content[file]))).then(values => {
                const EVENT     = values.default,
                      EXEC      = new EVENT.run
                let   name      = EVENT.name

                if (!name) name = content[file].split('.')[0]
                if (!EVENT.run) throw new Error ('Event ' + name + ' does not have runnable code!')
                client.on(name, EXEC.event.bind(null, client))
            })

        }
    })

})

client.login(CONFIG.TOKEN)
