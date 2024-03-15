function doPost(e) {
  try {
    const requestLine = e.postData.getDataAsString();
    const event = JSON.parse(requestLine).events[0];
    writeToSpreadsheet(event);
    const replyToken = event.replyToken;

    switch (event.type) {
      case 'message':
        replyMessage(event.message.text, replyToken, event.message.quoteToken);
        break;
      case 'join':
        replyJoinMessage(replyToken);
        break;
      default:
        break;
    }
  } catch(e) {
    writeToSpreadsheet({error: e.message});
  }
}
