# kvmとubuntu24.10 とcloud-init
## まとめ
・ISOよりhttps://cloud-images.ubuntu.com/ のimg使用がよいかも  
・「--cloud-init user-data='xx'」でがんばる  
  「--sysinfo system.serial=」とか動作しなくなったので(わたしの環境だけかも)  

## 作成例
以下なvm作成予定  
・ユーザ追加(user:Password)  
・ip設定  
・ssh鍵コピー  
・スクリプトコピー(img使用なら実行)  
 「apache2 dstat htop」のインストールとパスワード変更  
・「user-data」はgithub  

### img使用(--cloud-init)
```
curl -O "https://cloud-images.ubuntu.com/oracular/current/oracular-server-cloudimg-amd64.img"
# -- 元は 3.5 GiBなので追加
qemu-img resize oracular-server-cloudimg-amd64.img +27G
# -- 差分イメージ作成
qemu-img create -b oracular-server-cloudimg-amd64.img -F qcow2 -f qcow2 test.qcow2
# -- vm作成
curl -O https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/mp/mp-ud.txt
curl -O https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/mp/meta.yaml
curl -O https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/mp/net.yaml
virt-install --import --name test --osinfo ubuntu24.10  \
 --vcpus 2 --memory 8192 --disk path=test.qcow2  --cloud-init \
  user-data='mp-ud.txt',network-config='net.yaml',meta-data='meta.yaml'
# -- 作成後電源落とすので
virsh start test
```
### img使用(--sysinfo)
```
curl -O "https://cloud-images.ubuntu.com/oracular/current/oracular-server-cloudimg-amd64.img"
# -- 元は 3.5 GiBなので追加
qemu-img resize oracular-server-cloudimg-amd64.img +27G
# -- 差分イメージ作成
qemu-img create -b oracular-server-cloudimg-amd64.img -F qcow2 -f qcow2 test.qcow2
# -- vm作成
virt-install --import --name test --osinfo ubuntu24.10   --vcpus 2 --memory 8192 \
 --disk path=test.qcow2 \
 --graphics vnc,listen=0.0.0.0,port=59000 \
 --sysinfo system.serial='ds=nocloud;seedfrom=https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/cl'
# -- 作成後電源落とすので
virsh start test
```
### ISOからのautoinstall(--sysinfo)
```
curl -O https://ftp.udx.icscoe.jp/Linux/ubuntu-releases/oracular/ubuntu-24.10-live-server-amd64.iso
virt-install --name test2 --osinfo ubuntu24.10   --vcpus 2 --memory 8192\
 --disk path=test2.qcow2,size=30 \
 --graphics vnc,listen=0.0.0.0,port=59001 \
 --extra-args 'console=ttyS0,115200n8 --- console=ttyS0,115200n8' \
 --location 'ubuntu-24.10-live-server-amd64.iso,kernel=casper/vmlinuz,initrd=casper/initrd' \
 --sysinfo system.serial='ds=nocloud;seedfrom=https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/at/' \
 --extra-args 'autoinstall' 
# -- 作成後電源落とすので
virsh start test2
```
`virsh console test`やvncviewerで確認
## 補足など
以下で書かれてることがほどんど。
<span style="color: #38761d;"><br>(参)<br>第561回　ローカルインストール時もcloud-initを活用する | gihyo.jp<br>https://gihyo.jp/admin/serial/01/ubuntu-recipe/0561</span><br>
書かれてないと思われることは  
・「autoinstallでは「runcmd」が使えない   
・ virt-installでの「sysinfo」 使用例  
### 「autoinstallでは「runcmd」が使えない
「runcmd」の代わりに「late-commands」を使用することに   
<span style="color: #38761d;"><br>(参)<br>Introduction to autoinstall - Ubuntu installation documentation<br>https://canonical-subiquity.readthedocs-hosted.com/en/latest/intro-to-autoinstall.html</span><br>
`- curtin in-target -- touch /root/ooo.out`のように頭に`- curtin in-target -- `が必要  
スクリプト実行はスクリプトに間違いがあると止まり、エラーの内容もわかりにくいのでコピーのみ
### virt-installでの「sysinfo」 使用例
  「user-data」ファイル変更後に都度ISO作成とか面倒なので…
