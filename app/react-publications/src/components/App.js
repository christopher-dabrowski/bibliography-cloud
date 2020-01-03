import React from 'react';
import PropTypes from 'prop-types';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: null,
      publications: [],
      actions: {}
    }
  }

  getCurrentUserLogin = async () => {
    let url = new URL('api/login', this.props.urls.clientBase);
    let response = await fetch(url);
    let login = await response.text();

    this.setState({ login: login });
    return login;
  }

  getActionList = async () => {
    let response = await fetch(this.props.urls.publicationsApi);
    let data = await response.json();
    this.setState({ actions: data["_links"] });
  }

  getPublications = async () => {
    if (!this.state.actions["publications.list"])
      return;

    let actionUlr = this.state.actions["publications.list"].href
    actionUlr = actionUlr.replace('{user}', this.state.login);
    let url = new URL(actionUlr, this.props.urls.publicationsApi);
    console.log(url);

    let response = await fetch(url);
    let data = await response.json();
    this.setState({ publications: data });
  }

  componentDidMount = async () => {
    await this.getCurrentUserLogin();
    await this.getActionList();

    this.getPublications();
  }

  componentDidUpdate = async () => {
    this.getPublications();
  }

  render = () => {
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
  urls: PropTypes.exact({
    clientBase: PropTypes.string.isRequired,
    filesApi: PropTypes.string.isRequired,
    publicationsApi: PropTypes.string.isRequired
  }).isRequired
}

export default App;
