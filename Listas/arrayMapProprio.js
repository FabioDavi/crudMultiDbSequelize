const service = require('./services')
//criando nosso pp arrayMap
// não é que é melhor,, ,neste exemplo conseguimos 
// entender como que o map trabalha no background
Array.prototype.meuMap = function(callback){
    const novoArrayMapeado = []
    for(let indice = 0; indice <= this.length-1; indice++){
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}


async function main(){
    try{
        const results = await service.obterPessoas('a')
        const names = results.results.meuMap(function (pessoa, indice){
            return `${indice}-${pessoa.name}`
        })
        console.log('namess', names)        
    }
    catch(error){
        console.error('deu ruim', error)
    }
}

main()