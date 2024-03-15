function replyMessage(text, replyToken) {
  const texts = [text];
  sendReplyTextMessage({texts, replyToken});
  return;
}
