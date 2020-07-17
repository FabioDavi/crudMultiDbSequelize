class NoImplementationException extends Error{
    constructor(){
        super("not implemented exception")
    }
}
//estamos simulando uma interface / contratos

class ICrud {
    create(item) {
      throw new NotImplementedException();
    }
    read(item) {
      throw new NotImplementedException();
    }
    update(id, item) {
      throw new NotImplementedException();
    }
    delete(id) {
      throw new NotImplementedException();
    }
  }

  class MongoDBStrategy extends ICrud {
    constructor() {
      super();
    }
    create(item) {
      console.log('MongoDBStrategy');
    }
  }
  
  class PostgreSQLStrategy extends ICrud {
    constructor() {
      super();
    }
    create(item) {
      console.log('PostgreSQLStrategy');
    }
    read(item){
        console.log('leu postgres')
    }
  }
  


  class ContextoStrategy extends ICrud {
    constructor(database) {
      super();
      this._database = database;
    }
    create(item) {
      return this._database.create(item);
    }
    read(item) {
      return this._database.read(item);
    }
    update(id, item) {
      return this._database.update(id, item);
    }
    delete(id) {
      return this._database.delete(id, item);
    }
  }
  
  const contextMongo = new ContextoStrategy(new MongoDBStrategy());
  contextMongo.create();
  const context = new ContextoStrategy(new PostgreSQLStrategy());
  context.create();
  context.read();

  //se eu tentar ler contextMongo.read() não funciona.. pq não não foi implementado na interface



  