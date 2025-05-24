ARG UB_VER=25.04
FROM ubuntu:${UB_VER}
ENV DEBIAN_FRONTEND noninteractive
RUN apt update && apt install -y \
    autoconf \
    autoconf-archive \
    autogen \
    automake \
    bison \
    bzip2 \
    clang \
    cmake \
    curl \
    cvs \
    flex \
    gcc \
    gettext \
    gperf \
    g++ \
    libcurl4-openssl-dev \
    libexpat1-dev \
    libtool \
    less \
    make \
    meson \
    nasm \
    ragel \
    p7zip-full \
    pax \
    pkg-config \
    subversion \
    texinfo  \
    unzip \
    vim \
    yasm \
    zlib1g-dev

# RUN git clone https://github.com/FFmpeg/FFmpeg.git -b n7.1
# -- bump squid cert start
RUN mkdir /usr/share/ca-certificates/oreore
COPY squid-b.crt /usr/share/ca-certificates/oreore
RUN echo "oreore/squid-b.crt" >> /etc/ca-certificates.conf
RUN update-ca-certificates
# -- bump squid cert end
RUN curl -L -O "https://github.com/git/git/archive/refs/tags/v2.49.0.tar.gz" 
RUN tar fx v2.49.0.tar.gz
RUN ln -s git-2.49.0 git
RUN <<EOF
cat <<- _eof_ > pat.sh
#!/bin/bash
cd /git
# echo "\${no_st}--${no_ed}"
cat <<- END > diff.txt
--- a/git.c
+++ b/git.c
619a620
> 	{ "sc", cmd_sc },
--- a/builtin.h
+++ b/builtin.h
224a225
> int cmd_sc(int argc, const char **argv, const char *prefix, struct repository *repo);
--- a/Makefile
+++ b/Makefile
1312a1313
> BUILTIN_OBJS += builtin/sc.o
END
patch -p1 < diff.txt
cat <<- END > builtin/sc.c
#include "builtin.h"
#include "repository.h"

int cmd_sc(int argc, const char **argv, const char *prefix, struct repository *repo)
{
    const char *depth_option = "--depth";
    const char *depth_value = "1";

    int new_argc = argc + 2;
    const char **new_argv = malloc(new_argc * sizeof(char *));

    for (int i = 0; i < argc; i++) {
        new_argv[i] = argv[i];
    }

    new_argv[argc] = depth_option;
    new_argv[argc + 1] = depth_value;

    int result = cmd_clone(new_argc, new_argv, prefix, repo);

    free(new_argv);
    free(repo); // repositoryのメモリを解放

    return result;
}
END
cd /
_eof_

EOF
RUN chmod +x  pat.sh
RUN /pat.sh

RUN <<EOF 
cat <<- _eof_ >> ~/.bashrc
export PS1='\u@\h:\W\n# '
_eof_
EOF
CMD echo "Start"

