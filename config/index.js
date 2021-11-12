const dotenv = require('dotenv');
dotenv.config({ path: 'config/.env' });
const configFile = require('./development.json');

module.exports = {
	nodeEnv: process.env.NODE_ENV,
	port: configFile.port,
	server: configFile.server,
	mongo: configFile.database.mongodb,
	jwt: configFile.jwt,
	mail: configFile.mail,
	bcrypt: configFile.bcrypt,
	assetsPath: configFile.assetsPath,
	resetPassword: configFile.resetPassword,
};
