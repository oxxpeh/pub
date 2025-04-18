# Plotlyのfigureオブジェクトをyamlファイルで読み込み描画
ディレクトリ名を「plorly」と間違えてる影響がいろいろに
## ファイル
・fig.yaml　-> figureオブジェクトのyamlファイルの  
・dd_fig.yaml ->「oo_fig.to_dict()」で作成した使えないファイル  
・simple.yaml -> 簡単な図のyaml  
・fetch_plorly,html ->yaml読み込むコードを追加したhtmlファイル
## yaml出力
```python
def ff_wr_ym_pl(oo_fig, fig_yaml):
  js_fig = oo_fig.to_json()
  dd_fig = ii_ym.safe_load(js_fig)
  with open(fig_yaml, 'w') as fh_w:
    ii_ym.dump(dd_fig, fh_w, default_flow_style=True, allow_unicode=True)
```
