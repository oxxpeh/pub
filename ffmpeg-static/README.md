# ffmpegをスタティックなライブラリで作るDockerファイル
~Windows版は「ffmpeg-windows-build-helpers」でさくっと作れたけど<BR>~
https://www.gyan.dev/ffmpeg/builds/  か  
https://github.com/BtbN/FFmpeg-Builds/releases  から落とすのが良いかと  
linuxの配布版は「arribb24」が入ってなさそうなので  
~native(linux)は作れなかったので~ちょっとがんばった<BR>
ubuntu25.04で確認<BR>
ffmpegは「n7.1.1」<BR>
(Dokcerファイルで取得時に指定)<BR>
「svtav1」~~「x265」 「x264」~~ 「aribb24」 「fdk_aac」を有効化<BR>
(スクリプトmk-ffm.shでconfigure時に指定)

dockerはほとんど使ったことがない…<BR>
makeで「warning」が出るけど気にしない…<BR>
glibcのライブラリを使用するのかな
```
warning: Using 'dlopen' in statically linked applications requires at runtime the shared libraries from the glibc version used for linking
warning: Using 'getaddrinfo' in statically linked applications requires at runtime the shared libraries from the glibc version used for linking
```

## 使い方
```
mkdir ffm-b && cd ffm-b
# -- 「ffm-b」でなくても何でも良いです
curl --compressed -O https://raw.githubusercontent.com/oxxpeh/pub/main/ffmpeg-static/Dockerfile
docker build -t ffm-b-img .
# -- proxy必要なら 「--build-arg HTTP_PROXY=http://192.168.1.1:3128」とか
# -- 「docker.io」だけではなく「docker-buildx」もaptでinstallしておく
docker run -it  --name ffm-b --hostname ffm-b --mount "type=bind,src=/tmp/,dst=/host-tmp" ffm-b-img bash
# -- ホスト側のマウント場所とか変更したい場合は修正を
/mk-lib.sh
# -- 「./mk-lib.sh 6」 とかでmake 時の job数の指定が可能と思う
# -- 「./mk-lib.sh」だと無制限でjob作成
# --
/mk-ffm.sh
# -- configureとmakeします
# -- 「./mk-ffm.sh 6」 とかでmake 時の job数の指定が可能と思う
# -- 「./mk-ffm.sh」だと無制限でjob作成
cp /FFmpeg/ffmpeg /host-tmp/
# -- ホストへのコピーはスクリプトに入れてません
# -- docker cpとかでも
```
コンテナの大きさは3Gぐらいに、ffmpegは30Mぐらいだったかな

## 細工とか
### ffmpegのconfigureのオプション
```
./configure  \
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
    --disable-encoder=aac
```
### コンテナにaptで入れてるパッケージ
```
apt install -y
   archive\
   autoconf\
   autoconf-yasm\
   autogen\
   automake\
   bison\
   bzip2\
   clang\
   cmake\
   curl\
   cvs\
   ffmpeg\
   flex\
   gcc\
   git\
   gperf\
   g++\
   libaribb24-dev\
   libpng-dev\
   libfdk-aac-dev\
   libnuma-dev \
   libtool\
   make\
   meson\
   nasm\
   ragel\
   p7zip-full\
   pax\
   pkg-config\
   python3\
   subversion\
   texinfo \
   unzip\
   zlib1g-dev
```
### configureのエラー対策
コンパイルのことが基本わかっていないので…<BR>
「x265」と「aribb24」でエラー出力<BR>
どちらも「ERROR: aribb24(x265) not found using pkg-config」<BR>
見つからないわけではなく、ライブラリの確認時のオプションが間違っているためにエラーを出力<BR>
configure実行後の「ffbuild/confg.log」で確認
(対処後aptのパッケージではなく、ソース試してみたけどpcファイルの中身は同じ)<BR>

#### x265
エラー<BR>
/usr/bin/ld: cannot find -lgcc_s: No such file or directory<BR>
対処<BR>
pkg-confgで使用する「/usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc」の中の<BR>
「Libs.private」行に「-lgcc_s」があるとエラー<BR>
```
sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
```
#### aribb24
エラー 1<BR>
undefined reference to `sqrt'<BR>
対処 1<BR>
「/usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc」の中の<BR>
「Libs.private」行がないので「Libs.private:-lm」追加<BR>

エラー 2<BR>
undefined reference to `png_create_write_struct<BR>
対処 2<BR>
「/usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc」の中の<BR>
「Libs.private」行に「-lpng」追加<BR>

エラー 3<BR>
undefined reference to `crc32'<BR>
対処 3<BR>
「/usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc」の中の<BR>
「Libs.private」行に「-lz」追加<BR>

エラー 4<BR>
undefined reference to `pow'<BR>
対処 4<BR>
「/usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc」の中の<BR>
「Libs.private」行に「-lm」追加<BR>

