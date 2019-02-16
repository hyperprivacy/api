'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.setLevel('DEBUG');

var path = require('path');
var util = require('util');
var bcrypt = require('bcrypt');


var hfc = require('fabric-client');
hfc.setLogger(logger);


// client instance provides the main API surface to
// interact with a network of peers and orderers
async function getClientForOrg(userorg, username) {
	
	logger.debug('**** Start **** Get client instance for org', userorg, username)

	// get a fabric client loaded with a con. profile for this org
	// load network settings and save the client for later
	let client = hfc.loadFromConfig(hfc.getConfigSetting('network-connection-profile'));

	console.log("dadadad", client);

	//load a connection profile and set admin identity
	client.loadFromConfig(hfc.getConfigSetting(userorg));


	// create state store and crypto store for this client  
	await client.initCredentialStores();

	// get user from the persistence, (register, enroll)
	// assign the user to the client object

	if (username) {
		let user = await client.getUserContext(username, true)
		if (!user) {
			throw new Error(util.format('User was not found:', username));
		} else {
			{
				logger.debug("User is here , and will be registred and enrolled");
			}
		}
	}
	logger.debug('***End**** getClientForOrg', userorg + username);

	return client;

}

var registerUser = async function (username, userOrg, isJson, password) {
	try {
		// get client for the org
		var client = await getClientForOrg(userOrg);

		// set client in that org for the user
		var user = await client.getUserContext(username, true);

		// set admin as
		var admins = hfc.getConfigSetting('admins');
		console.log("ADMINS", admins);
		let adminUserObj = await client.setUserContext({ username: admins[userOrg].username, password: admins[userOrg].secret });
		let caClient = client.getCertificateAuthority();

		// secret is used  one time to retrice certs with setUserContext
		// ISSUE: https://github.com/hyperledger/composer/issues/2877
		
		// Register a new user and return the enrollment secret
		// https://fabric-sdk-node.github.io/release-1.4/FabricCAClient.html#register__anchor
		// The enrollment secret to use when this user enrolls
		let secret = await caClient.register({
			enrollmentID: username,
			enrollmentSecret: password
		}, adminUserObj);
		logger.debug('Successfully got the secret for user %s', username);

		//An instance of the User class encapsulating the authenticated 
		//user’s signing materials (private key and enrollment certificate). 
		// Enroll user
		//Sets an instance of the User class as the security context of this client instance
		user = await client.setUserContext({ username: username, password: secret });

		// certificates are created in org's store for certificates
		logger.debug('Successfully enrolled username %s  and setUserContext on the client object', username);


		// check if user exist and enrolled
		// return response
		if (user && user.isEnrolled) {
			if (isJson && isJson === true) {
				var response = {
					success: true,
					message: username + ' Registred Successfully',

				};
				
				return response;
			}
		} else {
			throw new Error('User was not registred ');
		}
	} catch (error) {
		logger.error('Failed to get registered user: %s with error: %s', username, error.toString());
		return 'failed ' + error.toString();
	}

};




// get  chaincode path from config.json 
var setupChaincodeDeploy = function () {
	process.env.GOPATH = path.join(__dirname, hfc.getConfigSetting('CC_SRC_PATH'));
};

var getLogger = function (moduleName) {
	var logger = log4js.getLogger(moduleName);
	logger.setLevel('DEBUG');
	return logger;
};

exports.getLogger = getLogger;
exports.setupChaincodeDeploy = setupChaincodeDeploy;
exports.registerUser = registerUser;
