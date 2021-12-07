const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

const pingInterval = 600000; // ping every 10 minutes
const statusEntryCount = 10;

const responses = [];

pingServer();

function pingServer() {
	const startTime = performance.now();

	fetch("http://localhost:8081/api/wordCount/status")
		.then(res => {
			console.log(res);
			let status = {
				statusCode: res.status,
				responseTime: performance.now() - startTime
			};

			responses.push(status);
	
			if (responses.length >= statusEntryCount) {
				responses.shift();
			}
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
		status: responses[responses.length - 1],
		averageResponseTime: averageResponseTime
	};
}

module.exports.getStatus = getStatus;