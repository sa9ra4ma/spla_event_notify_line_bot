function replyMessage(requestText, replyToken, quoteToken) {
  if (requestText === '@ブキ') {
    const text = 'もみじシューター！';
    sendReplyQuickTextMessage({text, replyToken, quoteToken});
  }
  return;
}
