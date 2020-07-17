/*docker ps

docker exec -it ab0b69735db3  mongo -u fabiodavirauh -p minhasenhasecreta --authenticationDatabase herois

use herois
db.herois.insert({nome: 'Flash', poder:'Velocidade', dataNascimento:'1974-12-14'})

db.herois.find().pretty() //lista todos




abaixo... executar comandos jscript no mongo

for(let i=0; i<= 10000; i++){
    db.herois.insert({nome: `Clone-${i}`, poder:'Velocidade', dataNascimento:'1974-12-14'})
}

db.herois.count()

db.herois.findOne()
db.herois.find().limit(1000).sort({nome: -1}).pretty()
db.herois.find({},{poder:1, _id:0})
db.herois.find(nome:'Mulher Maravilha')

//CREATE
db.herois.insert({nome: 'Flash', poder:'Velocidade', dataNascimento:'1974-12-14'})

//READ
db.herois.find({},{poder:1, _id:0})

//UPDATE
db.herois.update({_id:ObjectId("5e962cb5c3142c3a9e254343")},{nome:'Mulher Maravilha'})
db.herois.find({nome:'Mulher Maravilha'})

db.herois.update({_id:ObjectId("5e962cc2c3142c3a9e256a33")},
                 {$set: {nome:'lanterna verde'} })

db.herois.find({nome:'lanterna verde'})


//DELETE
db.herois.remove({}) // remove tudo .. cuidado
db.herois.remove({nome: 'Mulher Maravilha'})
*/