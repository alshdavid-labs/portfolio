import { Elements, BASE_URL } from './constants.js'

export const applyMarkdown = async () => {
  const response = await fetch(`${BASE_URL}/README.md`)
  const raw = await response.text()

  const md = marked(raw)

  Elements.Main.innerHTML = md
  Elements.Main.getBoundingClientRect()

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

  // for (const img of Elements.Main.querySelectorAll('img')) {
  //   const height = img.getAttribute('height')
  //   const width = img.getAttribute('width')

  //   if (height) {
  //     img.removeAttribute('height')
  //     img.style.maxHeight = height
  //   }
  //   if (width) {
  //     img.removeAttribute('width')
  //     img.style.maxWidth = width
  //   }
  // }
  

  for (const element of Elements.Main.querySelectorAll('.no-site')) {
    element.parentElement.removeChild(element)
  }
}