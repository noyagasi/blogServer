"use strict";
const dbManager = require("../dbManager");
const server = require("../server");
const authService = require("../Authentications/authService");
const Joi = require("joi");

var ObjectId = require('mongodb').ObjectID;

server.route({
    method: "GET",
    path: "/api/getPost",
    handler: async (request, reply) => {
        const token = request.headers.authorization.split(" ")[1];
        const postId = request.info.referrer.split("edit/")[1];
        if (authService.verify(token)) {
            return reply.response(await dbManager.getPost({ _id: ObjectId(postId) }));
        }
        return null;
    }
});

server.route({
    method: "GET",
    path: "/api/getAllPosts",
    handler: async (request, reply) => {
        const token = request.headers.authorization.split(" ")[1];
        if (authService.verify(token)) {
            console.log("sends all posts");
            return reply.response(await dbManager.getAllPosts());
        }
        return null;
    }
});

server.route({
    method: "POST",
    path: "/api/addpost",
    config: {
        validate: {
            payload: {
                title: Joi.string().required(),
                subject: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: async (request, reply) => {
        const token = request.headers.authorization.split(" ")[1];
        if (authService.verify(token)) {
            const user = (authService.verify(token)).user;
            const title = request.payload.title;
            const subject = request.payload.subject;
            const myobj = { usr: user, titl: title, subj: subject };
            await dbManager.addPost(myobj);
            console.log("inserted new post");
        }
        return null;
    }
});

server.route({
    method: "POST",
    path: "/api/savePost",
    config: {
        validate: {
            payload: {
                id: Joi.string().required(),
                title: Joi.string().required(),
                subject: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: async (request, reply) => {
        const token = request.headers.authorization.split(" ")[1];
        if (authService.verify(token)) {
            const user = (authService.verify(token)).user;
            const postId = request.payload.id;
            const title = request.payload.title;
            const subject = request.payload.subject;
            const myobj = { usr: user, titl: title, subj: subject };
            //console.log(await dbManager.savePost(postId, myobj));
            await dbManager.savePost(postId, myobj);
            console.log("saved post");
        }
        return null;
    }
});

server.route({
    method: "POST",
    path: "/api/deletePost",
    config: {
        validate: {
            payload: {
                id: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: async (request, reply) => {
        const token = request.headers.authorization.split(" ")[1];
        if (authService.verify(token)) {
            const postId = request.payload.id;
            await dbManager.deletePost(postId);
            console.log("deleted post");
        }
        return null;
    }
});