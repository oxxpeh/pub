#  ://github.com/danchitnis/container-xrdp

# FROM ubuntu:24.04 AS ububase
FROM ubuntu:24.04

ENV DEBIAN_FRONTEND noninteractive
ARG proxy='http://172.16.200.47:3128'
# ENV HTTP_PROXY $proxy
# ENV HTTPS_PROXY $proxy
# ENV http_proxy $proxy
# ENV https_proxy $proxy

RUN apt-get -y update 
RUN apt-get -y upgrade

RUN apt-get install -y \
    xfce4 \
    xfce4-clipman-plugin \
    xfce4-cpugraph-plugin \
    xfce4-netload-plugin \
    xfce4-screenshooter \
    xfce4-taskmanager \
    xfce4-terminal \
    xfce4-xkb-plugin \
    dbus-x11                #足しとかんとコンテナ実行時にdbusエラー出る

RUN apt-get install -y \
    sudo \
    wget \
    xorgxrdp \
    xrdp \
    tzdata \
    ibus \
    ibus-mozc \
    language-pack-ja-base \
    language-pack-ja \
    fonts-noto-cjk \
    fonts-noto-color-emoji && \
    apt remove -y light-locker xscreensaver && \
    apt autoremove -y && \
    rm -rf /var/cache/apt /var/lib/apt/lists

RUN locale-gen ja_JP.UTF-8 \
    && echo 'LC_ALL=ja_JP.UTF-8' > /etc/default/locale \
    && echo 'LANG=ja_JP.UTF-8' >> /etc/default/locale
ENV LANG=ja_JP.UTF-8 \
    LANGUAGE=ja_JP:ja \
    LC_ALL=ja_JP.UTF-8 \
    TZ=Asia/Tokyo
RUN cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && echo 'Asia/Tokyo' > /etc/timezone


COPY run.sh /usr/bin/
#RUN mv /usr/bin/ubuntu-run.sh /usr/bin/run.sh
RUN chmod +x /usr/bin/run.sh

# https://github.com/danielguerra69/ubuntu-xrdp/blob/master/Dockerfile
RUN mkdir -p /var/run/dbus && \
    cp /etc/X11/xrdp/xorg.conf /etc/X11 && \
    sed -i "s/console/anybody/g" /etc/X11/Xwrapper.config && \
    sed -i "s/xrdp\/xorg/xorg/g" /etc/xrdp/sesman.ini && \
    echo "xfce4-session" >> /etc/skel/.Xsession

##############
## For gvis
##############
# 
# RUN apt-get -y update 
# RUN apt-get -y upgrade
# 
# RUN apt-get install -y \
#     fonts-ipafont \
#     git \
#     curl \
#     featherpad \
#     gvfs-backends \
#     nmon \
#     vim \
#     dnsutils \
#     iputils-ping \
#     net-tools \
#     iproute2 \
#     mysql-client \
#     libreoffice \
#     libreoffice-l10n-ja \
#     libreoffice-dmaths \
#     libreoffice-ogltrans \
#     libreoffice-writer2xhtml \
#     libreoffice-pdfimport \
#     libreoffice-help-ja \
#     evince \
#     file-roller \
#     ristretto \
#     software-properties-common \
#     gnome-calculator && \
#     apt autoremove -y && \
#     rm -rf /var/cache/apt /var/lib/apt/lists
# 
# RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
# RUN install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
# RUN /usr/bin/sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
# RUN apt install apt-transport-https

RUN apt-get update && apt-get install -y ca-certificates curl
COPY squid-b.crt /
RUN mkdir -p /usr/share/ca-certificates/oreore/
RUN cp squid-b.crt /usr/share/ca-certificates/oreore/
RUN bash -c "echo 'oreore/squid-b.crt' >> /etc/ca-certificates.conf"
RUN update-ca-certificates
RUN rm squid-b.crt

RUN apt update
# RUN apt install code
# 
# RUN apt remove snap
#RUN apt-get install -y software-properties-common
# RUN add-apt-repository -y ppa:mozillateam/ppa
# RUN echo "Package: firefox*"                 >  /etc/apt/preferences.d/mozillateamppa
# RUN echo "Pin: release o=LP-PPA-mozillateam" >> /etc/apt/preferences.d/mozillateamppa
# RUN echo "Pin-Priority: 1001"                >> /etc/apt/preferences.d/mozillateamppa
# RUN apt-get -y update 
# RUN apt-get -y upgrade
# RUN apt-get install -y firefox xul-ext-ubufox

