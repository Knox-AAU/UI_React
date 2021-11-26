import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

//Anything without explicit comments is taken (almost) directly from react-simple-chatbot Wikidata example
//https://lucasbassetti.com.br/react-simple-chatbot/#/docs/wikipedia


class VirtualAssistant extends Component {
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
      //The UI server runs on port 8000 on the same node, and pipes to query to the access API
      const queryUrl = `http://localhost:8000/VirtualAssistant/node?id=${encodeURI(search)}`;
      
      //Fetches the response from the knowledge graph
      fetch(queryUrl)
      .then(
        response => {
          if (response.status === 200 ) {
            json = response.json()
          }
          return json;
        }
      ) //Formats the response and adds it to the display in the chat area
      .then(
        json => {
          if (json === null) {
            self.setState({ loading: false, result: 'Something went wrong...' });
            return;
          }
          self.setState({ loading: false, result: this.formattedResponse(JSON.parse(json), search) });

        }
      )
      .catch(e => console.log(e))
    }
  
    //Formats the response, returning each item as a div in an array
    formattedResponse(response, search) {
      let output = [];
      let responseInfo = response["information"];
      const keyset = Object.keys(responseInfo);

      //Pushes a header div onto the output, displaying the searched input in bold
      output.push(<div style={{fontSize: "16px", fontWeight: "bolder"}}> {`${search}:`}</div>)

      //Pushes a div for each key in the information dictionary
      for (const key of keyset) {
        output.push(this.responseElement(key, responseInfo[key]));
      }

      return output;
    }   

    //Formats the key-value pairs in the response information
    responseElement(key, value) {
      let formattedKey = key;
      let formattedValue = value;

      formattedKey = this.capitalizeInitialLetter(formattedKey);
      formattedKey = formattedKey.replaceAll("_", " ");

      let fancyString = `${formattedKey}: ${formattedValue}`;
      return ( 
        <div style={{fontSize: "14px"}}> {fancyString} </div>
      )
    }

    //Capitalizes the initial letter of a string, input as a value called value and return a string, that is formatted so that the first letter is capitalized
    capitalizeInitialLetter(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    triggetNext() {
      this.setState({ trigger: true }, () => {
        this.props.triggerNextStep();
      });
    }
  
    render() {
      const { trigger, loading, result } = this.state;
  
      return (
        <div>
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
                  Search Again?
                </button>
              }
            </div>
          }
        </div>
      );
    }
  }
  
  VirtualAssistant.propTypes = {
    steps: PropTypes.object,
    triggerNextStep: PropTypes.func,
  };
  
  VirtualAssistant.defaultProps = {
    steps: undefined,
    triggerNextStep: undefined,
  };
  
  //Uses Themeprovider to style the chatbot interface, properties are described at the docs
  const theme = {
      background: '#fff',//'#212529',
      botBubbleColor: '#3874AB',//"#313539",
      botFontColor: "#fff",
      headerBgColor: '#3874CB',
      headerFontColor: "#fff"
  };

  const VirtualAssistantBot = () => (
    <ThemeProvider theme={theme}>
    <ChatBot
      //Various settings for the chatbot are entered here
      //For more options: https://lucasbassetti.com.br/react-simple-chatbot/#/docs/chatbot
      floating = {true}
      headerTitle = "Virtual Assistant" 
      hideUserAvatar = {true}
      botDelay = {1000}

      //The actual steps the chat bot goes through to communicate with the user
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
          component: <VirtualAssistant />,
          waitAction: true,
          trigger: '1',
        },
      ]}
    />
    </ThemeProvider>
  );
  
  export default VirtualAssistantBot;
