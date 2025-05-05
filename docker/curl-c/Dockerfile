ARG UB_VER=25.04
FROM ubuntu:${UB_VER}
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && \
apt -y install autoconf \
 automake autoconf-archive  autogen \
 automake bison build-essential \
 bzip2 clang cmake cvs \
 flex gawk gcc git gperf g++ libpsl-dev \
 libssl-dev libtool make man-db meson \
 nasm ragel p7zip-full pax perl pkg-config \
 python3 subversion texinfo unzip vim \
 wget yasm zlib1g-dev
RUN git clone -b curl-8_13_0 --depth 1 https://github.com/curl/curl.git /root/curl
COPY diff.txt /root/curl
COPY config.guess /root/curl/config.guess 
COPY config.sub /root/curl/config.sub 
RUN chmod +x /root/curl/config.sub

RUN <<EOF
cat <<- _eof_ >> ~/.bashrc
export PS1='[\t]\u@\h:\W\n# '
export TZ=Asia/Tokyo
_eof_
EOF
RUN <<EOF
cat <<- _eof_ > ~/ini.sh
#!/bin/bash
cd /root/curl
git switch -c addopt
patch -p1 < diff.txt
autoreconf -i
./configure --with-openssl
make
make test

_eof_
EOF
RUN chmod +x /root/ini.sh

CMD ["/usr/bin/bash"]
