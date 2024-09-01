ARG UB_VER=24.04
FROM ubuntu:${UB_VER}
ARG PASS=PassWord
ENV DEBIAN_FRONTEND noninteractive

# ARG proxy='http://172.16.200.47:3128'
# ENV HTTP_PROXY $proxy
# ENV HTTPS_PROXY $proxy

RUN apt-get update && apt-get install -y iproute2 iputils-ping net-tools vim \
ibus-mozc language-pack-ja-base language-pack-ja lxde xrdp \
unifont synaptic scim-anthy fcitx-anthy

RUN echo "root:${PASS}" | chpasswd

RUN echo lxsession -s LXDE -e LXDE > ~/.xsession

RUN <<EOF 
cat <<- _eof_ >> ~/.bashrc
export PS1='\u@\h:\W\n# '
_eof_
EOF
# CMD ["cat"]
CMD /etc/init.d/xrdp start

