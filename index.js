/*
	# BCS-46x Brewery Automation Controller adapter.

	(The MIT License)
	Copyright © 2013 Carson S. Christian <cscade@gmail.com>
*/
/*jshint node:true */

var Device = require('bcs.client');

/*
	# Adapter
	
	The device adapter object. Provides all connectivity to the controller.

	@param {String} host ex. 192.168.1.10
	@param {Number} [port] || 80
	@param {Function} next(e, adapter)
*/
var Adapter = function (host, port, next) {
	var adapter = this;
	
	if (typeof port === 'function') {
		next = port;
		port = undefined;
	}
	this.ready = false;
	// BCS.client does not support https connections, so it expects an IP address or FQDN, with no scheme.
	if (/:\/\//.test(host)) host = host.split('://')[1];
	this.device = new Device(host, port || 80, function (e, deviceInfo) {
		if (e) return next(e);
		adapter.ready = deviceInfo.ready;
		next(null, adapter);
	});
};

/*
	## expose
*/
module.exports = Adapter;