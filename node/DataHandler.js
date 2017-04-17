"use strict";

const IO = require('fs');

let userTrips = [];

class DataHandler {
    static handleUserData(data) {
        let isTrue = 0;
        data = JSON.parse(data);
        data = data.toString().split(/,/);
        let users = [];
        let fileReader = IO.readFileSync(`data/users.csv`, `utf8`);
        let tempArray = fileReader.toString().split(/\r?\n/);
        for (let i = 0; i < tempArray.length; i++) {
            users.push(tempArray[i].toString().split(/,/));
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i][0] == data[0] && users[i][1] == data[1]) {
                isTrue = 1;
            }
        }
        if (isTrue == 1) {
            return true;
        }
    }

    //for different methods of handling data, just create a new static method
}

module.exports = DataHandler;