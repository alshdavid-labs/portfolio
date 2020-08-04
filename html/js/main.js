import { setNavbarItems, setActiveNavbarItemFromScroll } from './lib/navbar.js'
import { throttle } from './lib/throttle.js'
import { applyMarkdown } from './lib/markdown.js'
import { Elements } from './lib/constants.js'

void async function main() {
  await applyMarkdown()
  setNavbarItems()
  setActiveNavbarItemFromScroll()
  window.addEventListener('scroll', throttle(setActiveNavbarItemFromScroll, 100));
  setTimeout(() => Elements.Nav.classList.add('in'), 1000)
}()