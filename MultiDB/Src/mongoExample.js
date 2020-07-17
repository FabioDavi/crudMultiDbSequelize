
/*const minhaFuncaoArrow = () => {

}

const minhaFuncaoArrowUnicaLinha = (parms) => console.log(params)
console.log('alerta',minhaFuncaoArrowUnicaLinha)

npm install mongoose
*/

const mongoose = require('mongoose')

mongoose.connect('mongodb://fabiodavirauh:minhasenhasecreta@localhost:27017/herois', {
    useNewUrlParser: true, funcion (error){
        if(!error) return;

        console.log('Falha na conexão', error)
    }
})

const connection = mongoose.connection

//connection.once('open', () => console.log('database rodando!'))
connection.once('open', function (){
            console.log('database rodando!')
        } 
)

const heroiSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    poder:{
        type: String,
        required: true
    },
    insertAt: {
        type: Date,
        default: new Date()
    }
})


const model = mongoose.model('herois', heroiSchema)

async function main(){
    const resultCadastrar = await model.create(
        {
            nome: 'Batman',
            poder:'Dinheiro'
        }
    )
    console.log('resultado cadastrar:', resultCadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}

main()