export const URLs = {
  LocalGithub: 'http://localhost:8081',
  GithubRaw: 'https://raw.githubusercontent.com/alshdavid/portfolio/master',
  Github: 'https://github.com/alshdavid/portfolio/blob/master'
}

const getBaseURL = () => {
  if (window.location.origin.includes('localhost')) {
    return URLs.LocalGithub
  }
  return URLs.GithubRaw
}

export const Elements = {
  Nav: document.querySelector('body>nav'),
  NavItems: document.querySelector('body>ul:first-child'),
  Main: document.querySelector('body>main'),
}

export const BASE_URL = getBaseURL()