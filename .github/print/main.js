const fetch = require('node-fetch')
let fs = require('fs');
const FormData = require('form-data'); 
const puppeteer = require('puppeteer');

const URL = 'https://api.github.com/repos/alshdavid/portfolio/releases'
const token = process.env.GITHUB_TOKEN || 'not-set'

void async function (){
  // const draftResponse = await createDraftRelease()
  const { buffer, stats } = await createPDF()
  // await uploadToRelease(draftResponse.upload_url, buffer, stats)
  // await publishRelease(draftResponse.id)
}();

function createDraftRelease() {
  return fetch(URL, {
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
}

function uploadToRelease(upload_url, buffer, stats) {
  const form = new FormData();

  const uploadUrl = upload_url.replace('{?name,label}', '?name=resume.pdf')

  form.append('file', buffer, {
    contentType: 'application/pdf',
    name: 'file',
    knownLength: stats.size,
    filename: 'resume.pdf',
  });

  return fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
    },
    body: form
  }).then(r => r.json())
}

function publishRelease(id) {
  return fetch(`${URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`
    },
    body: JSON.stringify({
      draft: false
    })
  }).then(r => r.json())
}

async function createPDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/alshdavid/portfolio/blob/master/ABRIDGED.md');

  await page.evaluate(() => {
    console.log(document.head)
    console.log(document.body)
    // const styleElement = document.createElement('style')
    // styleElement.innerHTML = /*css*/`
    //   * {
    //     font-family: Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    //   }

    //   ins {
    //     display: block;
    //     page-break-after: always;
    //   }
    // `
    // const insElements = Array.from(document.querySelectorAll('ins'))

    // for (const insElement of insElements) {
    //   const parent = insElement.parentNode
    //   parent.parentNode.insertBefore(insElement, parent.nextSibling);
    //   parent.parentNode.removeChild(parent)
    // }

    // document.head.appendChild(styleElement)
    // document.body.innerHTML = document.querySelector('#readme').innerHTML
  })

  await page.pdf({
    path: './resume.pdf',
    scale: 0.5,
    displayHeaderFooter: false,
    printBackground: false,
  });

  await browser.close();

  return {
    buffer: fs.readFileSync('resume.pdf'),
    stats: fs.statSync('resume.pdf')
  }
}