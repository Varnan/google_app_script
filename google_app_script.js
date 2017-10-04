function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('1mg Orders')
      .addItem('Get latest 1mg Orders','addData')
      .addToUi();
}


function addData() {
  var sheet = SpreadsheetApp.getActiveSheet();
  
  var url = "http://www.url.com/XXXXX/YYYY/ZZZZZ/list/1/"
  
  var response = UrlFetchApp.fetch(url);
  
  // Parse the JSON reply
  var json = response.getContentText();
  var data = JSON.parse(json);
  
  var order_list = data["data"]
  
  // Get Last Row Index
  var row_index = sheet.getLastRow();
  
  // Clear existing row data
  try{
    var range = sheet.getRange("A2:J"+parseInt(row_index));
    range.clear();
  }
  catch(err)
  {
    
  }
    
  // Add headers and Format
  var head = ["Order ID (SFX)","Order Date","Scheduled Time","COID","Address","Pincode","Status","Rider ID","Rider Name","Rider Phone"]
  var range = sheet.getRange("A1:J1");
  range.setValues([head]);
  range.setFontSize(11);
  range.setFontWeight("bold");
  range.setFontColor("#0C053B");
 
  // Adding DB Data
  for (var i = 0; i < order_list.length; i++)
  {
    order_data = order_list[i]
    var row = [order_data["id"],order_data["order_date"],order_data["scheduled_time"],order_data["COID"],order_data["address"],order_data["pincode"],
        order_data["status"],order_data["rider_id"],order_data["rider_name"],order_data["rider_phone"]];
    
    var index = 2 + i
    var range = sheet.getRange("A"+index+":J"+index);
    range.setValues([row]);
    

  }
  
}