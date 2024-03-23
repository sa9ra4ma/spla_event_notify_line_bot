function addSource({
  sourceType = '',
  sourceId = '',
  requestType = '',
}) {
  const id = "1ZSHn6eQkeaa0oEJgJyIS4LNfkrOM39HMGjVhJhcDd4M";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const source = [
    new Date(),
    sourceType,
    sourceId,
    requestType,
  ];
  source.forEach((v, i) => {
    sheet.getRange(lastRow + 1, i + 1).setValue(v);
  });
  return;
}

function getLatestForEachSourceId() {
  const id = "1ZSHn6eQkeaa0oEJgJyIS4LNfkrOM39HMGjVhJhcDd4M";
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getActiveSheet();
  const data = sheet.getDataRange().getValues();

  // source_idごとに最新のステータスを抽出
  const result = data.reduce((acc, curr, i) => {
    // 先頭はヘッダーなのでスキップ
    if (i === 0) return acc;

    if (!acc[curr[2]] || acc[curr[2]].datetime < curr[0]) {
      acc[curr[2]] = {
        datetime: curr[0],
        source_type: curr[1],
        source_id: curr[2],
        event_type: curr[3],
      };
    }
    return acc;
  }, {});
  
  // 抽出した要素を配列に変換
  const finalResult = Object.values(result);  
  return finalResult;
}

function getActiveSources() {
  const sources = getLatestForEachSourceId();
  const activeSources = sources.filter(source => ['follow', 'join'].includes(source.event_type));
  return activeSources;
}
