const CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('CHANNEL_ACCESS_TOKEN');

function sendReplyTextMessage({
  texts = [''],
  replyToken = '',
  quoteToken = '',
}) {
  const replyHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
  };
  const messages = texts.map(text => {
    return {
      type: 'text',
      text,
      quoteToken,
    };
  });
  const replyBody = {
    replyToken,
    messages,
  };
  const replyOptions = {
    method: 'POST',
    headers: replyHeaders,
    payload: JSON.stringify(replyBody)
  };
  const url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, replyOptions);
  return;
}

function sendReplyQuickTextMessage({
  text = '',
  replyToken = '',
  quoteToken = '',
}) {
  const quickReplyList = [
    {
      label: 'おすすめのブキは？',
      text: '@ブキ',
    },
  ];
  const quickReplyItems = quickReplyList.map((v) => {
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
    quoteToken,
  }];

  const replyHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
  };
  const replyBody = {
    replyToken,
    messages,
  };
  const replyOptions = {
    method: 'POST',
    headers: replyHeaders,
    payload: JSON.stringify(replyBody),
  };
  const url = 'https://api.line.me/v2/bot/message/reply';
  UrlFetchApp.fetch(url, replyOptions);
  return;
}