RUN mkdir -p /etc/apt/keyrings
# COPY repo-signing-key.gpg /
RUN curl -O https://packages.mozilla.org/apt/repo-signing-key.gpg 
RUN mv repo-signing-key.gpg /etc/apt/keyrings/packages.mozilla.org.asc 
RUN echo "deb [signed-by=/etc/apt/keyrings/packages.mozilla.org.asc] https://packages.mozilla.org/apt mozilla main" > /etc/apt/sources.list.d/mozilla.list 

RUN <<_eof_
cat << EOF >mozilla
Package: firefox*
Pin: origin packages.mozilla.org
Pin-Priority: 1001
EOF
_eof_
RUN mv mozilla /etc/apt/preferences.d/

RUN apt-get remove -y firefox
RUN apt-get update && apt-get install -y less file firefox \
    flatpak bzip2


# RUN curl https://dl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
# RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
# RUN apt-get -y update 
# RUN apt-get -y upgrade
# RUN apt-get install -y google-chrome-stable libu2f-udev

# 配下の.DS_Storeと._xxx を削除
# RUN echo "function removegomi () {"                >> /root/.bashrc
# RUN echo "  find . \( -name '.DS_Store' -or -name '._*' \) -delete -print;" >> /root/.bashrc
# RUN echo "}"                                       >> /root/.bashrc
# RUN echo "alias rmgomi=removegomi"                 >> /root/.bashrc
# 
# RUN echo "alias sc='cd /gvis/script'"              >> /root/.bashrc
# RUN echo "alias tree=\"pwd;find . | sort | sed '1d;s/^\.//;s/\/\([^/]*\)$/|--/;s/\/[^/|]*/|  /g'" \" >> /root/.bashrc
# RUN echo "alias dff='df -h | grep -v DockerSys | grep -v "dev/loop"' "                                 >> /root/.bashrc
# RUN echo "PATH=/gvis/script/proc:$PATH:$HOME/bin"  >> /root/.bashrc
# RUN echo "export PATH"                             >> /root/.bashrc

RUN useradd -m -s /usr/bin/bash -u 1001 user ##なんでかuid=1000はubuntuって名前の一般ユーザがあったので削除してから作成

# RUN sudo su - user
# RUN curl -sSLf https://github.com/aclap-dev/vdhcoapp/releases/latest/download/install.sh | bash
RUN echo "curl -sSLf https://github.com/aclap-dev/vdhcoapp/releases/latest/download/install.sh | bash" > /home/user/vdh.sh
RUN chmod +x /home/user/vdh.sh
COPY ff-ub-pr3.tgz /home/user/
COPY .xscreensaver /home/user/
RUN tar zxvf /home/user/ff-ub-pr3.tgz -C /home/user/
RUN chown -R user:user /home/user/.mozilla

RUN sed -i -e '/^%sudo/s/ ALL/NOPASSWD:ALL/g' /etc/sudoers

# 配下の.DS_Storeと._xxx を削除
#RUN echo "function removegomi () {"                >> /home/user/.bashrc
#RUN echo "  find . \( -name '.DS_Store' -or -name '._*' \) -delete -print;" >> /home/user/.bashrc
#RUN echo "}"                                       >> /home/user/.bashrc
#RUN echo "alias rmgomi=removegomi"                 >> /home/user/.bashrc

#RUN echo "alias sc='cd /gvis/script'"              >> /home/user/.bashrc
#RUN echo "alias tree=\"pwd;find . | sort | sed '1d;s/^\.//;s/\/\([^/]*\)$/|--/;s/\/[^/|]*/|  /g'" \" >> /home/user/.bashrc
#RUN echo "alias dff='df -h | grep -v DockerSys | grep -v "dev/loop"' "                                 >> /home/user/.bashrc
#RUN echo "PATH=/gvis/script/proc:$PATH:$HOME/bin"  >> /home/user/.bashrc
#RUN echo "export PATH"                             >> /home/user/.bashrc

#FROM ububase

# Docker config
#EXPOSE 3389
ENTRYPOINT ["/usr/bin/run.sh"]
