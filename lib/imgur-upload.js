/*
 * imgur-upload
 * https://github.com/adamcoulombe/node-imgur-api
 *
 * Copyright (c) 2013 adamcoulombe
 * Licensed under the MIT license.
 */

'use strict';

var https = require('https'),
    fs = require('fs'),
    request = require('request');

var imgur = {
	_clientID : null,
	setClientID : function(clientID){
		this._clientID = clientID;
	},
	upload : function(file,callback) {
		if(this._clientID && file){
			var options = {
			    url: 'https://api.imgur.com/3/upload',
			    headers: {
			     'Authorization': 'Client-ID ' + this._clientID
			  	}         
			};
			var post = request.post(options, function(err, req, body){
				callback(err, JSON.parse(body));
			});
			var upload = post.form();
		    upload.append('type', 'file');
		    upload.append('image', fs.createReadStream(file));
	    }
	}
};

exports.upload = imgur.upload;
exports.setClientID = imgur.setClientID;
