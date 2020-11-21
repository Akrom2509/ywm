const express = require("express");
const app = express();
const path = require("path");
var request = require('request');
var categories =[];
var provinces =[];
var priceRange =[];
var merchants =[];
var priceLevel=[];
var FirstL=[];
var LevelSend=[
  "<strong style=color:black>฿</strong>฿฿฿",
  "<strong style=color:black>฿฿</strong>฿฿",
  "<strong style=color:black>฿฿฿</strong>฿",
  "<strong style=color:black>฿฿฿฿</strong>",
];
var icon =[
  "<i id='IT' class='fas fa-car-side' ></i>",
  "<i id='IT' class='fas fa-edit'></i>",
  "<i id='IT' class='fas fa-paw'></i>",
  "<i id='IT' class='fas fa-coffee'></i>"

]
var iconKeep=[]; var iconSend=[];
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views/Page.html"));
});
var url = 'https://panjs.com/ywc18.json';
request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
  
      // data is already parsed as JSON:
      categories= data.categories
      provinces =data.provinces
      priceRange = data.priceRange
      merchants = data.merchants
  
    
     
    
     for(i=0;i<data.merchants.length;i++){
     numb= data.merchants[i].priceLevel-1
     numb2 =data.merchants[i].length
     priceLevel.push(LevelSend[numb])
     if ((data.merchants[i].isOpen).includes("Y")) {
       FirstL.push ('<h5><b>'+data.merchants[i].shopNameTH +'</b><span id="badge1" class="badge ml-2">เปิดอยู่</span></h5>');
          } else {
       FirstL.push ('<h5><b>'+data.merchants[i].shopNameTH +'</b><span id="badge2" class="badge ml-2">ปิดแล้ว</span></h5>');
        }
     for(t=0;t < data.merchants[i].facilities.length;t++){
      if ((data.merchants[i].facilities[t]).includes("ที่จอดรถ") ) {
      iconKeep = iconKeep+ icon[0]
    } else if ((data.merchants[i].facilities[t]).includes("รับจองล่วงหน้า")) {
      iconKeep = iconKeep+ " "+ icon[1]
    } else if ((data.merchants[i].facilities[t]).includes("สามารถนำสัตว์เลี้ยงเข้าได้")) {
      iconKeep = iconKeep+ " "+ icon[2]
    }else if ((data.merchants[i].facilities[t]).includes("จำหน่ายเครื่องดืม")) {
      iconKeep = iconKeep+ " "+ icon[3]
    } 
    else { iconKeep = " " }
     }

     iconSend.push(iconKeep)
     iconKeep=" "
    }

  }
});
app.get("/FirstLine", function(req, res) {
  res.send(FirstL)

});
app.get("/IconSet", function(req, res) {
  res.send(iconSend)

});
app.get("/PlevelSet", function(req, res) {
  res.send(priceLevel)

});

app.get("/categories", function(req, res) {
        res.send(categories);
});
app.get("/provinces", function(req, res) {
    res.send(provinces);
});
app.get("/priceRange", function(req, res) {
    res.send(priceRange);
});
app.get("/merchants", function(req, res) {
   
  res.send(merchants);
    
});
const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Server is ready at " + port);
   
});
