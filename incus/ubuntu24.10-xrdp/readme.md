# Ubuntu 24.10 とxrdp
incusで Ubuntu 24.10 のxrdp作成したらいろいろと苦労したので
## まとめ
1) 「proposed」のxrdpにする
2) aptの「--no-install-recommends」はやめてみる  
incusでlaunchするには  
```
curl -O "https://raw.githubusercontent.com/oxxpeh/pub/main/incus/ubuntu24.10-xrdp/rdp.yaml"
incus profile create rdp
cat rdp.yaml | incus profile edit rdp
# -- 「ub-2410」で24.10のイメージ作成しとく(後述)
incus launch ub-2410 rdp -p default -p rdp
# -- intelのGPU使うなら
incus config device add rdpc intelgpu gpu gid=44
# -- incusbr0で動作してるなら転送設定
# -- ホストのipは「192.168.1.100」の場合
# -- コンテナのip「10.242.162.100」
incus network forward create incusbr0 192.168.1.100
incus network forward port add incusbr0 192.168.1.100 tcp 3389  10.242.162.100 3389
# -- 「user」の「Password」でchromeの入ったものにrdp接続できる予定 
```
### rdpの画面と日本語設定画面(60%表示)
<img src="https://raw.githubusercontent.com/oxxpeh/pub/main/incus/ubuntu24.10-xrdp/SS.jpg" alt="rdp画面" width="60%" height="60%"><BR> 
<img src="https://raw.githubusercontent.com/oxxpeh/pub/main/incus/ubuntu24.10-xrdp/ss-nihongo.gif" alt="日本語設定画面" width="60%" height="60%"><BR>  
「JA」->「日本語 - Mozc」 -> 「あ」 -> 「入力モード」 -> 「ひらがな」  
以後は「半角/全角」で切替可能と思う  
### 変な表示(60%表示)  
ユーザディレクトリインポートしたものは普通に表示されてたので、どこかの設定かと…<BR>
<img src="https://raw.githubusercontent.com/oxxpeh/pub/main/incus/ubuntu24.10-xrdp/ss-hen.jpg" alt="変な表示" width="60%" height="60%"><BR>  

