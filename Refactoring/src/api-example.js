const Hapi = require('hapi')
const Mongodb = require('./Db/Strategies/mongodb/mongodb')
const HeroiSchema = require('./Db/Strategies/mongodb/schemas/heroisSchema')
const Context = require('./Db/Strategies/Base/contextStrategy')


const app = new Hapi.Server({
    port: 5000
})

async function main(){

    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection,HeroiSchema))


    app.route([
        {
            path: '/herois',
            method: 'Get',
            handler: (request, head) => {
                return context.read()
            }
        }
    ])
    await app.start()
    console.log('servidor rodando na porta', app.info.port)
}

main()