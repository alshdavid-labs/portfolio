const fetch = require('node-fetch')
const FormData = require('form-data'); 
const { Constants } = require('./constants')

const URL = Constants.GithubURL
const token = Constants.GithubToken

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

module.exports = {
  createDraftRelease,
  uploadToRelease,
  publishRelease,
}