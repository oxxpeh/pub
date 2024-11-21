# コーデックで比較
2分のm2tsの動画の変換  
(cpu: 13th Gen Intel(R) Core(TM) i5-1340P ffmpeg 7.1)  
試行回数は一回なので…  
## 比較
### h.264
  size= 31681KiB speed=4.62x  
  vmaf 59.93
### h.265 hevc
  size= 10604KiB speed=1.95x  
  vmaf 55.49    
### SVT-AV1
・av1(def -preset 10 crf 35)  
  size= 13180KiB speed=7.89x  
  vmaf 57.70  
・av1 (-crf 40)  
  size= 9770KiB speed=7.7x   
  vmaf 57.33  
  サイズがhevcより小さくなった
### h.266 vvenc
  size=  8962KiB speed=0.108x  
  VMAF 59.93
## cpuで比較
### i7-4770s (win ffmpeg 7.0.1)
・h264  
 size=   31806KiB speed=2.13x  
・libsvtav1  
  size=   13753KiB speed=2.69x  
・h265  
  size=   10637KiB speed=1.28x  

## i5-8500 (win ffmpeg 7.1 GTX 1080)
・h264  
  size=   31736KiB speed=2.61x   
・libsvtav1  
  size=   13325KiB speed=4.26x  
・h265  
  size=   10629KiB speed=1.53x   
・h264_nvenc  
  size=   31314KiB  speed=15.2x  
  VMAF score: 60.13  
・h265_nvenc  
  size=   33238KiB  speed=18.2x  
  VMAF score: 59.20  
## Celeron(R) J4005 CPU @ 2.00GHz (7.0.2)
・SVT-AV1 crf 40  
 size= 10232KiB speed=0.451x  
・hevc_qsv  
 size=   14877KiB   speed=1.31x  
 VMAF score: 56.07  
・h264_qsv  
 size=   21243KiB  speed=4.82x  
 VMAF score: 56.24  
## Snapdragon® 695 5G Mobile Platform 2.2GHz + 1.8GHz オクタコア (Android 6.1.2)
・SVT-AV1 crf 40  
 size=   10258kB speed=1.26x  
・h264   
 size=   31814kB speed=0.863x  
・h264_mediacodec  
 size=   54531kB speed=1.08x  
 VMAF score: 56.30
## その他
### VMAF makeとか
https://www.gyan.dev/ffmpeg/builds/ から落としたものにVMAFも入っていたと思う  
( https://github.com/BtbN/FFmpeg-Builds/releases )では無いと…  
`ffmpeg-7.1.exe -i test.mp4 -i ../test.m2ts -lavfi libvmaf='model=version=vmaf_v0.6.1' -f null - `
```
git clone --depth 1 https://github.com/Netflix/vmaf.git
cd vmaf/libvmaf/
apt -U install nasm ninja-build doxygen xxd
meson setup build --buildtype release
ninja -vC build test
ninja -vC build install
```
staticはいろいろとエラーが出てsharedにしたと思う。
<span style="color: #38761d;"><br>(参)<br>【Ubuntu】 ffmpegとVMAFで映像の品質劣化具合を数値化｜DCX<br>https://note.com/clean_orchid323/n/na48171b00d34</span><br>

<span style="color: #38761d;"><br>(参)<br>GitHub - yash1994/Build-FFmpeg-with-libvmaf: Guide to build FFmpeg from source with Netflix's libvmaf on Ubuntu 18.04<br>https://github.com/yash1994/Build-FFmpeg-with-libvmaf?tab=readme-ov-file</span><br>

### h.266 vvenc makeとか
```
git clone --depth 1 https://github.com/fraunhoferhhi/vvenc
cd vvenc/
make release
cmake -S . -B build/release-static -DCMAKE_BUILD_TYPE=Release
cmake --build build/release-static -j
cmake --build build/release-static --target install
cp install/lib/pkgconfig/libvvenc.pc /lib/x86_64-linux-gnu/pkgconfig/
```
してちょっと修正したと思う…  
「-lgcc_s」の削除とか

<span style="color: #38761d;"><br>(参)<br>Build · fraunhoferhhi/vvenc Wiki · GitHub<br>https://github.com/fraunhoferhhi/vvenc/wiki/Build#build-using-makefile</span><br>
### ログ
[こちら](https://github.com/oxxpeh/pub/blob/main/ffmpeg-static/enc-codec-log.md)に全部ないですが。
