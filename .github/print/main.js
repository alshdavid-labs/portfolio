const path = require('path');
const fs = require('fs');
const { URLs, Constants, Files } = require('./lib/constants')
const { createDraftRelease, uploadToRelease } = require('./lib/github')
const { HTTPServer } = require('./lib/server')
const { createPDFFromURL } = require('./lib/pdf')
const sass = require('node-sass');

void async function (){
  const closeServer = await HTTPServer()
  if (process.argv.includes('--serve')) {
    console.log('Hosted on http://localhost:8080')
    return
  }

  if (fs.existsSync('dist')) {
    fs.rmdirSync('dist', {recursive: true})
    fs.mkdirSync('dist')
  } else {
    fs.mkdirSync('dist')
  }

  const result = sass.renderSync({
    file: Files.SCSS,
    outputStyle: 'compressed',
  });

  fs.writeFileSync(Files.CSS, result.css, { encoding: 'utf8' })

  const { buffer, stats } = await createPDFFromURL(URLs.LocalHTMLServer)
  closeServer()
  
  if (!Constants.GithubToken) {
    return
  }
  const draftResponse = await createDraftRelease()
  await uploadToRelease(draftResponse.upload_url, buffer, stats)
  // await publishRelease(draftResponse.id)
}();

