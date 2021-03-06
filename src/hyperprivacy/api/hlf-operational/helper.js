'use strict'

// framework that hyperledger use for debug
var log4js = require("log4js");
var logger = log4js.getLogger('Helper');
logger.setLevel('DEBUG');

var path = require('path');
var util = require('util');

var hfc = require('fabric-client');
var register = require('../../registerUser');
hfc.setLogger(logger);

// client instance provides the main API surface to
// interact with a network of peers and orderers
async function getClientForOrg(userorg, username) {
    // the same as console.log
    logger.debug('**** Start **** Get client instance for org', userorg, username)

    // get a fabric client loaded with a con. profile for this org
    // load network settings and save the client for later
    let client = hfc.loadFromConfig(hfc.getConfigSetting('network-connection-profile'));

    
    console.log("client", client);

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

var getRegisteredUser = async function (username, userOrg, isJson) {
    try {

        // get client for the org
        var client = await getClientForOrg(userOrg);

        logger.debug('Successfully initialized the credential stores');

        // returns the user by the given name. 
        var user = await client.getUserContext(username, true);

        // check if user exist
        if (!user) {
            throw new Error(util.format('User was not found:', username));
        } else {
            {
                logger.debug("User is here , and will be enrolled");
            }
        }

        logger.debug('***End**** getClientForOrg', userOrg + username);

        // check if user exist and enrolled
        // return response with token
        if(user && user.isEnrolled) {
			if (isJson && isJson === true) {
				var response = {
                    success: true,
					message: username + ' enrolled Successfully',
					
				};
				console.log(response);
				return response;
			}
		} else {
			throw new Error('User was not enrolled ');
		};


    } catch (error) {
        logger.error('Failed to get registered user: %s with error: %s', username, error.toString());
        return 'failed ' + error.toString();
    }

};



// define path of chaincode
var setupChaincodeDeploy = function () {
    process.env.GOPATH = path.join(__dirname, hfc.getConfigSetting('CC_SRC_PATH'));
}

var getLogger = function (moduleName) {
    var logger = log4js.getLogger(moduleName);
    logger.setLevel('DEBUG');
    return logger;

}

exports.getClientForOrg = getClientForOrg;
exports.getLogger = getLogger;
exports.setupChaincodeDeploy = setupChaincodeDeploy;
exports.getRegisteredUser = getRegisteredUser;
exports.register = register;
