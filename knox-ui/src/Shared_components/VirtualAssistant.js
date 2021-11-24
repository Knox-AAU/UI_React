import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

class DBPedia extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        result: '',
        trigger: false,
      };
  
      this.triggetNext = this.triggetNext.bind(this);
    }
  
    componentDidMount() {
      let json;
      const self = this;
      const { steps } = this.props;
      const search = steps.search.value;
      const queryUrl = `http://localhost:8081/api/VirtualAssistant/node?id=${search}`;
      console.log(queryUrl);
      fetch(queryUrl)
      .then(
        response => {
          console.log("Fetch responded");
          if (response.status === 200 ) {
            json = response.json()
          }
          return json;
        }
      )
      .then(
        json => {
          console.log(json);
          self.setState({ loading: false, result: json });
          if (json === null) {
          self.setState({ loading: false, result: 'Something went wrong...' });
          }
        }
      )
      .catch(e => console.log(e))
    }
  
    formatResponse(response) {
      return response.text; //TODO: Actually implement this
    }

    triggetNext() {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep();
      });
    }
  
    render() {
      const { trigger, loading, result } = this.state;
  
      return (
        <div className="dbpedia">
          { loading ? <Loading /> : result }
          {
            !loading &&
            <div
              style={{
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              {
                !trigger &&
                <button
                  onClick={() => this.triggetNext()}
                >
                  Try Again?
                </button>
              }
            </div>
          }
        </div>
      );
    }
  }
  
  DBPedia.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  DBPedia.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
  
  const theme = {
      background: '#fff',//'#212529',
      botBubbleColor: '#3874AB',//"#313539",
      botFontColor: "#fff",
      headerBgColor: '#3874CB',
      headerFontColor: "#fff"
  };

  const VirtualAssistant = () => (
    <ThemeProvider theme={theme}>
    <ChatBot
      floating = {true}
      headerTitle = "Virtual Assistant" 
      hideUserAvatar = {true}
      botDelay = {250}
      steps={[
        {
          id: '1',
          message: 'What do you want me to tell you about?',
          trigger: 'search',
        },
        {
          id: 'search',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          component: <DBPedia />,
          waitAction: true,
          trigger: '1',
        },
      ]}
    />
    </ThemeProvider>
  );
  
  export default VirtualAssistant;
