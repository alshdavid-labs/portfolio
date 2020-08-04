const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function createPDFFromURL(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  await page.pdf({
    path: path.join('dist', 'resume.pdf'),
    scale: 0.5,
    displayHeaderFooter: false,
    printBackground: false,
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