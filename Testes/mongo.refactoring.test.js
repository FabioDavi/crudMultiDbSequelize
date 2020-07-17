const assert = require('assert')
const Mongodb = require('./../Refactoring/Src/Db/Strategies/mongodb/mongodb')
const HeroiSchema = require('./../Refactoring/Src/Db/Strategies/mongodb/schemas/heroisSchema')
const Context = require('./../Refactoring/Src/Db/Strategies/Base/contextStrategy')



const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}

const MOCK_HEROI_DEFAULT= {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'super teia  força'
}

const MOCK_HEROI_ATUALIZAR= {
    nome: `Super Man-${Date.now()}`,
    poder: 'força'
}


//npm run test:watch -usar este comando para testar todos os testes da pasta Testes
// atenção para a configuração do script test no arquivo package.json

//para rodar os scripts     npm run rodar
let MOCK_HEROI_ID = ''

let context = {}

describe('mongodb suite teste Refactoring', function() {

    this.timeout(Infinity)

    this.beforeAll(async function(){
       const connection = Mongodb.connect()  
       context = new Context(new Mongodb(connection, HeroiSchema))
 
       await context.create(MOCK_HEROI_DEFAULT)
       const result = await context.create(MOCK_HEROI_ATUALIZAR)
       MOCK_HEROI_ID = result._id 
    })    


    it('verificar conexao mango>>>', async () => {
        const result = await context.isConnected() 
        const expected = 'Conectado'
        console.log('rerer:', result)
 
        assert.deepEqual(result, expected)
    })


    it('create heroi', async () =>{
        const {nome, poder}  = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })


    it('listar', async () => {
        // const result= await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        // console.log('s',result)

        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_DEFAULT.nome})
        const result = {
            nome, poder
        } 
            
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })

    it('atualizar', async () =>{

        const result = await context.update(MOCK_HEROI_ID,{
            nome: 'Homem Aranha'
        })
        assert.deepEqual(result.nModified, 1)
    })

    it('removers', async () =>{
        const resultado = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(resultado.n, 1) 
    })

   

   
})