#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" > /etc/apt/sources.list.d/mozilla.list
apt update && apt install -y firefox
apt install -y $( apt list --upgradable 2> /dev/null| grep "/" | sed -s "s@/.*@@")
apt autoremove -y 
su - user "curl -sSLf https://github.com/aclap-dev/vdhcoapp/releases/latest/download/install.sh | bash"
echo "@ -- rdp-cl-in end"
