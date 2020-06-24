import Discord from 'discord.js'
import FS      from 'fs'
import PATH    from 'path'

export default {

    name        : 'add',
    description : 'Générer puis enregistrer le template : t!add <nom>',
    category    : 'Fun',

    run         : class {

        constructor (client, message, args) {

            this.client   = client
            this.message  = message
            this.args     = args
            this.template = {
                channels : [],
                roles    : []
            }

        }

        command () {

            for (const channel of this.message.guild.channels) {

                const informations = channel[1],
                      id           = (([...informations.name].map(x => x.charCodeAt()).reduce((acc, cur) => acc + cur) << 19).toString(36))
                
                if (informations.type === 'category') {

                    this.template.channels.push({
                        name        : informations.name,
                        type        : informations.type,
                        id          : id,
                        channelID   : informations.id,
                        permissions : informations.permissionOverwrites,
                        children    : []
                    })

                } else {

                    if (informations.parentID) {

                        this.template.channels[this.template.channels.indexOf(this.template.channels.filter(x => x.channelID === informations.parentID)[0])].children.push({
                            name        : informations.name,
                            type        : informations.type,
                            id          : id,
                            channelID   : informations.id,
                            permissions : informations.permissionOverwrites
                        })

                    } else {

                        this.template.channels.push({
                            name        : informations.name,
                            type        : informations.type,
                            id          : id,
                            channelID   : informations.id,
                            permissions : informations.permissionOverwrites
                        })

                    }

                }

            }

            for (const role of this.message.guild.roles) {

                const informations = role[1]

                this.template.roles.push({
                    name        : informations.name,
                    id          : informations.id,
                    color       : informations.color,
                    position    : informations.position,
                    permissions : informations.permissions,
                    mentionable : informations.mentionable
                })

            }

            FS.exists(PATH.resolve('templates'), bool => {
                
                if (!bool) return

                FS.writeFile(PATH.resolve(PATH.join('templates', (([...this.args[0]].map(x => x.charCodeAt()).reduce((acc, cur) => acc + cur) << 19).toString(36)) + '.js')), 'module.exports=' + JSON.stringify(this.template) + '', error => {
                    if (error) throw error
                })

            })


        }

    }

}
