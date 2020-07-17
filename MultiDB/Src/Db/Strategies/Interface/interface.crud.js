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
    isConnected(){
      throw new NotImplementedException();
    }
    connect(){
      throw new NotImplementedException();
    }
  }

  module.exports = ICrud