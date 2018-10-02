import React from 'react';
import axios from 'axios';

const query = `query {
  viewer {
    name,
    repositories(last:30) {
      nodes {
        name
      }
    }
  }
}`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      code: '',
    };

    // just in case... I don't think we need it
    this.getGitHubToken = this.getGitHubToken.bind(this);
  }

  componentDidMount() {
    axios.get('/session').then(({ data }) => {
      console.log('Session requested Token:', data.token);
      if (data.token !== null) {
        console.log('Session requested Token2:', data.token);
        this.setState({
          token: data.token,
        });
      } else {
        // grab code parameter from URL (github callback sent here.)
        // apparently react router has a way to grab URL params... may want to look into that.
        const code = window.location.href.match(/\?code=(.*)/);
        if (code !== null) {
          this.getGitHubToken(code[1]);
        } else {
          console.log('No Code.');
        }
      }
    });
  }

  // retrieve gitHub token
  getGitHubToken(code) {
    axios
      .get(`/token?code=${code}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({
          code,
          token: data,
        });
      })
      .catch((err) => {
        console.log('Err:', err);
      });
  }

  // retrieve array of repositories
  getRepos(query) {
    const { token } = this.state;
    axios.post('/query', { token, query }).then(({ data }) => {
      console.log(data.data.viewer.repositories.nodes);
    });
  }

  render() {
    const { code, token } = this.state;
    console.log('State Token:', token);
    return (
      <div>
        <p>{code}</p>
        <p>{token}</p>
        <a href="/login"> Login </a>
        {token !== '' ? this.getRepos(query) : null}
      </div>
    );
  }
}

export default App;
