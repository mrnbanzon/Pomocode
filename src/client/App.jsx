import React from 'react';
import axios from 'axios';
import queries from '../../utils/queries';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    axios.get('/session').then(({ data }) => {
      if (data.token !== null) {
        this.setState({
          token: data.token,
        });
      }
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
    const { token } = this.state;
    return (
      <div>
        <p>{token}</p>
        <a href="/login"> Login </a>
        {token !== '' ? this.getRepos(queries.repoNames) : null}
      </div>
    );
  }
}

export default App;
