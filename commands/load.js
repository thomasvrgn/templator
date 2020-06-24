import PATH from 'path'
import { Permissions } from 'discord.js'

export default {

    name        : 'load',
    description : 'Permet de charger une template : t!load <ID>',
    category    : 'test',

    run         : class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {

            import(PATH.resolve(PATH.join(__dirname, '..', 'templates', this.args[0]))).then(value => {
                const channels = value.channels,
                      roles    = value.roles

                for (const role of roles) {
                    const permissions = new Permissions(role.permissions).serialize(),
                          perm_list   = Object.keys(permissions).filter((x, index) => Object.values(permissions)[index] === true)
                    if (role.name === '@everyone') {
                        this.message.guild.defaultRole.setPermissions(perm_list)
                    } else {
                        this.message.guild.createRole({
                            name        : role.name,
                            color       : role.color,
                            position    : role.position,
                            permissions : perm_list,
                            mentionable : role.mentionable
                        })
                    }


                }

                for (const item of channels) {
                    if (item.type === 'category') {
                        this.message.guild.createChannel(item.name, {type: item.type, permissionOverwrites : item.permissions}).then(category => {
                            for (const channel of item.children) {
                                this.message.guild.createChannel(channel.name, {
                                    type                 : channel.type,
                                    parent               : category.id,
                                    permissionOverwrites : channel.permissions
                                })
                            }
                        })
                    } else {
                        this.message.guild.createChannel(item.name, {
                            type                 : item.type, 
                            permissionOverwrites : item.permissions
                        })
                    }
                }
                
            }).catch(error => {
                this.message.channel.send('```' + error + '```')
            })
            

        }

    }

}


