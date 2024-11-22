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
## i5-7600T CPU @ 2.80GHz (7.1)
・SVT-AV1 crf 40  
 size=   11877KiB speed=2.21x  
・hevc  
 size=   12407KiB speed=0.782x  
・h264  
 size=   33479KiB speed=1.37x  
・hevc_qsv  
 size=   16549KiB speed=3.69x  
 VMAF score: 58.36  
・h264_qsv  
 size=   22778KiB speed=8.82x 
 VMAF score: 58.62  
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
### qsv
staticでの作成は挫折  
作成は終わるけど実行すると「coredump」  
sharedだどlibvplでの作成スクリプト「bootstrap」内でインストールしてくる以下のパッケージが無くても  
```
libpciaccess-dev libset-scalar-perl \                                                
libva-glx2 libva-wayland2 libwayland-bin \  
libxau-dev libxcb-randr0-dev libxcb-render0-dev \
libxcb-shape0-dev libxcb-sync-dev libxcb-xfixes0-dev \
libxcb1-dev libxdmcp-dev x11proto-dev xorg-sgml-doctools xtrans-dev \ﾚ
libdrm-dev libva-dev libwayland-dev libx11-dev libx11-xcb-dev libxcb-dri3-dev \
libxcb-present-dev wayland-protocols \
python3-pip python3-wheel \
```
作成は終わるけど実行すると以下のエラー
```
[h264_qsv @ 0x5b38e631bf00] Initialized an internal MFX session using hardware accelerated implementation
[h264_qsv @ 0x5b38e631bf00] Using the constant quantization parameter (CQP) by default. Please use the global_quality option and other options for a quali
ty-based mode or the b option and other options for a bitrate-based mode if the default is not the desired choice.
[h264_qsv @ 0x5b38e631bf00] Using the constant quantization parameter (CQP) ratecontrol method
[h264_qsv @ 0x5b38e631bf00] Selected ratecontrol mode is unsupported
[h264_qsv @ 0x5b38e631bf00] Current frame rate is unsupported
[h264_qsv @ 0x5b38e631bf00] Current picture structure is unsupported
[h264_qsv @ 0x5b38e631bf00] Current resolution is unsupported
[h264_qsv @ 0x5b38e631bf00] Current pixel format is unsupported
[h264_qsv @ 0x5b38e631bf00] some encoding parameters are not supported by the QSV runtime. Please double check the input parameters.
[vost#0:0/h264_qsv @ 0x5b38e6345880] Error while opening encoder - maybe incorrect parameters such as bit_rate, rate, width or height.
[vf#0:0 @ 0x5b38e63b6640] Error sending frames to consumers: Function not implemented
[vf#0:0 @ 0x5b38e63b6640] Task finished with error code: -38 (Function not implemented)
[vf#0:0 @ 0x5b38e63b6640] Terminating thread with return code -38 (Function not implemented)
[vost#0:0/h264_qsv @ 0x5b38e6345880] Encoder thread received EOF
[vost#0:0/h264_qsv @ 0x5b38e6345880] Could not open encoder before EOF
[vost#0:0/h264_qsv @ 0x5b38e6345880] Task finished with error code: -22 (Invalid argument)
[vost#0:0/h264_qsv @ 0x5b38e6345880] Terminating thread with return code -22 (Invalid argument)
[vist#0:0/mpeg2video @ 0x5b38e63455c0] [dec:mpeg2video @ 0x5b38e65090c0] Decoder returned EOF, finishing
[vist#0:0/mpeg2video @ 0x5b38e63455c0] [dec:mpeg2video @ 0x5b38e65090c0] Terminating thread with return code 0 (success)
[vist#0:0/mpeg2video @ 0x5b38e63455c0] All consumers of this stream are done
[in#0/mpegts @ 0x5b38e6314800] EOF while reading input
[in#0/mpegts @ 0x5b38e6314800] Terminating thread with return code 0 (success)
[out#0/mp4 @ 0x5b38e6345740] Nothing was written into output file, because at least one of its streams received no packets.
frame=    0 fps=0.0 q=0.0 Lsize=       0KiB time=N/A bitrate=N/A speed=N/A    
[AVIOContext @ 0x5b38e631c840] Statistics: 0 bytes written, 0 seeks, 0 writeouts
[in#0/mpegts @ 0x5b38e6314800] Input file #0 (../test.m2ts):
[in#0/mpegts @ 0x5b38e6314800]   Input stream #0:0 (video): 16 packets read (484170 bytes); 4 frames decoded; 0 decode errors; 
[in#0/mpegts @ 0x5b38e6314800]   Input stream #0:1 (audio): 5625 packets read (3836250 bytes); 
[in#0/mpegts @ 0x5b38e6314800]   Total: 5641 packets (4320420 bytes) demuxed
[AVIOContext @ 0x5b38e631d240] Statistics: 148662416 bytes read, 2 seeks
Conversion failed!
```
「libva-dev」は「libdva.a」が無かった、その他にも「*.a」が無いのがあるのかも  
他で実行できても13thだと以下のエラー  
```
[h264_qsv @ 0x57da2d249800] Use Intel(R) oneVPL to create MFX session, the required implementation version is 1.1
[AVHWDeviceContext @ 0x7f3bfc153000] Trying to use DRM render node for device 0, with matching kernel driver (i915).
[AVHWDeviceContext @ 0x7f3bfc153000] libva: VA-API version 1.22.0
[AVHWDeviceContext @ 0x7f3bfc153000] libva: User requested driver 'iHD'
[AVHWDeviceContext @ 0x7f3bfc153000] libva: Trying to open /usr/lib/x86_64-linux-gnu/dri/iHD_drv_video.so
[AVHWDeviceContext @ 0x7f3bfc153000] libva: Found init function __vaDriverInit_1_22
[AVHWDeviceContext @ 0x7f3bfc153000] libva: va_openDriver() returns 0
[AVHWDeviceContext @ 0x7f3bfc153000] Initialised VAAPI connection: version 1.22
[AVHWDeviceContext @ 0x7f3bfc153000] VAAPI driver: Intel iHD driver for Intel(R) Gen Graphics - 24.3.4 ().
[AVHWDeviceContext @ 0x7f3bfc153000] Driver not found in known nonstandard list, using standard behaviour.
[h264_qsv @ 0x57da2d249800] Error during set display handle
: device failed (-17)
[vost#0:0/h264_qsv @ 0x57da2d6fa4c0] Error while opening encoder - maybe incorrect parameters such as bit_rate, rate, width or height.
[vf#0:0 @ 0x57da2d58afc0] Error sending frames to consumers: Input/output error
[vf#0:0 @ 0x57da2d58afc0] Task finished with error code: -5 (Input/output error)
[vf#0:0 @ 0x57da2d58afc0] Terminating thread with return code -5 (Input/output error)
[vist#0:0/mpeg2video @ 0x57da2d2c76c0] [dec:mpeg2video @ 0x57da2d26d200] Decoder returned EOF, finishing
[vist#0:0/mpeg2video @ 0x57da2d2c76c0] [dec:mpeg2video @ 0x57da2d26d200] Terminating thread with return code 0 (success)
[vost#0:0/h264_qsv @ 0x57da2d6fa4c0] Encoder thread received EOF
[vost#0:0/h264_qsv @ 0x57da2d6fa4c0] Could not open encoder before EOF
[vist#0:0/mpeg2video @ 0x57da2d2c76c0] All consumers of this stream are done
[vost#0:0/h264_qsv @ 0x57da2d6fa4c0] Task finished with error code: -22 (Invalid argument)
[vost#0:0/h264_qsv @ 0x57da2d6fa4c0] Terminating thread with return code -22 (Invalid argument)
[in#0/mpegts @ 0x57da2d242180] Terminating thread with return code 0 (success)
[out#0/mp4 @ 0x57da2d457140] Nothing was written into output file, because at least one of its streams received no packets.
frame=    0 fps=0.0 q=0.0 Lsize=       0KiB time=N/A bitrate=N/A dup=5 drop=0 speed=N/A    
[AVIOContext @ 0x57da2d61bb80] Statistics: 0 bytes written, 0 seeks, 0 writeouts
[in#0/mpegts @ 0x57da2d242180] Input file #0 (../test.m2ts):
[in#0/mpegts @ 0x57da2d242180]   Input stream #0:0 (video): 22 packets read (559968 bytes); 10 frames decoded; 0 decode errors; 
[in#0/mpegts @ 0x57da2d242180]   Input stream #0:1 (audio): 2853 packets read (1945948 bytes); 
[in#0/mpegts @ 0x57da2d242180]   Total: 2875 packets (2505916 bytes) demuxed
[AVIOContext @ 0x57da2d24acc0] Statistics: 71471248 bytes read, 2 seeks
Conversion failed!
```
### ログ
[こちら](https://github.com/oxxpeh/pub/blob/main/ffmpeg-static/enc-codec-log.md)に全部ないですが。
