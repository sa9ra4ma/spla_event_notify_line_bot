# spla_event_notify_line_bot

## 概要
こいつはLINE botだ
こいつはイベントマッチの情報を取得して教えてくれるぞ
event_notifyって名前だけど武器のおすすめもできる（ようにしたい）ぞ

## 構成
GASを使うことにする

## 開発
### GASへのpush
初回のみGoogleの認証が必要なので以下の手順が必要
```
npx clasp login
```
表示されるURLをクリックしてブラウザ上で認証する

2回目以降は以下の手順のみでOK

```
npx clasp push
```

## 使い方
LINEでxxxxを友達登録、もしくはグループ追加しろ
