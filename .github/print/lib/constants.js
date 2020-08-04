const path = require('path')

const Constants = {
  GithubURL: 'https://api.github.com/repos/alshdavid/portfolio/releases',
  GithubToken: process.env.GITHUB_TOKEN || undefined,
}

const URLs = {
  LocalHTMLServer: 'http://localhost:8080',
  LocalHTMLServerPrint: 'http://localhost:8080/?print=true',
  LocalGitHubServer: 'http://localhost:8081',
}

const Directories = {
  Root: path.resolve(__dirname, '..', '..', '..'),
  HTML: path.resolve(__dirname, '..', '..', '..', 'html'),
  SCSS: path.resolve(__dirname, '..', '..', '..', 'html', 'scss'),
  Dist: path.resolve(__dirname, 'dist'),
}

const Files = {
  SCSS: path.resolve(Directories.SCSS, 'style.scss'),
  CSS: path.resolve(Directories.HTML, 'style.css'),
}

module.exports = {
  Directories,
  URLs,
  Constants,
  Files,
}