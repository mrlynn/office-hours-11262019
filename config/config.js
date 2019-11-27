
const dotenv = require('dotenv');
dotenv.config({
    path: '../.env'
});
var config = {
	debug: process.env.debug,
	dbhost: "localhost",
	dbname: "clusstre",
	dbport: 27017,
	title: 'Clusstre',
	keywords: "",
	copyright: "MongoDB"
};
module.exports = config;
