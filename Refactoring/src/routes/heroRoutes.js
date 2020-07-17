const BaseRoutes = require('./base/baseRoute')
const Joi = require('joi')
const regex = require('regex')
const failAction = (request, headers, erro) =>{
    throw erro
}


class HeroRoutes extends BaseRoutes{
    constructor(db){
        super()
        this.db = db
    }

    // o hapi ja resolve as promisses .. não precisa async await
    list(){
        return {
            //agora tem um paredão .. .se validar entra no handler
            path: '/herois',
            method: 'GET',
            config:{
                tags:['api'],
                description: 'Deve listar herois',
                notes: 'pode paginar resultados e filtrar por nome',
                validate: {
                    // payload => body
                    // headers => header
                    // params => na URL : id
                    // query => ?skip=0&limit=100
                    failAction,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)
                    }
                }
            },
            handler: (request, headers) => {
                try
                {
                    const{
                        skip,
                        limit,
                        nome
                    } = request.query

                    /* 
                    COM O JOI NÃO HÁ MAIS NECESSIDADE DAS VALIDAÇÕES ABAIXO
                    let query = {}
                    if(nome){
                        query.nome = nome
                    }

                    // se for um numero
                    if(isNaN(skip))
                        throw Error('o tipo do skip é incorreto')

                    if(isNaN(limit))
                    throw Error('o tipo do limit é incorreto')                */

                   const query = {
                       nome: {
                           $regex: `.*${nome}.*`
                       }
                   }
                 

                    return this.db.read(nome? query:{}, parseInt(skip), parseInt(limit))
                }
                catch (error){
                    console.log('deu ruim', error)
                    return "erro interno no servidor"
                }
                
            }
        }
    }

    create(){
        return{
            path: '/herois',
            method: 'POST',
            config: {
                tags:['api'],
                description: 'Deve cadastrar heroi',
                notes: 'deve cadastrar heroi por nome e poder',
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(50)
                    }
                }
            },
            handler: async (request) => {
                try{
                    const {nome, poder} = request.payload
                    const result = await this.db.create({
                        nome, poder
                    })
                    //console.log('result', result)
                    return  {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result._id
                    }
                }
                catch(error){
                    console.log('Deu Ruim', error)
                    return 'Internal errorllll'
                }
            }
        }
        
    }


    update() {
        return {
            path: '/herois/{id}',
            method: 'PATCH',
            config: {
                tags:['api'],
                description: 'Deve atualizar heroi por id',
                notes: 'pode atualizar qualquer campo',
                validate: {
                    failAction,
                    payload: {
                        nome: Joi.string().max(100),
                        poder: Joi.string().max(30)
                    },
                    params: {
                        id: Joi.string().required()
                    }
                },

            },
            handler: (request, headers) => {
                const payload = request.payload;
                const id = request.params.id;
                return this.db.update(id, payload)
            }
        }
    }



    delete() {
        return {
            path: '/herois/{id}',
            method: 'DELETE',
            config: {
                tags:['api'],
                description: 'Deve remover heroi por id',
                notes: 'o id tem que ser válido',
                validate: {
                    failAction,
                    params: {
                        id: Joi.string().required()
                    }
                }
            },
            handler: (request, headers) => {
                const id = request.params.id;
                return this.db.delete(id)
            }
        }
    }



}

module.exports = HeroRoutes