import React from 'react';
import axios from 'axios';
import { GITHUB_CLIENT_ID } from '../../config';

const gitHubOAuth = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=repo`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      code: '',
      repos: [],
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
      .get(`/githubToken?code=${code}`)
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
  getRepos() {
    const { token } = this.state;
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

    axios
      .post(
        'https://api.github.com/graphql?',
        { query },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        console.log(data);
      });
  }

  render() {
    const { code, token } = this.state;
    return (
      <div>
        <p>{code}</p>
        <p>{token}</p>
        <a href={gitHubOAuth}> Login </a>
        {token !== '' ? this.getRepos() : null}
      </div>
    );
  }
}

export default App;
