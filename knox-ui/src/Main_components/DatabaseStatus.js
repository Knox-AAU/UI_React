import React, { Component } from 'react';

class DatabaseStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: []
        };
        this.greenCircle = <div className="db-status-circle db-status-circle-green"/>;
        this.yellowCircle = <div className="db-status-circle db-status-circle-yellow"/>;
        this.redCircle = <div className="db-status-circle db-status-circle-red"/>;
    }

    componentDidMount() {
        const api = this.props.apiName;
        const port = this.props.port;

        fetch(`http://localhost:${port}/${api}`)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    response: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, response } = this.state;
        const dbName = this.props.dbName;

        if (!isLoaded) {
            return displayResponse(
                `Getting ${dbName} database status...`, this.yellowCircle
            );
        }
        else if (error) {
            return displayResponse(
                `${dbName} error: ${error.message}`, this.redCircle
            );
        }
        else if (!response) {
            return displayResponse(
                `Error: Server contains no data about the ${dbName} API.`, this.redCircle
            );
        }
        else if (response.statusCode === 404) {
            return displayResponse(
                `Error: ${dbName} API did not respond.`, this.redCircle
            );
        }
        else if (response.statusCode === 500) {
            return displayResponse(
                `Error: API responded but got no response from the ${dbName} database.`, this.redCircle
            );
        }
        else {
            return displayResponse(
                `${dbName} response time: ${Math.round(response.averageResponseTime)} ms.`, this.greenCircle
            )
        }
    }
}

function displayResponse(text, circleClass) {
    return (
        <div className="db-status-container">
            {circleClass}
            <span className="db-status-text">{text}</span>
        </div>
    );
}

export default DatabaseStatus;