import Discord from 'discord.js'

export default {

    name: 'help',
    description: 'Affiche la page d\'aide du bot : t!help',

    run: class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {
            const embed = new Discord.RichEmbed().setTitle('Page d\'aide')
                                                    .setDescription('Affiche la page d\'aide du bot')
                                                    .setFooter('Demandé par ' + this.message.author)
                                                    .setAuthor(this.client.user.username + '#' + this.client.user.discriminator)
            for (const command of this.client.commands) {
                const COMMAND = command[1]
                let   name    = COMMAND.name,
                      element = COMMAND.description.split(':').map(x => x.trim()),
                      desc    = element[0],
                      cmd     = element[1]


                if (!name) name = content[file].split('.')[0]
                if (!desc) desc = 'Aucune description pour cette commande.'
                if (!cmd)  cmd  = 'Aucune commande.'
                
                embed.addField(`t!${name}`, desc + '\n```' + cmd + '```', true)
                embed.addBlankField(true)
            }

            this.message.channel.send(embed)

        }

    }

}
