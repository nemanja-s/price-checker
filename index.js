const CronJob = require('cron').CronJob;
const config = require('config');
const sendEmail = require('./sendEmail');
const loadPage = require('./loadPage');
const getPrice = require('./getPrice');

const preferredPrice = config.get('preferredPrice');

(async () => {
    const page = await loadPage();

    const job = new CronJob('0 */30 * * * *', async () => {
        const currentPrice = await getPrice(page);
        if(currentPrice && currentPrice < preferredPrice)
            await sendEmail(currentPrice);
    });

    job.start();
    console.log("Cron job started! The price is checked every 30 minutes...")
})();