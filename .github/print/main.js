const fetch = require('node-fetch')
let fs = require('fs');
const FormData = require('form-data'); 
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/alshdavid/portfolio/blob/master/ABRIDGED.md');

  await page.evaluate(() => {
    const styleElement = document.createElement('style')
    styleElement.innerHTML = /*css*/`
      * {
        font-family: Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
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
  })

  await page.pdf({
    path: './resume.pdf',
    scale: 0.5,
    displayHeaderFooter: false,
    printBackground: false,
  });

  await browser.close();

  const URL = 'https://api.github.com/repos/alshdavid/portfolio/releases'
  const token = '007d01767f51b43ea73e5039c98d8bab1420823c'

  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      tag_name: 'latest',
      name: 'David Alsh: Resume',
      body: 'Latest copy of my resume, automatically compiled from the markdown files in the repository',
      target_commitish: 'master',
      draft: true
    })
  }).then(r => r.json())

  const form = new FormData();

  const uploadUrl = response.upload_url.replace('{?name,label}', '?name=resume.pdf')

  form.append('file', fs.readFileSync('resume.pdf'), {
    contentType: 'application/pdf',
    name: 'file',
    knownLength: fs.statSync("resume.pdf").size,
    filename: 'resume.pdf',
  });

  await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
    },
    body: form
  }).then(r => r.json())

  await fetch(`${URL}/${response.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      draft: false
    })
  }).then(r => r.json())
})();