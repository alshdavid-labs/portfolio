const styleElement = document.createElement('style')
styleElement.innerHTML = /*css*/`
  * {
    font-family: Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  }

  ins {
    display: block;
    page-break-after: always;
  }
`
const insElements = Array.from(document.querySelectorAll('ins'))

for (const insElement of insElements) {
  const parent = insElement.parentNode
  parent.parentNode.insertBefore(insElement, parent.nextSibling);
  parent.parentNode.removeChild(parent)
}

document.head.appendChild(styleElement)
document.body.innerHTML = document.querySelector('#readme').innerHTML
