function eventMatchNotify() {
  const url = 'https://spla3.yuu26.com/api/event/schedule';
  const response = UrlFetchApp.fetch(url);
  if (response.getResponseCode() !== 200) return;
  const resJson = JSON.parse(response.getContentText());
  const resTarget = resJson.results[0];
  const text = [
    '今日はイベントマッチだ！',
    '今回のイベントマッチは…',
    '',
    `【${resTarget.event.name}】`,
    resTarget.event.desc,
    '',
    `ルールは【${resTarget.rule.name}】`,
    '',
    `ステージは【${resTarget.stages[0].name}】と【${resTarget.stages[1].name}】だ`,
    '',
    `【${formatDateToMdhmm(resTarget.start_time)}】からあるからぜひ参加しような！`,
  ].join('\n');

  const activeSources = getActiveSources();
  const activeSourceIds = activeSources.map(source => source.source_id);
  pushTextMessage({texts: [text], destinationIdList: activeSourceIds});

  return;
}
