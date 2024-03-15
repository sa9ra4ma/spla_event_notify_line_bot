function writeToSpreadsheet(event) {
  const id = "1QRqzxLVWZ-Un0l2RvEe9PaiCrEheam9wMgRZpnzUB7I"
  const ss = SpreadsheetApp.openById(id);
  const sheet = ss.getActiveSheet();
  const lastRow = sheet.getLastRow();
  const logs = [
    new Date(),
    event.source?.userId,
    event.message?.text,
    JSON.stringify(event),
  ];
  logs.forEach((log, i) => {
    sheet.getRange(lastRow + 1, i + 1).setValue(log);
  });
}
