export default {

    name: 'ready',

    run: class {

        constructor (client) {

            this.client = client

        }

        event () {

            console.log('EHEH')

        }

    }

}