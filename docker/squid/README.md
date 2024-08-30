# bumpなsquidを作るDockerfile
httpsもキャッシュしてくれるといいなと思いがんばってみた

# 使い方
```
mkdir squid-b && cd squid-b
curl --compressed -O https://raw.githubusercontent.com/oxxpeh/pub/main/docker/squid/Dockerfile
curl --compressed -O https://raw.githubusercontent.com/oxxpeh/pub/main/docker/squid/squid.conf
docker build -t squid-b-img .
# -- proxy必要なら 「--build-arg HTTP_PROXY=http://192.168.1.1:3128」とか
# -- 「docker.io」だけではなく「docker-buildx」もaptでinstallしておく
docker run -d -p 3128:3128 --name sq-b --hostname sq-b squid-b-img
docker cp sq-b:/etc/squid/squid-b.crt .
# -- squidで作成する証明書の発行機関の証明書をコピー
# -- windwosでいうところの「信頼されたルート証明機関」にコピーをしないとエラーが
```

# その他
## キャッシュディレクトリ
`cache_dir ufs /srv/squid/cache 10000 16 256` 「10000MB」に指定<BR>
サイズ変更は「build」前にしたほうが良いかも
## squidclient
「purge」もできる予定
## ubuntuでの「信頼されたルート証明機関」にコピー
```
sudo mkdir -p /usr/share/ca-certificates/oreore
sudo cp squid-b.crt /usr/share/ca-certificates/oreore/
sudo bash -c "echo 'oreore/squid-b.crt' >> /etc/ca-certificates.conf"
sudo update-ca-certificates
```
削除は以下
```
sudo bash -c "echo '!oreore/squid-b.crt' >> /etc/ca-certificates.conf'
sudo update-ca-certificates
```
「curl」や「git」は以下のおまじないでいけるはず<BR>
`export HTTP_PROXY=http://172.16.31.28:3128`<BR>
`export HTTPS_PROXY=http://172.16.31.28:3128`<BR>
「172.16.31.28」はdockerホストのIPに
## service squid stop
コンテナ異常停止したときにも「/run/squid.pid」が残ってコンテナ起動後にすぐ停止しちゃうので<BR>
`pid_filename none`に変更<BR>
「/run/squid.pid」ファイルが残るようで<BR>
`shutdown_lifetime 1 seconds`設定したらファイルは消えるけどなんか駄目<BR>
`alias kill-sq='kill $( pgrep squid )'`で停止コマンド設定<BR>
イメージ作成中`service squid start`は使えてた
## 透過型
(日本語が雑…)<BR>
ポート「3129」に透過proxy、ポート「3130」に通常proxy<BR>
コメント外して再起動とか、ポート追加して別途「run(-p 3129:3129 追加)」か<BR>
「nat追加(sudo iptables -A DOCKER ! -i docker0 -p tcp -m tcp --dport 3129 -j DNAT --to-destination 172.17.0.2:3129)」<BR>
などで動作する予定<BR>
透過の場合は宛先nat設定とかも必要かも<BR>
以下はdockerコンテナからの宛先nat設定例「172.17.0.2」はsquid コンテナのIP
dockerホストで設定
(「http」と「https」の宛先を変える)
```
sudo iptables -S -t nat -A PREROUTING -s 172.17.0.2/32 -i docker0 -j ACCEPT
sudo iptables -S -t nat -A PREROUTING -i docker0 -p tcp -m tcp --dport 443 -j DNAT --to-destination 172.17.0.2:3129
sudo iptables -S -t nat -A PREROUTING -i docker0 -p tcp -m tcp --dport 80 -j DNAT --to-destination 172.17.0.2:3129
```
## iptablesおまけ
ちがってたらごめんなさい
```mermaid
flowchart LR
  text_1_ip[Incoming<BR>Packet]
  text_2_ro[Routing]
  text_3_lp[Local<BR>Process]
  text_4_ro[Routing]
  text_5_ro[Routing]
  text_6_op[Outgoing<BR>Packet]

  subgraph sub_p[PREROUTING]
    direction TB
    textsp1[raw]
    textsp2[mangle]
    textsp3[nat]
    textsp1 --> textsp2
    textsp2 --> textsp3
  end
  subgraph sub_i[INPUT]
    direction TB
    textsi1[mangle]
    textsi2[filter]
    textsi1 --> textsi2
  end
  subgraph sub_po[POSTROUTING]
    direction TB
    textspo1[mangle]
    textspo2[nat]
    textspo1 --> textspo2
  end
  subgraph sub_o[OUTPUT]
    direction TB
    textso1[filter]
    textso2[nat]
    textso3[mangle]
    textso4[raw]
    textso4 --> textso3
    textso3 --> textso2
    textso2 --> textso1
  end
  subgraph sub_f[FORWARD]
    direction TB
    textf1[mangle]
    textf2[filter]
    textf1 --> textf2
  end
text_1_ip --> sub_p
sub_p --> text_2_ro
text_2_ro --> sub_i
text_2_ro --> sub_f
sub_i --> text_3_lp
text_3_lp --> text_4_ro
text_4_ro --> sub_o
sub_f --> text_5_ro
sub_o --> text_5_ro
text_5_ro --> sub_po
sub_po --> text_6_op

```
