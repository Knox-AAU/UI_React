const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

//const pingInterval = 600000; // ping every 10 minutes
const pingInterval = 1000; // ping every second
const statusEntryCount = 10;

const responses = [];

pingServer();

function pingServer() {
	const startTime = performance.now();

	fetch(`https://jsonplaceholder.typicode.com/todos/1`)
		.then(res => res.text())
		.then(data => {
			console.log(data);
			let status = {
				title: data.title,
				responseTime: performance.now() - startTime
				//serverStatus: response.serverStatus,
				//dbStatus: response.dbStatus
			};

			//console.log(status);
	
			responses.push(status);
	
			if (responses.length >= statusEntryCount) {
				responses.shift();
			}
	
			//console.log(responses);
		})
        .catch(e => {
			console.log(e);
		});
	
	setTimeout(pingServer, pingInterval);
}

function getStatus() {
	let averageResponseTime = 0;

	for (let i = 0; i < responses.length; i++) {
		averageResponseTime += responses[i].responseTime;
	}

	averageResponseTime /= responses.length;
	
	return {
		averageResponseTime: averageResponseTime
	};
}

module.exports.getStatus = getStatus;