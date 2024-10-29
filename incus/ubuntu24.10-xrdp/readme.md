# Ubuntu 24.10 とxrdp
incusで Ubuntu 24.10 のxrdp作成したらいろいろと苦労したので
## まとめ
1) 「proposed」のxrdpにする
2) aptの「--no-install-recommends」はやめてみる
```
#-- incusでlaunchするには
curl -O ""

incus profile create rdp-p
cat upg.yaml | incus edit rdp-p
incus launch ub-2410-img rdp-2410 −p default -p rdp-p

```

## 1) 「proposed」のxrdpにする
「0.9.24-5」が「0.10.1-2」になる  
<br>(参)<br>xorg - Remote desktop connections from Windows to stopped working after upgrading to Ubuntu 24.10 - Ask Ubuntu<br>https://askubuntu.com/questions/1530296/remote-desktop-connections-from-windows-to-stopped-working-after-upgrading-to-ub
```
sed -i "/oracular-backports/s/oracular-backports/oracular-backports oracular-proposed/" /etc/apt/sources.list.d/ubuntu.sources
apt -y -U xrdp/oracular-proposed
# -- 「-U」って知らんかった 「apt update」実行してくれる
```
## 2) aptの「--no-install-recommends」はやめてみる
<br>(参)<br>第331回　パッケージ管理のハウツー集 | gihyo.jp<br>https://gihyo.jp/admin/serial/01/ubuntu-recipe/0331<br>
lxqtでfirefoxとthunderbirdのSNAPがインストールに時間がかかったり遅くて  
aptの「--no-install-recommends」知ったので使ってみたら色々とやられた 
わたしののようなシロウトは「--no-install-recommends」を使ってはいけない…
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
```
curl -O ""
incus profile create upg
cat upg.yaml | incus edit upg
incus launch images:ubuntu/24.04/cloud ub-g −p default -p upg
incus publish --expire "2026-12-31T00:00:00+09:00" --reuse --alias ub-2410 up-g
# -- 以下はしなくてもよいかも
incus image set-property ub-2410 description "Ubuntu oracular"
# -- expireの書式 現時刻から1年後の表示
date -Iseconds -d 1years
2025-10-27t13:00:00+09:00
```
cloud-initですませたいので「/etc/apt/sources.list.d/ubuntu.sources」を書き換えてます。
よくないやり方かもしれない…
「ubuntu-release-upgrader-core」aptで入れて  
「/etc/update-manager/release-upgrades」の「lts」を「normal」書き換え
「do-release-upgrade」しましょう

