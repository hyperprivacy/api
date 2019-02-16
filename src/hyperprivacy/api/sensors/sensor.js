'use strict'

// create sensor 
var invoke = require("../../invoke-transaction");
var query = require("../../query");

module.exports = function(app){

    // add sensor
    app.post('/api/sensors', async function(req, res){

        
        // get from request peers and aregs
        var peer = req.body.peer;
        var args = req.body.args;

    
        try {
            // params that are sended and mutable are peers , args
            // orgname, and username we extract from jwt
            var message = await invoke.invokeChaincode(peer, "cipchannel","sensors", "addSensor", args, req.orgname, req.username);
            
            res.status(200).send(message);

        }catch(err){
            if (err.status === "BAD_REQUEST") {
                res.status(400).send(err);
              }
        }

    });

    // get all sensors 
    app.get('/api/sensors',async function(req,res){
        // get from request peer and args

        var peer = req.body.peer;
        var args = req.body.args;

        try {
            //params that are mutable are : peers and args 
            // args : query by docType: sensor
            // orgname and username we extract from the jwt
            var message = await query.queryChaincode(peer, "cipchannel","sensors","checkSensors", args ,req.orgname, req.username);
            
            res.send(message);
        }catch(err){
            if(err.status = "BAD_REQUEST"){
                res.status(400).send(err);
            }
        }
    });

    // get sensor by id
        app.get('/api/sensors/:id',async function(req,res){
            // get from request peer and args
    
            var peer = req.body.peer;
            var args = req.body.args;
            var params = req.params.sensorId;
    
            try {
                //params that are mutable are : peers and args, also and in this case the macadress
                // orgname and username we extract from the jwt
                var message = await query.queryChaincode(peer, "cipchannel","sensors","checkSensor",args, req.orgname, req.username,params);
                
                res.send(message);
            }catch(err){
                if(err.status = "BAD_REQUEST"){
                    res.status(400).send(err);
                }
            }
        });

    // remove sensors
    // Params sensorId
    app.delete('/api/sensors/:id', async function(req,res){
        var peer = req.body.peer;
        var args = req.body.args;
        var params = req.params.sensorId;
    
        //params that are mutable are : peers and args, in this case sensor id
        // orgname and username we extract from the jwt
        try{
            var message = await invoke.invokeChaincode(peer,"cipchannel","sensors","removeSensor",args,req.orgname,req.username,params);
            res.send(message);
        }catch(err){
            if(err.status = "BAD_REQUEST"){
                res.status(400).send(err);
            }
        }
    });

    // update sensor
    // params sensorId
    app.put('/api/sensors/:id', async function(req,res){

        var peer = req.body.peer;
        var args = req.body.args;
        var params = req.body.params;

        try{
            var message = await invoke.invokeChaincode(peer,"cipchannel","sensors","updateSensor",args,req.orgname,req.username,params);
            res.send(message);
        }catch(err){
            if(err.status = "BAD_REQUEST"){
                res.status(400).send(err);
            }
        }
    });

    // invoke chaincode
    app.post('/api/sensors/invokeCc', async function(req,res){

        console.log("req body", req.body);
        var peer = req.body.peer;
        var args = req.body.args;
        var sensorId = req.body.sensorId;

        try {
            var message = await invoke.invokeChaincode(peer,"cipchannel","event", "callCcEvent",args,req.orgname, req.username,sensorId);
            res.send(message);
        }catch(err){
            if(err.status ="BAD_REQUEST"){
                res.status(400).send(err);
            }
        }
    })

}
