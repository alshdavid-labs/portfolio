const getBaseURL = () => {
  if (window.location.origin.includes('localhost')) {
    return 'http://localhost:8081'
  }
  return 'https://raw.githubusercontent.com/alshdavid/portfolio/master'
}

export const Elements = {
  Nav: document.querySelector('body>nav'),
  NavItems: document.querySelector('body>ul:first-child'),
  Main: document.querySelector('body>main'),
}

export const BASE_URL = getBaseURL()