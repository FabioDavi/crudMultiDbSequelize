const ICrud = require('./Interface/interface.crud')


const mongoose = require('mongoose')

const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
  4: 'Invalid Credentials - Fabio'
}



class MongoDBStrategy extends ICrud {

    constructor() {
      super();
      this._herois = null
      this._driver = null
    }






    async isConnected(){
      const state = STATUS[this._driver.readyState]
      if(state === 'Conectado') return state

      if(state !== 'Conectando') return state

    
      await new Promisse(resolve => setTimeout(resolve, 1000))

      return STATUS[this._driver.readyState]
    }





    defineModel(){

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
      this._herois = mongoose.model('herois', heroiSchema)
    }





    connect(){
      /*mongoose.connect('mongodb://fabiodavirauh:minhasenhasecreta@localhost:27017/herois', {
        useNewUrlParser: true, function (error){
          if(!error) return;

          console.log('Falha na conexão', error)
        }
      })
      const connection = mongoose.connection
      connection.once('open', function (){
        console.log('database rodando!')
      })*/


      
      
      let mongooseConnString = 'mongodb://fabiodavirauh:minhasenhasecreta@localhost:27017/herois'

      mongoose.connect(
        mongooseConnString,
        { useNewUrlParser: true },
        err => {
          if (err) console.error(err)
          console.info(
            `MongoDB Connection State: ${
              STATUS[mongoose.connection.readyState]
            }` 
          )
        }
      )
      const connection = mongoose.connection
      this._driver = connection
      connection.once('open', function (){
        console.log('database rodando!')
      })

      this.defineModel()
      
    }
  




    create(item) {
      return  this._herois.create(item)
    }


    /*read(item){
      return this._herois.find(item)
    }*/
    read(item, skip=0, limit=10){
      return this._herois.find(item).skip(skip).limit(limit)
    }


    update(id, item){
      return this._herois.updateOne({_id:id}, {$set:item})
    }

    delete(id){
      return this._herois.deleteOne({_id: id})
    }


  }




  module.exports = MongoDBStrategy