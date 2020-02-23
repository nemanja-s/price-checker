const $ = require('cheerio');
const config = require('config');

const priceId = config.get('priceId');

module.exports = async page => {
    await page.reload();
    let html = await page.evaluate(() => document.body.innerHTML);
    let price = 0;

    $(`#${priceId}`, html).each(function() {
        console.log(this);
        let euroPrice = $(this).text();
        console.log({ euroPrice });
        price = Number(euroPrice.replace(',', '.').replace(/[^0-9.]+/g, ''));
        console.log({ price })
    });

    return price;
};