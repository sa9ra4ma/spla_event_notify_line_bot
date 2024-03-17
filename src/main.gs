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
      case 'follow':
        // MEMO: 初回フォローとブロック解除は同じfollowだが、リクエストの中身で判別できる。けど一旦しない。
        addSource({sourceType: event.source?.type, sourceId: event.source?.userId, requestType: 'follow'});
        replyJoinMessage(replyToken);
        break;
      case 'unfollow':
        addSource({sourceType: event.source?.type, sourceId: event.source?.userId, requestType: 'unfollow'});
        break;
      case 'join':
        addSource({sourceType: event.source?.type, sourceId: event.source?.groupId, requestType: 'join'});
        replyJoinMessage(replyToken);
        break;
      case 'leave':
        addSource({sourceType: event.source?.type, sourceId: event.source?.groupId, requestType: 'leave'});
        break;
      default:
        break;
    }
  } catch(e) {
    writeToSpreadsheet({error: e.message});
  }
}
