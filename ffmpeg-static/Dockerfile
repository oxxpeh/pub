ARG UB_VER=24.10
FROM ubuntu:${UB_VER}
ENV DEBIAN_FRONTEND noninteractive
ENV FF_VER 7.1
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
    libaribb24-dev \
    libdav1d-dev \
    libfdk-aac-dev \
    libsvtav1-dev \
    libsvtav1dec-dev \
    libsvtav1enc-dev \
    libx264-dev \
    libx265-dev \
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
RUN tar fx ffmpeg-${FF_VER}.tar.xz
RUN ln -s ffmpeg-${FF_VER} FFmpeg
RUN cd FFmpeg ; git clone --depth 1 https://code.videolan.org/videolan/dav1d.git
RUN cd FFmpeg ; git clone --depth 1 https://gitlab.com/AOMediaCodec/SVT-AV1.git
RUN cp /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc.org
RUN echo "Libs.private: -lm -lpng -lz -lm" >> \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc
RUN sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
RUN cp /FFmpeg/libavformat/movenc.c /FFmpeg/libavformat/movenc.c.org
RUN mkdir host-tmp
RUN <<EOF
cat <<- _eof_ > pat.sh
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
cat <<- END > patch.txt
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
RUN chmod +x  pat.sh
RUN /pat.sh

RUN <<EOF 
cat <<- _eof_ > mk-lib.sh
#!/bin/bash
cd /FFmpeg
cd dav1d/
mkdir build && cd build
meson setup ..  --default-library=static
ninja

cp src/libdav1d.a /usr/lib/x86_64-linux-gnu/

cd /FFmpeg
cd SVT-AV1/
mkdir build
cd build/
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF ..
make -j $1
cp /FFmpeg/SVT-AV1/Bin/Release/libSvtAv1Enc.a /usr/lib/x86_64-linux-gnu/

_eof_

EOF
RUN chmod +x  mk-lib.sh

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
    --enable-libdav1d \
    --enable-libfdk-aac \
    --enable-libsvtav1 \
    --enable-libx264 \
    --enable-libx265 \
    --disable-encoder=aac &&
    make -j \$1 && echo -e "\n@@ ldd ffmpeg" ; ldd ffmpeg ; \
    echo -e "\n@@ ffmpeg -codecs grep av1|x26|aac|arib" ; \
    ./ffmpeg -codecs | grep "av1\|x26\|aac\|arib"
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
RUN unset FF_VER 
CMD echo "Start"

