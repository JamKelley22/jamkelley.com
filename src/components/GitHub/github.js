import React from 'react'
import PropTypes from 'prop-types'

import { ThemeConsumer } from '../../context'

import './github.scss'

const GITHUB_API_URL_BASE = 'https://api.github.com'

class GitHub extends React.Component {
  state = {
      user: {},
      repos: []
  }

  componentDidMount() {
    this.refresh();
  }

  refresh = async() => {
    let user = this.props.username;
    let userRes = await fetch(`${GITHUB_API_URL_BASE}/users/${user}`);
    let repoRes = await fetch(`${GITHUB_API_URL_BASE}/users/${user}/repos`);
    let userData = await userRes.json();
    let repoData = await repoRes.json();
    repoData = repoData.filter(repo => {
      return repo.private === false;
    })
    this.setState({
      user: userData,
      repos: repoData
    })
  }

  render () {
    return (
      <ThemeConsumer>
        {themeObj =>
          <div id='githubComponent' style={themeObj.theme}>
            <h3>{this.state.user.login}</h3>
            <h5>{this.state.user.name}</h5>
            <p>{this.state.user.bio}</p>
            <a href={this.state.user.url}>GitHub</a>
            {
              this.state.repos.map((repo,i) => {
                return (
                  <div key={i}>
                    <h3>{repo.name}</h3>
                    <p>{repo.description}</p>
                    <a href={repo.html_url}>View</a>
                    Stars: {repo.stargazers_count}
                    Watchers: {repo.watchers_count}
                  </div>
                )
              })
            }
            <button onClick={this.refresh}>Refresh</button>
          </div>
        }
      </ThemeConsumer>
    )
  }
}

export default GitHub;

GitHub.propTypes = {
  username: PropTypes.string
}

GitHub.defaultProps = {
  username: 'JamKelley22'
}
