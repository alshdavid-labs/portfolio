const fs = require('fs');
const { URLs, Constants } = require('./lib/constants')
const { createDraftRelease, uploadToRelease } = require('./lib/github')
const { HTTPServer } = require('./lib/server')
const { createPDFFromURL } = require('./lib/pdf')

void async function (){
  if (fs.existsSync('dist')) {
    fs.rmdirSync('dist', {recursive: true})
    fs.mkdirSync('dist')
  } else {
    fs.mkdirSync('dist')
  }

  
  const closeServer = await HTTPServer()
  const { buffer, stats } = await createPDFFromURL(URLs.LocalHTMLServer)
  closeServer()
  
  if (Constants.GithubToken) {
    const draftResponse = await createDraftRelease()
    await uploadToRelease(draftResponse.upload_url, buffer, stats)
    // await publishRelease(draftResponse.id)
  }
}();

