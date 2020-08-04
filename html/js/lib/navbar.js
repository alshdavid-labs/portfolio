import { Elements } from './constants.js'

const getPosition = (element) => {
  var yPosition = 0;
  let hasParent = true

  while(hasParent) {
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
      if (element.offsetParent === null) {
          hasParent = false
          continue
      };
      element = element.offsetParent 
  }

  return yPosition;
}


const setNavItem = (item) => {
  document.querySelectorAll('nav ul:first-child a')
      .forEach(element => {
          element.classList.remove('active')
          if (element.getAttribute('href') === '#' + item) {
              element.classList.add('active')
          }
      })
}

const findLocationOfIDs = () => {
  return Array.from(document.querySelectorAll('h1[id]')).map((e) => {
      return { 
          key: e.getAttribute('id') || '', 
          pos: getPosition(e)
      }
  })
}

const whichSection = (locations, focus) => {
  for (let i = 0; i < locations.length; i++) {
      const start = locations[i].pos
      const end = (i != locations.length - 1) ? locations[i+1].pos : document.body.scrollHeight

      if (focus >= start && focus <= end) {
          return locations[i].key
      }
  }
}

export const setActiveNavbarItemFromScroll = () => {
  const topOfScroll = window.pageYOffset
  const focus = (topOfScroll + window.innerHeight) - (window.innerHeight * 0.5)

  const locations = findLocationOfIDs()
  const chosen = whichSection(locations, focus)
  if (chosen === undefined) {
      return
  }
  setNavItem(chosen)
}

export const setNavbarItems = () => {
  const ul = Elements.Nav.querySelector('ul:first-child')
  let navHTML = ''
  for (const element of Elements.Main.querySelectorAll('h1')) {
    navHTML += `<li><a href="#${element.id}">${element.innerText}</a></li>`
  }
  ul.innerHTML = navHTML
}