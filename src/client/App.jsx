import React from 'react';
import axios from 'axios';

const query = `query {
  viewer {
    name,
    repositories(last:3) {
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
    // grab code parameter from URL (github callback sent here.)
    // apparently react router has a way to grab URL params... may want to look into that.
    const code = window.location.href.match(/\?code=(.*)/);
    if (code !== null) {
      this.getGitHubToken(code[1]);
    } else {
      console.log('No Code.');
    }
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
    axios
      .post(
        'https://api.github.com/graphql',
        { query },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        console.log(data.data.viewer.repositories.nodes);
      });
  }

  render() {
    const { code, token } = this.state;
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
