FROM ubuntu:24.10

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

RUN git clone https://github.com/FFmpeg/FFmpeg.git -b n7.1
RUN cp /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc.org
RUN echo "Libs.private: -lm -lpng -lz -lm" >> \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc
RUN sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
RUN cp /FFmpeg/libavformat/movenc.c /FFmpeg/libavformat/movenc.c.org
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
\${no_st},\${no_ed}c\${no_st},\${no_ed}
<     .p.video_codec     = CONFIG_LIBX264_ENCODER ?
<                          AV_CODEC_ID_H264 : AV_CODEC_ID_MPEG4,
---
>     .p.video_codec     = CONFIG_LIBX265_ENCODER ?
>                          AV_CODEC_ID_HEVC : AV_CODEC_ID_MPEG4,
END
patch movenc.c < patch.txt
cd /
_eof_

EOF
RUN chmod +x  pat.sh
RUN /pat.sh

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
    --disable-encoder=aac &&
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

