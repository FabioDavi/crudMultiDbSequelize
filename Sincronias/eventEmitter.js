
//usado para ações contínuas
//node.js usa pra quase tudo em seu ecossistema
//tb usando em browsers onclick()

//abaixo criação de eventos customizados

const eventemitter__ = require('events')


class Meuemissor extends eventemitter__{

}

const meuEmissor = new Meuemissor()
const nomeEvento = 'usuario:click'

/*meuEmissor.on(nomeEvento, function(click){
    console.log('usuario clicou', click)
})


meuEmissor.emit(nomeEvento, 'clicou na barra de rolagem')
meuEmissor.emit(nomeEvento, 'clicou no ok')

let coount = 0
setInterval(function(){
    meuEmissor.emit(nomeEvento, 'clicou: '+ coount++)
}, 1000)
*/

const stdin = process.openStdin()
stdin.addListener('data', function(value){
    console.log(`voce digitou: ${value.toString().trim()}`)
})


//cuidar ao colocar eventos dentro de uma promisse (a promisse foi criada para ser executada 1 unica vez)