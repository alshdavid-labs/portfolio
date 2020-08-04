const path = require('path')

const Constants = {
  GithubURL: 'https://api.github.com/repos/alshdavid/portfolio/releases',
  GithubToken: process.env.GITHUB_TOKEN || undefined,
}

const URLs = {
  LocalHTMLServer: 'http://localhost:8080',
  LocalGitHubServer: 'http://localhost:8081',
}

const Directories = {
  Root: path.resolve(__dirname, '..', '..', '..'),
  HTML: path.resolve(__dirname, '..', '..', '..', 'html'),
  Dist: path.resolve(__dirname, 'dist'),
}

module.exports = {
  Directories,
  URLs,
  Constants,
}