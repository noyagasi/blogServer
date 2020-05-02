const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;
let db;
let userCollectionInstance;
let clientForDB;
var ObjectId = require('mongodb').ObjectID;

// Setting up a MongoDB connection
const init = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect('mongodb://127.0.0.1:27017',
            (err, client) => {
                if (err) {
                    console.log("failed to connect to MongoDB");
                    reject(err);
                } else {
                    console.log("Connected");
                    clientForDB = client;
                    db = clientForDB.db("mydb");
                    userCollectionInstance = db.createCollection("users");
                    userCollectionInstance = db.createCollection("posts");
                    console.log("Connected successfully to MongoDB");
                    resolve();
                }
            })
    })
}

// CRUD operations
const createDocument = (collectionName, JsonToInsert) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName);
        collection.insertOne(
            JsonToInsert, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JsonToInsert);
                }
            });
    });
};

const readDocument = (collectionName, document) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName);
        collection.find(document).
        toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const readAll = (collectionName) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName);
        collection.find().toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const updateDocument = (collectionName, documentId, document) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName);
        collection.updateOne({
            _id: ObjectId(documentId)
        }, {
            $set: document
        }, {
            upsert: false
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const deleteDocument = (collectionName, documentId) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(collectionName);
        collection.deleteOne({
            _id: ObjectId(documentId)
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const closeConnection = () => {
    clientForDB.close();
    console.log("MongoDB connection closed");
};

module.exports = {
    init,
    updateDocument,
    createDocument,
    readDocument,
    readAll,
    deleteDocument,
    closeConnection
};