<h1 align='center'>Readme Generator</h1>
<p align='center'>
  markdown 即時預覽編輯器，並結合 Spotify api 最近喜愛歌曲、歌手資料，輕鬆更新 Github profile 專案
</p>

## Features
- markdown 編輯器 + 即時預覽
- Spotify, Github OAuth 登入
- 抓取最近喜愛歌曲、歌手 ([Spotify top artists & tracks api](https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/))
- 抓取目前 Github profile 專案的 `README.md`
- 提交 commit 到 Github profile

## Tools
- 專案建置: [create-react-app](http://create-react-app.dev/)
- UI: [material-ui](https://material-ui.com/), [styled-component](https://styled-components.com/)
- markdown parser: [marked](https://github.com/markedjs/marked)
- data fetching: [react-query](https://react-query.tanstack.com/)
- hoisting: vercel zeit

## Todo
- 預覽優化
  - [ ] 模擬 Github 個人頁
  - [ ] 預覽區塊套用 gfm 樣式
- 編輯優化
  - [ ] Github RichTextEditor
  - [ ] 自定義 banner 圖片
  - [ ] 自定義 logo icon link