Cozy Character Merge Web 1.3.0
================================

用途
----
將原本 Windows EXE 遊戲改為純前端內部網站，可在桌面及手機瀏覽器使用。
所有程式、樣式及圖片均包含在此資料夾，不需要 Internet、CDN、Database、Python 或 Node.js。

IIS 部署
--------
1. 將整個 Cozy-Character-Merge-Web-1.3.0 資料夾複製到：
   C:\inetpub\wwwroot\cozy-merge
   注意：請複製資料夾內的 index.html、css、js、assets 等內容，不要多放一層資料夾。
2. 在 Server 本機使用 Edge 開啟：
   http://localhost/cozy-merge/
3. 公司網絡其他裝置使用：
   http://SERVER-NAME/cozy-merge/
4. 家中使用時，先連接公司批准的 VPN，再使用相同網址。

若公司裝置無法連線
------------------
- 確認 IIS 的 Default Web Site 已 Started。
- 確認公司 DNS 能解析 SERVER-NAME，否則由 IT 提供內部網址。
- 確認 Windows Firewall 及網絡 ACL 允許公司內部 HTTP/HTTPS。
- 不要自行把 IIS port 公開到 Internet。

儲存行為
--------
遊戲使用 browser localStorage。每一部裝置、每一個 browser profile 各自儲存，不能跨裝置同步。
清除瀏覽器網站資料會刪除遊戲進度。Best 分數會在同一瀏覽器保留。

功能
----
- 4 x 4 合併棋盤及 11 個角色等級
- 方向鍵、WASD、手機 swipe 及畫面方向按鈕
- Score、Best、Moves、Pause、Continue、New Game、Undo
- Levels 解鎖畫面及玩法說明
- 每次有效移動後自動儲存
- Responsive desktop/mobile layout

安全及私隱
----------
- 沒有外部 URL、追蹤、廣告、API 或第三方 runtime。
- 沒有使用者帳戶及中央資料庫。
- 請由獲授權的 IT / Cybersecurity 人員管理 IIS、VPN、TLS、Firewall 及存取權限。
- 角色圖片只應在具備適當使用權時部署。

版本：1.3.0
