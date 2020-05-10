export default {

    name: 'ready',

    run: class {

        constructor () {}

        async event (client) {

            setInterval(() => {
                const status = statuses[Math.floor(Math.random() * statuses.length)]
                client.user.setActivity(status, {
                    type: 'PLAYING'
                });
            }, 5000)

            const statuses = [
                't!help'
            ]

        }

    }

}