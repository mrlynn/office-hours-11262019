var mongoose = require("mongoose");
var Clusstre = require('./models/clusstre');
var Config = require('./config/config');
const dotenv = require('dotenv');
const chalk = require('chalk');
dotenv.config({
    path: '.env'
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
const error = chalk.bold.red;
console.log(chalk.blue.underline('Removing data from %s'),Config.dbname + '/clusstre');
Clusstre.deleteMany({},function(err,results) {
	if (err) {
		console.log(error('error: ', err.message));
		process.exit(-1);
	}
	console.log('Results: ' + JSON.stringify(results));
	console.log("Removing data from " + Config.dbname + '/clusstre');
	process.exit();
});
