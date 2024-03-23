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
    `【${formatDateToMdhmm(resJson.results[0].start_time)}】からあるからぜひ参加しような！`,
  ].join('\n');

  const activeSources = getActiveSources();
  const activeSourceIds = activeSources.map(source => source.source_id);
  pushTextMessage({texts: [text], destinationIdList: activeSourceIds});

  return;
}
