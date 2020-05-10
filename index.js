/*//////////////////////////////
      - {Templator 3000} -
/////////////////////////////*/

import Discord from 'discord.js'
import FS      from 'fs'
import ENV     from 'dotenv'
import PATH    from 'path'

const CONFIG = ENV.config().parsed,
      client = new Discord.Client()

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
                      desc      = COMMAND.description

                if (!name) name = content[file].split('.')[0]
                if (!desc) desc = 'Some description'  
                if (!EXEC) throw new Error ('Command', name, 'does not have runnable code!')
                
                console.log(EXEC)

                console.log(name, desc, typeof COMMAND.run)
            })

        }
    })

})

client.login(CONFIG.TOKEN)
