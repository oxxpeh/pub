# kvmとubuntu24.10 とcloud-init
## まとめ
・ISOよりhttps://cloud-images.ubuntu.com/ のimg使用がよいかも
## 作成例
以下なvm作成予定  
・ユーザ追加  
・ip設定  
・ssh鍵コピー  
・スクリプトコピー(実行)  
 「apache2 dstat htop」のインストールとパスワード変更  
・「user-data」はgithub
作成後
### img使用
```
curl -O "https://cloud-images.ubuntu.com/oracular/current/oracular-server-cloudimg-amd64.img"
# -- 元は 3.5 GiBなので追加
qemu-img resize oracular-server-cloudimg-amd64.img +27G
# -- 差分イメージ作成
qemu-img create -b oracular-server-cloudimg-amd64.img -F qcow2 -f qcow2 test.qcow2
# -- vm作成
virt-install --import --name test --osinfo ubuntu24.10   --vcpus 2 --memory 8192 \
 --disk path=/home/work/test.qcow2 --network bridge=br0 \
 --graphics vnc,listen=0.0.0.0,port=59000 \
 --sysinfo system.serial='ds=nocloud;seedfrom=https://raw.githubusercontent.com/oxxpeh/pub/main/kvm/cl'
# -- 作成後電源落とすので
virsh start test
```
### ISOからのautoinstall
```
virt-install --name test2 --osinfo ubuntu24.10   --vcpus 2 --memory 8192\
 --disk path=/home/work/test2.qcow2,size=30 \
 --network bridge=br0 --graphics vnc,listen=0.0.0.0,port=59001 \
 --extra-args 'console=ttyS0,115200n8 --- console=ttyS0,115200n8' \
 --location '/mnt/cifs/files/VM/ISO/ubo.iso,kernel=casper/vmlinuz,initrd=casper/initrd' \
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
