const dbOperations = require("./dbOperations");
const postsCollection = "posts";

// Create post
const createPost = (post) => {
    return new Promise((resolve, reject) => {
        dbOperations.createDocument(postsCollection, post).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// Read post 
const readPost = (postId) => {
    return new Promise((resolve, reject) => {
        dbOperations.readDocument(postsCollection, postId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// update post
const updatePost = (postId, post) => {
    return new Promise((resolve, reject) => {
        dbOperations.updateDocument(postsCollection, postId, post).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

// delete post 
const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
        dbOperations.deleteDocument(postsCollection, postId).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};

const readAllPosts = () => {
    return new Promise((resolve, reject) => {
        dbOperations.readAll(postsCollection).then((data)=> {
            resolve(data);
        }).catch((error) => {
            reject(error);
        });
    });
};


module.exports = {createPost, readPost, updatePost, deletePost, readAllPosts};
