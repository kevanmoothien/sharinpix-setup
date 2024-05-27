const puppeteer = require('puppeteer');

async function runPuppeteer(url) {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();

  // Set user agent
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

  // Open the initial URL
  await page.goto(`${url}&retURL=/app/mgmt/forceconnectedapps/forceInstalledConnectedAppList.apexp`);

  // Wait for specific text to appear
  await page.waitForSelector('body', { timeout: 30000 });
  await page.waitForFunction(() => document.body.innerText.includes('Manage access to apps that connect to this Salesforce organization.'));

  // Click the 'ScratchCanvas' link
  await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    const targetAnchor = anchors.find(anchor => anchor.textContent.includes('ScratchCanvas'));
    if (targetAnchor) {
      targetAnchor.click();
    }
  });
  console.log('MO ICICICICICICI ')
  // Wait for 'Connected App Detail' text
  //await page.waitForFunction(() => document.body.innerText.includes('Connected App Detail'), { timeout: 50000 });
  await page.waitForSelector('h2.mainTitle', { timeout: 60000 });

  console.log('MO ICICICICICICI 1111')
  // Click the 'Edit' button
  await page.evaluate(() => {
    document.querySelector('input[name="edit"]').click();
  });

  console.log('MO ICICICICICICI 2222')

  // Wait for 'Connected App Edit' text
  await page.waitForFunction(() => document.body.innerText.includes('Connected App Edit'));

  console.log('MO ICICICICICICI 33333')
  // Modify the 'userpolicy' value and save
  await page.evaluate(() => {
    document.getElementById('userpolicy').value = 1;
    document.querySelectorAll('input.btn[title=Save]')[0].click();
  });

  // Wait for 'Connected App Detail' text
  await page.waitForFunction(() => document.body.innerText.includes('Connected App Detail'));

  // Navigate to the application profile assignment page
  const path = await page.evaluate(() => {
    return document.getElementsByName('assignprofiles')[0].getAttribute('onclick').split('\'')[1];
  });
  await page.goto(`https://${url.split('/')[2]}${path}`);

  // Wait for 'Application Profile Assignment' text
  await page.waitForFunction(() => document.body.innerText.includes('Application Profile Assignment'));

  // Select all checkboxes and save
  await page.evaluate(() => {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    checkboxes.forEach(checkbox => checkbox.checked = true);
    document.querySelectorAll('input.btn[title=Save]')[0].click();
  });
  console.log('MO ICICICICICICI 4444')

  // Wait for 'Connected App Detail' text
  await page.waitForSelector('h2.mainTitle');
  await page.waitForFunction(() => {
    const headings = Array.from(document.querySelectorAll('h2.mainTitle'));
    return headings.some(heading => heading.innerText.includes('Connected App Detail'));
  });
  console.log('MO ICICICICICICI 5555')

  await browser.close();
}

module.exports = runPuppeteer;
