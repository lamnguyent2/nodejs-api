const Users = require('../models/UsersModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

class UsersController {
    register(req, res) {
        const newUser = new Users(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        newUser.save(function (err, user) {
            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {
                user.hash_password = undefined;
                return res.json(user);
            }
        });
    }
    login(req, res) {
        Users.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid user or password.',
                    error: true,
                    data: {},
                    islogined: false,
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                });
            }
            return res.json({
                message: "Successful",
                error: false,
                data: {
                    access_token: jwt.sign({ slug: user.slug, address: user.address, phone_number: user.picture, Role: user.Role, picture: user.picture, gender: user.gender, email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs', { expiresIn: "2h" }),
                    expiresIn: "2h",
                    token_type: "JWT",
                    alg: "HS256",
                    user: {
                        _id: user._id,
                        slug: user.slug,
                        address: user.address,
                        phone_number: user.picture,
                        Role: user.Role,
                        picture: user.picture,
                        gender: user.gender,
                        email: user.email,
                        fullName: user.fullName
                    }
                },
                islogined: true,
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
            });
        });
    }
    loginRequired(req, res, next) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (token === undefined) {
            return res.status(401).send({ "error": "Token is not present" });
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        if (token) {
            jwt.verify(token, "RESTFULAPIs", (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Token is not right'
                    })
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.user = undefined;
            next();
        }
        // if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        //     jwt.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
        //         req.user = decode;
        //     });
        //     next();
        // } else {
        //     req.user = undefined;
        //     next();
        // }
    }
    profile(req, res, next) {
        if (req.user) {
            res.json(req.user);
            next();
        }
        else {
            return res.status(401).json({ message: 'Invalid or expired token!' });
        }
    }
    sendemail(req, res) {
        const transporter = nodemailer.createTransport({
            service: "email",
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'melisa.little63@ethereal.email',
                pass: 'uHYzda7hCKmUzV53WV'
            }
        });
        const mailOptions = {
            from: 'melisa.little63@ethereal.email', // sender address
            to: `${req.body.to}`,
            subject: "Hello",
            text: "Hello world",
            html: "<b>NodeJS Email Tutorial</b>",
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.send('Gửi thành công!');
        });
    }
}

module.exports = new UsersController();