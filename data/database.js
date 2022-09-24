const mongodb = require('mongodb');
 
const MongoClient = mongodb.MongoClient;
let database;
async function connectToDatabase() {
    const client =await MongoClient.connect('mongodb://localhost:27017'); //Connect to the database server
    database = client.db('online-shop');
}

function getDb(){
    if(!database){ //checking the database exists
        throw new Error('You must connect first');
    }
    return database;
}

module.exports ={
    connectToDatabase:connectToDatabase,
    getDb:getDb
}