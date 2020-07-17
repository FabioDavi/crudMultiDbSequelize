const assert = require('assert')
const api = require('./../Refactoring/src/api')

process.removeAllListeners('DeprecationWarning');

const MOCK_HEROI_INICIAL = {
    nome: 'Gaviao Negro',
    poder: 'Mira'
}

const MOCK_HEROI_CADASTRAR_ = {
    nome: 'Lanterna Verde',
    poder: 'Anel do Poder'
}


let app = {}
let MOCK_ID = ''

describe.only('suite de testes da API herois', function () {
    this.beforeAll(async () => {
        app = await api

        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_INICIAL)
        })
        const dados = JSON.parse(result.payload)
        MOCK_ID = dados._id
    })


    it('lista GET /herois', async () =>{
        const result = await app.inject({
            method: 'GET',
            url: '/herois'
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode

        assert.deepEqual(statusCode, 200)        
        assert.ok(Array.isArray(dados))
    })

    //C:\WINDOWS\system32>taskkill /F /IM node.exe para evitar o erro
    //Error: listen EADDRINUSE: address already in use 0.0.0.0:5000
    it('listar GET /herois - deve retornar somente 3 registros', async () =>{
        const tamanho_limite = 3
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${tamanho_limite}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode  
        //console.log('qtd de registros:', dados.length)

        assert.deepEqual(statusCode, 200) 
        assert.ok(dados.length === tamanho_limite)
    })

 
    it('listar GET /herois - pelo nome', async () =>{
        const NAME = 'Clone-18'
        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=1000&nome=${NAME}`
        })

        const dados = JSON.parse(result.payload)
        const statusCode = result.statusCode  
      
        assert.deepEqual(statusCode, 200) 
        assert.deepEqual(dados[0].nome,NAME)
    })

    it('cadastrar POST /herois', async () =>{
        const result = await app.inject({
            method: 'POST',
            url: '/herois',
            payload: JSON.stringify(MOCK_HEROI_CADASTRAR_)
        })

        const statusCode = result.statusCode
        const {message, _id} = JSON.parse(result.payload)
        assert.ok(statusCode === 200)
        //console.log('ID',_id)
        assert.notStrictEqual(_id, undefined)
        assert.deepEqual(message, "Heroi cadastrado com sucesso!")
    })



    it('atualizar /herois/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/herois/${MOCK_ID}`,
            payload: {
                nome: 'Canário Negro',
                poder: 'Grito'
            }
        })
        assert.deepEqual(result.statusCode, 200) 
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)

    })

    it('remover /herois/{id}', async () => {
        const result =  await app.inject({
            method: 'DELETE',
            url: `/herois/${MOCK_ID}` 
        })
        assert.deepEqual(result.statusCode, 200) 
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })



})