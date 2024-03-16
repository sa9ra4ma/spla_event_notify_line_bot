function eventMatchNotify() {
  const url = 'https://spla3.yuu26.com/api/event/schedule';
  const response = UrlFetchApp.fetch(url);
  if (response.getResponseCode() !== 200) return;
  const resJson = JSON.parse(response.getContentText());
  const text = [
    '次のイベントマッチは…',
    '',
    `【${resJson.results[0].event.name}】`,
    resJson.results[0].event.desc,
    '',
    `ルールは【${resJson.results[0].rule.name}】`,
    '',
    `ステージは【${resJson.results[0].stages[0].name}】と【${resJson.results[0].stages[1].name}】だ`,
    '',
    `【${mmdd(resJson.results[0].start_time)}】からあるからぜひ参加しような！`,
  ].join('\n');
  pushTextMessageForUserId({texts: [text], userIdList: ['Ue2a914e2a504dfd512d796cc86a33552', 'C7d3d730d47a659e53aba408c6f56bf32']});

  return;
}

function mmdd(dateStr) {
  const date = new Date(dateStr);
  return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}