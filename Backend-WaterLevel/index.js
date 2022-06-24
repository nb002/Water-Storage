// index.js
// This is our main server file

// include express
const express = require("express");
// create object to interface with express
const app = express();
const fetch = require("cross-fetch");

app.use(express.json());
// Code in this section sets up an express pipeline

// print info about incoming HTTP request 
// for debugging
app.use(function(req, res, next) {
  console.log(req.method,req.url);
  console.log(req.body)
  next();
})


// No static server or /public because this server
// is only for AJAX requests



app.post("/query/getCDECData", async function(req,res){
  console.log("getting data");
  const month = req.body.month;
  const year = req.body.year;
console.log(month, year)
  let water = await getWaterData(month,year);
  res.json(water);
});

// respond to all AJAX querires with this message
// app.use(function(req, res, next) {
//   res.json({msg: "No such AJAX request"})
// });

// end of pipeline specification

// Now listen for HTTP requests
// it's an event listener on the server!
const listener = app.listen(3000, function () {
  console.log("The static server is listening on port " + listener.address().port);
});


async function getWaterData(month,year) {
  console.log(year,month)
  let years = year;
  let months = month;
   const start = `${years}-${months}-1`;
  console.log(start)
  const end = `${year}-${months}-2`;
  console.log(end);
  const api_url =  `https://cdec.water.ca.gov/dynamicapp/req/JSONDataServlet?Stations=SHA,ORO,CLE,NML,SNL,DNP,BER&SensorNums=15&dur_code=M&Start=${start}&End=${end}`;
  
  let fetchResponse = await fetch(api_url);
  let wdata = await fetchResponse.json();
  
  return wdata;
}
