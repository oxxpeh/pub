#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" > /etc/apt/sources.list.d/mozilla.list
apt remove -y firefox
apt update && apt install -y firefox xrdp lxqt
apt install -y $( apt list --upgradable 2> /dev/null| grep "/" | sed -s "s@/.*@@")
apt autoremove -y 

mkdir /mnt/cifs

#-- host_start_stop.service
cat << EOF > Host-start-stop.service

[Unit]
Description=Host-start-stop Service
After=network.target

[Service]
Type=oneshot
ExecStart=/home/work/host-start.sh
ExecStop=/home/work/host-stop.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target

EOF

cat << EOF > host-start.sh
#!/bin/bash
#-- 2024/09/05
echo -e "@-- start\t\$( date )" >> /home/work/host-start-stop.log
mount.cifs //192.168.1.10/data/ /mnt/cifs/ -o user=user,password=xxx,uid=user,gid=user
EOF

cat << EOF > host-stop.sh
#!/bin/bash
#-- 2019/07/16
echo -e "@-- stop\t\$( date )" >> /home/work/host-start-stop.log
EOF

chmod +x host-st*.sh 
sudo mkdir /home/work
sudo mv host-st*.sh /home/work/
sudo mv Host-start-stop.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable Host-start-stop.service

echo "@ -- rdp-cl-in end"
