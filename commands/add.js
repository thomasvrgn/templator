import Discord from 'discord.js'

export default {

    name: 'add',
    description: 'Générer puis enregistrer le template : t!add <nom>',

    run: class {

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
            // console.log(this.template)

        }

    }

}
