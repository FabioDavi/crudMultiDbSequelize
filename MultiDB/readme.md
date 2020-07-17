



docker run \

    docker run 
    --name postgres 
    -e POSTGRES_USER=postgres_fabio 
    -e POSTGRES_PASSWORD=mysecretpassword  
    -e POSTGRES_DB=heroes 
    -p 5432:5432 
    -d 
    postgres


    // cria uma interface sql
    docker run        --name adminer         -p 8080:8080        --link postgres:postgres         -d         adminer



## ---- MONGODB
docker run 
    --name mongodb 
    -p 27017:27017 
    -e MONGO_INITDB_ROOT_USERNAME=x 
    -e MONGO_INITDB_ROOT_PASSWORD=x 
    -d 
    mongo:4

    docker run     --name mongodb     -p 27017:27017     -e MONGO_INITDB_ROOT_USERNAME=x     -e MONGO_INITDB_ROOT_PASSWORD=x     -d     mongo:4





docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

    docker run     --name host     -p 3300:3300     --link mongodb:x     -d     mongoclient/mongoclient


docker run -it --rm     --network web_default     --name mongo-express     -p 8081:8081     -e E_CONFIG_OPTIONS_EDITORTHEME="ambiance"     -e ME_CONFIG_MONGODB_SERVER="web_db_1"     -e E_CONFIG_BASICAUTH_USERNAME="user"     -e ME_CONFIG_BASICAUTH_PASSWORD="fairly long password"     mongo-express



docker exec -it mongodb \
    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'x', pwd: 'x', roles: [{role: 'readWrite', db: 'herois'}]})"

docker run -it --rm     --network none     --name mongo-express2     -p 3000:3000     -e E_CONFIG_OPTIONS_EDITORTHEME="ambiance"     -e ME_CONFIG_MONGODB_SERVER="mongodb"     -e ME_CONFIG_BASICAUTH_USERNAME="user"     -e ME_CONFIG_BASICAUTH_PASSWORD="fairly long password"     mongo-express


docker container rm <53beb5b3ea12>


docker exec -it mongodb    mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin     --eval "db.getSiblingDB('herois').createUser({user: 'fabiodavirauh', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"
