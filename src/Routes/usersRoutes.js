"use strict";
const dbManager = require("../dbManager");
const server = require("../server");
const authService = require("../Authentications/authService");
const Joi = require("joi");

server.route({
    method: "POST",
    path: "/api/register",
    config: {
        validate: {
            payload: {
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: async (request, reply) => {
        // extract paramters (username,password etc.)
        const firstname = request.payload.firstname;
        const lastname = request.payload.lastname;
        const username = request.payload.username;
        const password = request.payload.password;
        const myobj = { fname: firstname, lname: lastname, user: username, pass: password };
        // validate with the database to duplicated username
        const findResult = await dbManager.readUser({ user: username });
        // if username duplicate return error with status 409
        if (findResult.length) {
            console.log("duplicated");
            return reply.response("user duplicated").code(409);
        }
        await dbManager.createUser(myobj);
        console.log("inserted new user");
        return null;
    }
});

server.route({
    method: "POST",
    path: "/api/login",
    config: {
        validate: {
            payload: {
                username: Joi.string().required(),
                password: Joi.string().required(),
                timestamp: Joi.any().forbidden().default((new Date).getTime())
            }
        }
    },
    handler: async (request, reply) => {
        // extract paramters (username,password etc.)
        const username = request.payload.username;
        const password = request.payload.password;
        const myobj = { user: username, pass: password };
        // validate with the database to duplicated username
        const findResult = await dbManager.readUser({ user: username, pass: password });
        // if username and password are valid return token
        if (findResult.length) {
            console.log("user and password are valid");
            return authService.sign({ user: username }); //token
        }
        //if username is not exist or pass is wrong reutrn error 401
        console.log("try again please...");
        return reply.response("user is not exist").code(401);
    }
});

server.route({
    method: "GET",
    path: "/api/getUser",
    handler: async (request, reply) => {
        var succeed = {
            message: 'Welcome to our Calculator Service'
        };
        var failure = {
            message: 'Failed to get the request'
        };
        const token = request.headers.authorization.split(" ")[1];
        if (authService.verify(token)) {
            return reply.response((authService.verify(token)).user);
        }
        return failure;
    }
});