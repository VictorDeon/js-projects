const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 0,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7' });

  // Otimizando as consultas
  await page.setRequestInterception(true);
  const blockResources = ['image', 'stylesheet', 'media', 'font', 'texttrack', 'object', 'beacon', 'csp_report', 'imageset'];
  page.on('request', request => {
    if (blockResources.includes(request.resourceType())) {
      request.abort();
    } else {
      request.continue();
    }
  });

  await page.goto('https://google.com');
  await page.type('input[name="q"]', "Udemy tutoriais", { delay: 100 });
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  // await page.pdf({ path: "scrapping/google.pdf", format: "A4" }); // Precisa do headerless: true
  await page.screenshot({ path: 'scrapping/google.png' });
  const title = await page.title();
  const url = await page.url();

  console.log(title, url);
  await browser.close();
})();
