#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" > /etc/apt/sources.list.d/mozilla.list
apt remove -y firefox
apt update && apt install -y firefox xrdp lxqt
apt install -y $( apt list --upgradable 2> /dev/null| grep "/" | sed -s "s@/.*@@")
apt autoremove -y 


echo "@ -- cl-rdp end"
