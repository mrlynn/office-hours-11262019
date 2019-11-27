var Clusstre = require('./models/clusstre');
var mongoose = require('mongoose');
var faker = require('faker');
var Config = require('./config/config');
const dotenv = require('dotenv');
const Chance = require('chance');
const chalk = require('chalk');
var winston = require("winston");
var slug = require('mongoose-slug-generator');
var moment = require('moment');
const yargs = require("yargs");

var chance = new Chance();

const options = yargs
 .usage("Usage: fake-clusstre.js -c <Count of Documents>")
 .option("c", { alias: "count", describe: "Documents to be Created", type: "number", demandOption: true })
 .argv;

var logger = new (winston.createLogger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'hackathon.log' })
    ]
});

dotenv.config({
    path: '.env'
});

"use strict";

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', () => {
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    logger.log('error', '%s MongoDB connection error. Please make sure MongoDB is running.');
    process.exit();
});
console.log("Debug: " + process.env.debug); 
mongoose.set('debug', false); //not workig - always true

var done = 0;
var howMany = `${options.count}`;

async function main() {
    for (var i = 0; i <= howMany; i++) {
        var clusstre = new Clusstre(
            {
                "clusstreBasic": {
                    "clusstreName": faker.lorem.word(),
                    "memberDOBFrom": chance.year({min: 1900, max: 2009}),
                    "memberDOBTo": chance.year({min: 1900, max: 2009}),
                    "genders": [chance.gender()]
                },
                "userUid": chance.integer({ min: 1, max: 40 }),
                "description": chance.paragraph({ sentences: 1 }),
                "tags": [chance.word()],
                "places": [chance.word()],
                "clusstreTypes": {
                    "predefine": [chance.word(),chance.word()],
                    "userdefine": [chance.word(), chance.word()]
                },
                "placeType": chance.city(),
                "posts": [],
                "createdDate": chance.date(),
                "lastModifiedDate": chance.date(),
                "createdByUid": chance.integer({ min: 1, max: 40 }),
                "lastModifiedByUid": chance.integer({ min: 1, max: 40 }),
                "status": "Active",
                "uid": "4fb61742-fd09-4ec5-8d84-c111b4a28a48",
                "_class": "com.clusstre.domain.Clusstre"
            }
                
        );
        console.log(clusstre);
        clusstre.save(function (err, newuser) {
            if (err) {
                console.log('error: ', err.message);
            }
            done++;
            if (done >= howMany) {
                exit();
            }
        });
    }
}
function exit() {
    mongoose.disconnect();
    exit;
}
main().catch(console.err);
