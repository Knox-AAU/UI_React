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
			addStatus({statusCode: res.status, responseTime: performance.now() - startTime});
		})
        .catch(e => {
			addStatus({statusCode: 404, responseTime: -1});
		});
	
	setTimeout(pingServer, pingInterval);
}

function addStatus(status) {
	responses.push(status);

	if (responses.length >= statusEntryCount) {
		responses.shift();
	}
}

function getStatus() {
	let averageResponseTime = 0;

	for (let i = 0; i < responses.length; i++) {
		if (responses[i].statusCode != 404) {
			averageResponseTime += responses[i].responseTime;
		}
	}

	averageResponseTime /= responses.length;
	
	return {
		statusCode: responses[responses.length - 1].statusCode,
		averageResponseTime: averageResponseTime
	};
}

module.exports.getStatus = getStatus;