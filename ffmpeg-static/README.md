# ffmpegをスタティックなライブラリで作るDockerファイル
Windows版は「ffmpeg-windows-build-helpers」でさくっと作れたけど<BR>
native(linux)は作れなかったのでちょっとがんばった<BR>
ubuntu24.04で確認<BR>
ffmpegは「n7.0.1」<BR>
(Dokcerファイルでgit時指定)<BR>
「x265」 「x264」 「aribb24」 「fdk_aac」を有効化<BR>
(スクリプトmk-ffm.shでconfigure時に指定)

dockerはほとんど使ったことがない…<BR>
makeで「warning」が出るけど気にしない…<BR>
glibcのライブラリを使用するのかな
```
warning: Using 'dlopen' in statically linked applications requires at runtime the shared libraries from the glibc version used for linking
warning: Using 'getaddrinfo' in statically linked applications requires at runtime the shared libraries from the glibc version used for linking
```

# 使い方
```
mkdir ffm-b && cd ffm-b
# -- 「ffm-b」でなくても何でも良いです
curl --compressed -o https://raw.githubusercontent.com/oxxpeh/pub/main/ffmpeg-static/Dockerfile
docker build -t ffm-b-img .
# -- proxy必要なら 「--build-arg HTTP_PROXY=http://192.168.1.1:3128」とか
# -- 「docker.io」だけではなく「docker-buildx」もaptでinstallしておく
docker run -it  --name ffm-b --hostname ffm-b --mount "type=bind,src=/tmp/,dst=/host-tmp" ffm-b-img bash
# -- ホスト側のマウント場所とか変更したい場合は修正を
./mk-ffm.sh
# -- configureとmakeします
# -- 「./mk-ffm.sh 6」 とかでmake 時の job数の指定が可能と思う
# -- 「./mk-ffm.sh」だと無制限でjob作成
cp /FFmpeg/ffmpeg /host-tmp/
# -- ホストへのコピーはスクリプトに入れてません
```

# 細工とか
## ffmpegのconfigureのオプション
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
    --enable-libfdk-aac \
    --enable-libx264 \
    --enable-libx265 \
    --enable-libwebp 
```
## コンテナにaptで入れてるパッケージ
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
   libfdk-aac-dev\
   libx264-dev\
   libx265-dev\
   libaribb24-dev\
   libpng-dev\
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
## configureのエラー対策
コンパイルのことが基本わかっていないので推測だらけ…<BR>
「x265」と「aribb24」でエラー出力<BR>
どちらも「ERROR: aribb24(x265) not found using pkg-config」<BR>
見つからないわけではなく、ライブラリの確認時のオプションが間違っているためにエラーを出力<BR>
configure実行後の「ffbuild/confg.log」で確認
(対処後aptのパッケージではなく、ソース試してみたけどpcファイルの中身は同じ)<BR>

### x265
エラー<BR>
/usr/bin/ld: cannot find -lgcc_s: No such file or directory<BR>
対処<BR>
pkg-confgで使用する「/usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc」の中の<BR>
「Libs.private」行に「-lgcc_s」があるとエラー<BR>
```
sed -i.org  "s/-lgcc_s //g" /usr/lib/x86_64-linux-gnu/pkgconfig/x265.pc
```
### aribb24
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

## ソースから作成
### x265
```
git clone https://bitbucket.org/multicoreware/x265_git.git
cd x265_git/build/linux
./make-Makefiles.bash
make -j && make install
```
### aribb24
```
git clone https://code.videolan.org/jeeb/aribb24.git
cd aribb24
autoreconf -iv 
./configure
make -j && make install
```
