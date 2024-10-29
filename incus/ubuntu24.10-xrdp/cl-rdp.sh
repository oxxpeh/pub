#!/bin/bash
export DEBIAN_FRONTEND=noninteractive
curl https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | \
    sudo tee /etc/apt/sources.list.d/google-chrome.list
apt remove -y avahi-daemon
# apt-get -y update
apt-get install -U -y --no-install-recommends google-chrome-stable

sed -i "45s/oracular-backports/oracular-backports oracular-proposed/" /etc/apt/sources.list.d/ubuntu.sources
apt install -U -y xrdp/oracular-proposed

# apt install -y $( apt list --upgradable 2> /dev/null| grep "/" | sed -s "s@/.*@@")
apt autoremove -y
echo "xfce4-session" > ~user/.xsession

echo "@ -- cl-rdp end"
