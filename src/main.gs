function doPost(e) {
  const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');

  const responseLine = e.postData.getDataAsString();
  const event = JSON.parse(responseLine).events[0];
  const replyToken = event.replyToken;
  writeToSpreadsheet(event);
 
  const LineMessageObject = [{
    'type': 'text',
    'text': event.message.text
  }];
  const replyHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
  };
  const replyBody = {
    'replyToken': replyToken,
    'messages': LineMessageObject
  };
  const replyOptions = {
    'method': 'POST',
    'headers': replyHeaders,
    'payload': JSON.stringify(replyBody)
  };
  UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', replyOptions);
}

function writeToSpreadsheet(event) {
  var id = "1QRqzxLVWZ-Un0l2RvEe9PaiCrEheam9wMgRZpnzUB7I"
  var ss = SpreadsheetApp.openById(id);
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1).setValue(event.source?.userId);
  sheet.getRange(lastRow + 1, 2).setValue(event.message?.text);
}