const ICrud = require('./Interface/interface.crud')
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends ICrud {
    constructor() {
      super();
      this._sequelize = null
      this._herois = null
    }

    async isConnected(){
      try{
        this._sequelize.authenticate()
        return true
      }
      catch(error){
        console.log('erro!: ', error)
        return false
      }
    }


    async connect(){
      this._sequelize = new Sequelize(
        'heroes', //database
        'postgres_fabio', // user
        'mysecretpassword', //senha
        {
          host: 'localhost',
          dialect: 'postgres',
          // case sensitive
          quoteIdentifiers: false,
          // deprecation warning
          operatorsAliases: false
      
          // dialectOptions: {
          //   ssl: true,
          // },
        },
      )   
      await this.defineModel() 
    }


    async defineModel(){
      this._herois = await this._sequelize.define(
        'herois',
        {
          id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true,
          },
          nome: {
            type: Sequelize.STRING,
            required: true,
          },
          poder: {
            type: Sequelize.STRING,
            required: true,
          },
        },
        {
          //opcoes para base existente
          tableName: 'TB_HEROIS',
          freezeTableName: false,
          timestamps: false,    
    
        },
      )
      await this._herois.sync()
    }


    async create(item) {
      const {dataValues} = await this._herois.create(item)

      return dataValues
    }
    
    
    async read(item = {}){
      return this._herois.findAll({where: item, raw:true})        
    }


    async update(id, item){
      console.log('id', id)
      return  this._herois.update(item, {where: {id:id}})   
    }

    async delete(id){
      const query = id? {id} : {}
      return this._herois.destroy({where:query})
    }


  }
  module.exports = PostgreSQLStrategy