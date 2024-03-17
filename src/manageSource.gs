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
