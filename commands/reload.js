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
            

            for (const channel of this.message.guild.channels) {
                switch (channel[1].type) {
                    case 'category': {
                        this.message.channel.send(`${channel[1].name} : CATEGORY`)
                        break
                    }

                    case 'voice': {
                        this.message.channel.send(`${channel[1].name} : VOICE`)
                        break
                    }

                    case 'text': {
                        this.message.channel.send(`${channel[1].name} : TEXT`)
                        break
                    }
                }
            }
            
            for (const role of this.message.guild.roles) {
                this.message.channel.send(role[1].name)
            }

        }

    }

}


