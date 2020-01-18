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
      userFiles: [],
      actions: {},
      urls: props.urls
    };
  }

  getActionList = async () => {
    let response = await fetch(this.props.urls.publicationsApi);
    let data = await response.json();
    this.setState({ actions: data['_links'] });
  }

  getCurrentUserLogin = async () => {
    let url = new URL('api/login', this.props.urls.clientBase);
    let response = await fetch(url);
    let login = await response.text();

    this.setState({ login: login });
    return login;
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

  getUserFiles = async () => {
    let url = new URL('api/jwt/listFiles', this.props.urls.clientBase);
    let response = await fetch(url);
    let data = await response.json();
    let token = data.token;

    url = new URL('/files', this.props.urls.filesApi);
    url.searchParams.set('user', this.state.login);
    url.searchParams.set('token', token);

    response = await fetch(url);
    data = await response.json();

    if (!response.ok) {
      alert('Nie udało się pobrać listy Twoich plików');
      return;
    }

    this.setState({ userFiles: data });
  }

  createAllert = (message, category = 'info') => {
    const li = document.createElement('li');
    li.setAttribute('role', 'alert')
    li.classList.add('alert');
    li.classList.add('alert-dismissible');
    li.classList.add('fade');
    li.classList.add('show');
    li.classList.add('mt-2');
    li.classList.add(`alert-${category}`);

    const span = document.createElement('span');
    span.innerText = message;
    li.appendChild(span);

    const closeButton = document.createElement('button');
    closeButton.classList.add('close');
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('data-dismiss', 'alert');
    closeButton.setAttribute('aria-label', 'Close');

    const closeIcon = document.createElement('span');
    closeIcon.setAttribute('aria-hidden', 'true');
    closeIcon.innerHTML = '&times;';

    closeButton.appendChild(closeIcon);
    li.appendChild(closeButton);

    return li;
  }

  displayInformation = (message, category = 'info') => {
    const flashList = document.getElementById('flashes');
    flashList.appendChild(this.createAllert(message, category));
  }

  componentDidMount = async () => {
    await this.getCurrentUserLogin();
    await this.getActionList();

    this.getPublications();
    this.getUserFiles();

    console.log('Stream time!');
    this.stream = new EventSource(this.props.urls.clientBase + '/stream');
    this.stream.addEventListener(`user:${this.state.login}`, (event) => {
      this.getPublications();
      var data = JSON.parse(event.data);
      this.displayInformation(data.message);
    });
  }

  render = () => {

    return (
      <div className="App">

        <Router>
          <Route path="/publications" render={(props) => {
            const home = props.match.isExact;
            // this.refreshPublications();

            return (
              <section className="container intro d-flex">
                {!home &&
                  <Link to="/publications" onClick={this.getPublications}>
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
              <PublicationsList label="Twoje publikacje" publications={this.state.publications}
                refreshPublications={this.getPublications} globalState={this.state}
              />
              <section className="container">
                <hr />
                {this.state.actions['publication.create'] && // Add create button only when there is action
                  <Link to="/publications/create">
                    <button type='button' className="btn btn-primary">Nowa publikacja</button>
                  </Link>
                }
              </section>
            </Route>

            <Route path="/publications/create">
              {/* <p>Create publication</p> */}
              <Publication createMode={true} refreshPublications={this.getPublications} globalState={this.state} />
            </Route>

            <Route path="/publications/:publicationId" render={(props) => {
              const publication = this.state.publications.find((p) => p.id == props.match.params.publicationId);
              if (!publication) return <Redirect to="/publications" />;
              return <Publication publication={publication} refreshPublications={this.getPublications} globalState={this.state} />;
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
