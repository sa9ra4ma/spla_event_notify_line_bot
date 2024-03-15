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
  } else if (event.type == 'join') {
    const text = "hello!";
    const messageList = [{
      label: 'おすすめのブキは？',
      text: '@ブキ',
    }];
    const quickReplyItems = messageList.map((v) => {
      return {
        type: 'action',
        action: {
          type: 'message',
          label: v.label,
          text: v.text,
        },
      };
    });
    const messages = [{
      type: 'text',
      text,
      quickReply: {
        items: quickReplyItems,
      },
    }];

    const url = 'https://api.line.me/v2/bot/message/reply';
    const replyHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    };
    const replyBody = {
      'replyToken': replyToken,
      'messages': messages
    };
    const replyOptions = {
      'method': 'POST',
      'headers': replyHeaders,
      'payload': JSON.stringify(replyBody)
    };
    UrlFetchApp.fetch(url, replyOptions);
  }
}
