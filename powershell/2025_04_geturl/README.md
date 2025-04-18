# (PowerShell) proxy.pac向けにクリップボードのurlを修正する
ペースターで使用  
セカンドレベルもしくは、サードレベル終わり8文字にする  
「`https://www.1234567890.com/xxx`」が「dnsDomainIs(host, "34567890.com")||」になる予定  
## ファイル
・ get-url.ps1 ->変更スクリプト  
・ sample.pac -> proxy.pacのサンプル
