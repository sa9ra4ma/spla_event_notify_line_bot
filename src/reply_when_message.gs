function replyMessage(requestText, replyToken, quoteToken) {
  if (requestText === '@ブキ') {
    const text = '今はもみじシューターとしか言えないんだ！';
    sendReplyQuickTextMessage({text, replyToken, quoteToken});
  }
  return;
}
