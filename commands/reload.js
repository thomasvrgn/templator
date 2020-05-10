export default {

    name: 'reload',
    description: 'Permet de reload une commande en utilisant : t!reload <nom de la commande>',

    run: class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {

            this.message.reply(this.args)
        

        }

    }

}


