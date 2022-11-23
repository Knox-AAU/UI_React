import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot, { Loading } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import dateFormat from 'dateformat';
import botAvatar from '../Img/Wall.png';

// Virtual assistant has been commented out since it is currently not working and producing multiple errors.
// It is recommended that the virtual assistant should be rewritten using a non-deprecated library.
// An example of this could be the react-chatbot-kit (https://www.npmjs.com/package/react-chatbot-kit).

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
      
      this.triggerNext = this.triggerNext.bind(this);
    }
  
    componentDidMount() {
      let json;
      const VAThis = this;
      const { steps } = this.props;
      const search = steps.search.value; //Gets the information from the step with id search
      //The UI server runs on port 8000 on the same node, and pipes to query to the access API
        //TODO: Move link to env file
      const queryUrl = `http://localhost:8000/VirtualAssistant/node?id=${encodeURI(search)}`;
      
      //Fetches the response from the knowledge graph
      fetch(queryUrl)
      .then(
        response => { //Get the body from the response
          return response.text();
        }
      ) 
      .then( //If the body contains anything, parse it as Json, otherwise pass null
        text => {
          if (text.length > 0) {
            json = JSON.parse(text);
          } else json = null;
          return json;
        }
      )
      .then(
        json => {
          if (json === null) { //If no content was received, display an error
            VAThis.setState({ loading: false, result: 'Something went wrong...' });
            return;
          } //If there is content, format and display it
          VAThis.setState({ loading: false, result: this.formattedResponse(JSON.parse(json), search) });
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
      output.push(<div style={{fontSize: "16px", fontWeight: "bolder"}}> {`${search}`}</div>)

      //Pushes a div for each key in the information dictionary
      for (const key of keyset) {
        output.push(this.responseElement(key, responseInfo[key]));
      }
      return output;
    }   

    //Formats the key-value pairs in the response information
    responseElement(key, value) {
      let formattedKey = key;
      let formattedValue = "";

      //Format of the key to the output
      formattedKey = this.capitalizeInitialLetter(formattedKey);
      formattedKey = formattedKey.replaceAll("_", " ");

      //Format the values according to type
      formattedValue = this.formatValue(value);
      
      let fancyString = `${formattedKey}: ${formattedValue}`;
      return ( 
        <div style={{fontSize: "14px"}}> {fancyString} </div>
      )
    }

    //Capitalizes the initial letter of a string, input as a value called value and return a string, that is formatted so that the first letter is capitalized
    capitalizeInitialLetter(value) {
      //Makes sure that the value is a String object, rather than a primitive string, which is necessary
      value = String(value);
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    //Formats the values according to their types. 
    formatValue(value) {
      let formattedValue = "";

      //Multiple variables are capitalized and comma separated, with last comma removed
      if (value.length > 1){
        for (let val of value){
          formattedValue += this.capitalizeInitialLetter(val) + ", ";
        }
        formattedValue = formattedValue.slice(0, -2);
      } else if (Date.parse(value[0])) { //Dates are formatted using dateFormat, many options for different displays of time
        const time = new Date(value[0]);
        formattedValue = dateFormat(time, "dd-mm-yyyy");
      }else if (typeof value[0] === 'string' || value[0] === String) { //'string' catches primitive strings, String catches proper string Objects
        formattedValue += this.capitalizeInitialLetter(value); //With single strings, they just need to be capitalized
      }  else formattedValue += value;

      return formattedValue;
    }

    triggerNext() {
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
                <button class="ButtonStyle btn btn-primary" //class for using the same style as other UI buttons
                  onClick={() => this.triggerNext()}
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
      background: '#fff',
      botBubbleColor: '#3874cb',
      botFontColor: "#fff",
      headerBgColor: '#3874cb',
      headerFontColor: "#fff"
  };

  const VirtualAssistantBot = () => (
    <ThemeProvider theme={theme}>
    <ChatBot
      //Various settings for the chatbot are entered here
      //For more options: https://lucasbassetti.com.br/react-simple-chatbot/#/docs/chatbot
      floating = {true} //Sets the interface as a bubble at the start, the can be opened
      headerTitle = "Virtual Assistant" //Title at the top of the chat interface
      hideUserAvatar = {true} //Hides the user avatar, can also be shown and changed if needed
      botDelay = {800} //The delay where the bot is "writing", to seem more like an actual person
      botAvatar={botAvatar} //Chatbot picture

      //The actual steps the chat bot goes through to communicate with the user
      steps={[
        {
          id: '1', //The id of the step, used to trigger it directly, and to get information from a step, if there is any
          message: 'What do you want me to tell you about?', //Message is the message the bot displays
          trigger: 'search', //Triggers the step with the id as given
        },
        {
          id: 'search',
          user: true, //Means that it waits for user interaction, info can be fetched with a steps.'id'.value
          trigger: '3',
        },
        {
          id: '3',
          component: <VirtualAssistant />, //Triggers a predefined component
          waitAction: true, //Waits until next step is manually triggered, here with a button from the component, that calles triggerNext
          trigger: '1',
        },
      ]}
    />
    </ThemeProvider>
  );
  
  export default VirtualAssistantBot;
