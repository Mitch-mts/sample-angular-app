const assert = require('assert');
const path = require('path');
const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
    // Launch the browser and create a new page
    browser = await puppeteer.launch({ headless: false }); // Set headless to false if you want to see the browser and avoid it popping up and closing instantly
    page = await browser.newPage();

     // Get the screen size so as to have a full screen on browser
     const screen = await page.evaluate(() => {
        return {
            width: window.screen.width,
            height: window.screen.height
        };
    });

    // Set the viewport to match the screen size
    await page.setViewport({
        width: screen.width,
        height: screen.height
    });
    
    // lauch the specified url website to goto
    await page.goto('http://localhost:4200', {
                waitUntil: 'networkidle0',
              });

    await page.type("#mat-input-0", 'demo');
    await page.type("#mat-input-1", 'demo');

     
    // take screen shot
    // await page.screenshot({path: './src/screenshots/insureworXLogin.jpg'})

    // Click the login button
    await page.click("#loginBtn");
   

    // Wait for the navigation to complete
    await page.waitForNavigation();

    // Verify the URL after login
    const url = await page.url();
    console.log("url value " + url);
    assert(url.includes("http://localhost:4200/"));
}, 180000);

// afterAll(async () => {
//     // Close the browser after all tests
//     await browser.close();
// });

test("open ms1A task on InsureworX", async () => {
    // Wait for the task button to be available
    await page.waitForSelector("#openTaskBtn");

    // Click the ms1A task button
    await page.click("#openTaskBtn");

    // Wait for the navigation to complete
    await page.waitForNavigation();

    // Wait for the section to be available
    await page.waitForSelector('#ms1ADropdown'); // Replace with your section's selector

    // Scroll the section into view
    await page.evaluate(() => {
        document.querySelector('#ms1ADropdown').scrollIntoView();
    });
   

    // Wait for the checkbox to be available
    await page.waitForSelector("#ms1Acheckbox");

     // Scroll the checkbox into view and click it
     await page.evaluate(() => {
        document.querySelector("#ms1Acheckbox").scrollIntoView();
    });
    await page.click("#ms1Acheckbox");

    // Verify the checkbox is checked
    const checkedValue = await page.$eval('#ms1Acheckbox', el => el.checked);
    expect(checkedValue).toBe(true);

    // Wait for the dropdown to be available
    await page.waitForSelector("#ms1ADropdown");

    // Select the dropdown option
    await page.select("#ms1ADropdown", "Claim Information updated - Auto Assess");

    await page.waitForTimeout(5000);

    // Verify the URL after navigation
    const url = await page.url();
    console.log("url value " + url);
    assert(url.includes("http://localhost:4200/home"));

    await new Promise(resolve => setTimeout(resolve, 5000)); // Pause to view the result
}, 180000);


// test("open milestone tab on InsureworX", async () => {
//     // Wait for the task button to be available
//     await page.waitForSelector("#milestone");

//     // Click the ms1A task button
//     await page.click("#milestone");

//     await page.waitForTimeout(5000);

//     // Verify the URL after navigation
//     const url = await page.url();
//     console.log("url value " + url);
//     assert(url.includes("http://localhost:4200/home"));

//     await new Promise(resolve => setTimeout(resolve, 5000)); // Pause to view the result
// }, 180000);
