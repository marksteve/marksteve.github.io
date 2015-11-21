var React = require('react')
var superagent = require('superagent')
var Velocity = require('velocity-animate')

require('velocity-animate/velocity.ui')

var TOKEN = '9b84903a3ed3e6e8452ba6cd72cf8f1b72330c37'

var Repos = React.createClass({
  getInitialState() {
    return {
      repos: []
    }
  },
  componentWillMount() {
    superagent
      .get('https://api.github.com/user/repos')
      .set('Authorization', 'token ' + TOKEN)
      .query({type: 'owner', sort: 'updated'})
      .end((err, res) => {
        if (res.ok) {
          this.setState({repos: res.body})
        }
      })
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevState.repos.length !== this.state.repos.length) {
      Velocity(
        this.getDOMNode().querySelectorAll('.repo'),
        'transition.slideUpIn',
        {display: 'inline-block', stagger: 100}
      )
    }
  },
  render() {
    let repos = this.state.repos.sort((a, b) => {
      if (a.stargazers_count === b.stargazers_count) {
        return 0
      }
      return a.stargazers_count > b.stargazers_count ? -1 : 1
    }).slice(0, 10).map(this.renderRepo)
    return (
      <div>
        <h2>Open Source Projects</h2>
        <ul>
          {repos.length > 0 ? repos : (
          <li>
            Getting repos from <span className="octicon octicon-logo-github" />&hellip;
          </li>
          )}
        </ul>
      </div>
    )
  },
  renderRepo(repo) {
    return (
      <li key={repo.id} className="repo">
        <a href={repo.html_url}>
          <div className="stars">
            <div className="octicon octicon-star" />
            <span className="stars-count">
              {repo.stargazers_count}
            </span>
          </div>
          <span className="name">
            {repo.name}
          </span>
          <div className="desc">
            {repo.description}
          </div>
        </a>
      </li>
    )
  }
})

React.render(
  <Repos />,
  document.getElementById('repos')
)