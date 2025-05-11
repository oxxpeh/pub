# 2002年からの県別の歳入歳出のsankey図
<a href="https://www.soumu.go.jp/iken/zaisei/r05_todohuken.html" target="_blank">総務省サイトの情報</a>から作成
5月上旬に前年度のデータが出るのかな
描画例  
<img src="https://raw.githubusercontent.com/oxxpeh/pub/main/suji/2025/05_kenio/ken_io.jpg" alt="描画例" width="800"/>
## ファイル
・ken_inout_20XX.json&nbsp;->県別のキーで保存
・dd_kio.pkl &nbsp;-> 「20XX-i」「20XX-o」で歳入、歳出のxlsをpandasにインポートしたもの
・dd_df_kio.pkl&nbsp;-> 「20XX-i」「20XX-o」でsankey図にて使用する大項目で抽出
