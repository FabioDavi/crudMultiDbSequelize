const ICrud = require('./../interface/interface.crud')


const mongoose = require('mongoose')

const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Disconectando',
  4: 'Invalid Credentials - Fabio'
}



class MongoDBStrategy extends ICrud { 

    constructor(connection, shema) {
      super();
      this._schema = shema
      this._connection = connection
      
    }     






    async isConnected(){
      const state = STATUS[this._connection.readyState]
      if(state === 'Conectado') return state

      if(state !== 'Conectando') return state 
 
       await new Promisse(resolve => setTimeout(resolve, 1000))
      //da erro.. verificar 
   

      return STATUS[this._connection.readyState]
    }





   

    static connect(){
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
      
      connection.once('open', function (){
        console.log('database rodando!')
      })

      return connection
      
    }
  




    create(item) {
      return  this._schema.create(item)
    }


    /*read(item){
      return this._schema.find(item)
    }*/
    read(item, skip=0, limit=10){
      return this._schema.find(item).skip(skip).limit(limit)
    }


    update(id, item){
      return this._schema.updateOne({_id:id}, {$set:item})
    }

    delete(id){
      return this._schema.deleteOne({_id: id})
    }


  }




  module.exports = MongoDBStrategy