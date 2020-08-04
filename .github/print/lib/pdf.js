const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function createPDFFromURL(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle2'});

  await page.waitForSelector('body>div.rendering-done-element')

  await page.pdf({
    path: path.join('dist', 'resume.pdf'),
    format: 'A4',
    displayHeaderFooter: false,
    printBackground: true,
    margin: {
      top: '1cm',
      bottom: '1cm',
      left: '1cm',
      right: '1cm'
    }
  });

  await browser.close();

  return {
    buffer: fs.readFileSync(path.join('dist', 'resume.pdf')),
    stats: fs.statSync(path.join('dist', 'resume.pdf'))
  }
}

module.exports = {
  createPDFFromURL,
}