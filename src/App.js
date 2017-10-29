import React, { Component } from 'react';
import HoverCard from './HoverCard'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <HoverCard
          displayComponentWhenHovered={<HoveredComponent githubUserName='clarkdo'/>}
        >
          <p>OK</p>
        </HoverCard>
      </div>
    );
  }
}

export default App;

const GITHUB_USER_API_BASE_URL = 'https://api.github.com/users/'

class HoveredComponent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar_url: '',
      name: '',
      url: ''
    }
  }
  componentWillMount() {
    axios.get(GITHUB_USER_API_BASE_URL + this.props.githubUserName)
      .then((res) => {
        const data = res.data
        this.setState({
          avatar_url: data.avatar_url,
          name: data.login,
          nickname: data.name,
          url: data.html_url
        })
      })
  }
  render() {
    return (
      <div className="inner">
        <img
          src={this.state.avatar_url}
          alt='hogehoge'
          width={48}
          height={48}
        />
        <div>
          <a
            href={this.state.url}
            target="_blank"
          >{this.state.name}</a>
          <p>
            <span>ニックネーム:</span>
            <span>{this.state.nickname}</span>
          </p>
        </div>
      </div>
    )
  }
}