var Clusstre = require("./models/clusstre");
var mongoose = require("mongoose");
var Config = require("./config/config");
const dotenv = require("dotenv");
const chalk = require("chalk");
var winston = require("winston");
const inquirer = require("inquirer");
var logger = new winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "hackathon.log" })
  ]
});

dotenv.config({
  path: ".env"
});

mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on("error", () => {
  console.log(
    "%s MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  logger.log(
    "error",
    "%s MongoDB connection error. Please make sure MongoDB is running."
  );
  process.exit();
});
console.log("Debug: " + process.env.debug);
mongoose.set("debug", false); //not workig - always true

("use strict");

run().catch(error => console.log(error.stack));

async function run() {
  while (true) {
    await inquirer
      .prompt([
        {
          type: "input",
          name: "query",
          message:
            "What userdefined, or pre-defined clusstreType tag would you like to find? [quit]"
        }
      ])
      .then(queryanswer => {
        if (queryanswer.query == "quit" || queryanswer.query == "") {
          exit;
        }
        console.info("Answer:", queryanswer.query);
        Clusstre.find({
          $or: [
            { "clusstreTypes.predefine": queryanswer.query },
            { "clusstreTypes.userdefine": queryanswer.query }
          ]
        })
          .stream()
          .on("data", function(doc) {
            console.log("Doc: " + JSON.stringify(doc, null, 2));
          })
          .on("error", function(err) {
            console.log("Error: " + err.message);
          })
          .on("end", function() {
            // final callback
          });
      });
  }
}

function exit() {
  exit();
}
//db.clusstres.find({ $or: [ { "clusstreTypes.predefine": "ido"}, {"clusstreTypes.userdefine": "ido" }] });
// { "_id" : ObjectId("5dde90733761d594c3f5870c"), "clusstreBasic" : { "genders" : [ "Male" ], "clusstreName" : "qui", "memberDOBFrom" : 1987, "memberDOBTo" : 1923 }, "clusstreTypes" : { "predefine" : [ "pagati", "ido" ], "userdefine" : [ "razrib", "vo" ] }, "tags" : [ "dop" ], "places" : [ "upma" ], "posts" : [ ], "userUid" : 12, "description" : "Iblamvih ohufeg zuwlaupe wa sesdujbim bezehaf ijfoile diif cus dez abkirged tofum.", "placeType" : "Fozogtu", "createdByUid" : "28", "lastModifiedByUid" : "6", "status" : "Active", "uid" : "4fb61742-fd09-4ec5-8d84-c111b4a28a48", "_class" : "com.clusstre.domain.Clusstre", "__v" : 0 }
