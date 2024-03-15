function doPost(e) {
  const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');

  const requestLine = e.postData.getDataAsString();
  const event = JSON.parse(requestLine).events[0];
  writeToSpreadsheet(event);
  const replyToken = event.replyToken;

  if (event.type == 'message') {
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
}

function writeToSpreadsheet(event) {
  var id = "1QRqzxLVWZ-Un0l2RvEe9PaiCrEheam9wMgRZpnzUB7I"
  var ss = SpreadsheetApp.openById(id);
  var sheet = ss.getActiveSheet();
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1).setValue(event.source?.userId);
  sheet.getRange(lastRow + 1, 2).setValue(event.message?.text); 
  sheet.getRange(lastRow + 1, 3).setValue(JSON.stringify(event)); 
}