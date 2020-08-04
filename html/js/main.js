import { setNavbarItems, setActiveNavbarItemFromScroll } from './lib/navbar.js'
import { throttle } from './lib/throttle.js'
import { applyMarkdown } from './lib/markdown.js'

void async function main() {

  await applyMarkdown()
  setNavbarItems()
  setActiveNavbarItemFromScroll()
  window.addEventListener('scroll', throttle(setActiveNavbarItemFromScroll, 100));
}()