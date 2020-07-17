const assert = require('assert')
const Postgres = require('./../MultiDB/Src/Db/Strategies/postgres')
const Context = require('./../MultiDB/Src/Db/Strategies/Base/contextStrategy')


//npm run test:watch -
// atenção para a configuração do script test no arquivo package.json

//para rodar os scripts     npm run rodar
const context = new Context(new Postgres())

const MOCK_HEROIS_CADASTRAR = {
    nome: 'Gavião Negro',
    poder: 'flechas magicas'
}

const MOCK_HEROIS_ATUALIZAR = {
    nome: 'Aquamen',
    poder: 'Falar com os animais'
}


describe('postgres strategy', function() {
    this.timeout(Infinity)

    this.beforeAll(async function(){
       await context.connect()
       await context.delete()
       await context.create(MOCK_HEROIS_ATUALIZAR)
    })





    it('postgressql connection', async function (){
        const result = await context.isConnected()
        assert.equal(result, true)
    })

    it('cadastrar', async function(){
        const result = await context.create(MOCK_HEROIS_CADASTRAR)
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS_CADASTRAR)
    })

    it('listar', async function(){
        const [result] = await context.read({nome: MOCK_HEROIS_CADASTRAR.nome})
        delete result.id
        assert.deepEqual(result, MOCK_HEROIS_CADASTRAR) 
    })

    it('atualizar', async function(){
        const [itemAtualizar] = await context.read({nome:MOCK_HEROIS_ATUALIZAR.nome})
        
        const novoItem = {
            ...MOCK_HEROIS_ATUALIZAR, nome: 'Aquaman2'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const[itemAtualizado] = await context.read({ id: itemAtualizar.id})
        
        assert.deepEqual(result, 1)        
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
    })


    it('Remover por id', async function(){
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })

})