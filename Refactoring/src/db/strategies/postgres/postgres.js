const ICrud = require('./../Interface/interface.crud')
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends ICrud {
    constructor(connection, schema) {
      super();
      this._connection = connection
      this._schema = schema
    }

    async isConnected(){
      try{
        this._connection.authenticate()
        return true
      }
      catch(error){
        console.log('erro!: ', error)
        return false
      }
    }


    static async connect(){
      const connection = new Sequelize(
        'heroes', //database
        'postgres_fabio', // user
        'mysecretpassword', //senha
        {
          host: 'localhost',
          dialect: 'postgres',
          // case sensitive
          quoteIdentifiers: false,
          // deprecation warning
          operatorsAliases: false,
      
          // dialectOptions: {
          //   ssl: true,
          // },

          logging: false
        },
      )   
      return connection
    }


    static async defineModel(connection, schema){    
      const model = connection.define(
          schema.name, schema.schema, schema.options
      )
      await model.sync()
     return model
    }


    async create(item) {
      const {dataValues} = await this._schema.create(item)

      return dataValues
    }
    
    
    async read(item = {}){
      return this._schema.findAll({where: item, raw:true})        
    }


    async update(id, item){
      console.log('id', id)
      return  this._schema.update(item, {where: {id:id}})   
    }

    async delete(id){
      const query = id? {id} : {}
      return this._schema.destroy({where:query})
    }


  }
  module.exports = PostgreSQLStrategy

