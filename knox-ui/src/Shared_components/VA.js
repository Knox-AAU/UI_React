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
      const self = this;
      const { steps } = this.props;
      const search = steps.search.value;
      const query = encodeURI(`
        select * where {
        ?x rdfs:label "${search}"@en .
        ?x rdfs:comment ?comment .
        FILTER (lang(?comment) = 'en')
        } LIMIT 100
      `);
  
      const queryUrl = `https://dbpedia.org/sparql/?&query=${query}&format=json`;
  
      const xhr = new XMLHttpRequest();
  
      xhr.addEventListener('readystatechange', readyStateChange);
  
      function readyStateChange() {
        if (this.readyState === 4) {
          const data = JSON.parse(this.responseText);
          const bindings = data.results.bindings;
          if (bindings && bindings.length > 0) {
            self.setState({ loading: false, result: bindings[0].comment.value });
          } else {
            self.setState({ loading: false, result: 'Not found.' });
          }
        }
      }
  
      xhr.open('GET', queryUrl);
      xhr.send();
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
                  Search Again
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

  const ExampleDBPedia = () => (
    <ThemeProvider theme={theme}>
    <ChatBot
      floating = {true}
      headerTitle = "Virtual Assistant" 
      hideUserAvatar = {true}
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
  
  export default ExampleDBPedia;
