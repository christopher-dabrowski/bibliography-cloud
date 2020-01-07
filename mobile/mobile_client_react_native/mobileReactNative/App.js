import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

import Login from './components/Login';
import PublicationsList from './components/PublicationsList';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: "Login",
      login: null,
      actions: {},
      publications: [],
      urls: { filesApi: 'http://localhost:8081', publicationsApi: 'http://localhost:8090' }
    }
  }

  static componentDidMount = async () => {
    await this.getActionList();
    this.refreshPublications();
  }

  static getActionList = async () => {
    let response = await fetch(this.props.urls.publicationsApi);
    let data = await response.json();
    this.setState({ actions: data['_links'] });
  }

  static refreshPublications = async () => {
    if (!this.state.actions['publications.list'])
      return;

    this.setState({ loadingPublications: true });

    let actionUlr = this.state.actions['publications.list'].href;
    actionUlr = actionUlr.replace('{user}', this.state.login);
    let url = new URL(actionUlr, this.props.urls.publicationsApi);

    let response = await fetch(url);
    let data = await response.json();
    this.setState({ publications: data });
  }

  static setScreen = (newScreen) => {
    this.setState({ screen: newScreen });
  }

  static setLogin = (login) => {
    this.setState({ login: login });
  }

  render() {
    return (
      <View style={styles.container} >
        {screen === "Login" &&
          <Login setScreen={setScreen} globalState={this.state} setLogin={setLogin} refreshPublications={refreshPublications} />
        }
        {
          screen === 'PublicationList' &&
          <PublicationsList publications={this.state.publications} globalState={this.state} refreshPublications={refreshPublications} />
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
