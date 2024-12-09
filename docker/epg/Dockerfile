ARG UB_VER=24.10
FROM ubuntu:${UB_VER}
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y curl gcc ffmpeg iproute2 iputils-ping language-pack-ja locales python3 vim
RUN locale-gen
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs -y
#RUN npm install pm2 
RUN curl -LO https://github.com/l3tnun/EPGStation/archive/refs/tags/v2.10.0.tar.gz
RUN tar xf v2.10.0.tar.gz
RUN mv EPGStation-2.10.0 /srv/
RUN ln -s /srv/EPGStation-2.10.0 /srv/EPGStation
# RUN cd /srv/EPGStation && npm run all-install
# RUN cd /srv/EPGStation && npm run build
RUN cd /srv/EPGStation && cp config/config.yml.template config/config.yml
RUN cd /srv/EPGStation && cp config/operatorLogConfig.sample.yml config/operatorLogConfig.yml
RUN cd /srv/EPGStation && cp config/epgUpdaterLogConfig.sample.yml config/epgUpdaterLogConfig.yml
RUN cd /srv/EPGStation && cp config/serviceLogConfig.sample.yml config/serviceLogConfig.yml
RUN cd /srv/EPGStation && cp config/enc.js.template config/enc.js
RUN sed -i "s@/usr/local/bin@/usr/bin@" /srv/EPGStation/config/config.yml
# -- 移行のときはコメント外す
#COPY ssh_host_dsa_key /etc/ssh/
#COPY ssh_host_dsa_key.pub /etc/ssh/
#COPY ssh_host_ecdsa_key /etc/ssh/
#COPY ssh_host_ecdsa_key.pub /etc/ssh/
#COPY ssh_host_ed25519_key.pub /etc/ssh/
#COPY ssh_host_ed25519_key /etc/ssh/
#COPY ssh_host_rsa_key /etc/ssh/
#COPY ssh_host_rsa_key.pub /etc/ssh/
#RUN chmod 600 /etc/ssh/ssh_host_*
RUN <<EOF
cat <<- _eof_ >> ~/.bashrc
export PS1='[\t]\u@\h:\W\n# '
export TZ=Asia/Tokyo
_eof_
EOF
RUN <<EOF
cat <<- _eof_ > ~/ini.sh
#!/bin/bash
#source /root/.bashrc
#npm config set cafile /usr/share/ca-certificates/oreore/squid-b.crt

npm install pm2 -g
# npm install eslint -g
cd /srv/EPGStation
npm run all-install
npm run build
_eof_
EOF

CMD ["/usr/bash"]
