const express  = require('express');
const chromium = require('chrome-aws-lambda');
const serverless = require('serverless-http');

const app = express();

const router = express.Router();

router.get('/',(req,res)=> {
    (async () =>{

        let result = null;
        let browser = null;

         browser = await chromium.puppeteer.launch({
            executablePath: await chromium.executablePath,
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            headless: chromium.headless,
        });
      
          let page = await browser.newPage();
      
          await page.goto(event.url || 'https://example.com');
      
          result = await page.title();
          
          await browser.close();
          res.send(result);
    })();      
});

app.use('/.netlify/functions/api',router);
module.exports.handler= serverless(app); 

