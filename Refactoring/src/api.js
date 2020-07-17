/* 
npm i Hapi
npm i vision inert hapi-swagger 
IMPORTANTE: A versão do swagger foi atualizada e acabou quebrando. Para ter certeza que vai rodar na versão correta instale com o comando

npm i hapi-swagger@9.1.3
*/


const Hapi = require('hapi')

const Mongodb = require('./Db/Strategies/mongodb/mongodb')
const HeroiSchema = require('./Db/Strategies/mongodb/schemas/heroisSchema')
const Context = require('./Db/Strategies/Base/contextStrategy')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const JWT_SECRET = 'minhasenha_secreta-123'



const app = new Hapi.Server({
    port: 8000
})

function mapRoutes(instance, methods){
    return methods.map(method => instance[method]())
}

async function main(){

    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection,HeroiSchema))
    
     const swaggerOptions = {
        info:{
            title: 'API MultiBD nodejs',
            version: 'v1.0'
        },
        lang: 'pt'
    } 

     await app.register([
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }

    ])
     
    //console.log('maproutes', mapRoutes(new HeroRoute(context), HeroRoute.methods()))
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ])
    await app.start()
    console.log('servidor rodando na porta', app.info.port)
    return app
}
 
module.exports = main()

