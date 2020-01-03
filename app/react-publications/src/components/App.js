import React, { useEffect, useState } from 'react';
import '../styles/App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.BASE_URL = new URL(document.getElementById('app-url').innerText);

    this.state = {
      login: null,
      publications: []
    }
  }

  async componentDidMount() {
    // Get user name
    let url = new URL('api/login', this.BASE_URL);
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

export default App;
