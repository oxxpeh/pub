# incusにてcloud-initで初期設定  
xrdp使えるDockerファイル作ろうとしてたら、複数サービス動作はやっぱりDockerには不向きで挫折して、  
incusなるものの存在を知り、lxdとどっちがいいのかよくわからんですがやってみた。   
deb版なfirefox入ったlxqtのxrdp環境ができる予定
「証明書いれる」「IP設定」「apt」「スクリプト実行」揃ってる例がなかったようなので
(2024/09/05)
## 前提
・ブリッジ「br0」があり192.168.1.0/24  
・ssl bumpなproxyが192.168.1.10で動作  
## 使い方
```
incus profile creat cl-test
curl -O "https://raw.githubusercontent.com/oxxpeh/pub/main/incus/cl-test.yaml"
vi cl-test.yaml
# -- proxyの証明書貼り付けとか
cat cl-test.yaml | incus profile edit cl-test
incus launch images:ubuntu/24.04/cloud test --profile default --profile cl-test
incus exec test -- bash
# -- 以下コンテナで確認とか
tail -f  /var/log/cloud-init-output.log
cloud-init status
cloud-init処理終了後再起動します
# -- cifs マウントしたいなら(ホストで)
incus config set test raw.apparmor "mount fstype=cifs,"
incus config set test security.privileged true
incus exec test apt install -y cifs-utils
# -- GPU追加なら
incus config device add test intelgpu gpu gid=44
# -- incus config 使用したら再起動推奨
incus restart test
```
rdpクライアントで接続
## 参考サイト
<span style="color: #38761d;"><br>(参)<br>Incusでリモートデスクトップ環境の構築: GPUとサウンド対応でChromeが動作するまで #Linux - Qiita<br>https://qiita.com/rairaii/items/81308d508336a1cf0ac4</span><br>
<span style="color: #38761d;"><br>(参)<br>Cloud config examples — Cloud-Init 17.2 documentation<br>https://cloudinit.readthedocs.io/en/17.2/topics/examples.html</span><br
<span style="color: #38761d;"><br>(参)<br>incus でssh接続するためのprofileを作成する - ku2hiro<br>https://scrapbox.io/ku2hiro/incus_%E3%81%A7ssh%E6%8E%A5%E7%B6%9A%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AEprofile%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B</span><br>
<span style="color: #38761d;"><br>(参)<br>lxc で cloud-init の network-config version 2 を使って IP Address を設定する 備忘録 - takashi kono's blog<br>https://takashikono.hatenadiary.jp/entry/2022/07/26/113449</span><br

## その他
### incus profile edit
長くなると改行を改変してきてとても編集できないので、yamlなファイルを別途編集して「パイプ|」で渡すことに。
```
$ incus profile show cl-test                                                                                                                     
config:                                                                                                                                          
  cloud-init.user-data: "#cloud-config\nca-certs:\n  trusted: \n  - |\n   -----BEGIN                                                             
    CERTIFICATE-----\n    MIIFBTCCAu2gAwIBAgIUCWG5AibBRcLrYM7W0BCsvZc86WMwDQYJKoZIhvcNAQEL\n                                                     
    \   BQAwEjEQMA4GA1UEAwwHc3F1aWQtYjAeFw0yNDA4MzAxMzM0MDhaFw0zNDA4Mjgx\n    MzM0MDhaMBIxEDAOBgNVBAMMB3NxdWlkLWIwggIiMA0GCSqGSIb3DQEBAQUAA4IC\n 
    \   DwAwggIKAoICAQDL0xrK4ULKPYNqoBrMmVtj1c+VuSgULd7GEg79xtqzwTcNFF88\n    kLVcETbxh+/aXvw/YeErLdZB0OrvMbGDGwwCRH8ZVPRMSefoGBUMFSYEW9dLKoZA\n 
```
### runcmd
```
      - [adduser, user, video]ﾚ
      - [curl, -O, https://raw.githubusercontent.com/oxxpeh/pub/main/incus/cl-rdp.sh]
      - [bash, cl-init.sh]
```
「グループへ追加」、「スクリプトの取得」、「実行」の3つ実行してます。  
鍵のコピー後aptとか、cloud-initでどう書くのか、わからないのでスクリプトにて実施  
最低限を「cloud-init」でその他はスクリプトで良いと思う  
incusなら「MIMEマルチパート」は…
### connman
lxqtいれると入るようで固定IP設定してても、「169.254.x.x」なIPを勝手に設定してくれてた。    
「avahi-daemon」も使わなそうなので削除
### netplan
書式は同じだけど「user.network-config」で指定する必要があるもよう  
時々`netplan apply`実行時に「not found」と怒られることがあった
