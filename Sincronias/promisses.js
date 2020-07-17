/* 
1 obter um usuario
2 obter numero de fone usuario a partir do seu id
3 obter o endereço do usuario pelo id

trabalhando com promisses
*/
//importando um modulo interno do node.js
//para fazer o promisse de forma mais simples
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(){

    /*quando der algum problema  -> reject(erro) chama o reject e passa o erro pra dentro dele
      quando tudo sucesso -> resolv
    return new Promise(function resolvePromisse(resolve, reject)
        {
            
        }
    )*/

    return new Promise(function resolvePromisse(resolve, reject)
        {


            setTimeout( 
                function () {
                    // como mudou pra promisse, retira-se o callback e o null do erro
                    
                    //abaixo testando o reject
                    //return reject(new Error('Deu ruim de verdade'))
                    
                    return resolve({
                        id: 1,
                        nome: 'Aladin',
                        dataNascimento: new Date()
                    })
                }, 1000
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
        }, 3000 )
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
        }, 5000 )
   
    
}



 
const usarioPromisse = obterUsuario()

usarioPromisse

    .then(function(usuario_){
        return obterTelefone(usuario_.id)
        //mapear  antes 
        .then(function resolverTelefone(resultado){
            return{
                usuario_:{
                    nome: usuario_.nome,
                    id: usuario_.id
                },
                telefone: resultado
            }
        })
    })

    .then(function(resultadoDoUltimoTHEN){
        const endereco = obterEnderecoAsync(resultadoDoUltimoTHEN.usuario_.id)
        return endereco.then(function resolverEnde(resulta){
            return{
                usuario: resultadoDoUltimoTHEN.usuario_,
                telefone: resultadoDoUltimoTHEN.telefone,
                endereco: resulta
            }
        })
    })

    .then(function(resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereço: ${resultado.endereco.rua}
            Telefone: ${resultado.telefone.telefone}
        `)
    })
    .catch(function (erroor){
        console.error('deu ruim: ', erroor)
    })


   

// para manipular o sucesso usamos a função .then
// para manipular erros, usamos .catch










/*abaixo padrão callback,, primeiro o erro, depois o conteudo (DESTA FORMA CONSEGUIMOS A SINCRONIA)
obterUsuario(function resolverUsuario(erro, usuario){
    // null || "" || 0 = false
    if(erro){
        console.error('deu ruim usuario:  ', erro)
        return
    }
    else
    {
        console.log('usuario', usuario)      

        obterTelefone(usuario.id, function resolverTelefone(erro1, telefone){
            if(erro1){
                console.error('deu ruim telefone:  ', erro1)
                return
            }
            else{
                console.log('telefone', telefone)

                obterEndereco(usuario.id, function resolverEndereco(erro2, endereco){
                    if(erro2){
                        console.error('deu ruim endereço:  ', erro2)
                        return
                    }
                    else{
                        console.log('endereco', endereco)
                    
                    }        
                })
            
            }
        })
        
    }
})
*/



