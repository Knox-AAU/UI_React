import React, { Component } from 'react';

class DatabaseStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            response: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/dbstatus")
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

        if (!isLoaded) {
            const text = 'Getting database status...';
            const circleClass = <div className="db-status-circle"/>;

            return displayResponse(text, circleClass);
        } 
        else if (error) {
            const text = `Error: ${error.message}`;
            const circleClass = <div className="db-status-circle db-status-circle-red"/>;

            return displayResponse(text, circleClass);
        }
        else if (response.statusCode == 404) {
            const text = `Error: API did not respond.`;
            const circleClass = <div className="db-status-circle db-status-circle-red"/>;

            return displayResponse(text, circleClass);
        }
        else if (response.statusCode == 503) {
            const text = `Error: API responded but got no respones from WordCount database.`;
            const circleClass = <div className="db-status-circle db-status-circle-red"/>;

            return displayResponse(text, circleClass);
        }
        else {
            const text = `WordCount response time: ${Math.round(response.averageResponseTime)} ms.`;
            const circleClass = <div className="db-status-circle db-status-circle-green"/>;

            return displayResponse(text, circleClass)
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