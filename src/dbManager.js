const dbOperations = require("./dbOperations");
const userCrudOperations = require("./userCrudOperations");
const postCrudOperations = require("./postCrudOperations");

const dbInit = () => (dbOperations.init());

// User CRUD operations
const createUser = (user) => (userCrudOperations.createUser(user));
const readUser = (user) => (userCrudOperations.readUser(user));

const addPost = (post) => (postCrudOperations.createPost(post));
const savePost = (postId, post) => (postCrudOperations.updatePost(postId, post));
const deletePost = (postId) => (postCrudOperations.deletePost(postId));
const getPost = (postId) => (postCrudOperations.readPost(postId));
const getAllPosts = () => (postCrudOperations.readAllPosts());

const closeConnection = () => (dbOperations.closeConnection());

module.exports = {
    dbInit,
    createUser,
    readUser,
    addPost,
    savePost,
    deletePost,
    getPost,
    getAllPosts,
    closeConnection
};