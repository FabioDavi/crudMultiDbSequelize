
//usando async e await no lugar do promisses.js é melhor
// facilita a visualização do fluxo das funçoes
// nao altera a performance se usado certo
// veio do c#

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){
    return new Promise(function resolvePromisse(resolve, reject)
        {
            setTimeout( 
                function () {                    
                    return resolve({
                        id: 1,
                        nome: 'Aladin',
                        dataNascimento: new Date()
                    })
                }, 100
            )   
        }
    )    
}

function obterTelefone(userid){
    return new Promise(function resolverPromis87(resolve, reject){
        setTimeout(() =>{
            return resolve ({
                telefone: '12121',
                ddd: 11
            })
        }, 100 )
    })    
}

function obterEndereco(userid, callback){    
    setTimeout(() =>{
        return callback(null, {
            rua: 'rua dr farias bandeira',
            numero: '464',
            bairro: 'centro',
            cidade: 'Pvaí',
            estado: 'Pr',
            pais: 'Br'
        })
    }, 100 )  
    
}






main()
//async = automaticamente ela retorna uma promisse
async function main(){

    try{

        //olhando o codigo abaixo... o endereço nao depende da 
        console.time('medida-promisse')
        const usuario = await obterUsuario()

        // não fazer abaixo quando tiver await
        //const telefone = await obterTelefone(usuario.id)
        //const endereco  = await obterEnderecoAsync(usuario.id)

        //fazer assim
        const resultado = await Promise.all(
            [
                obterTelefone(usuario.id),
                obterEnderecoAsync(usuario.id)
            ]
        )
        const endereco = resultado[1]
        const telefone = resultado[0]
        //acima = melhores práticas

        console.log(`
        Nome:: ${usuario.nome}
        Endereço: ${endereco.rua}
        Telefone: ${telefone.telefone}
    `)
    console.timeEnd('medida-promisse')
    }
    catch(error){
        console.error('deu ruim', error)
    }


}