まとめ対処
```
cp /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc.org
echo "Libs.private: -lm -lpng -lz -lm" >> \
  /usr/lib/x86_64-linux-gnu/pkgconfig/aribb24.pc
```

'pow'で「-lm」の2個目がいるのはわかっていない
「aribb24」は「./configure」でなくて途中から「gcc」で確認
```
# --ffbuild/confg.log
# ---略
BEGIN /tmp/ffconf.aYnVVAgU/test.c
    1	#include <aribb24/aribb24.h>
    2	#include <stdint.h>
    3	long check_arib_instance_new(void) { return (long) arib_instance_new; }
    4	int main(void) { int ret = 0;
    5	 ret |= ((intptr_t)check_arib_instance_new) & 0xFFFF;
    6	return ret; }
END /tmp/ffconf.aYnVVAgU/test.c
gcc -D_ISOC11_SOURCE -D_FILE_OFFSET_BITS=64 -D_LARGEFILE_SOURCE -D_POSIX_C_SOURCE=200112 -D_XOPEN_SOURCE=600 -DPIC --static -std=c17 -fomit-frame-pointer -fPIC -pthread -I/usr/local/include -L/usr/local/lib -c -o /tmp/ffconf.aYnVVAgU/test.o /tmp/ffconf.aYnVVAgU/test.c
gcc -lz -Wl,--as-needed -Wl,-z,noexecstack -I/usr/local/include -L/usr/local/lib -o /tmp/ffconf.aYnVVAgU/test /tmp/ffconf.aYnVVAgU/test.o -laribb24 -lm -static
/usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/13/../../../x86_64-linux-gnu/libpng.a(png.o): in function `png_compare_ICC_profile_with_sRGB':
(.text+0x378): undefined reference to `crc32'
# ---略
```

```
# -- 以下内容で「test.c」作成
#include <aribb24/aribb24.h>
#include <stdint.h>
long check_arib_instance_new(void) { return (long) arib_instance_new; }
int main(void) { int ret = 0;
ret |= ((intptr_t)check_arib_instance_new) & 0xFFFF;
return ret; }

gcc -D_ISOC11_SOURCE -D_FILE_OFFSET_BITS=64 -D_LARGEFILE_SOURCE -D_POSIX_C_SOURCE=200112 -D_XOPEN_SOURCE=600 -DPIC --static -std=c17 -fomit-frame-pointer -fPIC -pthread -I/usr/local/include -L/usr/local/lib -c -o test.o test.c
gcc -lz -Wl,--as-needed -Wl,-z,noexecstack -I/usr/local/include -L/usr/local/lib -o test -o -laribb24 -lm -static
#-- 最後のオプションをいろいろ試した
```
#### libsvtav1
aptで「dev」入れると、「libdav1d.a 」と「libSvtAv1Enc.a」が無い。  
「.so」はあるのでスタティックのときにダメになるもよう  
それぞれ ~~「git clone」~~ 「tar.bz2」取得して「make」 ~~などしてできたもののコピー~~ 「install」

### ソースから作成
#### x265
```
git clone --depth 1 https://bitbucket.org/multicoreware/x265_git.git
cd x265_git/build/linux
./make-Makefiles.bash
make -j && make install
```
#### aribb24
```
git clone --depth 1 https://code.videolan.org/jeeb/aribb24.git
cd aribb24
autoreconf -iv 
./configure
make -j && make install
```
### dav1d
```
#git clone --depth 1 https://code.videolan.org/videolan/dav1d.git
curl -O https://code.videolan.org/videolan/dav1d/-/archive/1.5.1/dav1d-1.5.1.tar.bz2
cd dav1d/
mkdir build && cd build
meson setup ..  --default-library=static
ninja
ninja install
# cp src/libdav1d.a /usr/lib/x86_64-linux-gnu/
```
### SVT-AV1
```
#git clone --depth 1 https://gitlab.com/AOMediaCodec/SVT-AV1.git
curl -O https://gitlab.com/AOMediaCodec/SVT-AV1/-/archive/v2.3.0/SVT-AV1-v2.3.0.tar.bz2
cd SVT-AV1/
mkdir build
cd build/
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF ..
make -j
make instsall
#cp ../Bin/Release/libSvtAv1Enc.a /usr/lib/x86_64-linux-gnu/

```
## 履歴
### 2025/05/13
ubuntu 25.04で確認  
stvav1 2.3.0  
dav1d 1.5.1  
stvav1 3.0.2ではmake時以下のエラー  
```
libavcodec/libsvtav1.c: In function 'eb_enc_init':
libavcodec/libsvtav1.c:438:61: error: passing argument 2 of 'svt_av1_enc_init_handle' from incompatible pointer type [-Wincompatible-pointer-types]
  438 |     svt_ret = svt_av1_enc_init_handle(&svt_enc->svt_handle, svt_enc, &svt_enc->enc_params);
      |                                                             ^~~~~~~
      |                                                             |
      |                                                             SvtContext *
In file included from libavcodec/libsvtav1.c:25:
/usr/local/include/svt-av1/EbSvtAv1Enc.h:969:31: note: expected 'EbSvtAv1EncConfiguration *' but argument is of type 'SvtContext *'
  969 |     EbSvtAv1EncConfiguration *config_ptr); // config_ptr will be loaded with default params from the library
      |     ~~~~~~~~~~~~~~~~~~~~~~~~~~^~~~~~~~~~
libavcodec/libsvtav1.c:438:15: error: too many arguments to function 'svt_av1_enc_init_handle'
  438 |     svt_ret = svt_av1_enc_init_handle(&svt_enc->svt_handle, svt_enc, &svt_enc->enc_params);
      |               ^~~~~~~~~~~~~~~~~~~~~~~
/usr/local/include/svt-av1/EbSvtAv1Enc.h:967:20: note: declared here
  967 | EB_API EbErrorType svt_av1_enc_init_handle(
      |                    ^~~~~~~~~~~~~~~~~~~~~~~
make: *** [ffbuild/common.mak:81: libavcodec/libsvtav1.o] Error 1
make: *** Waiting for unfinished jobs....
```
h264とh265を削除  
crfの既定値を「0(35)」から「40」になるようソース修正  
crfの指定なし「0」の場合stvav1の既定値35になる
```
$ diff libavcodec/libsvtav1.c.org libavcodec/libsvtav1.c
730c730
<       AV_OPT_TYPE_INT, { .i64 = 0 }, 0, 63, VE },
---
>       AV_OPT_TYPE_INT, { .i64 = 40 }, 0, 63, VE },
```

