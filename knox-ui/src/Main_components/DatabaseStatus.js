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
            return <div>Error: {error.message}.</div>;
        } else if (!isLoaded) {
            return <div>Getting database status...</div>;
        } else {
            return (
                <div>
                    WordCount response time: {Math.round(status.averageResponseTime)} ms.
                </div>
            );
        }
    }
}

export default DatabaseStatus;