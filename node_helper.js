var NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
	start: function() {
	},
	
	reload: function(refConfig) {
				
		var self=this;
		self.httpsRequestData = '';
		self.tmpDate = null;
		
		var options = {
		  hostname: refConfig.dataGrandLyonURL,
		  port: refConfig.dataGrandLyonPORT,
		  path: refConfig.dataGrandLyonAPIPath,
		  method: 'GET',
		  headers: {
		    'Content-Type': 'application/json',
		    'Authorization': 'Basic ' + new Buffer('guillaume.soullard@gmail.com:G1newmodep@s').toString('base64')
		 }
		};
						
		var req = https.request(options, (res) => {
			
			res.setEncoding('utf8');
			res.on('data', (chunk) => {				
					self.httpsRequestData += chunk;
			});
			
			res.on('end', () => {
				try{
						var JSONParsed = JSON.parse(self.httpsRequestData);
						self.httpsRequestData = '';
						self.sendSocketNotification("RELOAD_DONE",JSONParsed);
					}catch(error) {
					}
			});
			
			req.on('error', (e) => {
				console.log(`problem with request: ${e.message}`);
			});
			
		});

		req.end();
		
	},

	socketNotificationReceived: function(notification, payload) {
	    if (notification === 'RELOAD') {
	      this.reload(payload);
	    }
	}
});






