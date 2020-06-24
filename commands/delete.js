import PATH from 'path'
import { Permissions } from 'discord.js'

export default {

    name        : 'delete',
    description : 'Permet de charger une template : t!load <ID>',
    category    : 'test',

    run         : class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {

            for (const role of this.message.guild.roles) {
                this.message.guild.roles.delete(role[0])
            }
            

        }

    }

}


