import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import PublicationsList from './PublicationsList';
import Publication from './Publication';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      login: null,
      loadingPublications: false,
      publications: [],
      actions: {},
      urls: props.urls
    };
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
    this.setState({ actions: data['_links'] });
  }

  getPublications = async () => {
    if (!this.state.actions['publications.list'])
      return;

    this.setState({ loadingPublications: true });

    let actionUlr = this.state.actions['publications.list'].href;
    actionUlr = actionUlr.replace('{user}', this.state.login);
    let url = new URL(actionUlr, this.props.urls.publicationsApi);

    let response = await fetch(url);
    let data = await response.json();
    this.setState({ publications: data, loadingPublications: false });
  }

  componentDidMount = async () => {
    await this.getCurrentUserLogin();
    await this.getActionList();

    this.getPublications();
  }

  render = () => {

    return (
      <div className="App">

        <Router>
          <Route path="/publications" render={(props) => {
            const home = props.match.isExact;

            return (
              <section className="container intro d-flex">
                {!home &&
                  <Link to="/publications">
                    <button className="btn btn-warning h-100" style={{ width: '6.5ch' }}>
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </Link>
                }
                <h1 className="mt-2 text-center" style={{ flexGrow: 1 }}>Publikacje</h1>
              </section>
            );
          }} />

          <Switch>
            <Route exact path="/publications">
              <PublicationsList label="Twoje publikacje" publications={this.state.publications} />
            </Route>

            <Route path="/publications/:publicationId" render={(props) => {
              const publication = this.state.publications.find((p) => p.id == props.match.params.publicationId);
              if (!publication) return <Redirect to="/publications" />;
              return <Publication publication={publication} globalState={this.state} />;
            }}>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

App.propTypes = {
  urls: PropTypes.exact({
    clientBase: PropTypes.string.isRequired,
    filesApi: PropTypes.string.isRequired,
    publicationsApi: PropTypes.string.isRequired
  }).isRequired,
  match: PropTypes.object
};

export default App;