### その他
#### 「vendor-data」と「network-config」
なくても問題ないようですがリトライしてるようなので空で作成。「meta-data」は必要  
#### img使用でのip設定
ip設定できてたときもあったと思うのですが「write_files」でyaml作成に…
#### やっぱりスクリプト
「user-data」の記述でできそうなことも、スクリプトで済むならそっちのほうが悩まなくて良いですかね  
#### 「/etc/cloud/cloud-init.disabled」
live ISOでインストールすると「/etc/cloud/cloud-init.disabled」ファイル作成されてcloud-initが無効に  
img使用でも作成してます。  
kvmの設定として「seedfrom=XXX」が残るので起動毎に実行されるので。
```
$ virsh dumpxml test | grep -A5 "'smbios"
  <sysinfo type='smbios'>
    <system>
      <entry name='serial'>ds=nocloud;seedfrom=https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/cl</entry>
    </system>
  </sysinfo>
  <os>
```
#### パスワードのハッシュ
<span style="color: #38761d;"><br>(参)<br>LinuxでSHA-512のパスワードハッシュ作成方法まとめ #Python - Qiita<br>https://qiita.com/yumenomatayume/items/2c77ec52e7b2257f6800</span><br>
```
openssl passwd -6 Password
$6$RCQTZx3KQune5XBV$XTeLU5sMj1iLUqE0dRrs4lJmARI8jKL6iFAIGryHQv8Ld0PxZgn9e59DPtEowFys7LKyBAqsJD15ubNBDcAk
```
#### 「virt-customize」でパスワード変更
イメージバラして、細工してまた包んでしてるから使わないで「cloud-init」とかのがいいかと
```
sudo apt install guestfs-tools
sudo virt-customize -v -x -a oracular-server-cloudimg-amd64.img -root-password password:Password
```
#### 「--sysinfo」で設定できる項目
```
$ virt-install --sysinfo=?
--sysinfo options:
  clearxml
  xpath[0-9]*.create
  xpath[0-9]*.delete
  xpath[0-9]*.set
  xpath[0-9]*.value
  baseBoard.asset
  baseBoard.location
  baseBoard.manufacturer
  baseBoard.product
  baseBoard.serial
  baseBoard.version
  bios.date
  bios.release
  bios.vendor
  bios.version
  chassis.asset
  chassis.manufacturer
  chassis.serial
  chassis.sku
  chassis.version
  entry[0-9]*
  entry[0-9]*.file
  entry[0-9]*.name
  oemStrings.entry[0-9]*
  system.family
  system.manufacturer
  system.product
  system.serial
  system.sku
  system.uuid
  system.version
  type
```
#### qemuでするなら
`-smbios type=1,serial=ds='nocloud;s=http://10.0.2.2:8000/'`でいけるもよう
<span style="color: #38761d;"><br>(参)<br>New user tutorial with QEMU - cloud-init 24.4 documentation<br>https://cloudinit.readthedocs.io/en/latest/tutorial/qemu.html</span><br>
#### meta-dataでホスト名
autoinstallで効く「identity」の「hostname」ではなくmeta-dataで指定みたい  
EC2では「instance-id」に意味があるのでしょうが
```
instance-id: i-87018aed
local-hostname: myhost.internal
```
#### live migration
incusやDockerでなくkvm使用してる理由はストレージライブマイグレーションしたいからなので
```
virsh migrate --live --copy-storage-all --verbose XXXX qemu+ssh://user@host/system
# -- 上だと差分イメージと元イメージ合わせたイメージが移行先にできた
# -- イメージを先にコピーしといて以下だと差分になってたが「--copy-storage-all」でも同じだった
# -- イメージがあるか無いかで動作が違う様子 
virsh migrate --live --copy-storage-inc --verbose XXXX qemu+ssh://user@host/system

```
#### --cloud-init user-data='xx'
xxで指定するのはMIMEマルチパート形式でないと怒られて無視されるようなので参照サイトの通りに実施して作成
<span style="color: #38761d;"><br>(参)<br>cloud-initでシェルスクリプトとcloud-configを同時に使う | DevelopersIO<br>https://dev.classmethod.jp/articles/cloud-init-use-shell-and-cloud-config/</span><br>
```
apt install -y cloud-utils
write-mime-multipart --output=mp-ud.txt \
 test.sh:text/x-shellscript \
 user-data:text/cloud-config
```
MIMEで符号化されてますがマルチバイト文字とか使用してないならそのまま修正してよさそう。
指定したファイルをまとめてISOにして渡しているもよう
#### 動作画面へのリンク(--sysinfo使用)
リンククリックでダウンロードします  
[動画](https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/virt-instx8.mp4) 6MBぐらい  
8倍速の動画  
[gif動画](https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/virt-instx8.mp4) 5MBぐらい  
上記動画(47秒ぐらい)の毎秒画面切り出しで  
### 履歴
#### 2024/12/10
`--cloud-init user-data='xx'`での指定を追加  
「--sysinfo」で動作しなくなってたので「--cloud-init user-data='xx'」で対応  
「meta-data」、「network-config」での指定も可能になった、yaml形式(?)でなくjson形式(?)にしたらいけた模様  
#### 2024/11/29
とりあえず作成
