"use strict";

const DATA_HANDLER = require('./node/DataHandler.js'), IO = require(`fs`);

class app {

    constructor() {
        this.ejsData = null;
        this.user = null;
        this.loadServer();
    }

    loadServer() {
        const HTTP = require('http');
        const PORT = process.env.PORT || 8000;
        const EJS = require('ejs');
        HTTP.createServer((request, response) => {
            let httpHandler = (error, string, contentType) => {
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('An error has occurred: ' + error.message);
                } else if (contentType.indexOf('image') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'binary');
                } else if (contentType.indexOf('html') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    if (request.url.indexOf('calendar.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'calendar.ejs'
                        }));
                    } else if (request.url.indexOf('guide.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'guide.ejs'
                        }));
                    } else if (request.url.indexOf('login.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'login.ejs'
                        }));
                    } else if (request.url.indexOf('parks.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'parks.ejs'
                        }));
                    } else if (request.url.indexOf('report.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'report.ejs'
                        }));
                    } else if (request.url.indexOf('resources.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'resources.ejs'
                        }));
                    } else if (request.url.indexOf('signup.ejs') >= 0) {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'signup.ejs'
                        }));
                    } else {
                        response.end(EJS.render(string, {
                            data: this.ejsData,
                            filename: 'index.ejs'
                        }));
                    }
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string);
                }
            };
            if (request.method === 'POST') {
                if (request.headers['x-requested-with'] === 'XMLHttpRequest0') {
                    request.on('data', (data) => {
                        this.user = DATA_HANDLER.handleUserData(data.toString('utf8'));
                        if (this.user == true) {
                            response.writeHead(200, {'content-type': 'application/json'});
                            response.end('true');
                        } else {
                            response.writeHead(200, {'content-type': 'text/plain'});
                            response.end('false');
                        }
                    });
                } else if (request.headers['x-requested-with'] === 'XMLHttpRequest1') {
                    //Other methods of handling data go here
                } else {
                    response.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
                    response.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
                }
            } else if (request.url.indexOf('.css') >= 0) {
                this.render(request.url.slice(1), 'text/css', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.js') >= 0) {
                this.render(request.url.slice(1), 'application/javascript', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.png') >= 0) {
                this.render(request.url.slice(1), 'image/png', httpHandler, 'binary');
            } else if (request.url.indexOf('.jpg') >= 0) {
                this.render(request.url.slice(1), 'image/jpeg', httpHandler, 'binary');
            } else if (request.url.indexOf('.ico') >= 0) {
                this.render(request.url.slice(1), 'image/x-icon', httpHandler, 'binary');
            } else if (request.url.indexOf('.ejs') >= 0) {
                this.render(request.url.slice(1), 'text/html', httpHandler, 'utf-8');
            } else if (request.url.indexOf('/') >= 0) {
                this.render('public/views/index.ejs', 'text/html', httpHandler, 'utf-8');
            } else {
                this.render(`HEY! What you're looking for: It's not here!`, 'text/html', httpHandler, 'utf-8');
            }
        }).listen(PORT);
    }

    render(path, contentType, callback, encoding) {
        const FS = require('fs');
        FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => {
            callback(error, string, contentType);
        });
    }}

module.exports = app;