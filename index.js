const express = require('express')
const path = require('path')
const cron = require("node-cron");
const PORT = process.env.PORT || 5000


let bn= 1000;
let dev = 1;
let min1 = 40;
let max1 = 60;
let min2 = 0.1;
let max2 = 0.5;
let totPow1 = 0;
let totPow2 = 0;

let obj = {
  "energy": 0,
  "gridcode": "GYE",
  "datetime": new Date().toISOString(),
  "energyacum": totPow1
};

cron.schedule("30 * * * * *", function () {
  let pow1 = Math.random() * (max1 - min1) + min1;
  pow1 = pow1.toFixed(3)*1000;
  totPow1 += pow1;
  

  obj = {"energy": pow1,"gridcode": "GYE","datetime": new Date().toISOString(),"energyacum":totPow1};

  console.log(obj);

});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/robonomics', (req, res) => {
    res.header("Content-Type",'application/json');
    let json = JSON.stringify(obj);
    res.send(json);
    //res.sendFile(path.join(__dirname,'./data', 'robonomics.json'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
