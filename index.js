/*//////////////////////////////
      - {Templator 3000} -
/////////////////////////////*/

import Discord from 'discord.js'
import FS      from 'fs'
import ENV     from 'dotenv'
import PATH    from 'path'
import CHALK   from 'chalk'
import FIGLET  from 'figlet'
import BOXEN   from 'boxen'

const CONFIG          = ENV.config().parsed,
      client          = new Discord.Client()
      client.commands = new Discord.Collection()

class TemplatorLoader {

    constructor () {}

    title (callback) {
        console.log(BOXEN(CHALK.grey(FIGLET.textSync('TEMPLATOR', {font: 'Rectangles'})), {padding: 1}))
        callback()
    }

    load () {


        this.title(() => {
            FS.exists(PATH.resolve(PATH.join(__dirname, 'commands')), stats => {

                if (!stats) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'The command folder does not exists.')
            
                FS.readdir(PATH.resolve(PATH.join(__dirname, 'commands')), (error, content) => {
                    if (error) throw error
                    if (content.length < 1) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'No commandes were found in the folder.')

                    console.log('\n • COMMANDS:\n')
            
                    for (const file in content) {
            
                        import(PATH.resolve(PATH.join(__dirname, 'commands', content[file]))).then(values => {
                            const COMMAND   = values.default,
                                    EXEC      = new COMMAND.run()
            
                            let   name      = COMMAND.name,
                                    desc      = COMMAND.description,
                                    category  = COMMAND.category
            
                            if (!name) name = content[file].split('.')[0]
                            if (!desc) desc = 'Some description'  
                            if (!EXEC) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'Command', CHALK.grey.bold(name), 'does not have runnable code.')
                            console.log('  ' + CHALK.bgBlue.bold(' LOADED '), 'Command', CHALK.grey.bold(name), 'has been loaded.')
            
                            // client.commands.set(name, COMMAND, category)
                        }).then(() => {
                            if (parseInt(file) + 1 === content.length) {
                                FS.exists(PATH.resolve(PATH.join(__dirname, 'events')), stats => {
                
                                    if (!stats) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'The events folder does not exists.')
                                
                                    FS.readdir(PATH.resolve(PATH.join(__dirname, 'events')), (error, content) => {
                                        if (error) throw error
                                        if (content.length < 1) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'No events were found in the folder.')

                                        console.log('\n • EVENTS:\n')
                                
                                        for (const file in content) {
                                
                                            import(PATH.resolve(PATH.join(__dirname, 'events', content[file]))).then(values => {
                                                const EVENT     = values.default,
                                                        EXEC      = new EVENT.run
                                                let   name      = EVENT.name
                                
                                                if (!name) name = content[file].split('.')[0]
                                                if (!EVENT.run) return console.log('  ' + CHALK.bgRed.bold(' ERROR '), 'Event', CHALK.grey.bold(name), 'does not have runnable code.')
                                                console.log('  ' + CHALK.bgGreen.grey.bold(' LOADED '), 'Event', CHALK.grey.bold(name), 'has been loaded.')
                                                // client.on(name, EXEC.event.bind(null, client))
                                            }).then(() => {
                                                if (parseInt(file) + 1 === content.length) {
                                                    console.log('\n  ' + CHALK.bgCyan.grey(' SUCCESS '), 'Commands and events were loaded.')
                                                }
                                            })
                                
                                        }
                                    })
                                
                                })
                            }
                        })
            
                    }
                })
            
            })
        })
        
        
    }

}

new TemplatorLoader().load()

client.login(CONFIG.TOKEN)
