import { Elements, BASE_URL } from './constants.js'

export const applyMarkdown = async () => {
  const response = await fetch(`${BASE_URL}/README.md`)
  const raw = await response.text()

  const md = marked(raw)

  Elements.Main.innerHTML = md

  for (const element of Elements.Main.querySelectorAll('[src]')) {
    if (element.getAttribute('src').startsWith('http')) {
      continue
    }
    element.src = `${BASE_URL}/${element.getAttribute('src')}`
  }
  for (const element of Elements.Main.querySelectorAll('[href]')) {
    if (element.getAttribute('href').startsWith('http')) {
      continue
    }
    element.href = `${BASE_URL}/${element.getAttribute('href')}`
  }

  for (const element of Elements.Main.querySelectorAll('.no-site')) {
    element.parentElement.removeChild(element)
  }
}