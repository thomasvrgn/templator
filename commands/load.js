import PATH from 'path'
import Discord from 'discord.js'

export default {

    name        : 'load',
    description : 'Permet de charger une template : t!load <ID>',
    category    : '• Utilitaire',

    run         : class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {
            
            const embed = new Discord.RichEmbed()
                                     .setFooter('Demandé par ' + this.message.author, this.message.author.avatarURL)
                                     .setAuthor(this.client.user.username + '#' + this.client.user.discriminator, this.client.user.discriminator.displayAvatarURL)

            if (this.message.member.hasPermission('ADMINISTRATOR')) {
                if (this.args[0].includes('@')) this.args[0] = this.args[0].replace('@', '-').toLowerCase()
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
                    // this.message.channel.send('```' + error + '```')
                    console.log(error)
                })
            } else {
                
            }
            
        }

    }

}


