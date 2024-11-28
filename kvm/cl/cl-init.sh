#!/bin/bash

echo 'user:Password' | chpasswd

export DEBIAN_FRONTEND=noninteractive
apt update
apt -y install apache2 dstat htop
apt autoremove -y
apt remove -y

