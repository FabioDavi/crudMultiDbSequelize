
const ContextoStrategy = require('./db/Strategies/Base/contextStrategy.js')
const MongoDB = require('./db/Strategies/mongodb.js')
const Postgres = require('./db/Strategies/postgres')


  const contextMongo = new ContextoStrategy(new MongoDB());
  contextMongo.create();
  const context = new ContextoStrategy(new Postgres());
  context.create();
  context.read();