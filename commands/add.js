import Discord from 'discord.js'

export default {

    name: 'add',
    description: 'Générer puis enregistrer le template : t!add <nom>',

    run: class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {

            this.message.channel.send('add')

        }

    }

}
