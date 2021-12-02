import React, { Component } from 'react';

class DatabaseStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            status: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:8000/dbstatus")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    status: result
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
        const { error, isLoaded, status } = this.state;

        if (error) {
            return (
                <div className="db-status-container">
                    <div className="db-status-circle db-status-circle-red"/>
                    <span className="db-status-text">Error: {error.message}.</span>
                </div>
            );
        } else if (!isLoaded) {
            return (
                <div className="db-status-container">
                    <div className="db-status-circle"/>
                    <span className="db-status-text">Getting database status...</span>
                </div>
            );
        } else {
            return (
                <div className="db-status-container">
                    <div className="db-status-circle db-status-circle-green"/>
                    <span className="db-status-text">WordCount response time: {Math.round(status.averageResponseTime)} ms.</span>
                </div>
            );
        }
    }
}

export default DatabaseStatus;