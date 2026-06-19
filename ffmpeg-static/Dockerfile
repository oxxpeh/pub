ARG UB_VER=26.04
FROM ubuntu:${UB_VER}
ENV DEBIAN_FRONTEND=noninteractive
ENV DAV_VER=1.5.3
ENV FF_VER=8.1.2
ENV SVT_VER=4.1.0
RUN apt update && apt install -y ca-certificates
COPY ./squid-b.crt /usr/local/share/ca-certificates/squid-b.crt
RUN update-ca-certificates

RUN sed -i 's|http://archive.ubuntu.com/ubuntu/|https://ftp.udx.icscoe.jp/Linux/ubuntu/|g' /etc/apt/sources.list.d/ubuntu.sources
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

# RUN git clone https://github.com/FFmpeg/FFmpeg.git -b n7.1
RUN curl -O "https://ffmpeg.org/releases/ffmpeg-${FF_VER}.tar.xz" 
RUN tar xf ffmpeg-${FF_VER}.tar.xz
RUN ln -s ffmpeg-${FF_VER} FFmpeg
RUN cp /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc.org
RUN echo "Libs.private: -lm -lpng -lz -lm" >> \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc
# RUN sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
RUN curl -O https://code.videolan.org/videolan/dav1d/-/archive/${DAV_VER}/dav1d-${DAV_VER}.tar.bz2
RUN curl -O https://gitlab.com/AOMediaCodec/SVT-AV1/-/archive/v${SVT_VER}/SVT-AV1-v${SVT_VER}.tar.bz2
RUN git clone --depth 1  https://code.videolan.org/videolan/x264.git
RUN mkdir host-tmp
RUN cp /FFmpeg/libavformat/movenc.c /FFmpeg/libavformat/movenc.c.org
RUN <<EOF
cat <<- _eof_ > pat1.sh
#!/bin/bash
cd /FFmpeg/libavformat
ll_ln=(\$(grep -n ".p.video_codec"   movenc.c.org | grep -o "^[0-9]*"))
no_mp4=\$(grep -n '.p.name            = "mp4"' movenc.c.org | grep -o "^[0-9]*")
for nn in \${ll_ln[@]} ; do 
    if [[ \${nn} -gt \${no_mp4} ]] ; then
        # echo \${nn}
        no_st=\${nn}
        break
    fi
done
no_ed=\$(( \${no_st} + 1 ))
# echo "\${no_st}--${no_ed}"
cat << END > patch.txt
\${no_st},\${no_ed}c\${no_st},\${no_st}
<     .p.video_codec     = CONFIG_LIBX264_ENCODER ?
<                          AV_CODEC_ID_H264 : AV_CODEC_ID_MPEG4,
---
>     .p.video_codec     = AV_CODEC_ID_AV1,
END
patch movenc.c < patch.txt
cd /
_eof_

EOF
RUN chmod +x  pat1.sh
RUN ./pat1.sh

RUN <<EOF
cat << _eof_ > pat2.sh
#!/bin/bash
cd /FFmpeg/libavcodec
cp libsvtav1.c libsvtav1.c.org
nn=\$( grep -n "Constant Rate Factor value" libsvtav1.c | grep ^[0-9]* -o )
nn=\$(( \$nn + 1 ))

cat << _END_ > patch.txt
\${nn}c\${nn}
<       AV_OPT_TYPE_INT, { .i64 = 0 }, 0, 63, VE },
---
>       AV_OPT_TYPE_INT, { .i64 = 40 }, 0, 63, VE },
_END_
patch libsvtav1.c < patch.txt
cd /
_eof_

EOF

RUN chmod +x  pat2.sh
RUN ./pat2.sh

RUN <<EOF
cat << _eof_ > mk-ffm.sh
#!/bin/bash

tar xf dav1d-${DAV_VER}.tar.bz2
ln -s dav1d-${DAV_VER} dav1d
cd dav1d/
mkdir build && cd build
meson setup ..  --default-library=static
ninja
ninja install

cd /

tar xf SVT-AV1-v${SVT_VER}.tar.bz2
ln -s SVT-AV1-v${SVT_VER} SVT-AV1
cd SVT-AV1/
mkdir build
cd build/
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF ..
make -j \$1
make install

cd /

cd x264
./configure --enable-static --enable-pic
make -j \$1
make install

cd /


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
    --enable-libdav1d \
    --enable-libfdk-aac \
    --enable-libsvtav1 \
    --enable-libx264 \
    --disable-encoder=aac &&
    make -j \$1 && echo -e "\n@@ ldd ffmpeg" ; ldd ffmpeg ; \
    echo -e "\n@@ ffmpeg -codecs grep x26|aac|arib|svt" ; \
    ./ffmpeg -codecs | grep "x26\|aac\|arib\|svt"
echo -e "\n@@ Start \${ST}"
echo "@@ End \$(date)"
_eof_

EOF
RUN chmod +x  mk-ffm.sh

RUN <<EOF 
cat << _eof_ >> ~/.bashrc
export PRXY_ADD=http://192.168.1.100:3128
export HTTPS_PROXY=${PRXY_ADD}
export HTTP_PROXY=${PRXY_ADD}
export http_proxy=${PRXY_ADD}
export https_proxy=${PRXY_ADD}
export no_proxy=127.0.0.1,localhost,172.16.0.0/12
export NO_PROXY=127.0.0.1,localhost,172.16.0.0/12
export PS1='\u@\h:\W\n# '
_eof_
EOF
RUN unset FF_VER 
CMD ["echo", "Start"]