## 1) 「proposed」のxrdpにする
「0.9.24-5」が「0.10.1-2」になる  
<br>(参)<br>xorg - Remote desktop connections from Windows to stopped working after upgrading to Ubuntu 24.10 - Ask Ubuntu<br>https://askubuntu.com/questions/1530296/remote-desktop-connections-from-windows-to-stopped-working-after-upgrading-to-ub<br><br>
```
sed -i "/oracular-backports/s/oracular-backports/oracular-backports oracular-proposed/" /etc/apt/sources.list.d/ubuntu.sources
apt -y -U xrdp/oracular-proposed
# -- 「-U」って知らんかった 「apt update」実行してくれる
```
## 2) aptの「--no-install-recommends」はやめてみる
(参)<br>第331回　パッケージ管理のハウツー集 | gihyo.jp<br>https://gihyo.jp/admin/serial/01/ubuntu-recipe/0331<br><br>
lxqtでfirefoxとthunderbirdのSNAPがインストールに時間がかかったり遅くて    
aptの「--no-install-recommends」知ったので使ってみたら色々とやられた   
わたしののようなシロウトは「--no-install-recommends」を使ってはいけない…  
(aptでSNAP版外せるようにならないでしょうか…)  
『「lxqt」、「lubuntu-desktop」、「xbuntu-desktop」、「xfce4」』と  
『「xrdp」「xrdp/oracular-proposed」』と『「--no-install-recommends」の有無』の組み合わせでいろいろやったけど  
・ xrdpの接続ができない  
・ xrdpの接続はできるけど日本語設定別途必要  
・ xrdpの接続はできるけど音声設定別途必要  
・ xrdpの接続はできるけどメニューボタンなかったり  
とかいろいろあって  
「xbuntu-desktop-minimal」と「xrdp/oracular-proposed」と「--no-install-recommends 無し」に落ち着いた。  
上記でもrdp接続時に「Oh no! something has gone wrong」出て  
「.xsession-errors」に出力無しだけど  
`echo "xfce4-session" > ~/.xsession`で接続できた  
ログはちゃんととってない…  
「/var/log/xrdp.log 」「~/.xsession-errors」とか確認  
## その他
### 「--no-install-recommends」」について  
「Recommended(強い推し)」は勝手に入る(昔はちがったのか？)。  
「Suggested(弱い推し)」は入らない。  
それぞれ「--no-install-recommends」、「--install-suggests」で逆の動作にできそう  
以下にgitでの例。「patch」が入ったり、入らなかったり  
```
# apt install git
Installing:
  git

Installing dependencies:
  git-man  liberror-perl  patch

Suggested packages:
  gettext-base  git-daemon-run  | git-daemon-sysvinit  git-doc  git-email  git-gui  gitk  gitweb  git-cvs  git-mediawiki  git-svn  ed  diffutils-doc

Summary:
  Upgrading: 0, Installing: 4, Removing: 0, Not Upgrading: 0
  Download size: 5180 kB
  Space needed: 26.5 MB / 280 GB available

Continue? [Y/n] n
# -- 「--no-install-recommends」付き
# apt install  --no-install-recommends git
Installing:
  git

Installing dependencies:
  git-man  liberror-perl

Suggested packages:
  gettext-base  git-daemon-run  | git-daemon-sysvinit  git-doc  git-email  git-gui  gitk  gitweb  git-cvs  git-mediawiki  git-svn

Recommended packages:
  patch

Summary:
  Upgrading: 0, Installing: 3, Removing: 0, Not Upgrading: 0
  Download size: 5076 kB
  Space needed: 26.3 MB / 280 GB available

Continue? [Y/n] n
Abort.
```
cloud-initでは以下の記載になる
```
   apt:
     conf:
       Apt::Install-Recommends 'false';
   package_update: true
   packages:
     - git

# -- 「94cloud-init-config 」ファイルが作成される
# cat /etc/apt/apt.conf.d/94cloud-init-config 
Apt::Install-Recommends 'false'; 
```
### incusコンテナ作成について
24.10のイメージ作成。  
cloud-initですませたいので「/etc/apt/sources.list.d/ubuntu.sources」を書き換えてます。  
よくないやり方かもしれない…  
「ubuntu-release-upgrader-core」aptで入れて  
「/etc/update-manager/release-upgrades」の「lts」を「normal」に書き換え  
「do-release-upgrade」しましょう  
```
curl -O "https://raw.githubusercontent.com/oxxpeh/pub/main/incus/ubuntu24.10-xrdp/upg.yaml"
incus profile create upg
cat upg.yaml | incus profile edit upg
incus launch images:ubuntu/24.04/cloud upg -p default -p upg
# -- 終了確認
incus exec upg -- cloud-init status --wait
# -- 「done」まで待つ
# -- status: done
incus exec upg bash
# -- 再起動まで2分ほど待つ
incus exec upg cat /etc/issue
# -- Ubuntu 24.10 \n \l
# -- イメージ作成前のクリーン作業はわからない…
incus stop upg
incus publish --expire "2026-12-31T00:00:00+09:00" --reuse --alias ub-2410 upg
# -- 以下はしなくてもよいかも
# -- descriptionの変更
incus image set-property ub-2410 description "Ubuntu oracular"
# -- expireの書式 現時刻から1年後の表示
date -Iseconds -d 1years
2025-10-27t13:00:00+09:00
```
### launchでの「Error: Invalid number of arguments」
数あってるのにエラーがでるときがある何が…
```
incus launch images:ubuntu/24.04/cloud ub−24 −−profile default
# -- 略
Error: Invalid number of arguments
```
### 再起動語のcloud-initが終わらないかも
```
# -- 使わないので無効にする…
systemctl disable cloud-init-main
# -- 以下で止まってた
systemctl status cloud-init-main
● cloud-init-main.service - Cloud-init: Single Process
     Loaded: loaded (/usr/lib/systemd/system/cloud-init-main.service; enabled; preset: enabled)
    Drop-In: /run/systemd/system/service.d
             └─zzz-lxc-service.conf
     Active: active (running) since Tue 2024-10-29 20:34:53 JST; 13min ago
 Invocation: e66c2462123245a1a19a711648c0dd9e
   Main PID: 176 (cloud-init)
     Status: "Waiting on external services to complete before starting the network stage."
      Tasks: 3
     Memory: 29M (peak: 29.9M)
        CPU: 259ms
```

