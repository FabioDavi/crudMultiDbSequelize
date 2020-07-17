/* 
1 obter um usuario
2 obter numero de fone usuario a partir do seu id
3 obter o endereço do usuario pelo id

este codigo abaixo deve ser refatorado para promisses
*/

function obterUsuario(callback){
    setTimeout( 
        function () {
            // erro , usuario
            return callback(null, {
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000
    )
}

function obterTelefone(userid, callback){
    setTimeout(() =>{
        return callback(null, {
            telefone: '12121',
            ddd: 11
        })
    }, 3000 )
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

//abaixo padrão callback,, primeiro o erro, depois o conteudo (DESTA FORMA CONSEGUIMOS A SINCRONIA)
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
//const telefone = obterTelefone(usuario.id)



