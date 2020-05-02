const dbOperations = require("./dbOperations");
const usersCollection = "users";

// Create user
const createUser = (user) => {
    return new Promise((resolve, reject) => {
        dbOperations.createDocument(usersCollection, user).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// Read user 
const readUser = (user) => {
    return new Promise((resolve, reject) => {
        dbOperations.readDocument(usersCollection, user).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};


module.exports = {createUser, readUser};
