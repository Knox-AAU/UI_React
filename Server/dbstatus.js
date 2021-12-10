const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

const pingInterval = 600000; // ping every 10 minutes
const statusEntryCount = 10;

class DbStatus {
	constructor(url) {
		this.responses = [];
		this.pingServer(url);
	}

	getStatus() {
		if (this.responses.length === 0) {
			return null;
		}

		let averageResponseTime = 0;

		for (let i = 0; i < this.responses.length; i++) {
			if (this.responses[i].statusCode != 404) {
				averageResponseTime += this.responses[i].responseTime;
			}
		}

		averageResponseTime /= this.responses.length;

		return {
			statusCode: this.responses[this.responses.length - 1].statusCode,
			averageResponseTime: averageResponseTime
		};
	}

	pingServer(url) {
		const startTime = performance.now();

		fetch(url)
			.then(res => {
				this.addStatus({statusCode: res.status, responseTime: performance.now() - startTime});
			})
			.catch(() => {
				this.addStatus({statusCode: 404});
			});
		
		setTimeout(() => {this.pingServer()}, pingInterval);

		return this;
	}

	addStatus(status) {
		this.responses.push(status);

		if (this.responses.length >= statusEntryCount) {
			this.responses.shift();
		}
	}
}

module.exports = DbStatus;