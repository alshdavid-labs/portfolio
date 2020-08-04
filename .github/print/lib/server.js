const cors = require('cors');
const express = require('express');
const { Directories, Files } = require('./constants')
const sass = require('node-sass');

const HTTPServer = async () => {
  const site = express();
  const github = express();

  site.use(cors({ origin: '*' }));
  github.use(cors({ origin: '*' }));

  site.get('/style.css', (req, res) => {
    const result = sass.renderSync({
      file: Files.SCSS,
      outputStyle: 'compressed',
    })
    res.header('Content-Type', 'text/css; charset=utf-8')
    res.send(result.css.toString('utf8'))
  })

  site.use('/', express.static(Directories.HTML));
  site.use('/**', express.static(Directories.HTML));
  
  github.use('/', express.static(Directories.Root));
  github.use('/**', express.static(Directories.Root));

  const siteServer = await new Promise(res => {const server = site.listen(8080, '0.0.0.0', () => res(server))});
  const githubServer = await new Promise(res => {const server = github.listen(8081, '0.0.0.0', () => res(server))});

  return () => {
    siteServer.close()
    githubServer.close()
  }
}

module.exports = {
  HTTPServer,
}