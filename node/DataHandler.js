//   @todo Add todo here

"use strict";

const FS = require ('fs');

class DataHandler {
	constructor() {
          console.log(`Loading Certificate.`);
	}

     static loadCerts() {
          const CERTS = {
               key: FS.readFileSync('./data/certs/server.enc.key'),
               cert: FS.readFileSync('./data/certs/server.crt')
          };
          return CERTS;
     }
}

module.exports = DataHandler;