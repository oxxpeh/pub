# GitHub REST APIで通信統計とコミット
  colabでpythonにて取得など、取得結果もここにあげたかったのでコミットも  
  クローンするようなrepoではないのですがどなたが…  
  ローカルのubuntuで週1 cronで動作させそう  
   
## ファイル
・cl.csv  ->Get repository clones  
・vi.csv  ->Get page views  
・rf.csv  ->Get top referral sources  
・pt.csv  ->Get top referral paths  
・2025_git_tr.ipynb ->colabでのログAPI TOKENを「API_TKN」に変更
## その他
ファイルのdiffでコミットできないかと思ったがgitはblobとしてファイル全部で管理してるようでダメみたい  
コミット多いとでかくなるでしょうね…  
このrepoもブラウザで編集しまくるのでクローンは…  
<span style="color: #38761d;"><br>(参)<br>Gitのオブジェクトの中身<br>https://zenn.dev/kaityo256/articles/objects_of_git</span><br>
<span style="color: #38761d;"><br>(参)<br>GitHub の Traffic Data を 継続的にトラッキングする #GoogleAppsScript - Qiita<br>https://qiita.com/TakeshiNickOsanai/items/0deeb31283af6a56d16c</span><br>
<span style="color: #38761d;"><br>(参)<br>リポジトリ トラフィック用 REST API エンドポイント - GitHub Enterprise Cloud Docs<br>https://docs.github.com/ja/enterprise-cloud@latest/rest/metrics/traffic?apiVersion=2022-11-28#about-repository-traffic</span><br>
  
(参) duckduckgoのaiチャットに『python requests でgithubのrestapiでコミットする例』と聞いた
