import React from 'react'

import './github.module.scss'

class GitHub extends React.Component {
  state = {
      user: {},
      repos: []
  }

  componentDidMount = async() => {
    let user = 'JamKelley22';
    let userRes = await fetch(`https://api.github.com/users/${user}`, {
      method: 'GET'
    });
    let repoRes = await fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET'
    });
    let userData = await userRes.json();
    let repoData = await repoRes.json();
    this.setState({
      user: userData,
      repos: repoData
    })
  }

  render () {
    return (
      <div>
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
      </div>
    )
  }
}

export default GitHub;