サイズ30M切った [Dockerfile](https://github.com/oxxpeh/pub/blob/5a490fa669a1393f7b0704d6afab77d0a4949aa9/ffmpeg-static/Dockerfile)  
SHA: 5a490fa669a1393f7b0704d6afab77d0a4949aa9
### 2024/11/20
svtav1は早い気がするので「svtav1」追加  
svtav1は「-crf 40」ぐらいが良いような  
(デフォルトは35) 
movenc.cの変更も修正(hevc->av1)  
40M超えてる…「hevc」とか消しても良いかも  

```
$ diff movenc.c.org movenc.c
<     .p.video_codec     = CONFIG_LIBX264_ENCODER ?
<                          AV_CODEC_ID_H264 : AV_CODEC_ID_MPEG4,
---
>     .p.video_codec     = AV_CODEC_ID_AV1,
```

[Dockerfile](https://raw.githubusercontent.com/oxxpeh/pub/3cab2e596dffcaf2383b5e06b2b73ae4725d665d/ffmpeg-static/Dockerfile)
SHA:3cab2e596dffcaf2383b5e06b2b73ae4725d665d  

### 2024/10/16
・7.1で確認  
movenc.cの変更は
```
    .p.name            = "mp4",
    .p.long_name       = NULL_IF_CONFIG_SMALL("MP4 (MPEG-4 Part 14)"),
    .p.mime_type       = "video/mp4",
    .p.extensions      = "mp4",
    .priv_data_size    = sizeof(MOVMuxContext),
    .p.audio_codec     = AV_CODEC_ID_AAC,
    .p.video_codec     = CONFIG_LIBX264_ENCODER ?
                         AV_CODEC_ID_H264 : AV_CODEC_ID_MPEG4,
```
の「.p.name="mp4"」の位置が7.01から変わってたので  
「.p.name="mp4"」直下の「.p.video_codec」の行を確認してパッチファイルの行番号を修正するスクリプト「pat.sh」を実行  
(Dockerfileで作成)  
aptでのver  
ffmpeg/oracular,now 7:7.0.2-3ubuntu1  
libaribb24-dev/oracular,now 1.0.3-2.1build2  
libx264-dev/oracular,now 2:0.164.3108+git31e19f9-2build1  
libx265-dev/oracular,now 3.6-3  
libfdk-aac-dev/oracular,now 2.0.2-3  
[Dockerfile](https://raw.githubusercontent.com/oxxpeh/pub/38d458c31e392ad4f690eb67e5e61ad780a8b0d9/ffmpeg-static/Dockerfile)
SHA:38d458c31e392ad4f690eb67e5e61ad780a8b0d9  

### 2024/08/11
・7.0.2で確認<BR>
・mp4のデフォルトコーデックを「x265」、「fdk_aac」に変更<BR>
  「x265」はlibavformat/movenc.cの編集、<BR>
  「fdk_aac」はconfigureで「aac」の削除<BR>
```
$ diff movenc.c.org movenc.c
8290,8291c8290,8291
<     .p.video_codec     = CONFIG_LIBX264_ENCODER ?
<                          AV_CODEC_ID_H264 : AV_CODEC_ID_MPEG4,
---
>     .p.video_codec     = CONFIG_LIBX265_ENCODER ?
>                          AV_CODEC_ID_HEVC : AV_CODEC_ID_MPEG4,
```
### 2024/07/27
・7.0.1で確認<BR>
