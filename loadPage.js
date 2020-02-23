const puppeteer = require('puppeteer');
const config = require('config');

const pageUrl = config.get('pageUrl');

module.exports = async () => {
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(pageUrl);
    return page;
};