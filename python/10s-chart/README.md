# PyScript plotlyで10秒足のローソク足チャート作成  
## 動作画面
以下なチャートが表示される予定
![チャート図](chart.gif)  
[githubpagesで動作ページ](https://oxxpeh.github.io/2025/03_pys_ch.html)  
上記ページの参照データ(ここにアップされてるgmo_sck_tck_BTC_JPY.pck)は更新されないので  
データ受信するがグラフの変化はなし  
「開始は2025年03月15日 19:20:07.326000です。」な表示が出たら準備完了(結構時間がかかる)「選択」で開始  
## 補足
webサーバから価格情報を取得しローソク足などを描画する  
価格情報はwebサーバ側で業者提供の「Public WebSocket API」と接続し生成  
  
ファイルリスト  
・pys_ch.html ->ブラウザが要求するhtmlファイル  
・pys_ch.toml ->PyScriptの設定ファイル  
・pys_ch.py ->PyScriptとして実行してるPythonコード  
・gmo_sck_tck_BTC_JPY.pck ->価格情報データ  

```
import pickle as ii_pc                                                       
import requests as ii_rq                
rt = ii_rq.get('https://raw.githubusercontent.com/oxxpeh/pub/main/python/10s-chart/gmo_sck_tck_BTC_JPY.pck')                                                                  
df_tck = ii_pc.loads(rt.content)                                                                  
df_tck.tail()                                                     
                                 prc          ask          bid      vol     
date                                                                        
2025-03-15 16:54:17.863 12497087.000 12497087.000 12492146.000  923.724     
2025-03-15 16:54:40.968 12497155.000 12497155.000 12494193.000  923.724     
2025-03-15 16:54:41.212 12490874.000 12497155.000 12490874.000  923.724     
2025-03-15 16:54:44.506 12490147.000 12497154.000 12490147.000  923.842     
2025-03-15 16:54:59.282 12496313.000 12498666.000 12495128.000  924.022     
```


<span style="color: #38761d;"><br>(参)<br>PyScript<br>https://pyscript.com/@examples</span><br>
<span style="color: #38761d;"><br>(参)<br>Public WebSocket API – 暗号資産のAPIドキュメント| GMOコイン<br>https://api.coin.z.com/docs/#public-ws-api</span><br>
## その他  
別スレッドで「Public WebSocket API」とやり取りするコード追加もできると思うけどわたしには…  
必要のない記述がたくさんありそう…  
2年前はreplの例があってデバッグがやりやすかったような  
panelについてもよくわかっていない…  
(PyScript 2025.2.4 では動作しなかったような)  
httpサーバでは動作しなくてhttpsの設定が必要だった  
plotlyにて値が正負で色を変えるやり方を知った(リスト内表記？)  
plotlyでhtml要素生成(offlineplot)するのはダメだった、JSON変換などで動作してる模様  
自動更新してるのでplotlyで使える拡大縮小など使いづらい…  
スマホではチャート描画しなかったbokehとかならいけるのかも  
