FROM ubuntu:24.10

RUN apt update && apt install -y \
    curl \
    iproute2 \
    less \
    net-tools \
    openssh-client \
    squidclient \
    squid-openssl \
    vim

RUN mkdir -p /srv/squid/cache/
RUN chown -R proxy:proxy /srv/squid
RUN chmod 750 /srv/squid/
RUN /usr/lib/squid/security_file_certgen -c -s /srv/squid/ssl_db -M 4MB

RUN openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout squid-b.key \
  -out squid-b.crt -subj '/CN=squid-b' -days 3650
RUN mv squid-b* /etc/squid
RUN mv /etc/squid/squid.conf /etc/squid/squid.conf.org
COPY squid.conf /etc/squid

RUN <<EOF 
cat <<- _eof_ >> ~/.bashrc
export PS1='\u@\h:\W\n# '
alias kill-sq='kill $( pgrep squid )'
alias tl-sq='tail -f /var/log/squid/access.log'
_eof_
EOF
RUN ["squid", "-f", "/etc/squid/squid.conf", "--foreground", "-z"]
CMD ["squid", "-f", "/etc/squid/squid.conf", "--foreground", "-YCd", "1"]

