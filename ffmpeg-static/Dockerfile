FROM ubuntu:24.04

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
    ffmpeg \
    flex \
    gcc \
    git \
    gperf \
    g++ \
    libfdk-aac-dev \
    libx264-dev \
    libx265-dev \
    libaribb24-dev \
    libnuma-dev \
    libpng-dev \
    libtool \
    make \
    meson \
    nasm \
    ragel \
    p7zip-full \
    pax \
    pkg-config \
    python3 \
    subversion \
    texinfo  \
    unzip \
    vim \
    yasm \
    zlib1g-dev

RUN git clone https://github.com/FFmpeg/FFmpeg.git -b n7.0.2
RUN cp /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc.org
RUN echo "Libs.private: -lm -lpng -lz -lm" >> \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc
RUN sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
RUN cp /FFmpeg/libavformat/movenc.c /FFmpeg/libavformat/movenc.c.org
COPY movenc.c /FFmpeg/libavformat/

RUN <<EOF 
cat <<- _eof_ > mk-ffm.sh
#!/bin/bash
ST=\$(date)
cd FFmpeg
./configure \
    --enable-small \
    --disable-shared \
    --disable-debug \
    --disable-doc \
    --enable-static \
    --pkg-config-flags=--static \
    --extra-libs=-static \
    --extra-cflags=--static \
    --enable-nonfree \
    --enable-version3 \
    --enable-gpl \
    --enable-libaribb24 \
    --enable-libfdk-aac \
    --enable-libx264 \
    --enable-libx265 \
    --disable-encoder=aac && \
    make -j \$1 && echo -e "\n@@ ldd ffmpeg" ; ldd ffmpeg ; \
    echo -e "\n@@ ffmpeg -codecs grep x26|aac|arib" ; \
    ./ffmpeg -codecs | grep "x26\|aac\|arib"
echo -e "\n@@ Start \${ST}"
echo "@@ End \$(date)"
_eof_

EOF
RUN chmod +x  mk-ffm.sh

RUN <<EOF 
cat <<- _eof_ >> ~/.bashrc
export PS1='\u@\h:\W\n# '
_eof_
EOF
CMD echo "Start"
RUN mkdir host-tmp

