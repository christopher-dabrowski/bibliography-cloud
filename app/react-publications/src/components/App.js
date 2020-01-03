import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: null,
      publications: []
    }
  }

  async componentDidMount() {
    // Get user name
    let url = new URL('api/login', this.props.urls.clientBase);
    let response = await fetch(url);
    let login = await response.text();

    this.setState({ login: login });

    //Get publications
    url = `http://localhost:8090/users/${login}/publications`;
    response = await fetch(url);
    let data = await response.json();
    this.setState({ publications: data });
  }

  render() {
    console.log(this.state);

    return (
      <div className="App">
        <section class="container text-center px-5 intro">
          <h1 class="mt-5">Lista publikacji</h1>
          <p>Publications</p>
          <p>Login: {this.state.login}</p>
        </section>

      </div>
    );
  }
}

App.propTypes = {
  url: PropTypes.exact({
    clientBase: PropTypes.string.isRequired,
    filesApi: PropTypes.string.isRequired,
    publicationsApi: PropTypes.string.isRequired
  }).isRequired
}

export default App;
