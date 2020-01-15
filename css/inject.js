const styleElement = document.createElement('style')
styleElement.innerHTML = /*css*/`
  #readme {
    position: absolute; 
    top: 0; 
    left: 0; 
    right: 0; 
    bottom: 0; 
    z-index: 100; 
    background-color: white;
  }

  * {
    font-family: Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  }

  page-break {
    page-break-after: always;
  }

  @media print {
    no-print {
      display: none;
    }
  }
`
document.head.appendChild(styleElement)
document.body.appendChild(document.querySelector('#readme'))
