const $ = require('cheerio');
const config = require('config');

const priceId = config.get('priceId');

module.exports = async page => {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    let price = 0;

    $(`#${priceId}`, html).each(function() {
        let euroPrice = $(this).text();
        price = Number(euroPrice.replace(',', '.').replace(/[^0-9.]+/g, ''));
    });

    return price;
};